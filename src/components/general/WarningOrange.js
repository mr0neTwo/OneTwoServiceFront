import React from 'react'

import Icon from './Icon'
import { ICON } from '../../data/icons'

const WarningOrange = (props) => {
   return (
      <div 
         className='warningOrange'
         style={{width: props.width}}
      >
         <div><Icon icon={ICON.WARNING} color='#efac4e'/></div>
         <div className='ml10'>{props.text}</div>
      </div>
   )
}

  
 export default WarningOrange