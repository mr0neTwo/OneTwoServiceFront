import React from 'react'

import {showDate} from '../../../general/utils'
import {ICON} from '../../../../data/icons'

import Icon from '../../../general/Icon'

function getDateEstimated(datestamp, statusGroup) {

    const diff = datestamp - (new Date() / 1000)

    if (!datestamp || [13, 14, 15].indexOf(statusGroup) === -1) return '-'

    const deltaMinut = Math.round( diff / 60 )
    if (Math.abs(deltaMinut) < 60) return `${deltaMinut}м.`
    const deltaHour = Math.round( diff / (60 * 60 ))
    if (Math.abs(deltaHour) < 48) return `${deltaHour}ч.`
    const deltaDay = Math.round( diff / (24 * 60 * 60 ))
    return `${deltaDay}д.`
}

const EstimatedComeAt = (props) => {

    if (!props.reqsp.estimated_come_at) return <td/>

    return (
        <td>
            <div className="estimated-top">
                <Icon
                    icon={ICON.CLOCK}
                    className='clockEstimated'
                    color={(props.reqsp.estimated_come_at && props.reqsp.estimated_come_at < (new Date() / 1000) && [13, 14, 15].indexOf(props.reqsp.status.group) !== -1) ? '#f0ad4e' : '#ebebeb'}
                />
                <span>{getDateEstimated(props.reqsp.estimated_come_at, props.reqsp.status.group)}</span>
            </div>
            <div className='orderDate'>{showDate(props.reqsp.estimated_come_at)}</div>
        </td>
    )
}

export default EstimatedComeAt