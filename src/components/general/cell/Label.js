import React from 'react'

import {ICON} from '../../../data/icons'
import Icon from '../Icon'

const Label = props => {
    return (
        <td>
            <div className='cell'>
                <div className='cell-label'>
                    <Icon
                        icon={ICON.FIRE}
                        className='icon-20 mb4'
                        invisible={!props.urgent}
                        color='var(--dark-error)'
                    />
                    <div
                        className='cell-label f-large'
                        onClick={() => props.func()}
                    >
                        {props.label}
                    </div>
                </div>
            </div>
        </td>
    )
}


export default Label