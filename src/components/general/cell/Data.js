import React from 'react'

/**
 *
 * @example
 * <Data
 *   data={'data'}
 * />
 *
 * data - данные
 */
const Data = props => {

    if (props.invisibel) return null

    return (
        <td>
            <div className="cell">
                <div className='cell_text'>{props.data}</div>
            </div>
        </td>
    )
}



export default Data