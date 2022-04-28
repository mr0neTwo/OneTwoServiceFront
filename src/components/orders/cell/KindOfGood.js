import React from 'react'
import { connect } from 'react-redux'

const KindOfGood = props => {
   return (
     <td>
     <span className="tableText">
       {props.order.kindof_good.title}
     </span>
   </td>
   )
}

// const mapStateToProps = state => ({
   //   dataSidebarRows: 'dataSidebarRows',
// })
  
 export default connect(null, null)(KindOfGood)