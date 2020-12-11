import React, { useEffect, useState } from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const BarC = (props) => {
    const [barPeriod, setBarPeriod] = useState("Monthly");
    const [data, setData] = useState([]);

    const handleSelectionStyling = (option) => {
        if(option == barPeriod) return "selected";
        return "";
    }

    const generateChart = () => {
        const getGross = (time) => {

        }
        const getExpenses = (time) => {

        }
        const getProfit = (time) => {
            
        }
        const setData = (option) => {
            if("Monthly") {
                // Set it to monthly data
                return [];
            }
            else {
                // Set it to daily data
                return [];
            }
        }
        const renderCustomLegend = (value, entry) => {
            const { color } = entry;
            
            return <span style={{ color, fontSize: 16, letterSpacing: 1, fontWeight: "bold"}}>{value}</span>;
        } 

        let dailyData = [
            {date: "Aug. 1", Gross: 54000, Expenses: 12000, Profit: 42000},
            {date: "Aug. 2", Gross: 54000, Expenses: 12000, Profit: 42000},
            {date: "Aug. 3", Gross: 54000, Expenses: 12000, Profit: 42000},
            {date: "Aug. 4", Gross: 54000, Expenses: 12000, Profit: 42000},
            {date: "Aug. 5", Gross: 54000, Expenses: 12000, Profit: 42000},
            {date: "Aug. 6", Gross: 54000, Expenses: 12000, Profit: 42000},
            {date: "Aug. 7", Gross: 54000, Expenses: 12000, Profit: 42000},
            {date: "Aug. 8", Gross: 54000, Expenses: 12000, Profit: 42000},
            {date: "Aug. 9", Gross: 54000, Expenses: 12000, Profit: 42000},
            {date: "Aug. 10", Gross: 54000, Expenses: 12000, Profit: 42000},
            {date: "Aug. 11", Gross: 54000, Expenses: 12000, Profit: 42000},
        ]

        let monthlyData = [
            {date: "Jan", Gross: 54000, Expenses: 12000, Profit: 42000},
            {date: "Febr", Gross: 54000, Expenses: 12000, Profit: 42000},
            {date: "April", Gross: 54000, Expenses: 12000, Profit: 42000},
            {date: "Mar", Gross: 54000, Expenses: 12000, Profit: 42000},
            {date: "May", Gross: 54000, Expenses: 12000, Profit: 42000},
            {date: "June", Gross: 54000, Expenses: 12000, Profit: 42000},
            {date: "July", Gross: 54000, Expenses: 12000, Profit: 42000},
            {date: "Aug", Gross: 54000, Expenses: 12000, Profit: 42000},
            {date: "Sept", Gross: 54000, Expenses: 12000, Profit: 42000},
            {date: "Oct", Gross: 54000, Expenses: 12000, Profit: 42000},
            {date: "Nov", Gross: 54000, Expenses: 12000, Profit: 42000},
            {date: "Dec", Gross: 54000, Expenses: 12000, Profit: 42000},
        ]
        let testData = setData(barPeriod);
        
        if(testData.length > 0) {
            if(barPeriod === "Monthly") testData = monthlyData;
            else testData = dailyData;

            return (
                <ResponsiveContainer >
                    <BarChart data={testData} >
                        <CartesianGrid strokeDasharray="6 6"/>
                        <XAxis dataKey="date" stroke="#4e4f6f"  style={{
                            fontSize: 14,
                            letterSpacing: .56,
                            color: "#9797AF",
                            fontWeight: "bold",
                            textAlign: "center",
                        }} />
                        <YAxis stroke="#4e4f6f"  style={{
                            fontSize: 14,
                            letterSpacing: .56,
                            color: "#9797AF",
                            fontWeight: "bold",
                            textAlign: "center",
                        }} />
                        <Legend align="right" layout="horizontal" formatter={renderCustomLegend} iconType="circle" />
                        <Tooltip />
                    <Bar dataKey="Gross" fill="#6775F0" />
                    <Bar dataKey="Expenses" fill="#FD5E53" />
                    <Bar dataKey="Profit" fill="#21BF73" />
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
    useEffect(() => {
        setData(props.data);
    }, [props.data])

    return (
        <div className="top">
            <div className="chart"> 
                <div className="pos">
                    {generateChart()}
                </div>
            </div>
            <div className="buttons">
                <div>
                    <button onClick={() => {setBarPeriod("Monthly")}} className={handleSelectionStyling("Monthly")}>
                        <p>Monthly</p>
                    </button>
                </div>
                <div>
                    <button onClick={() => {setBarPeriod("Daily")}} className={handleSelectionStyling("Daily")}>
                        <p>Daily</p>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default BarC;