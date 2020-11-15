import React from 'react';

import Chart from '../Chart';

import ShowMore from '../../assets/options.svg';
import Logo from '../../assets/expensieLogo.png';

const Dashboard = () => {

    const orders = [
        {id: 1, date: "08/01/20", name: "Patryck Golebiewski", amount: "$150", status: "Shipped"},
        {id: 2, date: "08/01/20", name: "Patryck Golebiewski", amount: "$150", status: "Shipped"},
        {id: 3, date: "08/01/20", name: "Patryck Golebiewski", amount: "$150", status: "Shipped"},
        {id: 4, date: "08/01/20", name: "Patryck Golebiewski", amount: "$150", status: "Shipped"},
        {id: 5, date: "08/01/20", name: "Patryck Golebiewski", amount: "$150", status: "Shipped"},
        {id: 6, date: "08/01/20", name: "Patryck Golebiewski", amount: "$150", status: "Shipped"},
        {id: 7, date: "08/01/20", name: "Patryck Golebiewski", amount: "$150", status: "Shipped"},
        {id: 8, date: "08/01/20", name: "Patryck Golebiewski", amount: "$150", status: "Shipped"},
        {id: 9, date: "08/01/20", name: "Patryck Golebiewski", amount: "$150", status: "Shipped"},
        {id: 10, date: "08/01/20", name: "Patryck Golebiewski", amount: "$150", status: "Shipped"},
    ]

    const salesSummary = [
        {name: "Total", value: 55625},
        {name: "Expenses", value: 12000},
        {name: "Profit", value: 13000}
    ]

    const handleShowMoreInfo = (order) => {
        console.log(order);
    }

    const generateTable = () => {
        // Determines if the row is odd or even and applies the correct class for the row's color
        function determineRowStyling(index) {
            if( (index + 1) % 2 == 0 ) return "even";
            else return "odd";
        }

        if(orders.length > 0) {
            return (
                <tbody>
                    {orders.map( (order, index) => {
                        return(
                            <tr key={"orders" + index} className={determineRowStyling(index)}>
                                <td>
                                    <p>{order.date}</p>
                                </td>
                                <td>
                                    <p>{order.name}</p>
                                </td>
                                <td>
                                    <p>{order.amount}</p>
                                </td>
                                <td>
                                    <p>{order.status}</p>
                                </td>
                                <td>
                                    <button onClick={() => handleShowMoreInfo(order.id)}>
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
                            <p>tbd</p>
                        </div>
                        <div className="right">
                            <Chart 
                                salesSummary={salesSummary}
                            />
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
                                    <th>DATE</th>
                                    <th>CUSTOMER</th>
                                    <th>AMOUNT</th>
                                    <th>STATUS</th>
                                    <th>ACTIONS</th>
                                </tr>
                            </thead>
                            {generateTable()}
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;