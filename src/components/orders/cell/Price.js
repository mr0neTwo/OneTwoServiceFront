import React from 'react'
import { connect } from 'react-redux'

const Price = props => {
   return (
      <td className="tablePrice">
      <span>{props.order.price || null}</span>
    </td>
   )
}

const mapStateToProps = state => ({
   //   dataSidebarRows: 'dataSidebarRows',
})
  
 export default connect(mapStateToProps)(Price)