import React from 'react'

const PartPrice = (props) => {

    return (
        <td className='tac'>
            {props.remain[`price_${props.header.margin_id}`] ? props.remain[`price_${props.header.margin_id}`] : 0}
        </td>
    )
}

export default PartPrice