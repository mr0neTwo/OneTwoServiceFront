import React from 'react'
import PropTypes from 'prop-types';

import Icon from './Icon'

/**
 * Кнопка
 *
 * @component
 * @example
 * <Button
 * id='id'
 * className='className'
 * size='small'
 * type='primary'
 * title='title'
 * onClick={() => console.log('click')}
 * invisible={false}
 * disabled={false}
 * icon={icon}
 * />
 *
 * id - id кнопки
 * className - стиль кнопки
 * size - размер (small, med, large)
 * type - тип (primary, secondary, tertiary, secondary-active, destructive, create)
 * title - Надпись внутри кнопки
 * onClick - Функция при нажатии на кнопку
 * invisible - Неотображать
 * disabled - Заблакировать
 * icon - Иконка
 */


const Button = (props) => {

   return props.invisible ? (<div/>) : (
      <button
         id={props.id}
         className={`bt  bt_${props.type} bt_${props.size} ${props.className}`}
         onClick={props.onClick}
         disabled={props.disabled}
      >
          <div className='row g10'>
              {props.icon ? <Icon icon={props.icon}/> : null}
              {props.title ? <div>{props.title}</div> : null}
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
