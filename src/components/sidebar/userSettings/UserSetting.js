import React from 'react'
import { connect } from 'react-redux'
import {Redirect, Route, Switch} from 'react-router-dom'

import UserSettingMenu from './UserSettingMenu'
import UserProfile from './UserProfile'
import Logout from './Logout'


const UserSetting = (props) => {
    return (
        <div className='settingPage'>
            <UserSettingMenu/>
            <Switch>
                <Route path = '/user/profile' component = {UserProfile}/>
                <Route path = '/user/logout' component = {Logout}/>
                <Redirect from='/user' to='/user/profile'/>
            </Switch>
        </div>
    )
}

const mapStateToProps = state => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(UserSetting)