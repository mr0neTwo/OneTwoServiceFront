import React from 'react'
import { connect } from 'react-redux'

const Price = ({data: {price}}) => {
   return (
      <td className="tablePrice">
      <span>{price ? price : null}</span>
    </td>
   )
}

const mapStateToProps = state => ({
   //   dataSidebarRows: 'dataSidebarRows',
     // addTodo: todo => ref('todos').push(todo)
   })
  
 export default connect(mapStateToProps)(Price)