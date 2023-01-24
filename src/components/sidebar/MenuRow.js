import React, {useState} from 'react'
import {Link, NavLink, useHistory} from 'react-router-dom'
import {connect} from 'react-redux'
import {changeDataState} from '../../Redux/actions/dataAction'



function MenuRow(props) {

    const history = useHistory()
    if (history.location.pathname === props.row.url) props.changeDataState({current_menu_row: props.row.url})


    const style = props.current_menu_row === props.row.url ? {borderLeftColor: props.current_branch.color} : null

    return (
        <NavLink
            className="menuRow"
            activeClassName="menuRowActive"
            to={props.row.url}
            style={style}
            onClick={() => props.changeDataState({current_menu_row: props.row.url})}
        >
            {props.row.image === 'task' ? (
                <div className="taskNumber">
                    <span className="taskNumber1">8</span>
                </div>
            ) : (
                <svg className="sidebarIcon">
                    <path fillRule="evenodd" clipRule="evenodd" d={props.row.image}/>
                </svg>
            )}
            <span className="didebarItemsText">{props.row.title}</span>
        </NavLink>
    )
}

const mapStateToProps = state => ({
    menuRows: state.data.menuRows,
    current_branch: state.branch.current_branch,
    current_menu_row: state.data.current_menu_row
})

const mapDispatchToProps = {
    changeDataState
}


export default connect(mapStateToProps, mapDispatchToProps)(MenuRow)
