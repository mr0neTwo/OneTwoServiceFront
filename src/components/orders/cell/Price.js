import React from 'react'
import { connect } from 'react-redux'

const Price = ({data: {price}}) => {
   return (
      <td className="tablePrice">
      <span>{price ? price : null}</span>
    </td>
   )
}

const mapStateToProps = state => ({
   //   dataSidebarRows: 'dataSidebarRows',
})
  
 export default connect(mapStateToProps)(Price)