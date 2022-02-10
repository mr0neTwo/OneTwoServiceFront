
import React from 'react'


const Checkbox = (props) => {

   return (
      props.unvisible ? <div/> :
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

// className='className'
// label='label'
// onChange={() => console.log('change')}
// checked={props.checked}
// disabled={false}
// unvisible={false}