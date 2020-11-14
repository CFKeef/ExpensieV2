import React from 'react';

import ShowMore from '../../assets/options.svg';
import Logo from '../../assets/expensieLogo.png';

const Dashboard = () => {

    const generateCards = () => {
        let cards = [
            {title: "Not Sold", value: 55},
            {title: "Active", value: 32},
            {title: "Shipped", value: 16},
            {title: "Completed", value: 16},
        ]

        return (
            <ul>
                {cards.map( (card,index) => {
                    return (
                        <li key={"card" + index}>
                            <div className={"card card" + index}>
                                <div className="card-top">
                                    <p>{card.title}</p>
                                </div>
                                <div className="card-bot">
                                    <p>{card.value}</p>
                                </div>
                            </div>
                        </li>
                    )
                })}
            </ul>
        )
    }

    const handleShowMoreInfo = (order) => {
        console.log(order);
    }

    const generateTable = () => {
        let orders = [
            {date: "08/01/20", name: "Patryck Golebiewski", amount: "$150", status: "Shipped"},
            {date: "08/01/20", name: "Patryck Golebiewski", amount: "$150", status: "Shipped"},
            {date: "08/01/20", name: "Patryck Golebiewski", amount: "$150", status: "Shipped"},
            {date: "08/01/20", name: "Patryck Golebiewski", amount: "$150", status: "Shipped"},
            {date: "08/01/20", name: "Patryck Golebiewski", amount: "$150", status: "Shipped"},
            {date: "08/01/20", name: "Patryck Golebiewski", amount: "$150", status: "Shipped"},
            {date: "08/01/20", name: "Patryck Golebiewski", amount: "$150", status: "Shipped"},
            {date: "08/01/20", name: "Patryck Golebiewski", amount: "$150", status: "Shipped"},
            {date: "08/01/20", name: "Patryck Golebiewski", amount: "$150", status: "Shipped"},
            {date: "08/01/20", name: "Patryck Golebiewski", amount: "$150", status: "Shipped"},
            {date: "08/01/20", name: "Patryck Golebiewski", amount: "$150", status: "Shipped"},
            {date: "08/01/20", name: "Patryck Golebiewski", amount: "$150", status: "Shipped"},
            {date: "08/01/20", name: "Patryck Golebiewski", amount: "$150", status: "Shipped"},
            {date: "08/01/20", name: "Patryck Golebiewski", amount: "$150", status: "Shipped"},

        ]


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
                                    <button onClick={order => {handleShowMoreInfo(order)}}>
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
                                    <th>NAME</th>
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