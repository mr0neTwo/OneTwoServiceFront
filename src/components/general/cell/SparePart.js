import React from 'react'

const SparePart = (props) => {
    return (
        <td>
            <div className='nowrap'>{props.title}</div>
            <div className='cs nowrap'>{props.description}</div>
        </td>
    )
}

export default SparePart