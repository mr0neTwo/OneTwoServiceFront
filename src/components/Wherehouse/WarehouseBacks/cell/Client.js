import React from 'react'

import {showPhone} from '../../../general/utils'

const Warehouse = (props) => {


    return (
        <td>
            <div className=''>{props.back.client.name}</div>
            {props.back.client.phone.map(phone => (
                <div key={phone.id}>
                    {showPhone(phone.number)}
                </div>
            ))}
        </td>
    )
}

export default Warehouse