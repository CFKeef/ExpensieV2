// # App
// handles the redux and router setup


// import dependencies
import React, { useState, useEffect } from "react";

// import components
import Menubar from './components/Menubar';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Analytics from './components/Analytics';
import Orders from './components/Orders';
import Expenses from './components/Expenses';
import Form from './components/Form';


// import stylesheet
import "./styles/reset.css";
import "./styles/theme.css";

const { ipcRenderer } = window.require("electron")

const renderPage = (page, setPage, orders, setOrder, expenses, setExpenses, stats, setStats, data, setData, handleAddingSale, handleEditingSale, handleAddingExpense, handleEditingExpense, popUpVisible, setPopUpVisible, monthlyData ) => {
    let content = null;

    switch (String(page).toLowerCase()) {
        case "dashboard": 
            content = (
                <Dashboard
                    orders={orders}
                    setOrder={setOrder}
                    addOrder={handleAddingSale}
                    editOrder={handleEditingSale}
                    addExpense={handleAddingExpense}
                    editExpense={handleEditingExpense}
                    data={data}
                    setData={setData}
                    stats={stats}
                    setStats={setStats}
                    setPage={setPage}
                    visible = {popUpVisible}
                    setVisible = {setPopUpVisible}
                />
            );
            break;

        case "sales": 
            content = (
                <Orders
                    orders={orders}
                    setOrder={setOrder}
                    addOrder={handleAddingSale}
                    editOrder={handleEditingSale}
                    visible = {popUpVisible}
                    setVisible = {setPopUpVisible}
                />
            );
            break;

        case "expenses":  
            content = (
                <Expenses
                    expenses={expenses}
                    setExpenses={setExpenses}
                    addExpense={handleAddingExpense}
                    editExpense={handleEditingExpense}
                    visible = {popUpVisible}
                    setVisible = {setPopUpVisible}
                />
            )
            break;
 
        case "analytics": 
            content = (
                <Analytics 
                    data={data}
                    setData={setData}
                    stats={stats}
                    setStats={setStats}
                    expenses={expenses}
                    orders={orders}
                />
            );
            break;

        default: 
           content = (
            <Dashboard
                orders={orders}
                setOrder={setOrder}
                addOrder={handleAddingSale}
                editOrder={handleEditingSale}
                addExpense={handleAddingExpense}
                editExpense={handleEditingExpense}
                data={data}
                setData={setData}
                stats={stats}
                setStats={setStats}
                setPage={setPage}
                visible = {popUpVisible}
                setVisible = {setPopUpVisible}
            />
            )
            break;
    };

    return content;
};


