import React from 'react'
import {connect} from 'react-redux'

import {changeMovementState, getMovement} from '../../../Redux/actions/warehouseMovementAction'

import TableHeader from '../../general/TableHeader'
import CreatedAt from './cell/CreatedAt'
import Label from './cell/Label'
import Warehouse from './cell/Warehouse'



const MovementTable = (props) => {

    const chooseCell = (header, movement) => {

        switch (header.id) {
            case 1: return <Label key={header.id} movement={movement} getMovement={props.getMovement}/>
            case 2: return <CreatedAt key={header.id} movement={movement}/>
            case 3: return <Warehouse key={header.id} warehouse={movement.warehouse}/>
            case 4: return <Warehouse key={header.id} warehouse={movement.target_warehouse}/>
            default: return <td key={header.id}>{movement[header.field]}</td>
        }
    }

    const handleEdit = (movement) => {
        props.getMovement(movement.id)
    }

    return (
        <div className='tableOrdersBox mt15'>
            <table id='tableWarehouse'>
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

        </div>
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