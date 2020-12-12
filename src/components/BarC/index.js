import React, { useEffect, useState } from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const BarC = (props) => {
    const [barPeriod, setBarPeriod] = useState("Monthly");
    const [stats, setStats] = useState([]);
    const [orders, setOrders] = useState([]);
    const [expenses, setExpenses] = useState([]);
    const [currentDataSet, setCurrentDataSet] = useState([]);
    const [monthlyData, setMonthlyData] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [dailyData, setDailyData] = useState([]);

    // Handles the styling of the buttons that determine daily/monthy
    const handleSelectionStyling = (option) => {
        if(option === barPeriod) return "selected";
        return "";
    }
    const UpdateMonthly = () => {
        
    }
    // Generates the chart displaying user's sales history
    const generateChart = () => {
        // Will Change the current data set to the option selected
        const setData = (option) => {
            if("Monthly") {
                // Set it to monthly data
                return monthlyData;
            }
            else {
                // Set it to daily data
                return dailyData;
            }
        }
        const renderCustomLegend = (value, entry) => {
            const { color } = entry;
            
            return <span style={{ color, fontSize: 16, letterSpacing: 1, fontWeight: "bold"}}>{value}</span>;
        } 

        let testData = setData(barPeriod);
        
        if(testData.length > 0 && loaded) {
            if(barPeriod === "Monthly") {
                testData = monthlyData;
            }
            else {
                testData = dailyData;
            }

            return (
                <ResponsiveContainer    >
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
        setOrders(props.orders);
        setStats(props.stats);
        setExpenses(props.expenses);
        setLoaded(true);
        UpdateMonthly();
    }, [props.orders, props.stats, props.expenses])

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