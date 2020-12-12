import React, { useState, useEffect } from 'react';
import BarC from '../BarC';

const Analytics = (props) => {
    const [stats, setStats] = useState([]);
    const [orders, setOrders] = useState([]);
    const [expenses, setExpenses] = useState([]);

    const determineRowStyling = (index) => {
        if( (index + 1) % 2 === 0 ) return "even";
        else return "odd";
    }

    const generateStats = () => {
        if(stats.length > 0) {
            return (
                <tbody>
                    <tr className={determineRowStyling(0)}>
                        <td>
                            <p className="title">{stats[0].period}</p>
                        </td>
                        <td>
                            <p className="value">{stats[0].gross}</p>
                        </td>
                        <td>
                            <p className="value">{stats[0].expenses}</p>
                        </td>
                        <td>
                            <p className="value">{stats[0].profit}</p>
                        </td>
                        <td>
                            <p className="value">{stats[0].sales}</p>
                        </td>
                    </tr>
                    <tr className={determineRowStyling(1)}>
                        <td>
                            <p className="title">{stats[1].period}</p>
                        </td>
                        <td>
                            <p className="value">{stats[1].gross}</p>
                        </td>
                        <td>
                            <p className="value">{stats[1].expenses}</p>
                        </td>
                        <td>
                            <p className="value">{stats[1].profit}</p>
                        </td>
                        <td>
                            <p className="value">{stats[1].sales}</p>
                        </td>
                    </tr>
                        <tr className={determineRowStyling(2)}>
                        <td>
                            <p className="title">{stats[2].period}</p>
                        </td>
                        <td>
                            <p className="value">{stats[2].gross}</p>
                        </td>
                        <td>
                            <p className="value">{stats[2].expenses}</p>
                        </td>
                        <td>
                            <p className="value">{stats[2].profit}</p>
                        </td>
                        <td>
                            <p className="value">{stats[2].sales}</p>
                        </td>
                    </tr>
                </tbody>
            )
        }
        return (
            <tbody>
                <tr>
                    <td className="empty-table">
                        <h4>Add a sale to get started!</h4>
                    </td>
                </tr>
            </tbody>
        )

    }

    useEffect(() => {
        setOrders(props.orders);
        setStats(props.stats);
        setExpenses(props.expenses);
    }, [props.orders, props.stats, props.expenses])


    return (
        <div className="analytics-container">
            <div className="analytics">
                <div className="defaultHeader header">
                    <div className="pos">
                        <div className="tag">
                            <h1>Analytics</h1>
                        </div>
                    </div>
                </div>
                <BarC 
                    data={props.data}
                    orders={orders}
                    expenses={expenses}
                    stats={stats}
                    monthlyData={props.monthlyData}
                    thirtyDayData={props.thirtyDayData}
                />
                <div className="bot">
                <table>
                    <thead>
                        <tr>
                            <th>PERIOD</th>
                            <th>GROSS</th>
                            <th>EXPENSES</th>
                            <th>PROFIT</th>
                            <th>SALES COUNT</th>
                        </tr>
                    </thead>
                    {generateStats()}
                </table>
                </div>
            </div>
        </div>
    )
}

export default Analytics;