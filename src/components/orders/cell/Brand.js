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
})
  
 export default connect(mapStateToProps)(Brand)