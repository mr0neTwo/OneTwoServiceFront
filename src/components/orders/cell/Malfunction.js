import React from 'react'
import { connect } from 'react-redux'

const Malfunction = ({data: {malfunction}}) => {
   return (
    <td>
      <div className="tableText tableOne">
         {malfunction}
      </div>
   </td>
   )
}

const mapStateToProps = state => ({
   //   dataSidebarRows: 'dataSidebarRows',
     // addTodo: todo => ref('todos').push(todo)
   })
  
 export default connect(mapStateToProps)(Malfunction)