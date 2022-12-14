import React from 'react'

const Order = (props) => {
    return (
        <td>
            <div>{(props.reqsp.amount * props.reqsp.cost + props.reqsp.delivery_cost).toFixed(2)}</div>
        </td>
    )
}

export default Order