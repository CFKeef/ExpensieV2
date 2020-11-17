import React, { useState, useEffect } from 'react';
import BarC from '../BarC';

const Analytics = (props) => {

    const determineRowStyling = (index) => {
        if( (index + 1) % 2 == 0 ) return "even";
        else return "odd";
    }

    const generateStats = () => {
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