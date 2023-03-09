import React from 'react'
import {connect} from 'react-redux'

import TableHeader from '../../general/TableHeader'
import {changeWriteOfState, getWriteOf} from '../../../Redux/actions/writeOfAction'
import Label from "../../general/cell/Label";
import CreatedAt from "../../general/cell/CreateAt";
import IconTitle from "../../general/cell/IconTitle";
import Data from "../../general/cell/Data";

const WriteOfTable = (props) => {

    const chooseCell = (header, write_of) => {

        if (!header.visible) return null

        switch (header.id) {
            case 1:
                return (
                    <Label
                        key={header.id}
                        label={write_of.label}
                        func={() => props.getWriteOf(write_of.id)}
                    />
                )
            case 2:
                return (
                    <CreatedAt
                        key={header.id}
                        creator={write_of.created_by.name}
                        date={write_of.created_at}
                    />
                )
            case 3:
                return (
                    <IconTitle
                        key={header.id}
                        title={write_of.warehouse.title}
                        icon={write_of.warehouse.branch.icon}
                        color={write_of.warehouse.branch.color}
                    />
                )
            default:
                return <Data key={header.id} data={write_of[header.field]}/>
        }
    }

    const handleEdit = (write_of) => {
        props.getWriteOf(write_of.id)
    }

    return (
        <table>
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