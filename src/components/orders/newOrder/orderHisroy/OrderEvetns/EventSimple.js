import React from 'react'
import {connect} from 'react-redux'


import Icon from '../../../../general/Icon'
import {ICON} from '../../../../../data/icons'
import {compareDates, showDate} from '../../../../general/utils'


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

    return (

        <div
            className='orderEvent'
            style={{borderColor: props.event.current_status.color}}
        >
            {!props.idx || !compareDates(props.event.created_at, props.events[props.idx - 1].created_at) ?
                <div className='dateEvent'>{showDate(props.event.created_at, false)}</div>
                : null
            }
            <div className='eventElement'>
                {props.event.changed.map((event, idx) => (
                    <div key={idx}>
                        <div className='row jc-sb'>
                            <div className='row'>
                                <div
                                    style={{
                                        backgroundColor: props.event.current_status.color,
                                        display: idx ? 'none': null,
                                        marginLeft: idx ? '30px': null
                                    }}
                                    className='boxHistoryIcon'
                                    title={props.employee}
                                >
                                    <Icon className='icon-s2' icon={chooseIcon(props.event.event_type)} color='white'/>
                                </div>
                                <div
                                    className='ml10 txtb'
                                    style={{marginLeft: idx ? '28px': null}}
                                >
                                    {event.title}
                                </div>
                            </div>
                            <div className='cgr'>{time}</div>
                        </div>
                        <div
                            className={`${checkLength(event) ? null : 'row'} ml30`}
                        >
                            {event.current && event.current.title ? <div className=''>{event.current.title}</div> : null}
                            {event.current && event.current.title ?
                                <Icon
                                    className='icon-sm8 mlr5'
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

const mapStateToProps = state => ({
    events: state.order.events,
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(EventSimple)
