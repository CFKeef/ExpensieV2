// # App
// handles the redux and router setup

// use strict
"use strict";

// import dependencies
import React, { useState, useEffect } from "react";

// import components
import Menubar from './components/Menubar';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Analytics from './components/Analytics';
import Orders from './components/Orders';
import Export from './components/Export';
import Settings from './components/Settings';
import Activation from './components/Activation';


// import stylesheet
import "./styles/reset.css";
import "./styles/theme.css";

const { ipcRenderer } = window.require("electron")

const renderPage = (page, orders, setOrder, stats, setStats, data, setData) => {
    let content = null;

    switch (String(page).toLowerCase()) {
        case "dashboard": {
            content = (
                <Dashboard
                    orders={orders}
                    setOrder={setOrder}
                    data={data}
                    setData={setData}
                    stats={stats}
                    setStats={setStats}
                />
            );
            break;
        };
        case "orders": {
            content = (
                <Orders
                    orders={orders}
                    setOrder={setOrder}
                />
            );
            break;
        };
        case "analytics": {
            content = (
                <Analytics 
                    orders={orders}
                    setOrder={setOrder}
                    data={data}
                    setData={setData}
                    stats={stats}
                    setStats={setStats}
                />
            );
            break;
        };
        case "export": {
            content = (
                <Export
                    orders={orders}
                    setOrder={setOrder}
                    data={data}
                    setData={setData}
                    stats={stats}
                    setStats={setStats}
                />
            );
            break;
        };
        case "settings": {
            content = (
                <p>settings</p>
            );
            break;
        };
    };

    return content;
};


function App() {
    const [orders, setOrder] = useState([]);
    const [stats, setStats] = useState([]);
    const [data, setData] = useState([]);
    const [page, setPage] = useState("orders");


    useEffect(()=> {
        const getOrders = async () => {
            ipcRenderer.send("retrieveOrders");
            
            let resp = []; 
            
            ipcRenderer.once("ordersResponse", (event, arg) =>{
                resp = arg;
                setOrder(resp);
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
        getOrders();
        getStats();
    }, [])

    // generate the markdown
    let content = renderPage(page, orders, setOrder, stats, setStats, data, setData);

    return (
        <React.Fragment>
            <Menubar />
            <div className="app-container">
                <Sidebar 
                    changeView={setPage}
                />
                <div className="content-container">
                    {content}
                </div>
            </div>
        </React.Fragment>
    );
};

export default App;