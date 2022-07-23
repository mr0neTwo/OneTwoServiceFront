import React from 'react'
import {icon_checkmarker, icon_cross, icon_warning} from '../../data/icons'
import Icon from '../general/Icon'

const Alert = (props) => {

    let icon, color
    if (props.type === 'alert-success') {
        icon = icon_checkmarker
        color = '#155724'
    }
    if (props.type === 'alert-warning') {
        icon = icon_warning
        color = '#856404'
    }
    if (props.type === 'alert-danger') {
        icon = icon_cross
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