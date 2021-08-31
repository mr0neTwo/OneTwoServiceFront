import React from 'react';
import { connect } from 'react-redux'

import SettingGroup from './SettingGroup';
import  Loader  from '../Loader/Loader';

function SettingMenu(props) {

    if (props.settingMenu) {
        return (
            <div className = 'settingMenuMain'> 
                <SettingGroup 
                    group = {props.settingMenu.filter(row => 
                        row.group_name === 'generally_setting' && props.permission.includes(row.permission_key))} 
                    key = {2011}
                    />
                <hr className = 'hrMenu' />
                <SettingGroup 
                    group = {props.settingMenu.filter(row => 
                        row.group_name === 'app_setting' && props.permission.includes(row.permission_key))}  
                    key = {2012}
                />
            </div>
        )
    }
    else {
     return (<Loader/>)
    }
}

const mapStateToProps = state => ({
    permission: state.data.user.role.permissions,
    settingMenu: state.data.settingMenu
  })
   
export default connect(mapStateToProps)(SettingMenu)