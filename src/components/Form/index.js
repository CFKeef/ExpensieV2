import React, { useState, useEffect } from 'react';

import logo from '../../assets/expensieLogo.png';
import DownChevron from '../../assets/down-chevron.svg';
import close from '../../assets/close.svg';

const Form = (props) => {
    const [visible, setVisible] = useState(false);
	const [sale,setSale] = useState(true);
	const [saleSelection, setSaleSelection] = useState("Not Shipped");
	const [expSelection, setExpSelection] = useState("Other");
	const [dropDownShown, setDropDownShown] = useState(false);

	const saleStatus = [ "Completed", "Shipped", "Not Shipped"]
	const expenseCategory = [
		"Vehicle Expense",
		"Commissions/Fees",
		"Labor", 
		"Services",
		"Office Expense",
		"Rent/Lease",
		"Taxes/Licenses",
		"Other"
	]

	// Sets the last option in the select with a specific styling to make it prettier
    const handleDropDownRestyling = () => {
		if(dropDownShown) {
            return "showing";
        }
        else return "";
	}
	
	// Will handle the actions of interacting with the drop down
	const handleDropDown = () => {
		const handleClick = (option) => {
			if(sale) setSaleSelection(option);
			else setExpSelection(option);
			setDropDownShown(!dropDownShown);
		}
		const setLast = (index) => {
			if(sale) {
				if(saleSelection === "Not Shipped" && saleStatus[index] === "Shipped") return "last";
				else if(index === saleStatus.length - 1) return "last";
			}
			else if(!sale) {
				if(expSelection === "Other" && expenseCategory[index] === "Taxes/Licenses") return "last";
				else if(index === expenseCategory.length - 1) return "last";
			}
			else return "";
		}

		if(dropDownShown) {
			if(sale) {
				return (
					<div className="ddcontent">
						<ul>
							{saleStatus.map( (option, index) => {
								if(option != saleSelection) {
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
			else {
				return (
					<div className="ddcontent ddexpense">
						<ul>
							{expenseCategory.map( (option, index) => {
								if(option != expSelection) {
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
	}

	// Generates the form in the pop up for adding expenses or sales
    const generateForm = () => {
		// ID DATE NAME AMT STATUS
		let dataArr = [new Date().getTime(), "", "", ""];

        if(sale) {
            return (
				<div className="form">
					<div className="userinput">
						<label htmlFor="date">Date of Sale</label>
						<input id="date" placeholder="MM/DD/YYYY" onChange={e => {dataArr[1] = e.target.value}} type="text"/>
					</div>
					<div className="userinput">
						<label htmlFor="name">Customer Name</label>
						<input id="name" placeholder="Customer Name" onChange={e => {dataArr[2] = e.target.value}} type="text"/>
					</div>
					<div className="userinput">
						<label htmlFor="amount">Sale Amount</label>
						<input id="amount" placeholder="Sale Amount" onChange={e => {dataArr[3] = e.target.value}} type="text"/>
					</div>	
					<div className="dropdown">
						<label htmlFor="status">Order Status</label>
						<button id="status" onClick={() => {setDropDownShown(!dropDownShown)}} className={" defaultDropdown " + handleDropDownRestyling()}>
							<img src={DownChevron} />
							<p>{saleSelection}</p>
						</button>
						{handleDropDown()}
					</div>				
                </div>
            )
        }
        else {
            return (
                <div className="form">
					<div className="form">
						<div className="userinput">
							<label htmlFor="date">Date of Expenditure</label>
							<input id="date" placeholder="MM/DD/YYYY" onChange={e => {dataArr[1] = e.target.value}} type="text"/>
						</div>
						<div className="userinput">
							<label htmlFor="name">Description</label>
							<input id="name" placeholder="Description" onChange={e => {dataArr[2] = e.target.value}} type="text"/>
						</div>
						<div className="userinput">
							<label htmlFor="amount">Expensed Amount</label>
							<input id="amount" placeholder="Expensed Amount" onChange={e => {dataArr[3] = e.target.value}} type="text"/>
						</div>	
						<div className="dropdown">
							<label htmlFor="status">Category</label>
							<button id="status" onClick={() => {setDropDownShown(!dropDownShown)}} className={" defaultDropdown " + handleDropDownRestyling()}>
								<img src={DownChevron} />
								<p>{expSelection}</p>
							</button>
							{handleDropDown()}
						</div>				
					</div>
                </div>
            )
        }
	}
	
	// Generates the menubar for the pop up window
    const generateMenuBar = () => {
        return (
            <div className="menubar-container">
                <div className="logo">
                	<img src={logo} />
                	<h1>Create an Entry</h1>
           	 	</div>
            	<div className="controls">
                	<div>
                    	<button className="close" onClick={() => {setVisible(false)}}>
                        	<img src={close} />
                    	</button>
                	</div>
                </div>
            </div>
        )

	}
	
	// Generates the options for the user to create new entries for sales or expenses
	const generateOptions = () => {
		const handleStyling = (option) => {
			if(option === "Sale" && sale) {
				return "selected";
			}
			else if(option === "Expense" && !sale) return "selected";
			else return "";
		}

		const handleClick = (option) => {
			if(option === "Sale")  {
				setSale(true);
				setDropDownShown(false);
			}
			else {
				setSale(false);
				setDropDownShown(false);
			}
		}

		let buttons = ["Sale", "Expense"]
		return (
			<div className="buttons">
					{buttons.map((element, index) => {
						return (
							<div  key={"button" + index}>
								<button onClick={() => {handleClick(element)}} className={element === "Sale" ? handleStyling("Sale") : handleStyling("Expense")}>
									<p>{element}</p>
								</button>
							</div>
						)
					})}
			</div>
		)
	}


	useEffect(() => {
		setVisible(props.visible);
	}, [props.visible])


    return (
		<div className={visible ? "popupform-container" : "hidden"}>
			<div className="content-container">
				{generateMenuBar()}
				<div className="defaultHeader">
					<div className="pos">
						<div className="tag">
							<h1>Add Entry</h1>
						</div>
					</div>	
				</div>
				<div className="selection">
					<h6>Select what type of entry</h6>
					{generateOptions()}
				</div>
				{generateForm()}
				<div className="submit">
					<button className="defaultbtn">
						<p>Submit</p>
					</button>
				</div>
			</div>
		</div>
    )
}

export default Form;