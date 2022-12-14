import React from 'react'
import {connect} from 'react-redux'

import EventStatus from './EventsStatus'
import EventSimple from './EventSimple'
import {order_event_types} from '../../../../../data/data'

const OrderEvents = props => {

    const values = order_event_types.filter(event => props.event_filter.includes(event.id)).map(event => event.value)

    return (
        <div className='contentEditor mt15'>
            <div className='ml30 h100'>
                {props.events.filter(event => values.includes(event.event_type)).map((event, idx) => {
                    if (event.event_type === 'CREATE_ORDER' || event.event_type === 'CHANGE_STATUS') {
                        return <EventStatus key={event.id} event={event} idx={idx}/>
                    } else {
                        return <EventSimple key={event.id} event={event} idx={idx}/>
                    }
                })}
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    events: state.order.events,
    event_filter: state.order.event_filter
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(OrderEvents)