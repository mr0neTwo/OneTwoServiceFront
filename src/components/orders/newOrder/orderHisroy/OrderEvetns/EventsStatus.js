import React from 'react'

const EventStatus = props => {

    const optionsShowDate = {
        // year: 'numeric',
        // month: 'long',
        // day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        // second: 'numeric'
    }

    const time = new Date(props.event.created_at * 1000).toLocaleString('ru', optionsShowDate)

    return (
        <div className='eventElement evFerst'>
            <div className='row jc-sb'>
                <div
                    className='statusListRow mt0'
                    style={{backgroundColor: props.event.current_status.color}}
                >
                    {props.event.changed[0].new.title}
                </div>
                <div className='cgr'>{time}</div>
            </div>
        </div>
    )
}


export default EventStatus