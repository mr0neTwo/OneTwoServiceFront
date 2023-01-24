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
 * className='className'
 * list={props.list}
 * func={table_headers => console.log('table_headers')}
 * invisible={false}
 * />
 *
 * className - Стиль контейнера компонента
 * list - Список всех полей таблицы
 * func - функция возвращает обновленный список полей
 * invisible - не отображать элемент
 *
 * @returns {JSX.Element}
 */
const TableFields = (props) => {

   const [listVisible, setListVisible] = useState(true)

   const element = useRef()

   const clickHandel = (event) => {
      if (element.current && listVisible && !element.current.contains(event.target)) {
         setListVisible(false)
      }
   }
   
   useEffect(() => {
      window.addEventListener('click', clickHandel)
      return () => {
        window.removeEventListener('click', clickHandel)
      }
   })

   useEffect(() => {
      setListVisible(false)
   }, [])

   const handleChange = (field_id, checked) => {
      const table_headers = props.list.map(field => {
         if (field.id === field_id) {
            field.visible = checked
         }
         return field
      })
      props.func(table_headers)
   }

   if (props.invisible) return <div/>

   return (
       <div
          ref={element}
          className={`field-options ${props.className}`}
       >
          <Button
              size='med'
              type='tertiary'
              onClick={() => setListVisible(true)}
              icon={ICON.TABLE}
              iconClassName='icon'
          />
          {listVisible ?
              <div className='field-options__drop-list'>
                 <div
                     className='field-options__title'
                     onClick={() => setListVisible(false)}
                 >
                    <div className='nowrap'>Поля таблицы</div>
                    <Icon className='icon' icon={ICON.TABLE}/>
                 </div>
                 <div className='field-options__drop-items'>
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
                                  onChange={event => handleChange(field.id, event.target.checked)}
                                  checked={field.visible}
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
