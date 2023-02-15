import React from 'react'

import Icon from '../Icon'
import {ICON} from '../../../data/icons'

/**
 *
 * @componet
 * @example
 * <PartCount
 *   min_residue={remain.min_residue}
 *   count={remain.count}
 * />
 *
 * min_residue - минимальный допустимый остаток
 * count - остаток
 */
const PartCount = (props) => {

        return (
            <td>
                <div className='cell'>
                    <div className='cell_text-icon'>
                        <span>{props.count}</span>
                        <Icon
                            className='icon'
                            icon={ICON.WARNING}
                            invisible={props.min_residue < props.count}
                        />
                    </div>
                </div>
            </td>
        )

}

export default PartCount