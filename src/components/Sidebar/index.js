import React, {useState} from 'react';

import Dash from '../../assets/home.svg';
import Analytics from '../../assets/pie-chart.svg';
import Orders from '../../assets/history.svg';
import Export from '../../assets/export.svg';
import Settings from '../../assets/settings.svg';

const Sidebar = (props) => {
    const [selected, setSelected] = useState(0);

    const generateProfileTab = () => {
        return (
            <div className="profile-container">
                <h1 className="greeting">Hi CS Discord</h1>
            </div>
        )
    }

    const generateList = (list) => {
        return (
            <ul>
                {list.map( (element,index) => {
                   return (
                        <li key={"sideBar" + index} className={"entry " + handleSelected(element.key)}>
                            <button onClick={() => handleClick(element.key, element.name)}>
                                <img src={element.image} />
                                <h2>{element.name}</h2>
                            </button>
                        </li>
                   )})}
            </ul>
        )
    }

    const handleSelected = (key) => {
        if (key == selected) return "selected";
        else return "";
    }

    const handleClick = (key, view) => {
        props.changeView(view);
        setSelected(key);
    }

    const generalList = [
        {key: 0, image: Dash, name: "Dashboard"},
        {key: 1, image: Orders, name: "Orders"},
        {key: 2, image: Analytics, name: "Analytics"},
    ]

    const exportList = [
        {key: 3, image: Export, name: "Export"},
        {key: 4, image: Settings, name: "Settings"}
    ]

    return (
        <div className="sidebar-container">
            {generateProfileTab()}
            <div className="nav-container">
                <div className="header">
                    <h4>General</h4>
                </div>
                {generateList(generalList)}
            </div>
            <div className="nav-container">
                <div className="header">
                    <h4>Tools</h4>
                </div>
                {generateList(exportList)}
            </div>
        </div>
    )
}

export default Sidebar;