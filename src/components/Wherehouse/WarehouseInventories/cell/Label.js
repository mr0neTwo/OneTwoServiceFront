import React from 'react'


const Label = (props) => {

    return (
        <td>
            <span
                className='link'
                onClick={() => props.getInventory(props.inventory.id)}
            >
                {props.inventory.label}
            </span>
        </td>
    )
}

export default Label