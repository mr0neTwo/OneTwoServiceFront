import React from 'react'
import { connect } from 'react-redux'
import {Link} from 'react-router-dom'

const Lable = props => {
   return (
      <td className="orderLabel tableRow">
          <Link
              className='orderLink'
              to={{
                  pathname: `/orders/${props.data.id}`,
                  state: { order_id: props.data.id }
              }}
          >
              <span
                  className={props.data.urgent && props.data.status.group < 4 ? 'fire-text': null}
              >
                  { props.data.id_label }
              </span>
          </Link>
      </td>
   )
}


const mapDispatchToProps ={
}
  
 export default connect(null, mapDispatchToProps)(Lable)