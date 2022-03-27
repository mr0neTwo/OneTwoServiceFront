
import React, {useState} from 'react'

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
        <div className='calendarNavi'>
            <div
                className='nextB'
                onClick={() => props.setCurrent_day(new Date(props.current_date.setMonth(props.current_date.getMonth() - 1)))}
            >
                {'<'}
            </div>

            <div className='row'>
                <div
                    className='currMonth'
                    onClick={() => props.setVisibleListMonth(!props.visibleListMonth)}
                >
                    <div>{months[props.current_date.getMonth()]}</div>
                    <div className='gu'>&#6662;</div>
                </div>

                {visibleInputYear ?
                    <input
                        className='optionFilterInput w30'
                        autoFocus
                        onChange={event => handleInputYear(event.target.value)}
                        value={props.current_date.getFullYear()}
                        onBlur={() => setVisibleInputYear(false)}
                    /> :
                    <div
                        className='pd5'
                        onDoubleClick={() => setVisibleInputYear(true)}
                    >
                        {props.current_date.getFullYear()}
                    </div>}
                <div className='nextY'>
                    <div
                        className='gy'
                        onClick={() => props.setCurrent_day(new Date(props.current_date.setFullYear(props.current_date.getFullYear() + 1)))}
                    >
                        &#9650;
                    </div>
                    <div
                        className='gy'
                        onClick={() => props.setCurrent_day(new Date(props.current_date.setFullYear(props.current_date.getFullYear() - 1)))}
                    >
                        &#9660;
                    </div>
                </div>
            </div>
            <div
                className='nextB'
                onClick={() => props.setCurrent_day(new Date(props.current_date.setMonth(props.current_date.getMonth() + 1)))}
            >
                {'>'}
            </div>
        </div>
        {props.visibleListMonth ?
            <div className='monthList' id='monthList'>
                    {months.map((month, idx) => (
                        <div
                            key={idx}
                            className='month'
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
    )
}



export default CalendarNavi