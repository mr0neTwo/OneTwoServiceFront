import React from 'react'

const Button = (props) => {
   return props.unvisible ? (<div/>) : (
      <button
         className={props.unvisible ? 'disabledButton' : props.className}
         onClick={props.onClick}
         disabled={props.unvisible || props.disabled}
      >
         {props.title}
      </button>
   )
}

 export default Button

 
// <Button
   // className='className'
   // title='title'
   // onClick={() => console.log('click')}
   // unvisible={false}
   // disabled={false}
// /> 