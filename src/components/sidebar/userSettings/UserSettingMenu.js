import React from 'react'

import {data_user_menu} from '../../../data/dataUserMenu'
import {NavLink} from 'react-router-dom'

const UserSettingMenu = () => {

    return (
        <div className='sidebar__body'>
            <div>
                {data_user_menu.map(row => (
                    <NavLink
                        className="sidebar__item"
                        activeClassName="sidebar__item_active-settings"
                        to={row.url}
                    >
                        <span className="didebarItemsText">{row.title}</span>
                    </NavLink>))
                }
            </div>
        </div>
    )
}


export default UserSettingMenu