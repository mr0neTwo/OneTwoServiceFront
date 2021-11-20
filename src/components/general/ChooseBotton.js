
import React, { useState } from 'react'

const ChooseBotton = (props) => {

   const [stateButton, setStateButton] = useState(props.checked ? props.checked : false)

   return (
      <div className={props.className}>
         <div className='lableImput'>{props.title}</div>
         <div className='checkButton'>
            <div 
            className={stateButton ? 'checkButtonTwo' : 'checkButtonOne'}
            onClick={props.disabled ? null : () => {
               setStateButton(true)
               props.func1()
            }}
            > 
               {props.name[0]}
            </div>
            <div 
            className={stateButton ? 'checkButtonOne' : 'checkButtonTwo'}
            onClick={props.disabled ? null :() => {
               setStateButton(false)
               props.func2()
            }}
            >
               {props.name[1]}
            </div>
         </div>
      </div>
   )
}

 export default ChooseBotton




//  className= Класс
//  title= Подпись
//  name={['Имя1', 'Имя2']}
//  func1 = {() => function()}
//  func2 = {() => function()}
//  checked = { true }
//  disabled= заблокировать