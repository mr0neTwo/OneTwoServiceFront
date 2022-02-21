import React from 'react'
import { connect } from 'react-redux'

const KindOfGood = ({data: {kindof_good}}) => {
   return (
     <td>
     <span className="tableText">
       {kindof_good}
     </span>
   </td>
   )
}

const mapStateToProps = state => ({
   //   dataSidebarRows: 'dataSidebarRows',
})
  
 export default connect(mapStateToProps)(KindOfGood)