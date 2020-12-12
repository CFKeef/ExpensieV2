import React, {useState, useEffect} from 'react';
import logo from '../../assets/expensieLogo.png';
import close from '../../assets/close.svg';
import ImportImg from '../../assets/import.svg';

const Import = (props) => {
    const [visible, setVisible] = useState(false);

    const handleImport = () => {
        props.handleImport();
        props.setVisible(false);
    }

    // Generates the menubar for the import window
    const generateMenuBar = () => {
        return (
            <div className="menubar-container">
                <div className="logo">
                	<img src={logo} />
                	<h1>Import Dialog</h1>
           	 	</div>
            	<div className="controls">
                	<div>
                    	<button className="close" onClick={() => {props.setVisible(false)}}>
                        	<img src={close} />
                    	</button>
                	</div>
                </div>
            </div>
        )

	}
    
    useEffect(() => {
		setVisible(props.visible);
    }, [props.visible])
    
    return (
        <div className={visible ? "import-container" : "hidden"}>
			<div className="content-container">
				{generateMenuBar()}
				<div className="defaultHeader">
					<div className="pos">
						<div className="tag">
							<h1>Import</h1>
						</div>
					</div>	
                </div>
                <div className="btn-container">
                    <button onClick={() => {handleImport()}}>
                        <img src={ImportImg} />
                    </button>
                </div>
			</div>
		</div>
    )
}

export default Import;