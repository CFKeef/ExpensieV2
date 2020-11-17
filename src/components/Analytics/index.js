import React, { useState, useEffect } from 'react';
import BarC from '../BarC';

const Analytics = (props) => {

    return (
        <div className="analytics-container">
            <div className="analytics">
                <div className="defaultHeader header">
                    <div className="pos">
                        <div className="tag">
                            <h1>Analytics</h1>
                        </div>
                    </div>
                </div>
                <div className="top">
                    <BarC 
                        data={props.data}
                    />
                    <div className="buttons">

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Analytics;