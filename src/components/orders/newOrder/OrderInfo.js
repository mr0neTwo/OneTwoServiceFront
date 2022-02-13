import React from 'react'
import { connect } from 'react-redux'
import ChooseOfList from '../../general/ChooseOfList'

import AssingEmployee from './AssingEmployee'
import ClientCard from './ClientCard'
import SetClient from './SetClient'
import SetTypeOrder from './SetTypeOrder'
import TypeForm1 from './TypeForm1'

const OrderInfo = (props) => {
   return (
      <div className = 'contentTab'>

         <SetTypeOrder/>
         <div className="formRow">
            <div className="optionsTitle"></div>
            <div className="orderFormTitle">Клиент</div>
         </div>
         { props.permissions.includes('see_client') ?
            (Object.values(props.order.client).length ? <ClientCard/> : <SetClient/>)
         : null }
         <TypeForm1/>
         <AssingEmployee />
      </div>
   )
}

const mapStateToProps = state => ({
   order: state.order,
   permissions: state.data.user.role.permissions
})
  
 export default connect(mapStateToProps, null)(OrderInfo)