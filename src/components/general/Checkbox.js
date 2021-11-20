
import React from 'react'


const Checkbox = (props) => {

   return (
      <div className={`checkbox ${props.className}`}>
         <input 
            type='checkbox'
            onChange={props.disabled ? null : props.onChange}
            checked={props.checked}
         />
         <label>{props.label}</label>
      </div>
   )
}

 export default Checkbox

//  className =
//  label =
//  onChange = 
//  checked = 
//  disabled =