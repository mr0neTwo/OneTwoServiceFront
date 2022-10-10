import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import {createSaveServicePrice} from '../../../../Redux/actions/priceAction'


const ServicePrice = (props) => {

    const price = props.service_prices.find(price => price.discount_margin_id === props.margin_id && price.service_id === props.service_id)

    //
    // console.log(`margin_id: ${props.margin_id}, service_id: ${props.service_id}`)
    // console.log(price ? price.id : 'no')

    const [flag, setFlag] = useState(false)

    const [cost, setCost] = useState(price ? price.cost : 0)

    const handelChange = () => {
      setFlag(false)
      props.createSaveServicePrice(price ? price.id : null, parseFloat(cost), props.margin_id, props.service_id)
    }

    const handleEdit = () => {
       if (!props.disabled) {
          setCost(price ? price.cost : 0)
          setFlag(true)
       }
    }

    return (
        <td
            onDoubleClick={ handleEdit }
        >
            {flag ?
                <input
                    className='inputCell'
                    onChange={event => setCost(event.target.value.replace(/[^0-9.]/g, ''))}
                    value={cost}
                    autoFocus={true}
                    onBlur={handelChange}
                    onKeyPress={event => {
                        if (event.key === 'Enter') {
                            handelChange()
                        }
                    }}
                />
                :
                <div>{price ? price.cost : 0}</div>
            }
        </td>
    )
}

const mapStateToProps = state => ({
   service_prices: state.price.service_prices
})

const mapDispatchToProps = {
    createSaveServicePrice
}

export default connect(mapStateToProps, mapDispatchToProps)(ServicePrice)