import React from 'react'

import {showDate} from '../../../general/utils'

const CreatedAt = (props) => {
    return (
        <td>
            <div>{props.back.created_by.name}</div>
            <div className='orderDate'>{showDate(props.back.created_at)}</div>
        </td>
    )
}

export default CreatedAt