import React, { useState, useEffect } from 'react';

// Components
import Chart from '../Chart';

// Assets
import ShowMore from '../../assets/options.svg';
import Plus from '../../assets/plus.svg';
import Arrow from '../../assets/right-arrow.svg';
import DownChevron from '../../assets/down-chevron.svg';

const Dashboard = (props) => {
    const [dropDownSelection, setDropDownSelection] = useState("Lifetime");
    const [dropDownShowing, setDropDownShowing] = useState(false);
    const [actionsShowing, setActionsShowing] = useState(false);
    const [orders, setOrder] = useState([]);
    const [stats, setStats] = useState([]);
    const [data, setData] = useState([]);
    const [editOrder, setEditOrder] = useState([]);

    // Handles adding a sale to our orders
    const handleAdd = () => {
        props.setVisible(!props.visible);
    }

    // Determines if the row is odd or even and applies the correct class for the row's color
    const determineRowStyling = (index) => {
        if( (index + 1) % 2 === 0 ) return "even";
        else return "odd";
    }

    // Handles how the dropw down should render if theres no data
    const handleNoData = (orders) => {
        if(orders.length === 0) return "hide";
        return "";
    }

    // Will handle the actions of interacting with the drop down
    const handleDropDown = () => {
        const handleClick = (option) => {
            setDropDownSelection(option);
            setDropDownShowing(!dropDownShowing);
        }
        const setLast = (index) => {
            if( (index === options.length - 1 || index === 1) && dropDownSelection === "Past Year") return "last";
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
                            if(option !== dropDownSelection) {
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

    // Sets the last option in the select with a specific styling to make it prettier
    const handleDropDownRestyling = () => {
        if(dropDownShowing) {
            return "showing";
        }
        else return "";
    }

    // Handles clicking the action button on an order
    const handleActionsClick = (key) => {
        setEditOrder(key);
        setActionsShowing(!actionsShowing);
    }

    // Handles interacting with the order the user pressed on
    const handleActionsShown = (key) => {
        const orderToEdit = orders.find(order => order.id == key);

        if(actionsShowing) {
            return (
                <div className="actioncontent">
                    <p>
                        test
                    </p>
                </div>  
            )
        }
    }

    // Generates the orders table
    const generateTable = () => {
        if(orders.length > 0) {
            return (
                <tbody>
                    {orders.map( (order, index) => {
                        return(
                            <tr key={"orders" + index} className={determineRowStyling(index)}>
                                <td className="id">
                                    <p>{index + 1}</p>
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
                                    <button onClick={() => handleActionsClick(order.id)}>
                                        <img src={ShowMore} />
                                    </button>
                                    {handleActionsShown()}
                                </td>
                            </tr>
                    )})}
                </tbody>
            )
        }
        else return (
            <tbody>
                <tr>
                    <td className="empty-table">
                        <h4>Add a sale to get started!</h4>
                    </td>
                </tr>
            </tbody>
        )
    }

    // Generates the stats table
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
                        <h4>Sorry! Need more data</h4>
                    </td>
                </tr>
            </tbody>
        )
    }

    useEffect(() => {
        setOrder(props.orders);
        setStats(props.stats);
        setData(props.data);
    }, [props.orders, props.stats, props.data])


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
                                        <th>GROSS</th>
                                        <th>EXPENSES</th>
                                        <th>PROFIT</th>
                                        <th>SALES COUNT</th>
                                    </tr>
                                </thead>
                                {generateStats()}
                            </table>
                            <div className="button">
                                <button className="defaultbtn" onClick={() => {props.setPage("Analytics")}} >
                                    <img src={Arrow} />
                                    <p>View More</p>
                                </button>
                            </div>
                        </div>
                        <div className="right">
                            <Chart 
                                salesSummary={data}
                            />
                            <div className={"button " + handleNoData(orders)}>
                                <button onClick={() => {setDropDownShowing(!dropDownShowing)}} className={" defaultDropdown " + handleDropDownRestyling()}>
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
                                    <th className="id">ID</th>
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
                            <button className="defaultbtn" onClick={() => {props.setPage("Sales")}}>
                                <img src={Arrow} />
                                <p>View More</p>
                            </button>
                        </div>
                        <div className="addsale">
                            <button className="defaultbtn" onClick={() => {handleAdd()}} >
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