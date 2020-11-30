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

const renderPage = (page, setPage, orders, setOrder, expenses, setExpenses, stats, setStats, data, setData, handleAddingSale, handleEditingSale, handleAddingExpense, handleEditingExpense, popUpVisible, setPopUpVisible ) => {
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

    const addToTotal = (amount) => {
        data[0].value += parseInt(amount);
    }

    const addToExpense = (amount) => {
        data[2].value += parseInt(amount);
    }

    const balanceProfit = () => {
        data[1].value = Math.abs(data[0].value) - Math.abs(data[2].value);
    }

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
					temp[i].gross += parseInt(order.amount);
					temp[i].sales++;
					temp[i].profit = temp[i].gross - temp[i].expenses; 
				}
				break;	
			case (daysSince <= 365 && daysSince > 31):
				for(let i = 1; i < temp.length; i++) {
					temp[i].gross += parseInt(order.amount);
					temp[i].sales++;
					temp[i].profit = temp[i].gross - temp[i].expenses; 
				}
				break;

			default:
				temp[2].gross += parseInt(order.amount);
				temp[2].sales++;
				temp[2].profit = temp[2].gross - temp[2].expenses; 
				break;
		}
       }
       else {
		switch(true) {
			case (daysSince <= 31):
				for(let i = 0; i < temp.length; i++) {
					temp[i].expenses += parseInt(order.amount);
					temp[i].profit = temp[i].gross - temp[i].expenses; 
				}
				break;	
			case (daysSince <= 365 && daysSince > 31):
				for(let i = 1; i < temp.length; i++) {
					temp[i].expenses = parseInt(order.amount);
					temp[i].profit = temp[i].gross - temp[i].expenses; 
				}
				break;

			default:
				temp[2].expenses += parseInt(order.amount);
				temp[2].profit = temp[2].gross - temp[2].expense; 
				break;
		}
	   }
	   
       setStats(temp);
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

        getData();
        getExpenses();
        getOrders();
        getStats();
    }, [])
 
    // generate the markdown
    let content = renderPage(page,setPage, orders, setOrder, expenses, setExpenses, stats, setStats, data, setData, handleAddingSale, handleEditingSale, handleAddingExpense, handleEditingExpense, popUpVisible, setPopUpVisible);

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