import React, { useState, useEffect } from 'react';

import Search from '../../assets/search.svg';
import Plus from '../../assets/plus.svg';
import ShowMore from '../../assets/options.svg';
import Logo from '../../assets/expensieLogo.png';

const Expenses = (props) => {
    const [selectedView, setSelectedView] = useState("All");
    const [expenses, setExpenses] = useState(props.expenses);
    const [selectedExpenses, setSelectedExpenses] = useState(expenses);
    const [filterFlag, setFilterFlag] = useState(false);
    const [actionsShowing, setActionsShowing] = useState(false);
    const [searchTarget, setSearchTarget] = useState(null);

    const handleAdd = () => {
        props.setVisible(!props.visible);
    }

    const handleSearchBar = (search) => {
        setFilterFlag(true);
        setSearchTarget(search);
        
        let results = expenses.filter((data) =>  
            JSON.stringify(data).toLowerCase().indexOf(search.toLowerCase()) !== -1);

        setSelectedExpenses(results);
    }

    // Generators
    const generateViewButtons = () => {
        const handleTabClick = (option) => {
            const getExpensesByCategory = (category, equal) => {
                if(equal) {
                    return expenses.filter(expense => expense.category === category);
                }
                return expenses.filter(expense => expense.category !== category);
            }
            const handleDataChange = (option) => {
                switch(option) {
                    case "General":
                        setFilterFlag(true);
                        setSelectedExpenses(getExpensesByCategory("Completed", true));
                        break;
                    case "Sale Related":
                        setFilterFlag(true);
                        setSelectedExpenses(getExpensesByCategory("Completed", false));
                        break;
                    default:
                        setFilterFlag(false);
                        setSelectedExpenses(props.expenses);
                        break;
                }
            }
            setSelectedView(option);
            handleDataChange(option);
        }

        const handleSelectionStyling = (option) => {
            if(option === selectedView) return "selected";
            return "";
        }
        
        let options = [
            "All"
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
                            <img src={button.image} alt="button"/>
                            <input placeholder="Search by any column" onChange={e => {handleSearchBar(e.target.value)}} type="text" search="Search"></input>
                        </div>
                    </li> 
                    )
                    return (
                        <li key={"menubutton" + index}>
                            <button className={"defaultbtn " + button.text} onClick={() => {handleAdd()}}>
                                <img src={button.image} alt="button" />
                                <p>{button.text}</p>
                            </button>
                        </li>
                    )
                })}
            </ul>
        )
    }

    const generateTable = () => {
        // Handles clicking the action button on an expense
        const handleActionsClick = (key) => {
            setActionsShowing(!actionsShowing);
            if(actionsShowing) {
                handleActionsShown(key);
            }
        }

        // Determines if the row is odd or even and applies the correct class for the row's color
        const determineRowStyling = (index) => {
            if( (index + 1) % 2 === 0 ) return "even";
            else return "odd";
        }

        // Handles interacting with the expense the user pressed on
        const handleActionsShown = (key) => {
            const expenseToEdit = expenses.find(expense => expense.id == key);

            if(actionsShowing) {
                return (
                    <div className="actioncontent">
                        <p>
                            console.log(expenseToEdit)
                        </p>
                    </div>  
                )
            }
        }

        let temp = expenses;
        if(filterFlag) temp = selectedExpenses;

        if(temp.length > 0) {
            return (
                <tbody>
                    {temp.map( (expense, index) => {
                        return(
                            <tr key={"expenses" + index} className={determineRowStyling(index)}>
                                <td className="id">
                                    <p>{index + 1}</p>
                                </td>
                                <td className="date">
                                    <p>{expense.date}</p>
                                </td>
                                <td className="name">
                                    <p>{expense.description}</p>
                                </td>
                                <td className="amount">
                                    <p>{expense.amount}</p>
                                </td>
                                <td className="status">
                                    <p>{expense.category}</p>
                                </td>
                                <td className="actions">
                                    <button onClick={() => handleActionsClick(expense.id)}>
                                        <img src={ShowMore} alt="button"/>
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
        setExpenses(props.expenses);
    }, [props])


    return (
        <div className="expenses-container">
            <div className="expenses">
                <div className="defaultHeader header">
                    <div className="pos">
                        <div className="tag">
                            <h1>Expenses</h1>
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
                                <th className="id" >
                                    <p>ID</p>
                                </th>
                                <th className="date">
                                    <p>DATE</p>
                                </th>
                                <th className="name">
                                    <p>DESCRIPTION</p>
                                </th>
                                <th className="amount">
                                    <p>AMOUNT</p>
                                </th>
                                <th className="status">
                                    <p>CATEGORY</p>
                                </th>
                                <th className="actions">
                                    <p>ACTIONS</p>
                                </th>
                            </tr>
                        </thead>
                        {generateTable()}
                    </table> 
                </div>  
            </div>
        </div>
    )
}

export default Expenses;