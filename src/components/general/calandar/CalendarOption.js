import React from 'react'


const CalendarOption = props => {

    const chooseAllDate = () => {
        props.func([0, 0])
        props.setListVisible(false)
    }

    const chooseToday = () => {
        // Берем за основу текущую дату
        const first = new Date()
        // Устанавливаем время на начало дня
        first.setHours(0, 0, 0, 0)
        // Берем за основу текущую дату
        const second = new Date()
        // Устанавливаем время на конец дня
        second.setHours(23, 59, 59, 999)
        // Возвращаем даты массивом
        props.func([first, second])
        // Закрываем меню выбора
        props.setListVisible(false)
    }

    const chooseThisWeek = () => {
        // Берем за основу текущую дату
        const first = new Date()
        // Вычисляем первый день текущей недели
        first.setTime(first.getTime() - (first.getDay() - 1 || 7) * 24 * 60 * 60 * 1000)
        // Устанавливаем время на начало дня
        first.setHours(0, 0, 0, 0)
        // Берем за основу текущую дату
        const second = new Date()
        // Вычисляем последний день недели
        // second.setDate(first.getDate() + 6)
        // Устанавливаем время на конец дня
        // second.setHours(23,59,59,999)
        // Возвращаем даты массивом
        props.func([first, second])
        // Закрываем меню выбора
        props.setListVisible(false)
    }

    const chooseThisMonth = () => {
        // Берем за основу текущую дату
        const first = new Date()
        // Устанавливаем первый день текущего месяца
        first.setDate(1)
        // Устанавливаем время на начало дня
        first.setHours(0, 0, 0, 0)
        // Берем за основу текущую дату
        const second = new Date()
        // Вычисляем последний день месяца
        // second.setMonth(first.getMonth() + 1)
        // second.setDate(1)
        // second.setTime(second.getTime() - 24 * 60 * 60 * 1000)
        // Устанавливаем время на конец дня
        // second.setHours(23,59,59,999)
        // Возвращаем даты массивом
        props.func([first, second])
        // Закрываем меню выбора
        props.setListVisible(false)
    }

    const chooseThisYear = () => {
        // Берем за основу текущую дату
        const first = new Date()
        // Устанавливаем время на начало года
        first.setMonth(0)
        first.setDate(1)
        first.setHours(0, 0, 0, 0)
        // Берем за основу текущую дату
        const second = new Date()
        // Возвращаем даты массивом
        props.func([first, second])
        // Закрываем меню выбора
        props.setListVisible(false)

    }

    const chooseLastWeek = () => {
        // Берем за основу текущую дату
        const first = new Date()
        // Вычисляем первый день прошлой недели
        first.setTime(first.getTime() - ((first.getDay() - 1 || 7) + 7) * 24 * 60 * 60 * 1000)
        // Устанавливаем время на начало дня
        first.setHours(0, 0, 0, 0)
        // Берем за основу текущую дату
        const second = new Date()
        // Вычисляем последний день прошлой недели
        second.setDate(first.getDate() + 6)
        // Устанавливаем время на конец дня
        second.setHours(23,59,59,999)
        // Возвращаем даты массивом
        props.func([first, second])
        // Закрываем меню выбора
        props.setListVisible(false)
    }

    const chooseLastMonth = () => {
        // Берем за основу текущую дату
        const first = new Date()
        // Устанавливаем дату на начало прошлого месяца
        first.setMonth(first.getMonth() - 1)
        first.setDate(1)
        first.setHours(0, 0, 0, 0)
        // Берем за основу текущую дату
        const second = new Date()
        // Вычисляем последний день месяца
        second.setMonth(first.getMonth() + 1)
        second.setDate(1)
        second.setTime(second.getTime() - 24 * 60 * 60 * 1000)
        second.setHours(23,59,59,999)
        // Возвращаем даты массивом
        props.func([first, second])
        // Закрываем меню выбора
        props.setListVisible(false)
    }

    const chooseDate = () => {
        props.setListVisible(false)
        props.setVisibleCalendar(true)
    }


    return props.invisible ? null : (
        <div
            id='listCalendarOption'
            className='listOptionsChoose'
            style={{width: props.width}}
        >
            {props.allDate ? <div className='options' onClick={chooseAllDate}>Все время</div> : null}
            <div className='options' onClick={chooseToday}>Сегодня</div>
            <div className='options' onClick={chooseThisWeek}>Текущая неделя</div>
            <div className='options' onClick={chooseThisMonth}>Текущий месяц</div>
            <div className='options' onClick={chooseThisYear}>Текущий год</div>
            <div className='options' onClick={chooseLastWeek}>Прошлая неделя</div>
            <div className='options' onClick={chooseLastMonth}>Прошлый месяц</div>
            <div className='options' onClick={chooseDate}>Выбрать даты</div>
        </div>
    )
}


export default CalendarOption