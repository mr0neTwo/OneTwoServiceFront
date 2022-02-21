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
})
  
 export default connect(mapStateToProps)(Malfunction)