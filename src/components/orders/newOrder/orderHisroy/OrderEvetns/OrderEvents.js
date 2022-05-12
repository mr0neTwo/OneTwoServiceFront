import React, {useState} from 'react'
import {connect} from 'react-redux'

import EventStatus from './EventsStatus'
import EventSimple from './EventSimple'
import {order_event_types} from '../../../../../data/data'

const OrderEvents = props => {

    const [date, setDate] = useState(0)

    const compareDates = (date1, date2) => {
        date1 = new Date(date1 * 1000)
        date2 = new Date(date2 * 1000)
        return date1.getDate() === date2.getDate() &&
            date1.getMonth() === date2.getMonth() &&
            date1.getFullYear() === date2.getFullYear()
    }

    const optionsShowDate = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        // hour: 'numeric',
        // minute: 'numeric',
        // second: 'numeric'
    }

    const showDate = (date) => {
        return new Date(date * 1000).toLocaleString('ru', optionsShowDate).replace('г.', '')
    }
    const values = order_event_types.filter(event => props.event_filter.includes(event.id)).map(event => event.value)

    function getEmploeeName(id) {
        if (id) {
            const employee = props.employees.find((employee) => employee.id === id)
            return employee ? `${employee.last_name} ${employee.first_name}`: ''
        }
    }

    return (
        <div className='contentEditor mt15'>
            <div className='ml30 h100'>
                {props.events.filter(event => values.includes(event.event_type)).map((event, idx) => {

                    if (event.event_type === 'CREATE_ORDER' || event.event_type === 'CHANGE_STATUS') {
                        return (
                            <div key={event.id}>
                                {event.event_type === 'CREATE_ORDER' && (!idx || !compareDates(event.created_at, props.events[idx - 1].created_at)) ?
                                    <div className='dateEvent'>{showDate(event.created_at)}</div>
                                    : null
                                }
                                <div
                                    className='orderEvent'
                                    style={{borderColor: event.current_status.color}}
                                >
                                    {event.event_type === 'CHANGE_STATUS' && (!idx || !compareDates(event.created_at, props.events[idx - 1].created_at)) ?
                                        <div className='dateEvent'>{showDate(event.created_at)}</div>
                                        : null
                                    }
                                    <EventStatus event={event} employee={getEmploeeName(event.employee_id)}/>
                                </div>
                            </div>
                        )
                    } else {
                        return (
                            <div
                                key={event.id}
                                className='orderEvent'
                                style={{borderColor: event.current_status.color}}
                            >
                                {!idx || !compareDates(event.created_at, props.events[idx - 1].created_at) ?
                                    <div className='dateEvent'>{showDate(event.created_at)}</div>
                                    : null
                                }
                                <EventSimple event={event} employee={getEmploeeName(event.employee_id)}/>
                            </div>
                        )
                    }
                })}

            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    events: state.order.events,
    event_filter: state.order.event_filter,
    employees: state.data.employees
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(OrderEvents)