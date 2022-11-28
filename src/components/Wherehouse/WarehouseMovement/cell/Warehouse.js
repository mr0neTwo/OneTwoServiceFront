import React from 'react'

import Icon from '../../../general/Icon'
import {checkObject} from '../../../general/utils'

const Warehouse = (props) => {

    if (!checkObject(props.warehouse)) {
        return <td/>
    }

    return (
        <td>
            <div className='row'>
                <Icon className='icon-s2' icon={props.warehouse.branch.icon} color={props.warehouse.branch.color}/>
                <div className='ml2'>{props.warehouse.title}</div>
            </div>
        </td>
    )
}

export default Warehouse