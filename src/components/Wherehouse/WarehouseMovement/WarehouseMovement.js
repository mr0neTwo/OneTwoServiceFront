import React, {useEffect} from 'react'
import { connect } from 'react-redux'

import {movement_headers} from '../../../data/tableHeaders'

import Button from '../../general/Button'
import ChooseDate from '../../general/calandar/ChooseDate'
import TableFields from '../../general/TableFields'
import {changeVisibleState} from '../../../Redux/actions'
import {addMovements, changeMovementState, selectedMovement} from '../../../Redux/actions/warehouseMovementAction'
import Paginate from '../../general/Paginate'
import MovementTable from './MovementTable'

const WarehouseMovement = props => {

    useEffect(() => {
        props.addMovements()
    }, [props.movement.filter_created_at, props.movement.page])

    return (
        <>
            <div className='row jc-sb mt15'>
                <div className='row'>
                    <Button
                        id='addMovement'
                        title='+ Перемещение'
                        className='greenButton h31'
                        onClick={() => props.changeVisibleState({statusMovementEditor: true})}
                        invisible={!props.permissions.includes('move_warehouse')}
                    />
                    <ChooseDate
                        className='ml10 h27'
                        width='250px'
                        range={true}
                        func={date => props.changeMovementState({filter_created_at: date.map(date => parseInt(date / 1000))})}
                        current_date={props.movement.filter_created_at}
                    />
                </div>
                <TableFields
                    id='writeFields'
                    height='185px'
                    classNameMenu='listOption'
                    list={movement_headers}
                    checked_list={props.movement.table_headers}
                    func={props.selectedMovement}
                />
            </div>
            <MovementTable/>
            <div className='row'>
                <Paginate
                    allItems={props.movement.count}
                    onPage={50}
                    count={2}
                    count_start_end={2}
                    navigation={true}
                    func={page => props.changeMovementState({page})}
                />
                <div className='ml10'>Всего - {props.movement.count}</div>
            </div>
        </>
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