import React from 'react'

import Icon from './Icon'
import { ICON } from '../../data/icons'

const WarningOrange = (props) => {

   return (
      <div
          style={{width: props.width}}
          className='warning'
      >
         <div>
            <Icon icon={ICON.WARNING} className='icon icon_32'/>
         </div>
         <div>{props.text}</div>
      </div>
   )
}

  
 export default WarningOrange