import React from 'react'

const Executor = (props) => {
    return (
        <td>
            <div>{props.reqsp.executor.name}</div>
        </td>
    )
}

export default Executor