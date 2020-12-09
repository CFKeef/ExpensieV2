import React, { useState, useEffect } from 'react';

import Search from '../../assets/search.svg';
import Plus from '../../assets/plus.svg';
import ShowMore from '../../assets/options.svg';
import Logo from '../../assets/expensieLogo.png';

const Orders = (props) => {
    const [selectedView, setSelectedView] = useState("All");
    const [orders, setOrder] = useState(props.orders);
    const [selectedOrders, setSelectedOrders] = useState(orders);
    const [filterFlag, setFilterFlag] = useState(false);
    const [actionsShowing, setActionsShowing] = useState(false);
    const [searchTarget, setSearchTarget] = useState(null);

    // Handles adding a sale to our orders
    const handleAdd = () => {
        props.setVisible(!props.visible);
    }

    const handleSearchBar = (search) => {
        setFilterFlag(true);
        setSearchTarget(search);

        let results = orders.filter((data) =>  
            JSON.stringify(data).toLowerCase().indexOf(search.toLowerCase()) !== -1);

        setSelectedOrders(results);
    }

    // Generators
    const generateViewButtons = () => {
        const handleTabClick = (option) => {
            const getOrdersByStatus = (status, equal) => {
                if(equal) {
                    return orders.filter(order => order.status === status);
                }
                return orders.filter(order => order.status != status);
            }
            const handleDataChange = (option) => {
                switch(option) {
                    case "Completed":
                        setFilterFlag(true);
                        setSelectedOrders(getOrdersByStatus("Completed", true));
                        break;
                    case "Open":
                        setFilterFlag(true);
                        setSelectedOrders(getOrdersByStatus("Completed", false));
                        break;
                    default:
                        setFilterFlag(false);
                        setSelectedOrders(props.orders);
                        break;
                }
            }
            setSelectedView(option);
            handleDataChange(option);
        }

        const handleSelectionStyling = (option) => {
            if(option == selectedView) return "selected";
            return "";
        }
        
        let options = [
            "All", "Open", "Completed"
        ]

        return (
            <ul className="left">
                {options.map( (option,index) => {
                    return (
                        <li key={"option" + index} >
                            <button onClick={() => {handleTabClick(option)}} className={handleSelectionStyling(option)}>
                                <p>{option}</p>
                            </button>
                        </li>
                    )
                })}
            </ul>
        )
    }

    const generateTableButtons = () => {

        let buttons = [
            {text: "Search", image: Search},
            {text: "Add", image: Plus}
        ]

        return (
            <ul className="right">
                {buttons.map((button,index) => {
                    if(button.text === "Search") return (
                        <li key={"menubutton" + index}>
                        <div className={"searchbar " + button.text}>
                            <img src={button.image} />
                            <input placeholder="Search by any column" onChange={e => {handleSearchBar(e.target.value)}} type="text" search="Search"></input>
                        </div>
                    </li> 
                    )
                    return (
                        <li key={"menubutton" + index}>
                            <button className={"defaultbtn " + button.text} onClick={() => {handleAdd()}}>
                                <img src={Plus} />
                                <p>Add</p>
                            </button>
                        </li>
                    )
                })}
            </ul>
        )
    }

    const generateTable = () => {
        // Handles clicking the action button on an order
        const handleActionsClick = (key) => {
            setActionsShowing(!actionsShowing);
            if(actionsShowing) {
                handleActionsShown(key);
            }
        }

        // Determines if the row is odd or even and applies the correct class for the row's color
        const determineRowStyling = (index) => {
            if( (index + 1) % 2 == 0 ) return "even";
            else return "odd";
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

        let temp = orders;
        if(filterFlag) temp = selectedOrders;

        if(temp.length > 0) {
            return (
                <tbody>
                    {temp.map( (order, index) => {
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

    useEffect(() => {
        setOrder(props.orders);
    }, [props.orders])


    return (
        <div className="orders-container">
            <div className="orders">
                <div className="defaultHeader header">
                    <div className="pos">
                        <div className="tag">
                            <h1>Sales</h1>
                        </div>
                    </div>
                </div>
                <div className="top">
                    <div className="menu">
                        {generateViewButtons()}
                        {generateTableButtons()}
                    </div>
                </div>
                <div className="bot">
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
            </div>
        </div>
    )
}

export default Orders;