import React from 'react'

import Icon from '../Icon'
import {ICON} from '../../../data/icons'

const Equipment = props => {
    return (
        <td>
            <div className="cell row ai-c g6 ">
                <Icon
                    className='icon icon_32'
                    icon={ICON[props.order.kindof_good.icon]}
                    color='var(--main)'
                    invisible={!props.order.kindof_good.icon}
                />
                <div className='colm w100p'>
                    <div className='row'>
                        {props.order.kindof_good.icon ? null : <span className="nowrap">{props.order.kindof_good.title}</span>}
                        <span className="ml5 nowrap">{props.order.brand.title}</span>
                    </div>
                    <div className='row'>
                        <span className='nowrap'>{props.order.subtype.title}</span>
                        <span className="ml5 nowrap">{props.order.model.title}</span>
                    </div>
                </div>
            </div>
        </td>
    )
}

export default Equipment