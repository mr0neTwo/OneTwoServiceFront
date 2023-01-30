

import React from 'react'

import { ICON } from '../../data/icons'

import Icon from './Icon'

const SearchInput = (props) => {

   return (
     
      <div className={`searchBox ${props.className}`}>
         <input 
            className={`searchInput ${props.disabled ? 'ds' : null}`}
            style={{
               width: props.width ? props.width : '100%'
            }}
            name={props.name}
            onChange={props.onChange}
            value={props.value}
            disabled={props.disabled}
         />
         <Icon 
            className='icon-s4'
            icon={ICON.SEARCH}
            color='grey'
         />
      </div>
   )
}


  
 export default SearchInput


//  className=''
//  width=''
//  name=''
//  onChange={}
//  value={}
//  disabled={}
