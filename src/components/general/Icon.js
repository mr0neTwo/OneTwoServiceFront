
import React from 'react'


const Icon = (props) => {
   return (
      <svg 
         className={props.className ? props.className : 'icon-branch'}
         viewBox={props.viewBox ? props.viewBox : '0 0 32 32'}
         style={{ fill: props.color }}      >
         <path d={props.icon}/>
      </svg> 
   )
}


  
 export default Icon