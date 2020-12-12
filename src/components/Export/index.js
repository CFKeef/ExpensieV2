import React, {useState, useEffect} from 'react';
import logo from '../../assets/expensieLogo.png';
import close from '../../assets/close.svg';
import ExportImg from '../../assets/export.svg';

const Export = (props) => {
    const [visible, setVisible] = useState(false);

    const handleExport = () => {
        props.handleExport();
        props.setVisible(false);
    }

    // Generates the menubar for the import window
    const generateMenuBar = () => {
        return (
            <div className="menubar-container">
                <div className="logo">
                	<img src={logo} />
                	<h1>Export Dialog</h1>
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
        <div className={visible ? "export-container" : "hidden"}>
            <div className="content-container">
                {generateMenuBar()}
                <div className="defaultHeader">
                    <div className="pos">
                        <div className="tag">
                            <h1>Export</h1>
                        </div>
                    </div>	
                </div>
                <div className="btn-container">
                    <button onClick={() => handleExport()}>
                        <img src={ExportImg} />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Export;