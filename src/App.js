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
import Import from './components/Import';
import Export from './components/Export';


// import stylesheet
import "./styles/reset.css";
import "./styles/theme.css";

const { ipcRenderer } = window.require("electron")

const renderPage = (page, setPage, orders, 
                    setOrder, expenses, setExpenses, 
                    stats, setStats, data, setData, 
                    handleAddingSale, handleEditingSale, 
                    handleAddingExpense, handleEditingExpense, 
                    popUpVisible, setPopUpVisible, monthlyData, 
                    thirtyDayData ) => {
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
                    monthlyData={monthlyData}
                    thirtyDayData={thirtyDayData}
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
    const [monthlyData, setMonthlyData] = useState([]);
    const [thirtyDayData, setThirtyDayData] = useState([]);
    const [importShown, setImportShown] = useState(false);
    const [exportShown, setExportShown] = useState(false);
    const [loaded, setLoaded] = useState(false);

    // Will update the month's info when the action occured
    const updateMonthly = (order, type) => {
        // Find Month it occured in
        let month = new Date(order.date).getMonth();

        let temp = monthlyData;
 
        let index = temp.findIndex(x => x.num === month);

        if(type === "expense") {
            temp[index].Expenses += parseInt(order.amount);
        }
        else {
            temp[index].Gross += parseInt(order.amount);
        }
        temp[index].Profit = parseInt(temp[index].Gross) - parseInt(temp[index].Expenses)
        setMonthlyData(temp);
    }

    // Adds to the daily entry based on the order's date
    const addToDaily = async (order, type) => {
        let temp = [...thirtyDayData];
        let index = temp.findIndex(entry => entry.date === new Date(order.date).toISOString().slice(0,10));
        if(type === "expense" && index !== -1) {
            temp[index].Expenses += parseInt(order.amount);
            temp[index].Profit =  parseInt(temp[index].Gross) -  parseInt(temp[index].Expenses);
        }
        else if(index !== -1){
            temp[index].Gross += parseInt(order.amount);
            temp[index].Profit =  temp[index].Gross - temp[index].Expenses        
        }
        
        setThirtyDayData(temp);
    }

    // Adds to Gross
    const addToTotal = async (amount) => {
        data[0].value += parseInt(amount);
    }

    // Adds to expense
    const addToExpense = async (amount) => {
        data[2].value += parseInt(amount);
    }

    // Updates profit
    const balanceProfit = async () => {
        data[1].value = Math.abs(data[0].value) - Math.abs(data[2].value);
    }

    // Handles where to add based on days since event
    const balanceStats = async (order, type) => {
		const calculateDaysSinceOrder = (date) => {
			return Math.floor((Date.now() - date) / (1000 * 3600 * 24));
		}
		let temp = stats;
		let dateOfOrder = Date.parse(order.date);	
        let daysSince = calculateDaysSinceOrder(dateOfOrder);
       if(type === "sale") {
		switch(true) {
			case (daysSince < 31):
				for(let i = 0; i < temp.length; i++) {
					temp[i].gross += parseInt(order.amount);
					temp[i].sales++;
                    temp[i].profit = parseInt(temp[i].gross) - parseInt(temp[i].expenses); 
                }
                addToDaily(order, type);
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
			case (daysSince < 31):
				for(let i = 0; i < temp.length; i++) {
					temp[i].expenses += parseInt(order.amount);
					temp[i].profit = parseInt(temp[i].gross) - parseInt(temp[i].expenses); 
                }
                addToDaily(order, type);
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
       setStats(temp);
    }

    // Adds sale to our orders list and update stats, monthly stats and balances profit
    const handleAddingSale = async (order) => {
        let temp;
        
        if(order.type=== "sale") temp = {
            id: order.id,
            date: order.date,
            name: order.name,
            amount: order.amount,
            status: order.category
        }

        await addToTotal(temp.amount);
        await balanceProfit();
        await updateMonthly(temp, "sale");
		await balanceStats(temp, "sale");
        await setOrder([...orders, temp]);
        ipcRenderer.send("updateOrdersStored", orders);
    }
    
    const handleEditingSale = (expense) => {
    }
    
    // Adds expense to our list
    const handleAddingExpense = async (expense) => {
        let temp;

        if(expense.type === "expense") temp = {
            id: expense.id,
            date: expense.date,
            description: expense.name,
            amount: expense.amount,
            category: expense.category
        }

        await addToExpense(temp.amount)
        await balanceProfit();
        await updateMonthly(temp, "expense");
        await balanceStats(temp, "expense");
        await setExpenses([...expenses, temp]);
        ipcRenderer.send("updateExpensesStored", expenses);
    }
    
    const handleEditingExpense = (expenses, expenseID) => {
        ipcRenderer.send("openEditSaleWindow", expenses, expenseID);
    }

    const handleImport = async () => {
        const processImport = async (data) => {
            // Splits data set into rows
            const rows = data.split("\n");
            const newOrders = [];
            const newExpenses = [];
            for(let i = 1; i < rows.length - 1; i++) {
                let row = rows[i].split(",");
                let temp;
                if(row[0] === "SALE") {
                    temp = {
                        id: new Date(),
                        date: new Date(row[1]).toLocaleDateString('en-US', {
                            day: 'numeric',month: 'numeric', year: 'numeric'
                         }).replace(/ /g, '/'),
                        name: row[2],
                        amount:  parseInt(row[3]),
                        status: String(row[4])
                    }
                    newOrders.push(temp);
                    
                }
                else {
                    temp = {
                        id: new Date().getTime(),
                        date: new Date(row[1]).toLocaleDateString('en-US', {
                             day: 'numeric',month: 'numeric', year: 'numeric'
                          }).replace(/ /g, '/'),
                        description: row[2],
                        amount: parseInt(row[3]),
                        category: row[4]
                    }
                    newExpenses.push(temp);
                }
            }

            if(newOrders.length > 0) (
                newOrders.map((async temp => {
                    await addToTotal(temp.amount);
                    await balanceProfit();
                    await updateMonthly(temp, "sale");
                    await balanceStats(temp, "sale");
                }))
            )
            
            if(newExpenses.length > 0)  {
                newExpenses.map((async temp => {
                    await addToExpense(temp.amount)
                    await balanceProfit();
                    await updateMonthly(temp, "expense");
                    await balanceStats(temp, "expense");
                }))
            }
            setOrder([...orders, ...newOrders]);
            setExpenses([...expenses, ...newExpenses]);
        }
        ipcRenderer.send("handleImport");

        ipcRenderer.on("importResponse", async (event, arg) =>{
            processImport(arg);
        })
    }

    const handleExport = () => {

    }

    useEffect(()=> {
        const getOrders = async () => {
            ipcRenderer.send("retrieveOrders");
                       
            ipcRenderer.once("ordersResponse", (event, arg) =>{
                setOrder(arg);
                setLast30Days();
            })  
        }

        const getExpenses = async () => {
            ipcRenderer.send("retrieveExpenses");
            
            ipcRenderer.once("expensesResponse", (event, arg) =>{
                setExpenses(arg);
            })  
        }

        const getStats = async () => {
            ipcRenderer.send("retrieveStats");

            ipcRenderer.once("statsResponse", (event, arg) => {
                setStats(arg);
            })
        }

        const getData = async () => {
            ipcRenderer.send("retrieveChartData");

            ipcRenderer.once("chartDataResponse", (event, arg) => {
                setData(arg);
            })
        }
        const getMonthly = async () => {
            ipcRenderer.send("retrieveMonthlyData");
            
            ipcRenderer.once("monthlyDataResponse", (event, arg) =>{
                setMonthlyData(arg);
            })  
        }
        const setLast30Days = () => {
            let temp = [];

            for(let i = 29; i >= 0; i--) {
                let date = new Date()
                date.setDate(date.getDate() - i);
                let entry = {
                    id: new Date().getTime(),
                    date: date.toISOString().slice(0,10),
                    Gross: 0,
                    Expenses: 0,
                    Profit: 0 
                }
                
                temp.push(entry);
            }
                
            setThirtyDayData([...temp]);
        }
        getMonthly();
        getData();
        getExpenses();
        getOrders();
        getStats();
        setLoaded(true);
    }, [])
 
    // generate the markdown
    let content = renderPage(page,setPage, 
                            orders, setOrder, 
                            expenses, setExpenses, 
                            stats, setStats, data, 
                            setData, handleAddingSale, 
                            handleEditingSale, 
                            handleAddingExpense, 
                            handleEditingExpense, 
                            popUpVisible, 
                            setPopUpVisible, 
                            monthlyData, 
                            thirtyDayData,
                            importShown, setImportShown,
                            exportShown, setExportShown);

                            
    return (
        <React.Fragment>
            <Menubar />
            <div className="app-container">
                <Sidebar 
                    changeView={setPage}
                    page={page}
                    importVisible={importShown}
                    setImportVisible={setImportShown}
                    exportVisible={exportShown}
                    setExportVisible={setExportShown}
                />
                <div className="content-container">
                    {content}
                    <Form 
                        visible = {popUpVisible}
                        setVisible = {setPopUpVisible}
                        addOrder = {handleAddingSale}
                        addExpense = {handleAddingExpense}
                    />
                    <Import 
                        visible={importShown}
                        setVisible={setImportShown}
                        handleImport={handleImport}
                    />
                    <Export 
                        visible={exportShown}
                        setVisible={setExportShown}
                        handleExport={handleExport}
                    />
                </div>
            </div>
        </React.Fragment>
    );
};

export default App;