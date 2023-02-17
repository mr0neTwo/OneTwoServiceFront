import React from 'react'

import {ICON} from '../../../data/icons'
import {showDate} from '../utils'

import Icon from '../Icon'


/**
 * @example
 * <EstimatedDoneAt
 *   estimatedDoneAt={props.estimatedDoneAt}
 *   statusGroupId={props.statusGroupId}
 *   listStatusGroup={props.listStatuses}
 * />
 *
 * estimatedDoneAt - дата готовности
 * statusGroupId - группа текущего статуса
 * listStatusGroup - список групп при которых отображать время просрочки
 */
const EstimatedDoneAt = (props) => {

    if (!props.estimatedDoneAt) return <td/>

    const iconColor = (props.estimatedDoneAt < (new Date() / 1000) &&
        props.listStatusGroup.indexOf(props.statusGroupId) !== -1) ? 'var(--orange)' : 'var(--main)'


    const getDateEstimated = (datestamp, statusGroup) => {

        const diff = datestamp - (new Date() / 1000)

        if (!datestamp || props.listStatusGroup.indexOf(statusGroup) === -1) return '-'

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