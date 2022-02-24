
import React from 'react'
import PropTypes from "prop-types";

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
 * disabled={false}
 *
 * unvisible={false}
 *
 * @returns {JSX.Element}
 *
 */

const Checkbox = (props) => {

   return (
      props.unvisible ? <div/> :
      <div className={`checkbox ${props.className}`}>
         <input 
            type='checkbox'
            onChange={ props.onChange}
            checked={props.checked}
            disabled={props.disabled}
         />
         <label>{props.label}</label>
      </div>
   )
}

Checkbox.propTypes ={
    className: PropTypes.string,
    label: PropTypes.string,
    onChange: PropTypes.func,
    checked: PropTypes.bool,
    disabled: PropTypes.bool,
    unvisible: PropTypes.bool
}

 export default Checkbox

// className='className'
// label='label'
// onChange={() => console.log('change')}
// checked={props.checked}
// disabled={false}
// unvisible={false}