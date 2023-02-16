import React from 'react'

import Icon from '../Icon'

/**
 *
 * @componet
 * @example
 * <PartCount
 *   title='title'
 *   icon={ICON.ICON}
 *   color='red'
 * />
 *
 * min_residue - минимальный допустимый остаток
 * count - остаток
 * color - цвет иконки
 */
const IconTitle = (props) => {

    return (
        <td>
            <div className='cell'>
                <div className='cell_text-icon'>
                    <Icon
                        className='icon'
                        icon={props.icon}
                        color={props.color || null}
                    />
                    <span>{props.title}</span>
                </div>
            </div>
        </td>
    )
}

export default IconTitle