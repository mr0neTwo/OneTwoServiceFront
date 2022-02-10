import React from 'react'
import { connect } from 'react-redux'

const Brand = ({data: {brand}}) => {
   return (
     <td>
     <span className="tableText">
       {brand.title}
     </span>
   </td>
   )
}

const mapStateToProps = state => ({
   //   dataSidebarRows: 'dataSidebarRows',
     // addTodo: todo => ref('todos').push(todo)
   })
  
 export default connect(mapStateToProps)(Brand)