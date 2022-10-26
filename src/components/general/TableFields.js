
import React, { useEffect, useState, useRef } from 'react'

import Checkbox from './Checkbox'
import {icon_down, icon_table} from '../../data/icons'
import Icon from './Icon'
import {includesObject} from './utils'


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
 * field='table_headers' // имя поля в редюссере списка выбраных полей таблицы
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
      const values = props.list.filter(el => includesObject(el, props.checked_list))
      if (mainCheckbox.current) {
         if (values.length === props.list.length) {
            mainCheckbox.current.indeterminate = false
            mainCheckbox.current.checked = true
         } else if (!values.length) {
            mainCheckbox.current.indeterminate = false
            mainCheckbox.current.checked = false
         } else {
            mainCheckbox.current.indeterminate = true
         }
      }

   }, [props.checked_list])

   useEffect(() => {
      setListVisible(false)
   }, [])

 

   return (
      <div 
         id={`tableFields${props.id}`}
         style={{width: '67px', height: '26px'}}
         className={`tableFields ml10 ${props.className}`}
      >
         <div 
            className='chooseFieldButton pd1'
            onClick = {()=> setListVisible(!listVisible)}
         >
            <div className='cl11'>
               <Icon icon={props.icon || icon_table} className='icon-table'/>
            </div>
            <div className='cl12'>
                  <Icon icon={icon_down} className='icon-table'/>
            </div>
         </div>

         {listVisible ?
            <div 
               className={props.classNameMenu}
               style={{ minHeight : props.height}}
            >
               
                  <div className='checkbox'>
                     <input 
                        ref={ mainCheckbox }
                        type='checkbox' 
                        onChange={() => props.func(props.list, props.field || 'table_headers')}
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
                     onChange={() => props.func([field], props.field || 'table_headers', true)}
                     checked={includesObject(field, props.checked_list)}
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
