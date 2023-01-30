import React from 'react'

const Data = props => {
    return (
        <td>
            <div className="cell">
                <div className='cell_text'>{props.data}</div>
            </div>
        </td>
    )
}



export default Data