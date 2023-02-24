import React from 'react'

import {compareDates, showDate} from '../../../../general/utils'
import {COLORS} from '../../../../../data/colors'


const EventStatus = props => {

    const optionsShowDate = {
        hour: 'numeric',
        minute: 'numeric'
    }

    const time = new Date(props.event.created_at * 1000).toLocaleString('ru', optionsShowDate)

    const lastEvent = props.events[props.idx - 1]
    const need_date = !props.idx || !compareDates(props.event.created_at, lastEvent.created_at)
    const style = {
        borderColor: `var(--${COLORS.STATUS[props.idx ? lastEvent.current_status.group : props.event.current_status.group]})`
    }

    return (

        <div>
            {props.event.event_type === 'CREATE_ORDER' && need_date ?
                <div className='history-order-editor__event-date'>{showDate(props.event.created_at, false)}</div>
                : null
            }


            {props.event.event_type === 'CHANGE_STATUS' && need_date ?
                <div
                    className='history-order-editor__event history-order-editor__event-date'
                    style={style}
                >
                    {showDate(props.event.created_at, false)}
                </div>
                : null
            }

            <div
                className='history-order-editor__event-status'
                style={{borderColor: `var(--${COLORS.STATUS[props.event.current_status.group]})`}}
            >
                <div className='history-order-editor__item'>
                    <div className='row jc-sb'>
                        <div
                            className='history-order-editor__item-status'
                            style={{backgroundColor: `var(--${COLORS.STATUS[props.event.current_status.group]})` }}
                            title={props.event.employee.name}
                        >
                            {props.event.changed[0].new.title}
                        </div>
                        <div className=''>{time}</div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default EventStatus