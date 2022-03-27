import React from 'react'
import PropTypes from 'prop-types';
import Icon from './Icon'

/**
 * Кнопка с набором функций.
 *
 * id={'id'} // id кнопки
 *
 * className='className' // Класс стилей
 *
 * title='title' // Надпись внутри кнопки
 *
 * onClick={() => console.log('click')} // Функция при нажатии на кнопку
 *
 * invisible={false} // Неотображать
 *
 * disabled={false} // Заблакировать
 *
 * icon={icon} // Иконка
 *
 * iconClassName='iconClassName' // Класс иконки
 *
 * iconColor='black' // Цвет Иконки
 */
const Button = (props) => {
   return props.invisible ? (<div/>) : (
      <button
         id={props.id}
         className={props.invisible ? 'disabledButton' : props.className}
         onClick={props.onClick}
         disabled={props.invisible || props.disabled}
      >
          <div className='row'>
              {props.icon ? <Icon icon={props.icon} className={props.iconClassName} color={props.iconColor}/> : null}
              {props.title ? <div className='ml5'>{props.title}</div> : null}
          </div>
      </button>
   )
}

Button.propTypes = {
    className: PropTypes.string,
    title: PropTypes.string,
    onClick: PropTypes.func,
    invisible: PropTypes.bool,
    disabled: PropTypes.bool,
    icon: PropTypes.string,
    iconClassName: PropTypes.string,
    iconColor: PropTypes.string
}

 export default Button
