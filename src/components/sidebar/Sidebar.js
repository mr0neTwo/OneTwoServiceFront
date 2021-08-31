import React from 'react';
import MenuGroup from './MenuGroup';
import LogoUser from './LogoUser';
import { connect } from 'react-redux'
import  Loader  from '../Loader/Loader';

function Sidebar(props) {

    const generally_menu = props.menuRows.filter(row => 
        row.group_name === 'generally_menu' && row.permission_keys.some(key => props.permission.includes(key)))

    const report_menu = props.menuRows.filter(row => 
        row.group_name === 'report_menu' && row.permission_keys.some(key => props.permission.includes(key)))

    const setting_menu = props.menuRows.filter(row => 
        row.group_name === 'setting_menu' && row.permission_keys.some(key => props.permission.includes(key)))
   
    return (
        <div className = 'sidebarMain'> 
            <LogoUser/>
            <hr className = 'hrMenu' />

        {generally_menu.length ? 
        <>
            <MenuGroup group = {generally_menu} key = {1011}/>
            <hr className = 'hrMenu' />
        </> : null}

        {report_menu.length ? 
        <>
            <MenuGroup group = {report_menu} key = {1012}/>
            <hr className = 'hrMenu' />
        </> : null}

        {setting_menu.length ? <MenuGroup group = {setting_menu} key = {1013}/> : null}
            
        </div>
    )
   
}

const mapStateToProps = state => ({
    menuRows: state.data.menuRows,
    permission: state.data.user.role.permissions
  })
   
export default connect(mapStateToProps)(Sidebar)