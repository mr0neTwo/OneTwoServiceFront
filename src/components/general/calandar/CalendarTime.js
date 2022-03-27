import React from 'react'

const CalendarTime = props => {
    return props.invisible ? null : (
        <div className='calandarTime'>
            <div className='mtime'>
                <div className='hsm'>{new Date(props.current_date).getHours()}</div>
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
                <div className='hsm'>{new Date(props.current_date).getMinutes()}</div>
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

