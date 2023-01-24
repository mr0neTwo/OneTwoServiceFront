import React from 'react'


const SparePart = (props) => {
    return (
        <td>
            <div>{props.reqsp.part.title}</div>
            <div className='orderDate'>{props.reqsp.part.description}</div>
        </td>
    )
}

export default SparePart