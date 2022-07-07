
import React from 'react'
import { connect } from 'react-redux'
import SettingRow from '../../Settings/settingRow'
import {data_user_menu} from '../../../data/dataUserMenu'

const UserSettingMenu = (props) => {
    return (
        <div className = 'settingMenuMain'>
                {data_user_menu.map(row => <SettingRow row = {row} key = {row.id}/>)}
        </div>
    )
}

const mapStateToProps = state => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(UserSettingMenu)