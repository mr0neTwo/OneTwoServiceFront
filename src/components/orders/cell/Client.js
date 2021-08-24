import React from 'react'
import { connect } from 'react-redux'

const Client = ({data: {client}}) => {
   return (
      <td>
      <div className="tableClientName">{client.name}</div>
      <div className="orderDate">{client.phone}</div>
    </td>
   )
}

const mapStateToProps = state => ({
   //   dataSidebarRows: 'dataSidebarRows',
     // addTodo: todo => ref('todos').push(todo)
   })
  
 export default connect(mapStateToProps)(Client)