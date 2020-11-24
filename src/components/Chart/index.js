import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const Chart = (props) => {

    const colors= ['#21BF73','#FD5E53'];

    const generateChart = () => {
        if(props.salesSummary.length != 0) {
            return (
                <ResponsiveContainer >
                    <PieChart width={500} height={500} >
                        <Pie
                            data={props.salesSummary.filter(summary => summary.name !== "Total")} 
                            nameKey="name"
                            dataKey="value"
                            innerRadius={60}
                            outerRadius={80} 
                            fill="#8884d8"
                            paddingAngle={5}
                            isAnimationActive={false}
                            label={entry => entry.name}
                        >
                            {props.salesSummary.map((entry, index) => <Cell key={"cell" + index} stroke="none" fill={colors[index % colors.length]} />)}
                        </Pie>
                        <Tooltip />
                    </PieChart>
                </ResponsiveContainer>
            )
        }
        else return (
            <div className="empty-chart">
                <p>Sorry! Need more data</p>
            </div>
        )
    }

    return (
        <div className="chart-container">
            {generateChart()}
        </div>
    )
}

export default Chart;