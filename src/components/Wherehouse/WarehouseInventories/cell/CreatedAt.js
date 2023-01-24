import React from 'react'

import {showDate} from '../../../general/utils'

const CreatedAt = (props) => {
    return (
        <td>
            <div>{props.inventory.created_by.name}</div>
            <div className='orderDate'>{showDate(props.inventory.created_at)}</div>
        </td>
    )
}

export default CreatedAt