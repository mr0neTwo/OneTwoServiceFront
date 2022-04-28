import React from 'react'
import { connect } from 'react-redux'
import { showPhone } from '../../general/utils'

const Client = props => {

   return props.permissions.includes('see_client') ? (
      <td>
      <div className="tableClientName noWr">{props.order.client.name}</div>
      <div className="orderDate noWr">{showPhone(props.order.client.phone[0].number)}</div>
    </td>
   ) : <td><div/></td>
}

const mapStateToProps = state => ({
    permissions: state.data.user.role.permissions
})
  
 export default connect(mapStateToProps)(Client)