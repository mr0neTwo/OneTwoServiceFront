import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'

import ChooseOfList from '../../general/ChooseOfList'

import { changeOrderFormS } from '../../../Redux/actions'

const SetTypeOrder = (props) => {

 
  return (

    <div className = 'formRow mt15'>
      <div className='optionsTitle'>Тип заказа</div> 
      <div className='blockImput'>
        <ChooseOfList
          id={17}
          list={ props.order_type }
          setElement={props.changeOrderFormS}
          current_id={ props.order.order_type_id }
          width='150px'
          className='pd-lf-5'
          field='order_type_id'
          disabled={!props.permissions.includes('edit_info_orders') || props.order.status_group > 3}
        /> 
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  order_type: state.data.order_type,
  order: state.order,
  permissions: state.data.user.role.permissions
})


const mapDispatchToProps = {
  changeOrderFormS
}
  
export default connect(mapStateToProps, mapDispatchToProps)(SetTypeOrder)