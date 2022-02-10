
import React, { useState } from 'react'
import { connect } from 'react-redux'

import { createSaveServicePrice } from '../../../../Redux/actions'

const ServicePrice = (props) => {

   const price = props.service_prices.find(price => price.discount_margin_id === props.margin_id && price.service_id === props.service_id)

   const [flag, setFlag] = useState(false)
   const [cost, setCost] = useState(price ? price.cost : 0)

   const handelChange = () => {
      setFlag(false)
      props.createSaveServicePrice(price ? price.id : null, parseFloat(cost), props.margin_id, props.service_id)
   }

   return (
      <td
         onDoubleClick={props.disabled ? null : () => setFlag(true)}
      >
         {flag ?  
         <input
            className='inputCell'
            onChange={event => setCost( event.target.value.replace(/[^0-9.]/g, '') )}
            value={cost}
            autoFocus={ true }
            onBlur={ handelChange }
            onKeyPress={event => {if (event.key === 'Enter') { handelChange() }}}
         /> :
         <div>{price ? price.cost : 0}</div>}
      </td>
   )
}

const mapStateToProps = state => ({
   service_prices: state.data.service_prices
   })

const mapDispatchToProps = {
   createSaveServicePrice
}
  
 export default connect(mapStateToProps, mapDispatchToProps)(ServicePrice)