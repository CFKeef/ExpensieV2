import React, { useEffect, useState } from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const BarC = (props) => {

        const generateChart = () => {
            if(props.data !== null || props.data !== undefined) {
                return (
                    <ResponsiveContainer >
                        <BarChart width={500} height={500} data={props.data} >
                            <CartesianGrid strokeDasharray="3 3"/>
                            <XAxis dataKey="Date" />
                            <YAxis />
                            <Legend />
                            <Tooltip />
                        <Bar dataKey="Gross" fill="white" />
                        <Bar dataKey="Expenses" fill="white" />
                        <Bar dataKey="Profit" fill="white" />
                        </BarChart>
                    </ResponsiveContainer>
                )
            }
            else {
                return (
                    <div className="empty-chart">
                        <p>Sorry! Need more data, why not start adding some sales?</p>
                    </div>
                )
            }
        }

        return (
            <div className="chart">
                {generateChart()}
            </div>
        )
}

export default BarC;