import React from 'react'

import {showDate} from '../../../general/utils'

const CreatedAt = (props) => {
    return (
        <td>
            <div>{props.reqsp.created_by.name}</div>
            <div className='orderDate'>{showDate(props.reqsp.created_at)}</div>
        </td>
    )
}

export default CreatedAt