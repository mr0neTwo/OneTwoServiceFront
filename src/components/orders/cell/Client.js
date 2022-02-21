import React from 'react'
import { connect } from 'react-redux'
import { showPhone } from '../../general/utils'

const Client = ({data: {client}}) => {
   return (
      <td>
      <div className="tableClientName">{client.name}</div>
      <div className="orderDate">{showPhone(client.phone[0].number)}</div>
    </td>
   )
}

const mapStateToProps = state => ({
   //   dataSidebarRows: 'dataSidebarRows',
})
  
 export default connect(mapStateToProps)(Client)