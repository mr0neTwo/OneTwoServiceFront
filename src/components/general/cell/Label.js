import React from 'react'

import {ICON} from '../../../data/icons'
import Icon from '../Icon'

const Label = props => {
    return (
        <td>
            <div className='cell cell_label'>
                <div
                    className='nowrap'
                    onClick={() => props.func()}
                >
                    {props.label}
                </div>
                <Icon
                    icon={ICON.FIRE}
                    className='icon icon_20'
                    invisible={!props.urgent}
                />

            </div>
        </td>
    )
}


export default Label