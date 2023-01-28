import React from 'react'
import { connect } from 'react-redux'
import {Redirect, Route, Switch} from 'react-router-dom'

import UserSettingMenu from './UserSettingMenu'
import UserProfile from './UserProfile'
import Logout from './Logout'
import UserPersonality from './UserPersonality'


const UserSetting = () => {
    return (
        <div className='main-content main-content_setting'>
            <UserSettingMenu/>
            <Switch>
                <Route path = '/user/profile' component = {UserProfile}/>
                <Route path = '/user/logout' component = {Logout}/>
                <Route path = '/user/personality' component = {UserPersonality}/>
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