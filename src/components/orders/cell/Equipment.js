import React from 'react'
import { connect } from 'react-redux'

import Icon from '../../general/Icon'

const Equipment = ({ data }) => {
   return (
     <td>
         <div className="tableText row">
            <div>
               <img
                  className="icon_equipment"
                  src={data.kindof_good.icon}
               />
            </div>
            <div>
               <div className='noWr'>
                  {data.kindof_good.icon ? null : <span className="">{data.kindof_good.title}</span>}
                  <span className="ml5">{data.brand.title}</span>
               </div>
               <div className='noWr'>
                  <span>{data.subtype.title}</span>
                  <span className="orderDate ml5">{data.model.title}</span>
               </div>
            </div>
         </div>
      </td>
   )
}

const mapStateToProps = state => ({
   //   dataSidebarRows: 'dataSidebarRows',
})
  
 export default connect(mapStateToProps)(Equipment)