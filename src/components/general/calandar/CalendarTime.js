import React from 'react'

const CalendarTime = props => {

    const changeMinute = (value) => {
        value = value.replace(/[^0-9]/g, '')
        if (value > 59) value = 59
        if (value < 0) value = 0
        props.func(new Date(props.current_date).setMinutes(value))
    }

    const changeHours = (value) => {
        value = value.replace(/[^0-9]/g, '')
        if (value > 23) value = 23
        if (value < 0) value = 0
        props.func(new Date(props.current_date).setHours(value))
    }

    return props.invisible ? null : (
        <div className='calandarTime'>
            <div className='mtime'>
                <div className='hsm'>
                    <input
                        className='optionFilterInput fsz16'
                        onChange={event => changeHours(event.target.value)}
                        value={new Date(props.current_date).getHours()}
                    />
                </div>
                <div className='ssm'>
                    <div
                        onClick={() => props.func(new Date(props.current_date).setHours(new Date(props.current_date).getHours() + 1))}
                    >
                        &#9650;
                    </div>
                    <div
                        onClick={() => props.func(new Date(props.current_date).setHours(new Date(props.current_date).getHours() - 1))}
                    >
                        &#9660;
                    </div>
                </div>
            </div>
            :
            <div className='mtime'>
                <div className='hsm'>
                    <input
                        className='optionFilterInput fsz16'
                        onChange={event => changeMinute(event.target.value)}
                        value={new Date(props.current_date).getMinutes()}
                    />
                </div>
                <div className='ssm'>
                    <div
                        onClick={() => props.func(new Date(props.current_date).setMinutes(new Date(props.current_date).getMinutes() + 1))}
                    >
                        &#9650;
                    </div>
                    <div
                        onClick={() => props.func(new Date(props.current_date).setMinutes(new Date(props.current_date).getMinutes() - 1))}
                    >
                        &#9660;
                    </div>
                </div>
            </div>
        </div>
    )
}


export default CalendarTime

