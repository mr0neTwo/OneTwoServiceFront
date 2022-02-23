import React from 'react'
import PropTypes from 'prop-types';

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
 * unvisible={false} // Неотображать
 *
 * disabled={false} // Заблакировать
 */
const Button = (props) => {
   return props.unvisible ? (<div/>) : (
      <button
         id={props.id}
         className={props.unvisible ? 'disabledButton' : props.className}
         onClick={props.onClick}
         disabled={props.unvisible || props.disabled}
      >
         {props.title}
      </button>
   )
}

Button.propTypes = {
    className: PropTypes.string,
    title: PropTypes.string,
    onClick: PropTypes.func,
    unvisible: PropTypes.bool,
    disabled: PropTypes.bool
}

 export default Button
