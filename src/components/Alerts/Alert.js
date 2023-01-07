import React from 'react'
import {ICON} from '../../data/icons'
import Icon from '../general/Icon'

const Alert = (props) => {

    let icon, color
    if (props.type === 'alert-success') {
        icon = ICON.CHECK_MARKER
        color = '#155724'
    }
    if (props.type === 'alert-warning') {
        icon = ICON.WARNING
        color = '#856404'
    }
    if (props.type === 'alert-danger') {
        icon = ICON.CROSS
        color = '#721c24'
    }

    return (
        <div className={`alert ${props.type}`}>
            <Icon icon={icon} color={color} className='icon-s2 mr5'/>
            <div>{props.text}</div>
        </div>
    )
}

export default Alert