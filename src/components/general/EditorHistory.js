import React from 'react'
import {compareDates, showDate} from './utils'
import {ICON} from '../../data/icons'
import Icon from './Icon'
import {COLORS} from "../../data/colors";


/**
 * Поле истории в редакторах
 *
 * @example
 * <EditorHistory
 * events={props.events} // события
 * event_filter={props.event_filter} // значение ивентов, которые будут показываться
 * />
 */

const EditorHistory = (props) => {

    const values = props.event_filter.filter(event => event.visible).map(event => event.value)
    const events = props.events.filter(event => values.includes(event.event_type))

    return (
        <div className='history-order-editor__events'>
                {events.map((event, idx) => {
                    if (event.event_type.indexOf('CREATE') !== -1 || event.event_type === 'CHANGE_STATUS') {
                        return (
                        <EventStatus
                            key={event.id}
                            idx={idx}
                            event={event}
                            events={events}
                        />
                        )
                    } else {
                        return (
                            <EventSimple
                                key={event.id}
                                idx={idx}
                                event={event}
                                events={events}
                            />
                        )
                    }
                })}
        </div>
    )
}

const EventStatus = props => {

    const optionsShowDate = {
        hour: 'numeric',
        minute: 'numeric'
    }

    const time = new Date(props.event.created_at * 1000).toLocaleString('ru', optionsShowDate)

    const lastEvent = props.events[props.idx - 1]
    const need_date = !props.idx || !compareDates(props.event.created_at, props.events[props.idx - 1].created_at)
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
                        <div className='cgr'>{time}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const EventSimple = props => {

    const chooseIcon = (event_type) => {
        const checkEvent = (event_list, event_type) => {
            return list_type.some(ev_type => event_type.indexOf(ev_type) !== -1)
        }
        let list_type = ['ENGINEER', 'MANAGER', 'CLIENT', 'EXECUTOR', 'SUPPLER']
        if (checkEvent(list_type, event_type)) return ICON.USER
        list_type = ['ESTIMATED']
        if (checkEvent(list_type, event_type)) return ICON.CALENDAR
        list_type = ['OPERATION']
        if (checkEvent(list_type, event_type)) return ICON.BRIEFCASE
        list_type = ['PART']
        if (checkEvent(list_type, event_type)) return ICON.BUG
        list_type = ['DELETE']
        if (checkEvent(list_type, event_type)) return ICON.TRASH
        list_type = ['COMMENT', 'SMS']
        if (checkEvent(list_type, event_type)) return  ICON.BUBBLE
        list_type = ['EMAIL']
        if (checkEvent(list_type, event_type)) return ICON.LETTER
        list_type = ['MOVE_TO']
        if (checkEvent(list_type, event_type)) return ICON.LOOP
        list_type = ['ADD_PAYMENT']
        if (checkEvent(list_type, event_type)) return ICON.COIN_DOLLAR
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

export default EditorHistory