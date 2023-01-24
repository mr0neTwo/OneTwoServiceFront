import React from 'react'
import { connect } from 'react-redux'
import {setVisibleFlag} from '../../../../Redux/actions'
import {addWarehouseCategories, changeWarehouseForm} from '../../../../Redux/actions/warehouseAction'
import {addParts, changePartState, choosePartSelected, getPart} from '../../../../Redux/actions/partAction'

const PartName = (props) => {


    const part_id = props.remain ? props.remain.part_id : props.part.id
    const title = props.remain ?props.remain[props.header.field] : props.part.title

    return (
        <td>
            <span
                className='partLink'
                onClick={() => props.getPart(part_id)}
            >
                <span>{title}</span>
            </span>
        </td>

    )
}

const mapStateToProps = state => ({

})

const mapDispatchToProps = {
    getPart
}

export default connect(mapStateToProps, mapDispatchToProps)(PartName)