import React from 'react'
import {connect} from 'react-redux'
import {compareDates, showDate} from '../../../../general/utils'


const EventStatus = props => {

    const optionsShowDate = {
        hour: 'numeric',
        minute: 'numeric'
    }

    const time = new Date(props.event.created_at * 1000).toLocaleString('ru', optionsShowDate)

    const need_date = !props.idx || !compareDates(props.event.created_at, props.events[props.idx - 1].created_at)

    return (

        <div>
            {props.event.event_type === 'CREATE_ORDER' && need_date ?
                <div className='dateEvent'>{showDate(props.event.created_at, false)}</div>
                : null
            }
            <div
                className='orderEvent'
                style={{borderColor: props.event.current_status.color}}
            >
                {props.event.event_type === 'CHANGE_STATUS' && need_date ?
                    <div className='dateEvent'>{showDate(props.event.created_at)}</div>
                    : null
                }
                <div className='eventElement evFerst'>
                    <div className='row jc-sb'>
                        <div
                            className='statusListRow mt0'
                            style={{backgroundColor: props.event.current_status.color}}
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

const mapStateToProps = state => ({
    events: state.order.events,
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(EventStatus)