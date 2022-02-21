
import React from 'react'
import PropTypes from "prop-types";

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

Tabs.propTypes = {
    className: PropTypes.string,
    list: PropTypes.arrayOf(PropTypes.string),
    tab: PropTypes.number,
    func: PropTypes.func,
    tab_field: PropTypes.string
}
  
 export default Tabs

// className=''
// list=['tab1', 'tab2', 'tab3']
// tab={props.tab}
// func={() => console.log('set tab')}
// tab_field='tab_field' default 'tabs'