function App() {
    const [orders, setOrder] = useState([]);
    const [expenses, setExpenses] = useState([]);
    const [stats, setStats] = useState([]);
    const [data, setData] = useState([]);
    const [page, setPage] = useState("Dashboard");
    const [popUpVisible, setPopUpVisible] = useState(false);
    const [monthlyData, setMonthlyData] = useState([
        {num: 0, date: "Jan", Gross: 0, Expenses: 0, Profit: 0},
        {num: 1, date: "Feb", Gross: 0, Expenses: 0, Profit: 0},
        {num: 2, date: "April", Gross: 0, Expenses: 0, Profit: 0},
        {num: 3, date: "Mar", Gross: 0, Expenses: 0, Profit: 0},
        {num: 4, date: "May", Gross: 0, Expenses: 0, Profit: 0},
        {num: 5, date: "June", Gross: 0, Expenses: 0, Profit: 0},
        {num: 6, date: "July", Gross: 0, Expenses: 0, Profit: 0},
        {num: 7, date: "Aug", Gross: 0, Expenses: 0, Profit: 0},
        {num: 8, date: "Sept", Gross: 0, Expenses: 0, Profit: 0},
        {num: 9, date: "Oct", Gross: 0, Expenses: 0, Profit: 0},
        {num: 10, date: "Nov", Gross: 0, Expenses: 0, Profit: 0},
        {num: 11, date: "Dec", Gross: 0, Expenses: 0, Profit: 0},
    ]);
    const [thirtyDayData, setThirtyDayData] = useState([]);

    // Will update the month's info when the action occured
    const updateMonthly = (order, type) => {
        // Find Month it occured in
        let month = new Date(order.date).getMonth();

        let temp = [...monthlyData];
        let index = temp.findIndex(x => x.num === month);
        if(type === "expense") {
            temp[index].Expenses += parseInt(order.amount);
            temp[index].Profit = temp[index].Gross - temp[index].Expenses
        }
        else {
            temp[index].Gross += parseInt(order.amount);
            temp[index].Profit = temp[index].Gross - temp[index].Expenses
        }

        setMonthlyData(temp);
    }

    // Adds to Gross
    const addToTotal = (amount) => {
        data[0].value += parseInt(amount);
    }

    // Adds to expense
    const addToExpense = (amount) => {
        data[2].value += parseInt(amount);
    }

    // Updates profit
    const balanceProfit = () => {
        data[1].value = Math.abs(data[0].value) - Math.abs(data[2].value);
    }

    // Handles where to add based on days since event
    const balanceStats = (order, type) => {
		const calculateDaysSinceOrder = (date) => {
			return Math.floor((Date.now() - date) / (1000 * 3600 * 24));
		}
		let temp = stats;
		let dateOfOrder = Date.parse(order.date);	
        let daysSince = calculateDaysSinceOrder(dateOfOrder);

       if(type === "sale") {

		switch(true) {
			case (daysSince <= 31):
				for(let i = 0; i < temp.length; i++) {
					temp[i].gross = parseInt(order.amount);
					temp[i].sales++;
					temp[i].profit = parseInt(temp[i].gross) - parseInt(temp[i].expenses); 
				}
				break;	
			case (daysSince <= 365 && daysSince > 31):
				for(let i = 1; i < temp.length; i++) {
					temp[i].gross += parseInt(order.amount);
					temp[i].sales++;
					temp[i].profit = parseInt(temp[i].gross) - parseInt(temp[i].expenses); 
				}
				break;

			default:
				temp[2].gross += parseInt(order.amount);
				temp[2].sales++;
                temp[2].profit = parseInt(temp[2].gross) - parseInt(temp[2].expenses); 
				break;
		}
       }
       else {
		switch(true) {
			case (daysSince <= 31):
				for(let i = 0; i < temp.length; i++) {
					temp[i].expenses += parseInt(order.amount);
					temp[i].profit = parseInt(temp[i].gross) - parseInt(temp[i].expenses); 
				}
				break;	
			case (daysSince <= 365 && daysSince > 31):
				for(let i = 1; i < temp.length; i++) {
					temp[i].expenses = parseInt(order.amount);
					temp[i].profit = parseInt(temp[i].gross) - parseInt(temp[i].expenses); 
				}
				break;

			default:
				temp[2].expenses += parseInt(order.amount);
				temp[2].profit = parseInt(temp[2].gross) - parseInt(temp[2].expenses); 
				break;
		}
	   }
	   
       setStats([...temp]);
    }

    const handleAddingSale = (order) => {
        let temp;
        
        if(order.type=== "sale") temp = {
            id: order.id,
            date: order.date,
            name: order.name,
            amount: order.amount,
            status: order.category
        }

        addToTotal(temp.amount);
        balanceProfit();
        updateMonthly(temp, "sale");
		balanceStats(temp, "sale");
        setOrder([...orders, temp]);
        ipcRenderer.send("updateOrdersStored", orders);
    }
    
    const handleEditingSale = (expense) => {
    }
    
    const handleAddingExpense = (expense) => {
        let temp;

        if(expense.type === "expense") temp = {
            id: expense.id,
            date: expense.date,
            description: expense.name,
            amount: expense.amount,
            category: expense.category
        }

        addToExpense(temp.amount)
        balanceProfit();
        updateMonthly(temp, "expense");
        balanceStats(temp, "expense");
        setExpenses([...expenses, temp]);
        ipcRenderer.send("updateExpensesStored", expenses);
    }
    
    const handleEditingExpense = (expenses, expenseID) => {
        ipcRenderer.send("openEditSaleWindow", expenses, expenseID);
    }

    useEffect(()=> {
        const getOrders = async () => {
            ipcRenderer.send("retrieveOrders");
            
            let resp = []; 
            
            ipcRenderer.once("ordersResponse", (event, arg) =>{
                resp = arg;
                setOrder(resp);
                setLast30Days();
            })  
        }

        const getExpenses = async () => {
            ipcRenderer.send("retrieveExpenses");
            
            let resp = []; 
            
            ipcRenderer.once("expensesResponse", (event, arg) =>{
                resp = arg;
                setExpenses(resp);
            })  
        }

        const getStats = async () => {
            ipcRenderer.send("retrieveStats");

            let resp = [];

            ipcRenderer.once("statsResponse", (event, arg) => {
                resp = arg;
                setStats(resp);
            })
        }

        const getData = async () => {
            ipcRenderer.send("retrieveChartData");

            let resp = [];

            ipcRenderer.once("chartDataResponse", (event, arg) => {
                resp = arg;
                setData(resp);
            })
        }
        const getMonthly = async () => {
            ipcRenderer.send("retrieveMonthlyData");
            
            let resp = []; 
            
            ipcRenderer.once("monthlyResponse", (event, arg) =>{
                resp = arg;
                setMonthlyData(resp);
            })  
        }
        const setLast30Days = () => {
            let temp = [];

            for(let i = 29; i >= 0; i--) {
                let date = new Date()
                date.setDate(date.getDate() - i);
                let entry = {
                    id: new Date().getTime(),
                    date: date.toString(),
                    Gross: 0,
                    Expenses: 0,
                    Profits: 0 
                }
                
                temp.push(entry);
            }
                
            setThirtyDayData([...temp]);
        }

        getData();
        getExpenses();
        getOrders();
        getStats();
        getMonthly();
    }, [])
 
    // generate the markdown
    let content = renderPage(page,setPage, orders, setOrder, expenses, setExpenses, stats, setStats, data, setData, handleAddingSale, handleEditingSale, handleAddingExpense, handleEditingExpense, popUpVisible, setPopUpVisible, monthlyData);

    return (
        <React.Fragment>
            <Menubar />
            <div className="app-container">
                <Sidebar 
                    changeView={setPage}
                    page={page}
                />
                <div className="content-container">
                    {content}
                    <Form 
                        visible = {popUpVisible}
                        setVisible = {setPopUpVisible}
                        addOrder = {handleAddingSale}
                        addExpense = {handleAddingExpense}
                    />
                </div>
            </div>
        </React.Fragment>
    );
};

export default App;