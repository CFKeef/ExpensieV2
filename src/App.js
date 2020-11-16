// # App
// handles the redux and router setup

// use strict
"use strict";

// import dependencies
import React, { useState } from "react";

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

const renderPage = (page) => {
    let content = null;

    switch (String(page).toLowerCase()) {
        case "dashboard": {
            content = (
                <Dashboard />
            );
            break;
        };
        case "orders": {
            content = (
                <Orders />
            );
            break;
        };
        case "analytics": {
            content = (
                <Analytics />
            );
            break;
        };
        case "export": {
            content = (
                <Export />
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
    // sidebar state
    const [page, setPage] = useState("orders");

    // generate the markdown
    let content = renderPage(page);

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