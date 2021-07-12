import React, {useState} from 'react'



function MenuRow(props) {

    const [classesSidebarRow, setClassesSidebarRow] = useState(['menuRow', 'menuRow-norm']) 

    return (
        <div className = {classesSidebarRow.join(' ')} 
        onMouseOver = {() =>  setClassesSidebarRow(['menuRow', 'menuRow-light'])}
        onMouseOut = {() => setClassesSidebarRow(['menuRow', 'menuRow-norm'])}
        >
            {props.data.image === 'task' ? (<div className = 'taskNumber'><span className = 'taskNumber1'>8</span></div>) :
            (
            <svg className="sidebarIcon">
                <path fillRule="evenodd" clipRule="evenodd" d = {props.data.image}></path>
            </svg>
            )}
            <span  className = "didebarItemsText">{props.data.title}</span>
            
        </div>
    )  
}

export default MenuRow;