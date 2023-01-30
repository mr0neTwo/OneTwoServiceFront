import React from 'react'
import {connect} from 'react-redux'

import EventStatus from './EventsStatus'
import EventSimple from './EventSimple'

const OrderEvents = props => {

    const values = props.event_filter.filter(event => event.visible).map(event => event.value)

    const events = props.events.filter(event => values.includes(event.event_type))

    return (
        <div className='history-order-editor__events'>

            {events.map((event, idx) => {
                if (event.event_type === 'CREATE_ORDER' || event.event_type === 'CHANGE_STATUS') {
                    return <EventStatus key={event.id} event={event} events={events} idx={idx}/>
                } else {
                    return <EventSimple key={event.id} event={event} events={events} idx={idx}/>
                }
            })}

        </div>
    )
}

const mapStateToProps = state => ({
    events: state.order.events,
    event_filter: state.order.event_filter
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(OrderEvents)