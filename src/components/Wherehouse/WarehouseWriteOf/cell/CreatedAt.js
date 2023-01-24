import React from 'react'

import {showDate} from '../../../general/utils'

const CreatedAt = (props) => {
    return (
        <td>
            <div>{props.writeof.created_by.name}</div>
            <div className='orderDate'>{showDate(props.writeof.created_at)}</div>
        </td>
    )
}

export default CreatedAt