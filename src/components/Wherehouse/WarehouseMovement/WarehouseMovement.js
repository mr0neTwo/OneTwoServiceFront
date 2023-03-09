import React, {useEffect} from 'react'
import { connect } from 'react-redux'

import Button from '../../general/Button'
import ChooseDate from '../../general/calandar/ChooseDate'
import TableFields from '../../general/TableFields'
import {changeVisibleState} from '../../../Redux/actions'
import {addMovements, changeMovementState, selectedMovement} from '../../../Redux/actions/warehouseMovementAction'
import Paginate from '../../general/Paginate'
import MovementTable from './MovementTable'
import {Modal} from "../../../data/data";

const WarehouseMovement = props => {

    useEffect(() => {
        props.addMovements()
    }, [props.movement.filter_created_at, props.movement.page])

    return (
        <div className='box'>
            <div className='page-buttons'>
                <div className='two-buttons'>
                    <Button
                        id='MovementEditor'
                        size='med'
                        type='create'
                        title='Перемещение'
                        onClick={() => props.changeVisibleState({isCentralModalOpen: true, modalCentralType: Modal.Type.WAREHOUSE_MOVEMENT})}
                        invisible={!props.permissions.includes('move_warehouse')}
                    />
                    <ChooseDate
                        title='Диапазон дат'
                        func={date => props.changeMovementState({filter_created_at: date.map(date => parseInt(date / 1000))})}
                        current_date={props.movement.filter_created_at}
                        range={true}
                    />
                </div>
                <TableFields
                    id='movements'
                    list={props.movement.table_headers}
                    checked_list={props.movement.table_headers}
                    func={table_headers => props.changeMovementState(table_headers)}
                />
            </div>
            <MovementTable/>
            <Paginate
                allItems={props.movement.count}
                onPage={50}
                count={2}
                count_start_end={2}
                navigation={true}
                func={page => props.changeMovementState({page})}
            />
        </div>
    )
}

const mapStateToProps = state => ({
    movement: state.movement,
    permissions: state.data.user.role.permissions
})

const mapDispatchToProps = {
    changeVisibleState,
    changeMovementState,
    addMovements,
    selectedMovement
}

export default connect(mapStateToProps, mapDispatchToProps)(WarehouseMovement)