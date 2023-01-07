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
                            className="menu-row"
                            activeClassName="menu-row-active"
                            to={row.url}
                            style={{borderLeftColor: props.color}}
                        >
                            <Icon
                                className='icon-16'
                                icon={row.icon}
                            />
                            <span className="secondary cur-p">{row.title}</span>
                        </NavLink>
                    )
                }
            )}
        </div>
    )
}

export default MenuGroup
