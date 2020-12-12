import React, {useState, useEffect} from 'react';

import Dash from '../../assets/home.svg';
import Analytics from '../../assets/pie-chart.svg';
import Orders from '../../assets/history.svg';
import Expenses from '../../assets/expensive.svg';
import Import from '../../assets/import.svg';
import Export from '../../assets/export.svg';

const Sidebar = (props) => {
    const [selected, setSelected] = useState("");
    const [importVisible, setImportVisible] = useState(false);
    const [exportVisible, setExportVisible] = useState(true);

    const generateList = (list) => {
        return (
            <ul>
                {list.map( (element,index) => {
                   return (
                        <li key={"sideBar" + index} className={"entry " + handleSelected(element.name)}>
                            <button onClick={() => handleClick(element.key, element.name)}>
                                <img src={element.image} alt="element"/>
                                <h2>{element.name}</h2>
                            </button>
                        </li>
                   )})}
            </ul>
        )
    }

    const handleSelected = (page) => {
        if (selected === page) return "selected";
        else return "";
    }

    const handleClick = (key, view) => {
        props.changeView(view);
        setSelected(key);
    }

    const generalList = [
        {key: 0, image: Dash, name: "Dashboard"},
        {key: 1, image: Orders, name: "Sales"},
        {key: 2, image: Expenses, name: "Expenses"},
        {key: 3, image: Analytics, name: "Analytics"},
    ]

    const exportList = [
        {key: 4, image: Import, name: "Import"},
        {key: 6, image: Export, name: "Export"},
    ]

    useEffect(() => {
        setSelected(props.page)
        setImportVisible(props.importVisible)
        setExportVisible(props.exportVisible)
    }, [props])

    return (
        <div className="sidebar-container">
            <div className="nav-container">
                <div className="header">
                    <h4>General</h4>
                </div>
                {generateList(generalList)}
            </div>
            <div className="nav-container buttons">
                <button className="defaultbtn import" onClick={() => props.setImportVisible(!importVisible)}>
                    <img src={Import} />
                    <p>Import</p>
                </button>
                <button className="defaultbtn export" onClick={() => props.setExportVisible(!exportVisible)}>
                    <img src={Export} />
                    <p>Export</p>
                </button>
            </div>
        </div>
    )
}

export default Sidebar;