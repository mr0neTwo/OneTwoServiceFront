import React from 'react'
import PropTypes from "prop-types";

import Icon from './Icon'



/**
 * Чекбокс с подписью
 * @component
 * @example
 * <Checkbox
 * id='id'
 * className='className'
 * type='squared-three'
 * onChange={event => console.log(event.target.changed)}
 * checked={props.checked}
 * icon={ICON.ICON_NAME}
 * iconClassName='iconClassName'
 * iconColor='black'
 * disabled={false}
 * invisible={false}
 * />
 *
 * id - id компонента
 * className - стиль контейнера компонента
 * func - Функция возвращающая список выбранных статусов
 * type - тип компонента
 * onChange - функция именения состояния
 * checked - текущее состояние true или false
 * icon - Иконка перед текстом
 * iconClassName - стиль иконки
 * iconColor - цвет иконки
 * disabled - заблокировать
 * invisible -  не отображать
 *
 * types:
 * 1. slide-one
 * 2. slide-two
 * 3. slide-three
 * 4. rounded-one
 * 5. rounded-two
 * 6. squared-one
 * 7. squared-two
 * 8. squared-three
 * 9. squared-four
 *
*/
const Checkbox = (props) => {

    if (props.invisible) return <div/>

    return (
            <div className={`checkbox ${props.className}`}>
                <div className={props.type}>
                    <input
                        id={props.id}
                        type="checkbox"
                        onChange={props.onChange}
                        checked={props.checked}
                        disabled={props.disabled}
                    />
                    <label htmlFor={props.id}/>
                </div>
                <div className={`row ai-c g6 ${props.checked ? 'cm' : 'cs'}`}>
                    {props.icon ? <Icon className={props.iconClassName} icon={props.icon} color={props.iconColor}/> : null}
                    <div className='nowrap'>{props.label}</div>
                </div>
            </div>
    )
}

Checkbox.propTypes = {
    className: PropTypes.string,
    label: PropTypes.string,
    onChange: PropTypes.func,
    checked: PropTypes.bool,
    disabled: PropTypes.bool,
    invisible: PropTypes.bool
}

export default Checkbox

