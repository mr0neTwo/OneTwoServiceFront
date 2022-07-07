import React, {useState} from 'react'
import {Link, useHistory} from 'react-router-dom'
import {connect} from 'react-redux'
import {changeDataState} from '../../Redux/actions/dataAction'



function MenuRow(props) {
    const history = useHistory()
    if (history.location.pathname === props.row.url) props.changeDataState({current_menu_row: props.row.url})

    return (
        <Link
            className="menuRow"
            to={props.row.url}
            style={props.current_menu_row === props.row.url ? {
                backgroundColor: '#53585c',
                borderLeftColor: props.current_branch.color
            } : null}
            onClick={() => props.changeDataState({current_menu_row: props.row.url})}
        >
            {props.row.image === 'task' ? (
                <div className="taskNumber">
                    <span className="taskNumber1">8</span>
                </div>
            ) : (
                <svg className="sidebarIcon">
                    <path fillRule="evenodd" clipRule="evenodd" d={props.row.image}></path>
                </svg>
            )}
            <span className="didebarItemsText">{props.row.title}</span>
        </Link>
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
