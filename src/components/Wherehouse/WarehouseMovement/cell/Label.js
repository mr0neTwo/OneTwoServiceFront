import React from 'react'


const Label = (props) => {

    return (
        <td>
            <span
                className='link'
                onClick={() => props.getMovement(props.movement.id)}
            >
                {props.movement.label}
            </span>
        </td>
    )
}

export default Label