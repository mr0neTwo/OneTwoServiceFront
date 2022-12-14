import React from 'react'

import {checkObject, showPhone} from '../../../general/utils'

const Client = (props) => {

    if (!checkObject(props.client)) return <td/>

    return (
        <td>
            <div className=''>{props.client.name}</div>
            {props.client.phone.map(phone => (
                <div key={phone.id}>
                    {showPhone(phone.number)}
                </div>
            ))}
        </td>
    )
}

export default Client