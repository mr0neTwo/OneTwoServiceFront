import React from 'react'


const Label = (props) => {

    return (
        <td>
            <span
                className='link'
                onClick={() => props.getReqSparePart(props.reqsp.id)}
            >
                {props.reqsp.label}
            </span>
        </td>
    )
}

export default Label