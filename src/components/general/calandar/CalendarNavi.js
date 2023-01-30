
import React, {forwardRef, useState} from 'react'
import Icon from '../Icon'
import {ICON} from '../../../data/icons'

const CalendarNavi = props => {


    const [visibleInputYear, setVisibleInputYear] = useState(false)

    const months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']

    const handleInputYear = (value) => {
        let out = value.replace(/[^0-9]/g, '')
        if (value > 9999) out = 9999
        if (value < 0) out = 0
        props.setCurrent_day(new Date(props.current_date.setFullYear(out)))
    }

    return (
        <div>
        <div className='calendar__nav'>
            <div
                className='calendar__nav-next'
                onClick={() => props.setCurrent_day(new Date(props.current_date.setMonth(props.current_date.getMonth() - 1)))}
            >
                <Icon
                    className='icon'
                    icon={ICON.LEFT}
                />
            </div>

            <div className='calendar__nav-body'>
                <div
                    className='calendar__nav-month'
                    onClick={() => props.setVisibleListMonth(!props.visibleListMonth)}
                >
                    <div>{months[props.current_date.getMonth()]}</div>
                    <Icon
                        className='icon icon_20'
                        icon={ICON.DOWN}
                    />
                    {props.visibleListMonth ?
                        <div className='calendar__month-list' id='calendarMonth'>
                            {months.map((month, idx) => (
                                <div
                                    key={idx}
                                    className='calendar__item'
                                    onClick={() => {
                                        props.setCurrent_day(new Date(props.current_date.setMonth(idx)))
                                        props.setVisibleListMonth(!props.visibleListMonth)
                                    }}
                                >
                                    {month}
                                </div>
                            ))}
                        </div> : null}
                </div>

                {visibleInputYear ?
                    <input
                        autoFocus
                        onChange={event => handleInputYear(event.target.value)}
                        value={props.current_date.getFullYear()}
                        onBlur={() => setVisibleInputYear(false)}
                    /> :
                    <div
                        className=''
                        onDoubleClick={() => setVisibleInputYear(true)}
                    >
                        {props.current_date.getFullYear()}
                    </div>}
                <div className='calendar__nav-year-buttons'>
                    <div
                        className=''
                        onClick={() => props.setCurrent_day(new Date(props.current_date.setFullYear(props.current_date.getFullYear() + 1)))}
                    >
                        <Icon
                            className='icon icon_20 icon_rotate-180'
                            icon={ICON.DOWN}
                        />
                    </div>
                    <div
                        className=''
                        onClick={() => props.setCurrent_day(new Date(props.current_date.setFullYear(props.current_date.getFullYear() - 1)))}
                    >
                        <Icon
                            className='icon icon_20'
                            icon={ICON.DOWN}
                        />
                    </div>
                </div>
            </div>
            <div
                className='calendar__nav-next'
                onClick={() => props.setCurrent_day(new Date(props.current_date.setMonth(props.current_date.getMonth() + 1)))}
            >
                <Icon
                    className='icon'
                    icon={ICON.RIGHT}
                />
            </div>
        </div>

        </div>
    )
}



export default CalendarNavi