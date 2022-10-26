import React from 'react'
import {NavLink} from 'react-router-dom'

function SettingRow(props) {

    return (
        <NavLink
            className="settingRow"
            activeClassName="settingRowActive"
            to={props.row.url}
        >
            <span className="didebarItemsText">{props.row.title}</span>
        </NavLink>
    )
}

export default SettingRow
