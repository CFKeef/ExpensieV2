import React, { useState, useEffect } from 'react';

import logo from '../../assets/expensieLogo.png';
import close from '../../assets/close.svg';

const Form = (props) => {
    const [visible, setVisible] = useState(false);
    const [sale,setSale] = useState(true);

    const generateForm = () => {
        if(sale) {
            return (
                <div className="sale-form">
                    SALE
                </div>
            )
        }
        else {
            return (
                <div className="expense-form">
                    EXPENSE
                </div>
            )
        }
    }
    
    const generateMenuBar = () => {
        return (
            <div className="menu">
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

    const generateContent = () => {
        const handleSelectionStyling = (option) => {
            if(sale && option === "sale") return "selected";
            else if(!sale && option === "expense") return "select";
        }


		return (
			<React.Fragment>
				{generateMenuBar()}
				<div className="pos">
					<div className="tag">
						<h1>Add Entry</h1>
					</div>
				</div>
				<div>
					<p>Select what type of entry</p>
					<div className="buttons">
						<div>
							<button onClick={() => {setSale(true)}} className={handleSelectionStyling("sale")}>
								<p>Sale</p>
							</button>
						</div>
						<div>
							<button onClick={() => {setSale(false)}} className={handleSelectionStyling("expense")}>
								<p>Expense</p>
							</button>
						</div>
					</div>
				</div>
				{generateForm()}
				<div>
					<button>
						<p>Submit</p>
					</button>
				</div>
			</React.Fragment>
		)
    }

	useEffect(() => {
		setVisible(props.visible)
	}, [props.visible])
    return (
        <div className="popupform-container">
            {visible ? generateContent() : null}
        </div>
    )
}

export default Form;