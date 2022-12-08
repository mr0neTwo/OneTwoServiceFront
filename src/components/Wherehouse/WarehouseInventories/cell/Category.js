import React from 'react'

import {checkObject} from '../../../general/utils'

const Category = (props) => {

    if (!checkObject(props.inventory.warehouse_category)) {
        return <td/>
    }

    return (
        <td>
            <div>{props.inventory.warehouse_category.title}</div>
        </td>
    )
}

export default Category