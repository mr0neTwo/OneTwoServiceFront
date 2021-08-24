import React from 'react';
import MenuGroup from './MenuGroup';
import LogoUser from './LogoUser';
import { connect } from 'react-redux'
import  Loader  from '../Loader/Loader';

function Sidebar({menuRows}) {

    if (menuRows) {
        return (
            <div className = 'sidebarMain'> 
                <LogoUser/>
                <hr className = 'hrMenu' />
                <MenuGroup group = {menuRows.filter(row => row.group_name === 'generally_menu')} key = {1011}/>
                {menuRows.filter(row => row.group_name === 'report_menu') ?
                    <>
                    <hr className = 'hrMenu' />
                    <MenuGroup group = {menuRows.filter(row => row.group_name === 'report_menu')} key = {1012}/>
                    </>
                    : null
                }
                {menuRows.filter(row => row.group_name === 'setting_menu') ?
                    <>
                    <hr className = 'hrMenu' />
                    <MenuGroup group = {menuRows.filter(row => row.group_name === 'setting_menu')} key = {1013}/>
                    </>
                    : null
                }
            </div>
        )
    }
    else {
     return (<Loader/>)
    }
}

const mapStateToProps = state => ({
    menuRows: state.data.menuRows
  })
   
export default connect(mapStateToProps)(Sidebar)