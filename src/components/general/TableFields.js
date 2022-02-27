
import React, { useEffect, useState, useRef } from 'react'

import Checkbox from './Checkbox'
import { icon_table } from '../../data/icons'


/**
 * Меню выбора полей таблицы для отображения
 *
 * id='id' // id компонента
 *
 * className='className' // Класс оболочки компонента
 *
 * height='200px' // Высота компонента
 *
 * list={props.list} // Список всех полей таблицы
 *
 * checked_list={props.checked_list} // Список выбраных палей таблицы
 *
 * func={() => console.log('choose element')} // функция выбора элементов
 *
 * field='field' // имя поля в редюссере списка выбраных полей таблицы
 *
 * @returns {JSX.Element}
 */
const TableFields = (props) => {

   const [listVisible, setListVisible] = useState(true)

   const clickHandel = (event) => {
      if (!event.path.map(el => el.id).includes(`tableFields${props.id}`) ) {
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

   useEffect(() => {
      setListVisible(false)
   }, [])
 

   return (
      <div 
         id={`tableFields${props.id}`}
         className={`tableFields ${props.className}`}
      >
         <div 
            className='chooseFieldButton pd1 h24'
            onClick = {()=> setListVisible(!listVisible)}
         >
            <div className='cl11'>
               <svg className="icon-table" viewBox="0 0 32 32">
                  <path d={icon_table}></path>
               </svg>
            </div>
            <div className='cl12'>
               <span className="fieldSeparate">&#6662;</span>
            </div>   
         </div>

         {listVisible ?
            <div 
               className='listOptions'
               style={{ minHeight : props.height}}
            >
               
                  <div className='checkbox'>
                     <input 
                        ref={ mainCheckbox }
                        type='checkbox' 
                        onChange={() => props.func(props.list.map(el => el.id), props.field)}
                        disabled={props.disabled}
                     />
                     <label>Все</label>
                  </div>
                  
            {props.list.map(field => {
               return(
               <div
                  key={field.id}
                  className='options'
               >
                  <Checkbox
                     className='ml10'
                     label={field.title}
                     onChange={() => props.func([field.id], props.field, true)}
                     checked={props.checked_list.includes(field.id)}
                  />
                  
               </div>
            )})}
         </div> : null}
      </div> 
   )
}

  
 export default TableFields

// id='id'
// className='className'
// height='200px'
// list={props.list}
// checked_list={props.checked_list}
// func={() => console.log('choose element')}
// field='field'
