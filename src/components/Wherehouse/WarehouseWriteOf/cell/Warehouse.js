import React from 'react'

import Icon from '../../../general/Icon'
import {checkObject} from '../../../general/utils'

const Warehouse = (props) => {

    if (!checkObject(props.writeof.warehouse)) {
        return <td/>
    }

    return (
        <td>
            <div className='row'>
                <Icon className='icon-s2' icon={props.writeof.warehouse.branch.icon} color={props.writeof.warehouse.branch.color}/>
                <div className='ml2'>{props.writeof.warehouse.title}</div>
            </div>
        </td>
    )
}

export default Warehouse