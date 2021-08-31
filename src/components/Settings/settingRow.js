import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { changeStatusSettingRow } from '../../Redux/actions'


function SettingRow(props) {
  return (
    <Link 
    className="settingRow" 
    to={props.row.url}
    style={{
       backgroundColor: props.settingMenu.find(row => row.id === props.row.id).active ? '#939699' : '#53585c',
       color: props.settingMenu.find(row => row.id === props.row.id).active ? '#fff' : null
      }}
    onClick={() => props.changeStatusSettingRow(props.row.id)}
    >
      <span className="didebarItemsText">{props.row.title}</span>
    </Link>
  )
}

const mapStateToProps = state => ({
   settingMenu: state.data.settingMenu
})

const mapDispatchToProps = {
   changeStatusSettingRow
}


export default connect(mapStateToProps, mapDispatchToProps) (SettingRow)
