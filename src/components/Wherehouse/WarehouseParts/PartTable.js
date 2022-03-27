import React from 'react'
import { connect } from 'react-redux'

import { setVisibleFlag } from '../../../Redux/actions'
import {editPart} from '../../../Redux/actions/partAction'
import {part_table_headers} from '../../../data/tableHeaders'
import {changeWarehouseForm} from '../../../Redux/actions/warehouseAction'


function PartTable (props) {


    const handleEdit = (part) => {
        props.editPart(part)
        props.setVisibleFlag('statusPartEditor', true)
        props.changeWarehouseForm(props.warehouse.current_category, 'current_parent_category')
    }

    const table_heards = part_table_headers.filter(part => props.part.choosed_headers.includes(part.id))

    return (
        <table className='mt15'>
            <thead>
            <tr>
                {table_heards.map(header => (
                    <th key={header.id}>{header.title}</th>
                ))}
            </tr>
            </thead>
            <tbody>
            {props.part.parts.map(part => (
                    <tr
                        key={part.id}
                        className={part.deleted ? 'rowDeleted' : null}
                        onDoubleClick={() => handleEdit(part)}
                    >
                        {table_heards.map(header => {
                            if (header.field === 'doc_url')
                                return (
                                    <td key={header.title + part.id}>
                                        {part[header.field] ?
                                            <a
                                                href={`${process.env.PUBLIC_URL}/${part[header.field]}`}
                                                target='_blank'
                                            >
                                                {part[header.field].split('/').pop()}
                                            </a>
                                            : null
                                        }
                                    </td>
                                )
                            if (header.field === 'warehouse_category')
                                return <td key={header.title + part.id}>{part[header.field].title}</td>
                            return <td key={header.title + part.id}>{part[header.field]}</td>
                        })}
                    </tr>
                )
            )}
            </tbody>
        </table>
    )
}

const mapStateToProps = state => ({
    part: state.part,
    warehouse: state.warehouse
})

const mapDispatchToProps = {
    setVisibleFlag,
    editPart,
    changeWarehouseForm
}


export default connect (mapStateToProps, mapDispatchToProps) (PartTable)