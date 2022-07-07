import React from 'react'
import {Link, useHistory} from 'react-router-dom'
import {connect} from 'react-redux'
import {changeDataState} from '../../Redux/actions/dataAction'



function SettingRow(props) {

    const history = useHistory()
    if (history.location.pathname === props.row.url && history.location.pathname !== props.current_setting_menu_row)
        props.changeDataState({current_setting_menu_row: props.row.url})

    return (
        <Link
            className="settingRow"
            to={props.row.url}
            style={{
                backgroundColor: props.current_setting_menu_row === props.row.url ? '#939699' : '#53585c',
                color: props.current_setting_menu_row === props.row.url ? '#fff' : null
            }}
            onClick={() => props.changeDataState({current_setting_menu_row: props.row.url})}
        >
            <span className="didebarItemsText">{props.row.title}</span>
        </Link>
    )
}

const mapStateToProps = state => ({
    settingMenu: state.data.settingMenu,
    current_setting_menu_row: state.data.current_setting_menu_row
})

const mapDispatchToProps = {
    changeDataState
}


export default connect(mapStateToProps, mapDispatchToProps)(SettingRow)
