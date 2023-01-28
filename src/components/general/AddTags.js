import React, {useMemo, useState} from 'react'
import Icon from './Icon'
import {ICON} from '../../data/icons'


const AddTags = (props) => {

   const [focus, setFocus] = useState(false)
   const [inputValue, setInputValue] = useState('')

   const handelPresEnter = event =>{
      props.addTag(event.target.value)
      setInputValue('')
   }

   const mainClassName = useMemo(() => {
      let className = 'tag'
      if (props.className) className += ` ${props.className}`
      if (focus) className += ' tag_active'
      return className
   }, [props.className, focus])

   return (
   <div
       className={mainClassName}
   >
      <div className="label input-label__label">Теги</div>


         <div className='tag__box'>
            <Icon
                className='icon'
                icon={ICON.TAG}
            />
            {props.tags.map((tag, idx) =>
            <div className='tag__tag' key={idx}>
               <div className='nowrap'>{tag}</div>
               <div
                  className='tag__icon'
                  onClick={() => props.daleteTag(idx)}
               >
                  <Icon
                      className='icon'
                      icon={ICON.CANCEL}
                  />
               </div>
            </div>)
            }
            <input
               className=''
               onKeyPress={event => {if (event.key === 'Enter') {handelPresEnter(event)}}}
               value={inputValue}
               onChange={event => setInputValue(event.target.value)}
               onFocus={() => setFocus(true)}
               onBlur={() => setFocus(false)}
            />
         </div>
   </div>
   )
}

 export default AddTags

//  tags={}
//  daleteTag={}
//  addTag={}
