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
      let className = 'input-label'
      if (props.className) className += ` ${props.className}`
      if (focus) className += ' input-label_focus'
      return className
   }, [props.className, focus])

   return (
   <div
       className={mainClassName}
   >
      <div className="label input-label__label">Теги</div>

      <div className='input input-label__input'>
         <Icon
             className='icon'
             icon={ICON.TAG}
         />
         {props.tags.map((tag, idx) => 
         <div className='tag' key={idx}>
            <div 
               className='icon_close'
               onClick={() => props.daleteTag(idx)}
            />
            <div>{tag}</div>
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
