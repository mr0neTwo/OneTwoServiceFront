import React from 'react'
import { connect } from 'react-redux'

const Lable = ({data: {id_label, urgent}}) => {
   return (
      <td className="orderLabel tableRow">
         <span className={urgent ? 'fire-text': null}>{ id_label }</span>
      </td>
   )
}

const mapStateToProps = state => ({
   //   dataSidebarRows: 'dataSidebarRows',
     // addTodo: todo => ref('todos').push(todo)
   })
  
 export default connect(mapStateToProps)(Lable)