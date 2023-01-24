import React from 'react'


const Label = (props) => {

    return (
        <td>
            <span
                className='link'
                onClick={() => props.getBack(props.back.id)}
            >
                {props.back.label}
            </span>
        </td>
    )
}

export default Label