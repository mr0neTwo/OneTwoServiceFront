import React from 'react'
import PropTypes from "prop-types";

import Icon from './Icon'

/**
 * Чек бокс с подписью
 *
 * className='className'
 *
 * label='label'
 *
 * onChange={() => console.log('change')}
 *
 * checked={props.checked}
 *
 * icon={icon}
 *
 * iconClassName='iconClassName'
 *
 * iconColor='black'
 *
 * disabled={false}
 *
 * invisible={false}
 *
 * @returns {JSX.Element}
 *
 */

const Checkbox = (props) => {

   return (
      props.invisible ? <div/> :
      <div className={`checkbox ${props.className}`}>
         <input 
            type='checkbox'
            onChange={props.onChange}
            checked={props.checked}
            disabled={props.disabled}
         />
         <label>
             {props.icon ? <Icon className={props.iconClassName} icon={props.icon} color={props.iconColor}/> : null}
             <span className='ml2 noWr'>{props.label}</span>
         </label>
      </div>
   )
}

Checkbox.propTypes ={
    className: PropTypes.string,
    label: PropTypes.string,
    onChange: PropTypes.func,
    checked: PropTypes.bool,
    disabled: PropTypes.bool,
    invisible: PropTypes.bool
}

 export default Checkbox

// className='className'
// label='label'
// onChange={() => console.log('change')}
// checked={props.checked}
// disabled={false}
// invisible={false}