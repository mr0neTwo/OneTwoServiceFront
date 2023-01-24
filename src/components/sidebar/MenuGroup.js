import React from 'react'
import {NavLink} from 'react-router-dom'

import Icon from '../general/Icon'


function MenuGroup(props) {

    return (
        <div>
            {props.group.map(row => {
                    return (
                        <NavLink
                            key={row.id}
                            className="sidebar__item"
                            activeClassName="sidebar__item_active"
                            to={row.url}
                            style={{borderLeftColor: props.color}}
                        >
                            <Icon
                                className='sidebar__icon'
                                icon={row.icon}
                            />
                            <span className="sidebar__title">{row.title}</span>
                        </NavLink>
                    )
                }
            )}
        </div>
    )
}

export default MenuGroup
