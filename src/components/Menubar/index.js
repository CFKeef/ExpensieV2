import React from 'react';

import logo from '../../assets/expensieLogo.png';
import close from '../../assets/close.svg';
import minimize from '../../assets/minimize.svg';

const Menubar = () => {
    return (
        <div className="menubar-container">
            <div className="logo">
                <img src={logo} />
                <h1>Expensie</h1>
            </div>
            <div className="controls">
                <div>
                    <button className="minimize">
                        <img src={minimize} />
                    </button>
                    <button className="close">
                        <img src={close} />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Menubar;