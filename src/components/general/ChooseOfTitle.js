
import React, { useEffect, useState } from 'react'

const ChooseOfTitle = (props) => {

   const [listVisible, setListVisible] = useState(false)

   const clickHandel = (event) => {
      if (!event.path.map(el => el.id).includes(`chooseOfTitle${props.id}`) ) {
         if (listVisible) {
            setListVisible(false)
      }}
    }
   
    useEffect(() => {
      window.addEventListener('click', clickHandel)
      return () => {
        window.removeEventListener('click', clickHandel)
      }
    })

    const current = props.list.find(element => element === props.current_element)

 

   return (
      <div 
      style={{width: props.width ? props.width : '250px'}} 
      id={`chooseOfTitle${props.id}`}
      className={props.className}
      >
         <div className='lableImput'>{props.title}</div>
         <div 
            className='optionsButton' 
            onClick={props.disabled ? null : () => setListVisible(!listVisible)}
         >
            <span>
               {props.current_element ? props.current_element : 'Выберете тип'}
            </span>
            <span>&#6662;</span>
         </div>
         {listVisible ?
            <div 
               className='listOptionsChoose'
               style={{width: props.width ? props.width : '250px'}} 
            >
            {props.list.map((element, idx) => {
               return(
               <div
                  key={idx}
                  className='options'
                  onClick={() => {
                  props.setElement(element, props.field ? props.field : null)
                  setListVisible(false)
                  }}
               >
                  {element}
               </div>
            )})}
         </div> : null}
      </div> 
   )
}

  
 export default ChooseOfTitle


// id={}
// className=''
// width='250px'
// title=''
// list={}
// current_element={}
// setElement={}
// field={}
// disabled={}
