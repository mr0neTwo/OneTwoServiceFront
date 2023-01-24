import React from 'react'
import {connect} from 'react-redux'

import TableHeader from '../../general/TableHeader'
import CreatedAt from './cell/CreatedAt'
import Label from './cell/Label'
import {changeWriteOfState, getWriteOf} from '../../../Redux/actions/writeOfAction'
import Warehouse from './cell/Warehouse'

const WriteOfTable = (props) => {

    const chooseCell = (header, write_of) => {

        switch (header.id) {
            case 1: return <Label key={header.id} writeof={write_of} getWriteOf={props.getWriteOf}/>
            case 2: return <CreatedAt key={header.id} writeof={write_of}/>
            case 3: return <Warehouse key={header.id} writeof={write_of}/>
            default: return <td key={header.id}>{write_of[header.field]}</td>
        }
    }

    const handleEdit = (write_of) => {
        props.getWriteOf(write_of.id)
    }

    return (
        <div className='tableOrdersBox mt15'>
            <table id='tableWarehouse'>
                <thead>
                    <tr>
                        {props.writeof.table_headers.map(header => (
                            <TableHeader
                                key={header.id}
                                header={header}
                                changeState={props.changeWriteOfState}
                                headers={props.writeof.table_headers}
                                // sort_field={props.writeof.sort_field}
                                // sort={props.writeof.sort}
                            />
                        ))}
                    </tr>
                </thead>
                <tbody>
                {props.writeof.write_offs.map(write_of => (
                    <tr
                        key={write_of.id}
                        onDoubleClick={() => handleEdit(write_of)}
                    >
                        {props.writeof.table_headers.map(header => chooseCell(header, write_of))}
                    </tr>
                ))}
                </tbody>
            </table>

        </div>
    )
}

const mapStateToProps = state => ({
    writeof: state.writeof,
    view: state.view
})

const mapDispatchToProps = {
    changeWriteOfState,
    getWriteOf
}

export default connect(mapStateToProps, mapDispatchToProps)(WriteOfTable)