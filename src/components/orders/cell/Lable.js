import React from 'react'
import { connect } from 'react-redux'
import {getOrder} from '../../../Redux/actions/orderActions'

const Lable = props => {
   return (
      <td className="orderLabel tableRow">
          <span
              className='link'
              onClick={() => props.getOrder(props.order.id)}
          >
              <span
                  className={props.order.urgent && props.order.status.group < 4 ? 'fire-text': null}
              >
                  { props.order.id_label }
              </span>
          </span>
      </td>
   )
}


const mapDispatchToProps ={
    getOrder
}
  
 export default connect(null, mapDispatchToProps)(Lable)