import React from 'react'

import Icon from '../../../general/Icon'
import {checkObject} from '../../../general/utils'

const Warehouse = (props) => {

    if (!checkObject(props.inventory.warehouse)) {
        return <td/>
    }

    return (
        <td>
            <div className='row'>
                <Icon className='icon-s2' icon={props.inventory.warehouse.branch.icon} color={props.inventory.warehouse.branch.color}/>
                <div className='ml2'>{props.inventory.warehouse.title}</div>
            </div>
        </td>
    )
}

export default Warehouse