import React, {useState, useEffect, useRef} from 'react'


import {showDate, showRangeDate} from '../utils'

import Icon from '../Icon'
import {ICON} from '../../../data/icons'
import CalendarTime from './CalendarTime'
import CalendarNavi from './CalendarNavi'
import CalendarOption from './CalendarOption'


/**
 *
 * title='title'
 *
 * className='className'
 *
 * width='100%'
 *
 * showTop={false}
 *
 * range={false}
 *
 * allDate={false}
 *
 * time={false} // отображать время
 *
 * func={date => console.log(date)}
 *
 * current_date={props.current_date}
 *
 * disabled={false}
 *
 * invisible={false}
 *
 * @returns {JSX.Element}
 *
 */
const ChooseDate = (props) => {

    // Текущий день, от которого расчитвывается текущие показания календаря
    const [current_date, setCurrent_day] = useState(new Date)
    // Флаг - показать скрыть меню выбора месяца
    const [visibleListMonth, setVisibleListMonth] = useState(false)
    // Флаг - показать/скрыть календарь
    const [visibleCalendar, setVisibleCalendar] = useState(false)
    // Первый выбраный день из диапазона
    const [firstDay, setFirstDay] = useState(0)
    // Второй выбраный день (выбирается наводом курсора)
    const [secondDay, setSecondDay] = useState(0)
    // Меню выбора диапазона дат
    const [listVisible, setListVisible] = useState(false)

    const clickHandel = (event) => {


        // Скрываем меню выбора месяца при клику вне меню
        if (!event.composedPath().map(el => el.id).includes('calendarMonth')) {
            if (visibleListMonth) {
                setVisibleListMonth(false)
            }
        }
        // Скрываем клендарь при клике вне календаря
        if (!event.composedPath().map(el => el.id).includes('calendar')) {
            if (visibleCalendar) {
                setVisibleCalendar(false)
            }
        }
        // Скрываем клендарь при клике вне календаря
        if (!event.composedPath().map(el => el.id).includes('calendarList')) {
            if (listVisible) {
                setListVisible(false)
            }
        }
    }

    useEffect(() => {
        // Добавим слушателя кликов и обработчик при создании компанента
        window.addEventListener('click', clickHandel)
        // и удалим слушателя при удалении компанента
        return () => {
            window.removeEventListener('click', clickHandel)
        }
    })

    const weekDays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']

    // Создаим объект даты из текущей выбранной дыты
    let first = new Date(current_date)
    // Утановим теущей дате 1 число
    first.setDate(1)
    // Отнимим от текущей даты количество дней равное дню недели (получим дату отсчета для отрисовки в поле календаря)
    first.setTime(first.getTime() - (first.getDay() || 7) * 24 * 60 * 60 * 1000)

    // создадим массив дней для отрисовки в поле календаря
    let current_days = []
    // Заполним массив днями приращивая по одному
    for (let i = 0; i < 42; i++) {
        current_days[i] = new Date(first.getTime() + 24 * 60 * 60 * 1000)
        first.setTime(first.getTime() + 24 * 60 * 60 * 1000)
    }

    /**
     *
     * @param date1 - Объект Date
     * @param date2 - Объект Date
     * @returns {boolean} - true - если год, месяц и день совпадают, false - если нет
     */
    const compareDates = (date1, date2) => {
        return date1.getDate() === date2.getDate() &&
            date1.getMonth() === date2.getMonth() &&
            date1.getFullYear() === date2.getFullYear()
    }


    /**
     * Подготовка диапазона дат перед тем как вернуть данный диапазон
     *
     * @param date_range {array} - Массив из двух объектов Date
     * @returns {array} - Массив из timestamp
     */
    const prepareRange = (date_range) => {
        // Функция сортировки для метода sort
        const sort_func = (a, b) => {
            if (a > b) return 1
            return -1
        }
        // Отсортируем в даты в порядке возрастания
        let new_range = date_range.sort(sort_func)
        // Установим время для первой даты
        new_range[0].setHours(0, 0, 0, 0)
        // Установим время для второй даты
        new_range[1].setHours(23, 59, 59, 999)
        // возвращаем новый дипазон
        return new_range
    }

    /**
     * Обработчик события onClick дня каледара
     * @param day {Object} - Объект Date
     */
    const handleChoose = (day) => {
        // Если задан режим выбора диапазона дат
        if (props.range) {
            // Если еще не выбран первый день
            if (!firstDay) {
                // Обнуляем текущее значение в state приложения (чтобы не отображался выбраный диапазон на календаре)
                props.func([0, 0])
                // Устанавливаем первый день в state копмпонета
                setFirstDay(day)
            // Если первый день уже выбран
            } else {
                // Возвращаем предварительно подготовленные данные из компонента
                props.func(prepareRange([firstDay, day]))
                // Обнуляем первый день в state компонента
                setFirstDay(0)
            }
        // Если задан режим выбора одной даты
        } else {
            // возвращаем выбранную дату
            let finish_day = new Date(props.current_date)
            finish_day.setDate(day.getDate())
            finish_day.setMonth(day.getMonth())
            finish_day.setFullYear(day.getFullYear())
            props.func(finish_day)
            // устанавливаем текущую дату в state компонента
            setCurrent_day(finish_day)
        }
    }

    /**
     * Очень запутанная функция для определения класса стилей для каждого отрисовываемого дня в календаре
     *
     * @param day {Object} - Объект Date
     * @returns {string} - набор стилей для каждого отрисованного дня в календаре
     */
    const dayClassName = (day) => {
        // Общий стиль для всег дней
        const class1 = 'calendar__day'
        // Стиль для дней за пределами отображаемого месяца
        const class2 =  day.getMonth() === current_date.getMonth() ? '' : 'calendar__day_out'
        // Если задан режим выбора диапазона дат
        if (props.range) {
            // Если сущестует уже выбранный диапазон
            if (props.current_date && props.current_date[0] && props.current_date[1]) {
                // Стиль для крайних дней уже выбранного диапазона дат
                const class3 = compareDates(new Date(props.current_date[0] * 1000), day) ||
                               compareDates(new Date(props.current_date[1] * 1000), day) ? 'calendar__day_selected' : ''
                // Стиль для дня внутри уже выбранного диапазона дат
                const class4 = props.current_date[0] < day/1000 && day/1000 < props.current_date[1] ? 'calendar__day_between' : ''
                return [class1, class2, class3, class4].join(' ')
            // Если диапазон дат еще не выбран
            } else {
                // Функция для определения попадает ли день в выбираемый диапазон дат
                const showSelected = (day) => {
                    if (firstDay && secondDay) {
                        return  firstDay/1000 < day/1000 && day/1000 < secondDay/1000 ||
                            firstDay/1000 > day/1000 && day/1000 > secondDay/1000
                    } else { return false }
                }
                // Стиль для первого выбрнного дня
                const class3 = compareDates(firstDay || new Date(0), day) ? 'calendar__day_selected' : ''
                // Стиль для ней попадающих в выбираемый диапазон
                const class4 = showSelected(day) ? 'calendar__day_between' : ''
                return [class1, class2, class3, class4].join(' ')
            }
        // Если задан режим выбора одной даты
        } else {
            // Стиль для выбранной даты
            const class3 = compareDates(new Date(props.current_date), day) ? 'calendar__day_selected' : ''
            return [class1, class2, class3].join(' ')
        }
    }


    const title = props.range ?
        (props.current_date && props.current_date.some(date => date) ? showRangeDate(props.current_date) : 'Любая')
        : showDate(props.current_date / 1000, props.time)

    const handleChangeDate = () => {
        if (props.range) {
            setListVisible(true)
        } else {
            setVisibleCalendar(true)
        }
    }

    if (props.invisible) return  <div/>

    return (
        <div
            className={`calendar ${listVisible || visibleCalendar ? 'calendar_active': ''} ${props.className}`}
        >
            <div className='label calendar__label'>{props.title}</div>
            <div
                className='input calendar__input'
                onClick={handleChangeDate}
            >
                <div className='row g6'>
                    <Icon
                        className='icon calendar__icon'
                        icon={ICON.CALENDAR}
                    />
                    <div>{title}</div>
                </div>
                <Icon icon={ICON.DOWN} className={`icon icon_24 calendar__icon-down ${listVisible ? 'icon_rotate-90' : ''}`}/>
            </div>

            <CalendarOption
                width={props.width}
                invisible={!listVisible}
                allDate={props.allDate}
                setListVisible={setListVisible}
                setVisibleCalendar={setVisibleCalendar}
                func={date => props.func(date)}
            />


            {visibleCalendar && !props.disabled ?
                <div className='calendar__date-select' id={'calendar'}>

                    <CalendarNavi
                        func={data => props.func(data)}
                        current_date={current_date}
                        setCurrent_day={setCurrent_day}
                        setVisibleListMonth={setVisibleListMonth}
                        visibleListMonth={visibleListMonth}
                    />

                    <div className='calendar__days'>
                        {weekDays.map((day, idx) => (
                            <div
                                key={idx}
                                className='calendarWeekDay'
                            >
                                {day}
                            </div>
                        ))}
                        {current_days.map((day, idx) => (
                            <div
                                key={idx}
                                className={dayClassName(day)}
                                onClick={() => handleChoose(day)}
                                onMouseOver={() => setSecondDay(day)}
                                onMouseOut={() => setSecondDay(0)}
                            >
                                {day.getDate()}
                            </div>
                        ))}
                    </div>

                    {props.time ?
                        <CalendarTime
                            func={data => props.func(data)}
                            current_date={props.current_date}
                            invisible={props.range}
                        /> : null
                    }
                </div> : null}

        </div>
    )
}

export default ChooseDate