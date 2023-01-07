import React, { useEffect, useState, useRef } from 'react'

import Checkbox from './Checkbox'
import {ICON} from '../../data/icons'
import Icon from './Icon'
import {includesObject} from './utils'
import Button from './Button'


/**
 * Меню выбора полей таблицы для отображения
 * @component
 * @example
 * <TableFields
 * id='id'
 * className='className'
 * list={props.list}
 * checked_list={props.checked_list}
 * func={() => console.log('choose element')}
 * field='table_headers'
 * invisible={false}
 * />
 *
 * id - id компонента
 * className - Стиль контейнера компонента
 * list - Список всех полей таблицы
 * checked_list - Список выбраных палей таблицы
 * func - функция выбора элементов
 * field - имя поля в редюссере списка выбраных полей таблицы default-table_headers
 * invisible - не отображать элемент
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

   if (props.invisible) return <div/>

   return (
       <div
           id={`tableFields${props.id}`}
           className={`table-field-container ${props.className}`}
       >
          <Button
              size='small'
              type='secondary'
              onClick={() => setListVisible(!listVisible)}
              icon={ICON.TABLE}
              iconClassName='icon-16'
          />
          {listVisible ?
              <div className='drop-list'>
                 <div className='table-field'>
                    <div className='nowrap'>Поля таблицы</div>
                    <Icon className='icon-16' icon={ICON.TABLE}/>
                 </div>
                 <div className='drop-items pd5 colm g6'>
                    {props.list.map(field => {
                       return (
                           <div
                               key={field.id}
                               className='options'
                           >
                              <Checkbox
                                  id={field.id}
                                  className='ml10'
                                  type='slide-one'
                                  label={field.title}
                                  onChange={() => props.func([field], props.field || 'table_headers', true)}
                                  checked={includesObject(field, props.checked_list)}
                              />
                           </div>
                       )
                    })}
                 </div>

              </div> : null}

       </div>
   )
}

  
 export default TableFields
