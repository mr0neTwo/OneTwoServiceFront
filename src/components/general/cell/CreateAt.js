import React from 'react'
import {showDate} from '../utils'


const CreatedAt = (props) => {
    return (
        <td>
            <div className='cell cell_date'>
                <div className='cell_text'>{props.creator}</div>
                <div className='cs cell_text'>{showDate(props.date)}</div>
            </div>

        </td>
    )
}

export default CreatedAt