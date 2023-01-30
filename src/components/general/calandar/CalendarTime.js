import React from 'react'
import Icon from '../Icon'
import {ICON} from '../../../data/icons'

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

    if (props.invisible) return null

    return  (
        <div className='calendar__time'>
            <div className='calendar__time-box'>
                <div className=''>
                    <input
                        className='w20'
                        onChange={event => changeHours(event.target.value)}
                        value={new Date(props.current_date).getHours()}
                    />
                </div>
                <div className='calendar__nav-year-buttons'>
                    <div
                        onClick={() => props.func(new Date(props.current_date).setHours(new Date(props.current_date).getHours() + 1))}
                    >
                        <Icon
                            className='icon icon_20 icon_rotate-180'
                            icon={ICON.DOWN}
                        />
                    </div>
                    <div
                        onClick={() => props.func(new Date(props.current_date).setHours(new Date(props.current_date).getHours() - 1))}
                    >
                        <Icon
                            className='icon icon_20'
                            icon={ICON.DOWN}
                        />
                    </div>
                </div>
            </div>
            :
            <div className='calendar__time-box'>
                <div className=''>
                    <input
                        className='w20'
                        onChange={event => changeMinute(event.target.value)}
                        value={new Date(props.current_date).getMinutes()}
                    />
                </div>
                <div className='calendar__nav-year-buttons'>
                    <div
                        onClick={() => props.func(new Date(props.current_date).setMinutes(new Date(props.current_date).getMinutes() + 1))}
                    >
                        <Icon
                            className='icon icon_20 icon_rotate-180'
                            icon={ICON.DOWN}
                        />
                    </div>
                    <div
                        onClick={() => props.func(new Date(props.current_date).setMinutes(new Date(props.current_date).getMinutes() - 1))}
                    >
                        <Icon
                            className='icon icon_20'
                            icon={ICON.DOWN}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}


export default CalendarTime

