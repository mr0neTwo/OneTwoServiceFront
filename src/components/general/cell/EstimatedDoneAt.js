import React from 'react'

import {ICON} from '../../../data/icons'
import {showDate} from '../utils'

import Icon from '../Icon'

const EstimatedDoneAt = (props) => {

    if (!props.estimatedDoneAt) return <td/>

    const listTargetStatusIds = [1, 2, 3] // Id статусов, при которых отображается время просрочки
    const iconColor = (props.estimatedDoneAt < (new Date() / 1000) &&
        listTargetStatusIds.indexOf(props.statusGroupId) !== -1) ? 'var(--orange)' : 'var(--main)'


    const getDateEstimated = (datestamp, statusGroup) => {

        const diff = datestamp - (new Date() / 1000)

        if (!datestamp || listTargetStatusIds.indexOf(statusGroup) === -1) return '-'

        const deltaMinutes = Math.round(diff / 60)
        if (Math.abs(deltaMinutes) < 60) return `${deltaMinutes}м.`

        const deltaHours = Math.round(diff / (60 * 60))
        if (Math.abs(deltaHours) < 48) return `${deltaHours}ч.`

        const deltaDays = Math.round(diff / (24 * 60 * 60))
        return `${deltaDays}д.`
    }

    return (
        <td>
            <div className='cell cell_date'>
                <div className="row g6">
                    <Icon
                        icon={ICON.CLOCK}
                        className='icon'
                        color={iconColor}
                    />
                    <div>{getDateEstimated(props.estimatedDoneAt, props.statusGroupId)}</div>
                </div>
                <div className='cs cell_text'>{showDate(props.estimatedDoneAt)}</div>
            </div>
        </td>
    )
}

export default EstimatedDoneAt