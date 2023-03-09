import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'


import {
    changeMovementState,
    createMovements,
    resetMovement,
    saveMovements
} from '../../../Redux/actions/warehouseMovementAction'
import {changeVisibleState} from '../../../Redux/actions'
import {changeRemainState} from '../../../Redux/actions/remainAction'


import SelectFromList from '../../general/SelectFromList'
import LableArea from '../../general/LableArea'
import BottomButtons from '../../general/BottomButtons'
import AddMovements from './AddMovements'
import MovementPartTable from './MovementPartTable'
import {checkObject} from '../../general/utils'

const WarehouseMovementEditor = (props) => {

    const componentId = 'WarehouseMovementEditor'

    const [showMessage, setShowMessage] = useState(false)

    const check_parts = !!props.movement.parts.length

    const handleClose = () => {
        props.resetMovement()
        props.changeVisibleState({
            isCentralModalOpen: false,
            modalCentralType: '',
            inputTargetWarehouseMovement: true
        })
    }

    const clickHandel = event => {
        if (!event.composedPath().map((el) => el.id).includes(componentId)) {
            handleClose()
        }
    }

    useEffect(() => {
        window.addEventListener('click', clickHandel)
        return () => {
            window.removeEventListener('click', clickHandel)
        }
    })

    const handleCreate = () => {
        if (check_parts && checkObject(props.movement.target_warehouse)) {
            props.createMovements()
        } else {
            if (!checkObject(props.movement.target_warehouse)) {
                props.changeVisibleState({inputTargetWarehouseMovement: false})
            }
        }
    }

    const showTip = () => {
        if (!props.movement.edit) setShowMessage(true)
        setTimeout(() => {
            setShowMessage(false)
        }, 2000)
    }

    return (
            <div className='modal__box modal__box_editor' id={componentId}>
                <h4>{props.movement.edit ? `Списание ${props.movement.label}` : 'Новое перемещение'}</h4>

                <div className='modal__body modal__body-editor'>

                    <div className='two-buttons'>
                        {showMessage ?
                            <div className='tipWriteOfMessage'>
                                Чтобы изменить склад, нужно удалить добавленные товары или запчасти
                            </div> : null
                        }
                        <div onClick={check_parts ? () => showTip() : null}>
                            <SelectFromList
                                id='idSelectMovementWarehouse'
                                title='Склад списания'
                                list={props.warehouses}
                                setElement={warehouse => props.changeRemainState({filter_warehouse: warehouse})}
                                current_object={props.movement.edit ? props.movement.warehouse : props.filter_warehouse}
                                noChoosed='Выберете склад'
                                disabled={check_parts || !!props.movement.edit}
                            />
                        </div>
                        <SelectFromList
                            id='idSelectMovementTargetWarehouse'
                            title='Склад зачисления'
                            list={props.warehouses.filter(warehouse => warehouse.id !== props.filter_warehouse.id)}
                            setElement={warehouse => props.changeMovementState({target_warehouse: warehouse})}
                            current_object={props.movement.target_warehouse}
                            checkedFlag='inputTargetWarehouseMovement'
                            noChoosed='Выберете склад'
                            disabled={!!props.movement.edit}
                        />
                    </div>
                    <AddMovements/>
                    <MovementPartTable/>
                    <LableArea
                        title='Комментарий'
                        onChange={event => props.changeMovementState({description: event.target.value})}
                        value={props.movement.description}
                    />

                </div>

                <BottomButtons
                    edit={props.movement.edit}
                    create={handleCreate}
                    save={() => props.saveMovements()}
                    close={handleClose}
                />
            </div>
    )
}

const mapStateToProps = state => ({
    movement: state.movement,
    warehouses: state.warehouse.warehouses,
    filter_warehouse: state.remain.filter_warehouse
})

const mapDispatchToProps = {
    resetMovement,
    changeVisibleState,
    createMovements,
    changeRemainState,
    saveMovements,
    changeMovementState
}

export default connect(mapStateToProps, mapDispatchToProps)(WarehouseMovementEditor)