import React from 'react'


import Icon from '../../../../general/Icon'
import {ICON} from '../../../../../data/icons'
import {compareDates, showDate} from '../../../../general/utils'
import {COLORS} from '../../../../../data/colors'


const EventSimple = props => {

    const chooseIcon = (event_type) => {
        let list_type = ['ASSIGN_ENGINEER', 'CHANGE_ENGINEER', 'ASSIGN_MANAGER', 'CHANGE_MANAGER', 'ADD_CLIENT', 'CHANGE_CLIENT']
        if (list_type.includes(event_type)) return ICON.USER
        if (event_type === 'CHANGE_ESTIMATED_DONE_AT') return ICON.CALENDAR
        if (event_type === 'ADD_OPERATION') return ICON.BRIEFCASE
        if (event_type === 'ADD_ORDER_PART') return ICON.BUG
        if (['DELETE_OPERATION', 'DELETE_ORDER_PART', 'DELETE_PAYMENT'].includes(event_type)) return ICON.TRASH
        if (['ADD_COMMENT', 'SEND_SMS'].includes(event_type)) return  ICON.BUBBLE
        if (event_type === 'SEND_EMAIL') return ICON.LETTER
        if (event_type === 'MOVE_TO') return ICON.LOOP
        if (event_type === 'ADD_PAYMENT') return ICON.COIN_DOLLAR
        return ICON.PENCIL
    }

    const checkLength = (event) => {
        let one, two
        if (event.current && event.current.title){
            one = event.current.title.toString().length
        } else {
            one = 0
        }
        if (event.new && event.new.title){
            two = event.new.title.toString().length
        } else {
            two = 0
        }
        return one + two > 40
    }

    const optionsShowDate = {
        hour: 'numeric',
        minute: 'numeric',
    }

    const time = new Date(props.event.created_at * 1000).toLocaleString('ru', optionsShowDate)

    const lastEvent = props.events[props.idx - 1]
    const style = {
        borderColor: `var(--${COLORS.STATUS[props.event.current_status.group]})`
    }

    return (

        <div
            className='history-order-editor__event'
            style={style}
        >
            {!props.idx || !compareDates(props.event.created_at, lastEvent.created_at) ?
                <div className='history-order-editor__event-date'>
                    {showDate(props.event.created_at, false)}
                </div>
                : null
            }
            <div className='history-order-editor__item'>
                {props.event.changed.map((event, idx) => (
                    <div key={idx}>
                        <div className='history-order-editor__title-box'>
                            <div
                                className='history-order-editor__title'
                                style={{marginLeft: idx ? '30px': null}}
                            >
                                <div
                                    style={{
                                        backgroundColor: `var(--${COLORS.STATUS[props.event.current_status.group]})`,
                                        display: idx ? 'none': null,
                                        marginLeft: idx ? '30px': null
                                    }}
                                    className='history-order-editor__icon'
                                    title={props.employee}
                                >
                                    <Icon
                                        className='icon'
                                        icon={chooseIcon(props.event.event_type)}
                                    />
                                </div>
                                <div>{event.title}</div>
                            </div>
                            <div>{time}</div>
                        </div>

                        <div
                            className={`history-order-editor__message ${checkLength(event) ? 'history-order-editor__message_colm' : ''}`}
                        >
                            {event.current && event.current.title ? <div className=''>{event.current.title}</div> : null}
                            {event.current && event.current.title ?
                                <Icon
                                    className='icon icon_10'
                                    icon={checkLength(event) ? ICON.ARROW_DOWN : ICON.ARROW_RIGHT}
                                /> : null}
                            <div style={{whiteSpace: "pre-wrap"}}>{event.new.title}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>


    )
}



export default EventSimple
