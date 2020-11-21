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

    const handleAddingSale = (orders) => {
        let temp = Object.values(orders);
        temp.push(({id: "TEST", date: "08/12/20",
        name: "Isabel",
       amount: "$63",
        status: "Not Shipped"}))
        setOrder(temp);
        ipcRenderer.send("updateOrdersStored", temp);
    }
    
    const handleEditingSale = (orders, orderID) => {
        ipcRenderer.send("openEditSaleWindow", orders, orderID);
    }
    
    const handleAddingExpense = (expenses) => {
        ipcRenderer.send("openAddSaleWindow", expenses);
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
                    />
                </div>
            </div>
        </React.Fragment>
    );
};

export default App;