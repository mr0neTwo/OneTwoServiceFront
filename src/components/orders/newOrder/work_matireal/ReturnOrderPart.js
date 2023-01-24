import React, {useEffect} from 'react'
import { connect } from 'react-redux'


import {changeVisibleState} from '../../../../Redux/actions'
import {changeOrderPartState, deleteOrderPart, resetOrderPart} from '../../../../Redux/actions/orderPartAction'

import ChooseOfList from '../../../general/ChooseOfList'
import BottomButtons from '../../../general/BottomButtons'
import SelectFromList from '../../../general/SelectFromList'

const ReturnOrderPart = (props) => {

    const id = 'ReturnOrderPart'

    const handleClose = () => {
        props.changeVisibleState({statusReturnPart: false, inputWarehouseReturnPart: true})
    }

    const clickHandel = (event) => {
        if (
            !event.composedPath().map((el) => el.id).includes(id) &&
            !event.composedPath().map((el) => el.id).includes('deleteButton') &&
            !event.composedPath().map((el) => el.id).includes('deleteOrderPart')
    ) {
            handleClose()
        }
    }

    useEffect(() => {
        window.addEventListener('click', clickHandel)
        return () => {
            window.removeEventListener('click', clickHandel)
        }
    })

    const handleReturn = () => {
        if (props.orderPart.to_warehouse_id) {
            props.deleteOrderPart(true)
            handleClose()
            props.changeVisibleState({
                inputOrderPartEngineerChecked: true,
                inputOrderPartTitleChecked: true,
                statusOrderPartEditor: false
            })
            props.resetOrderPart()
        } else {
            props.changeVisibleState({inputWarehouseReturnPart: false})
        }
    }

    return (
        <div className='modal'>
            <div className='modal__box modal__box_editor' id={id}>
                <div className='createNewTitle'>Возврат детали/товара на склад</div>
                <div className='modal__body modal__body-editor'>
                    <SelectFromList
                        title='Выбирете склад'
                        list={props.warehouses}
                        setElement={warehouse_id => props.changeOrderPartState({to_warehouse: warehouse_id})}
                        current_object={props.orderPart.to_warehouse}
                        checkedFlag='inputWarehouseReturnPart'
                        noChoosed='Выберете склад'
                    />
                    <div className=''>{`${props.orderPart.amount} шт.`}</div>
                </div>
                <BottomButtons
                    create={handleReturn}
                    close={handleClose}
                />
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    orderPart: state.orderPart,
    warehouses: state.warehouse.warehouses,
    inputWarehouseReturnPart: state.view.inputWarehouseReturnPart
})

const mapDispatchToProps = {
    changeVisibleState,
    deleteOrderPart,
    changeOrderPartState,
    resetOrderPart
}

export default connect(mapStateToProps, mapDispatchToProps)(ReturnOrderPart)