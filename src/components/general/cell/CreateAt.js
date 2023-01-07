import React from 'react'
import {showDate} from '../utils'


const CreatedAt = (props) => {
    return (
        <td>
            <div className='colm cell'>
                <div className='nowrap'>{props.creator}</div>
                <div className='cs nowrap'>{showDate(props.date)}</div>
            </div>

        </td>
    )
}

export default CreatedAt