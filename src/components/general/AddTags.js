import React, { useState } from 'react'


const AddTags = (props) => {

   const [inputValue, setInputValue] = useState('')

   const handelPresEnter = event =>{
      props.addTag(event.target.value)
      setInputValue('')
   }
   

   return (
   <div className={props.className}>
      <div className="lableImput">Теги</div>
      <div className='tagBox'> 
         <div className='icon_tag'/>
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
            className='optionFilterInput w150'
            onKeyPress={event => {if (event.key === 'Enter') {handelPresEnter(event)}}}
            value={inputValue}
            onChange={event => setInputValue(event.target.value)}
         />
      </div>
   </div>
   )
}

 export default AddTags

//  tags={}
//  daleteTag={}
//  addTag={}
