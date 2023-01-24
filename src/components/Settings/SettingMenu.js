import React from 'react';
import { connect } from 'react-redux'

import SettingGroup from './SettingGroup';
import  Loader  from '../Loader/Loader';
import {data_setting_menu} from '../../data/dataSettingRows'

function SettingMenu(props) {

    if (data_setting_menu) {
        return (
            <div className = 'settingMenuMain'> 
                <SettingGroup 
                    group = {data_setting_menu.filter(row =>
                        row.group_name === 'generally_setting' && props.permission.includes(row.permission_key))} 
                    key = {2011}
                    />
                <hr className = 'hrMenu' />
                <SettingGroup 
                    group = {data_setting_menu.filter(row =>
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
    permission: state.data.user.role.permissions
})
   
export default connect(mapStateToProps)(SettingMenu)