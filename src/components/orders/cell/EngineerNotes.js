import React from 'react'
import { connect } from 'react-redux'

const EngineerNotes = props => {
   return (
     <td>
     <div className="tableText tableOne">
       {props.order.engineer_notes}
     </div>
   </td>
   )
}

const mapStateToProps = state => ({
   //   dataSidebarRows: 'dataSidebarRows',
})
  
 export default connect(mapStateToProps)(EngineerNotes)