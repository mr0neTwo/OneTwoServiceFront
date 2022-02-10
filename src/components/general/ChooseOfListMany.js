import React, { useEffect, useState, useRef } from 'react'

import Checkbox from './Checkbox'

const ChooseOfListMany = (props) => {

   const [listVisible, setListVisible] = useState(true)

   const clickHandel = (event) => {
      if (!event.path.map(el => el.id).includes(`chooseOfList${props.id}`) ) {
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

   const mainCheckbox = useRef()
  
   useEffect(() => {
      const values = props.list.filter(el => props.checked_list.includes(el.id))
      if (values.length === props.list.length) {
         mainCheckbox.current.indeterminate = false
         mainCheckbox.current.checked = true
      } else if (!values.length) {
         mainCheckbox.current.indeterminate = false
         mainCheckbox.current.checked = false
      } else {
         mainCheckbox.current.indeterminate = true
      }
   }, [props.checked_list])


   const showWord = (len) => {
      switch (len){

         case 0: {
            return 'Ничего не выбрано'
         }

         case props.list.length: {
            return 'Все'
         }

         default:
            return `Выбрано ${len}`
      }
   }
 

   return (
      <div 
         style={{width: props.width ? props.width : '250px'}} 
         id={`chooseOfList${props.id}`}
         className={props.className}
      >
         <div className='lableImput'>{props.title}</div>
         <div 
            className='optionsButton' 
            onClick={() => setListVisible(!listVisible)}
         >
            <span>
               {showWord(props.checked_list.length)}
            </span>
            <span>&#6662;</span>
         </div>
         {listVisible ?
            <div 
               className='listOptionsChoose'
               style={{width: props.width ? props.width : '250px'}} 
            >
               
                  <div className='checkbox'>
                     <input 
                        ref={ mainCheckbox }
                        type='checkbox' 
                        onChange={() => props.func(props.list.map(el => el.id))}
                        disabled={props.disabled}
                     />
                     <label>{props.mainLable}</label>
                  </div>
                  
            {props.list.map(element => {
               return(
               <div
                  key={element.id}
                  className='options'
               >
                  <Checkbox
                     className='ml10'
                     label={props.employee ? `${element.last_name} ${element.first_name}` : (element.title ? element.title : element.name)}
                     onChange={() => props.func([element.id])}
                     checked={props.checked_list.includes(element.id)}
                     disabled={props.disabled}
                  />
                  
               </div>
            )})}
         </div> : null}
      </div> 
   )
}

  
 export default ChooseOfListMany

// id='id'
// className='className'
// width='250px'
// title='title'
// mainLable='mainLable'
// list={props.list}
// checked_list={props.checked_list}
// func={() => console.log('choose element')}
// employee={false}
// disabled={props.disabled}