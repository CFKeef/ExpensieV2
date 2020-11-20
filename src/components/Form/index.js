import React, { useState, useEffect } from 'react';

import logo from '../../assets/expensieLogo.png';
import DownChevron from '../../assets/down-chevron.svg';
import close from '../../assets/close.svg';

const Form = (props) => {
    const [visible, setVisible] = useState(false);
	const [sale,setSale] = useState(true);
	const [catStat, setCatStat] = useState(0);
	const [dropDownShown, setDropDownShown] = useState(false);

	// Sets the last option in the select with a specific styling to make it prettier
    const handleDropDownRestyling = () => {
        if(dropDownShown) {
            return "showing";
        }
        else return "";
    }

    const generateForm = () => {
		let data = {
			id: "",
			date: "",
			name: "",
			amount: "",
			status: ""
		}

        if(sale) {
            return (
				<div className="form">
					<div className="userinput">
						<label for="date">Date of Sale</label>
						<input id="date" placeholder="MM/DD/YYYY" onChange={e => {data["date"] = e.target.value}} type="text"/>
					</div>
					<div className="userinput">
						<label for="name">Customer Name</label>
						<input id="name" placeholder="Customer Name" onChange={e => {data["name"] = e.target.value}} type="text"/>
					</div>
					<div className="userinput">
						<label for="amount">Sale Amount</label>
						<input id="amount" placeholder="Sale Amount" onChange={e => {data["sale"] = e.target.value}} type="text"/>
					</div>	
					<div className="dropdown">
						<label for="status">Order Status</label>
						<button id="status" onClick={() => {setDropDownShown(!dropDownShown)}} className={" defaultDropdown " + handleDropDownRestyling()}>
							<img src={DownChevron} />
							<p>drop</p>
						</button>
					</div>				
                </div>
            )
        }
        else {
            return (
                <div className="form">
					<div className="form">
						<div className="userinput">
							<label for="date">Date of Expenditure</label>
							<input id="date" placeholder="MM/DD/YYYY" onChange={e => {data["date"] = e.target.value}} type="text"/>
						</div>
						<div className="userinput">
							<label for="name">Description</label>
							<input id="name" placeholder="Description" onChange={e => {data["name"] = e.target.value}} type="text"/>
						</div>
						<div className="userinput">
							<label for="amount">Expensed Amount</label>
							<input id="amount" placeholder="Expensed Amount" onChange={e => {data["sale"] = e.target.value}} type="text"/>
						</div>	
						<div className="dropdown">
							<label for="status">Category</label>
							<button id="status" onClick={() => {setDropDownShown(!dropDownShown)}} className={" defaultDropdown " + handleDropDownRestyling()}>
								<img src={DownChevron} />
								<p>drop</p>
							</button>
						</div>				
					</div>
                </div>
            )
        }
    }
    
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
	
	const generateOptions = () => {
		const handleStyling = (option) => {
			if(option === "Sale" && sale) {
				return "selected";
			}
			else if(option === "Expense" && !sale) return "selected";
			else return "";
		}

		const handleClick = (option) => {
			if(option === "Sale") setSale(true);
			else setSale(false);
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