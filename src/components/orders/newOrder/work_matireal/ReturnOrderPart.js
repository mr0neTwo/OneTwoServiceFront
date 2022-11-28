import React, {useEffect} from 'react'
import { connect } from 'react-redux'


import {changeVisibleState} from '../../../../Redux/actions'
import {changeOrderPartState, deleteOrderPart, resetOrderPart} from '../../../../Redux/actions/orderPartAction'

import ChooseOfList from '../../../general/ChooseOfList'
import BottomButtons from '../../../general/BottomButtons'

const ReturnOrderPart = (props) => {

    const handleClose = () => {
        props.changeVisibleState({statusReturnPart: false, inputWarehouseReturnPart: true})
    }

    const clickHandel = (event) => {
        if (
            !event.path.map((el) => el.id).includes('statusReturnPart') &&
            !event.path.map((el) => el.id).includes('deleteButton') &&
            !event.path.map((el) => el.id).includes('deleteOrderPart')
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
                inputOrderPartTitleChacked: true,
                statusOrderPartEditor: false
            })
            props.resetOrderPart()
        } else {
            props.changeVisibleState({inputWarehouseReturnPart: false})
        }
    }

    return (
        <div className='centerBlockFix'>
            <div className='blockWindowFix wmn500 z99999' id='statusReturnPart'>
                <div className='createNewTitle'>Возврат детали/товара на склад</div>
                <div className='mt15 row al-itm-fe'>
                    <ChooseOfList
                        id='idch'
                        title='Выбирете склад'
                        list={props.warehouses}
                        setElement={warehouse_id => props.changeOrderPartState({to_warehouse_id: warehouse_id})}
                        current_id={props.orderPart.to_warehouse_id}
                        width={'250px'}
                        checkedFlag='inputWarehouseReturnPart'
                        checked={props.inputWarehouseReturnPart}
                        noChoosed='Выбирете склад'
                    />
                    <div className='ml15 pd5'>{`${props.orderPart.amount} шт.`}</div>
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