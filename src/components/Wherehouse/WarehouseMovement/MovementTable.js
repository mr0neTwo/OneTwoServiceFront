import React from 'react'
import {connect} from 'react-redux'

import {changeMovementState, getMovement} from '../../../Redux/actions/warehouseMovementAction'

import TableHeader from '../../general/TableHeader'
import Label from "../../general/cell/Label";
import IconTitle from "../../general/cell/IconTitle";
import Data from "../../general/cell/Data";
import CreatedAt from "../../general/cell/CreateAt";


const MovementTable = (props) => {

    const chooseCell = (header, movement) => {

        if (!header.visible) return null

        switch (header.id) {
            case 1:
                return (
                    <Label
                        key={header.id}
                        label={movement.label}
                        func={() => props.getMovement(movement.id)}
                    />
                )
            case 2:
                return (
                    <CreatedAt
                        key={header.id}
                        creator={movement.created_by.name}

                    />
                )
            case 3:
                return (
                    <IconTitle
                        key={header.id}
                        title={movement.warehouse.title}
                        icon={movement.warehouse.branch.icon}
                        color={movement.warehouse.branch.color}
                    />
                )
            case 4:
                return (
                    <IconTitle
                        key={header.id}
                        title={movement.target_warehouse.title}
                        icon={movement.target_warehouse.branch.icon}
                        color={movement.target_warehouse.branch.color}
                    />
                )
            default:
                return <Data key={header.id} data={movement[header.field]}/>
        }
    }

    const handleEdit = (movement) => {
        props.getMovement(movement.id)
    }

    return (
        <table>
            <thead>
            <tr>
                {props.movement.table_headers.map(header => (
                    <TableHeader
                        key={header.id}
                        header={header}
                        changeState={props.changeMovementState}
                        headers={props.movement.table_headers}
                    />
                ))}
            </tr>
            </thead>
            <tbody>
            {props.movement.warehouse_movements.map(movement => (
                <tr
                    key={movement.id}
                    onDoubleClick={() => handleEdit(movement)}
                >
                    {props.movement.table_headers.map(header => chooseCell(header, movement))}
                </tr>
            ))}
            </tbody>
        </table>

    )
}

const mapStateToProps = state => ({
    movement: state.movement,
    view: state.view
})

const mapDispatchToProps = {
    changeMovementState,
    getMovement
}

export default connect(mapStateToProps, mapDispatchToProps)(MovementTable)