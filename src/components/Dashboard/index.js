import React, { useState } from 'react';

import Chart from '../Chart';

import ShowMore from '../../assets/options.svg';
import Logo from '../../assets/expensieLogo.png';
import Plus from '../../assets/plus.svg';
import Arrow from '../../assets/right-arrow.svg';
import DownChevron from '../../assets/down-chevron.svg';

const Dashboard = () => {
    const [dropDownSelection, setDropDownSelection] = useState("Lifetime");
    const [dropDownShowing, setDropDownShowing] = useState(false);
    const [actionsShowing, setActionsShowing] = useState(false);

    const orders = [
        {id: 1, date: "08/01/20", name: "CFKEEF", amount: "$150", status: "Shipped"},
        {id: 2, date: "08/01/20", name: "CFKEEF", amount: "$150", status: "Shipped"},
        {id: 3, date: "08/01/20", name: "CFKEEF", amount: "$150", status: "Shipped"},
        {id: 4, date: "08/01/20", name: "CFKEEF", amount: "$150", status: "Shipped"},
        {id: 5, date: "08/01/20", name: "CFKEEF", amount: "$150", status: "Shipped"},
        {id: 6, date: "08/01/20", name: "CFKEEF", amount: "$150", status: "Shipped"},
        {id: 7, date: "08/01/20", name: "CFKEEF", amount: "$150", status: "Shipped"},
        {id: 8, date: "08/01/20", name: "CFKEEF", amount: "$150", status: "Shipped"},
        {id: 9, date: "08/01/20", name: "CFKEEF", amount: "$150", status: "Shipped"},
        {id: 10, date: "08/01/20", name: "CFKEEF", amount: "$150", status: "Shipped"},
    ]

    const salesSummary = [
        {name: "Total", value: 55625},
        {name: "Expenses", value: 12000},
        {name: "Profit", value: 13000}
    ]

    // Determines if the row is odd or even and applies the correct class for the row's color
    const determineRowStyling = (index) => {
        if( (index + 1) % 2 == 0 ) return "even";
        else return "odd";
    }
    const handleDropDown = () => {
        const handleClick = (option) => {
            setDropDownSelection(option);
            setDropDownShowing(!dropDownShowing);
        }
        const setLast = (index) => {
            if(index == options.length - 1) return "last";
            else return "";
        }

        const options = [
            "Lifetime",
            "Past 30 Days",
            "Past Year"
        ]


        if(dropDownShowing) {
            return (
                <div className="dropdown">
                    <ul>
                        {options.map( (option, index) => {
                            if(option != dropDownSelection) {
                                return (
                                    <li key={"dropdown" + index}>
                                        <button onClick={()=>handleClick(option) } className={setLast(index)}>{option}</button>
                                    </li>
                                )
                            }
                        })}
                    </ul>
                </div>
            )
        }
    }

    const handleDropDownRestyling = () => {
        if(dropDownShowing) {
            return "showing";
        }
        else return "";
    }

    const handleActionsShown = (order) => {
        if(actionsShowing) {
            return (
                <div className="actioncontent">
                    <p>sdadasASDAD</p>
                </div>  
            )
        }
    }

    const generateTable = () => {
        const styleId = (id) => {
            if(id < 10) return "0" + id;
            else return id;
        }

        if(orders.length > 0) {
            return (
                <tbody>
                    {orders.map( (order, index) => {
                        return(
                            <tr key={"orders" + index} className={determineRowStyling(index)}>
                                <td className="id">
                                    <p>{styleId(order.id)}</p>
                                </td>
                                <td className="date">
                                    <p>{order.date}</p>
                                </td>
                                <td className="name">
                                    <p>{order.name}</p>
                                </td>
                                <td className="amount">
                                    <p>{order.amount}</p>
                                </td>
                                <td className="status">
                                    <p>{order.status}</p>
                                </td>
                                <td className="actions">
                                    <button onClick={() => setActionsShowing(!actionsShowing)}>
                                        <img src={ShowMore} />
                                    </button>
                                </td>
                            </tr>
                    )})}
                </tbody>
            )
        }
        else return (
            <div className="empty-table">
                <img src={Logo}/>
                <h4>Add a task to get started!</h4>
            </div>
        )
    }

    const generateStats = () => {
        let stats = [
            {name: "Total", past30Days: 2550, pastYear: 10560, lifetime: 20000},
            {name: "Expenses", past30Days: 2550, pastYear: 10560, lifetime: 20000},
            {name: "Profit", past30Days: 2550, pastYear: 10560, lifetime: 20000},
            {name: "Sales Count", past30Days: 2550, pastYear: 10560, lifetime: 20000},
        ]

        return (
            <tbody>
                <tr className={determineRowStyling(0)}>
                    <td>
                        <p className="title">Past 30 Days</p>
                    </td>
                    <td>
                        <p className="value">25555</p>
                    </td>
                    <td>
                        <p className="value">25555</p>
                    </td>
                    <td>
                        <p className="value">25555</p>
                    </td>
                    <td>
                        <p className="value">25555</p>
                    </td>
                </tr>
                <tr className={determineRowStyling(1)}>
                    <td>
                    <p className="title">Past Year</p>
                    </td>
                    <td>
                        <p className="value">25555</p>
                    </td>
                    <td>
                        <p className="value">25555</p>
                    </td>
                    <td>
                        <p className="value">25555</p>
                    </td>
                    <td>
                        <p className="value">25555</p>
                    </td>
                </tr>
                    <tr className={determineRowStyling(2)}>
                    <td>
                    <p className="title">Lifetime</p>
                    </td>
                    <td>
                        <p className="value">25555</p>
                    </td>
                    <td>
                        <p className="value">25555</p>
                    </td>
                    <td>
                        <p className="value">25555</p>
                    </td>
                    <td>
                        <p className="value">25555</p>
                    </td>
                </tr>
            </tbody>
        )
    }

    return (
        <div className="dashboard-container">
            <div className="dashboard">
                <div className="top">
                    <div className="pos">
                        <div className="tag">
                            <h1>Statistics</h1>
                        </div>
                    </div>
                    <div className="overview">
                        <div className="left">
                            <table>
                                <thead>
                                    <tr>
                                        <th>PERIOD</th>
                                        <th>TOTAL</th>
                                        <th>EXPENSES</th>
                                        <th>PROFIT</th>
                                        <th>SALES COUNT</th>
                                    </tr>
                                </thead>
                                {generateStats()}
                            </table>
                            <div className="button">
                                <button className="defaultbtn" >
                                    <img src={Arrow} />
                                    <p>View More</p>
                                </button>
                            </div>
                        </div>
                        <div className="right">
                            <Chart 
                                salesSummary={salesSummary}
                            />
                            <div className="button">
                                <button onClick={() => {setDropDownShowing(!dropDownShowing)}} className={"defaultDropdown " + handleDropDownRestyling()}>
                                    <img src={DownChevron} />
                                    <p>{dropDownSelection}</p>
                                </button>
                                {handleDropDown()}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bot">
                    <div className="pos">
                        <div className="tag">
                            <h1>Recent Transactions</h1>
                        </div>
                    </div>
                    <div className="order-list">
                        <table>
                            <thead>
                                <tr>
                                    <th className="id" >ID</th>
                                    <th className="date">DATE</th>
                                    <th className="name">CUSTOMER</th>
                                    <th className="amount">AMOUNT</th>
                                    <th className="status">STATUS</th>
                                    <th className="actions">ACTIONS</th>
                                </tr>
                            </thead>
                            {generateTable()}
                        </table>
                    </div>
                    <div className="buttons">
                        <div className="viewall">
                            <button className="defaultbtn">
                                <img src={Arrow} />
                                <p>View More</p>
                            </button>
                        </div>
                        <div className="addsale">
                            <button className="defaultbtn">
                                <img src={Plus} />
                                <p>Add Sale</p>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;