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
import Activation from './components/Activation';


// import stylesheet
import "./styles/reset.css";
import "./styles/theme.css";

/**
 * # renderPage
 * renders the content based on the selected page
 * 
 * @param {String} page
 * 
 * @returns markdown
 */
const renderPage = (page) => {
    let content = null;

    switch (String(page).toLowerCase()) {
        case "home": {
            content = (
                <Dashboard />
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

/**
 * # App
 */
function App() {
    // sidebar state
    const [page, setPage] = useState("home");

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