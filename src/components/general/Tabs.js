
import React from 'react'

const Tabs = (props) => {
   return (
      <div className='tabs'>
         {props.list.map((tab, idx) => (
            <div 
               key={idx}
               className={props.tab === idx ? 'tabOn' : 'tab'}
               onClick={() => props.func(idx, props.tab_field ? props.tab_field : 'tabs')}
            >
               {tab}
            </div>
         ))}
      </div>

   )
}

  
 export default Tabs