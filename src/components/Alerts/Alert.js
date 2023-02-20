import React from 'react'
import {ICON} from '../../data/icons'
import Icon from '../general/Icon'

const Alert = (props) => {

    let icon
    if (props.type === 'success') {
        icon = ICON.CHECK_MARKER
    }
    if (props.type === 'warning') {
        icon = ICON.WARNING
    }
    if (props.type === 'danger') {
        icon = ICON.CROSS
    }

    return (
        <div className={`alert__message alert__message_${props.type}`}>
            <Icon icon={icon} className='icon'/>
            <div>{props.text}</div>
        </div>
    )
}

export default Alert