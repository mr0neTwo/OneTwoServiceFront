import React from 'react'
import { connect } from 'react-redux'

const EngineerNotes = ({data: {engineer_notes}}) => {
   return (
     <td>
     <div className="tableText tableOne">
       {engineer_notes}
     </div>
   </td>
   )
}

const mapStateToProps = state => ({
   //   dataSidebarRows: 'dataSidebarRows',
})
  
 export default connect(mapStateToProps)(EngineerNotes)