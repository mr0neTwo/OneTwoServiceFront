import React from 'react'


const Label = (props) => {

    return (
        <td>
            <span
                className='link'
                onClick={() => props.getWriteOf(props.writeof.id)}
            >
                {props.writeof.label}
            </span>
        </td>
    )
}

export default Label