import React, {useEffect} from 'react'
import {connect} from 'react-redux'

import {addDictService, changeVisibleState} from '../../../Redux/actions'
import {createOrder, resetOrder, saveOrder, getOrder} from '../../../Redux/actions/orderActions'
import {changeOrderState} from '../../../Redux/actions/orderActions'
import {addDiscountMargin} from '../../../Redux/actions/priceAction'
import {changeBookState, resetBookEquipment} from "../../../Redux/actions/bookActions";
import {addClients} from '../../../Redux/actions/clientAction'

import BottomButtons from '../../general/BottomButtons'
import TitleOrderEditor from './TitleOrderEditor'
import Tabs from '../../general/Tabs'
import OrderInfo from './info/OrderInfo'
import OrderWorksMaterials from './work_matireal/OrderWorksMaterials'
import OrderPayments from './payments/OrderPayments'
import OrderHistory from './orderHisroy/OrderHistory'
import {checkObject} from '../../general/utils'



const OrderEditor = (props) => {

    useEffect(() => {
        props.addClients()
    }, [props.client.filter_name, props.client.filter_phone])

    useEffect(() => {
        props.addDiscountMargin()
        props.addDictService()
        props.resetBookEquipment()
    }, [])

    const handleClose = () => {
        props.changeVisibleState({
            statusOrderEditor: false,
            checkedOrderClient: true,
            checkedOrderKindofGood: true,
            checkedOrderBrand: true,
            checkedOrderSubtype: true
        })
        props.changeBookState({
            equipment_type: {},
            equipment_brand: {},
            equipment_subtype: {},
            equipment_model: {}
        })
        props.resetOrder()
    }

    const clickHandel = (event) => {
        if (
            !event.composedPath().map((el) => el.id).includes('newOrder') &&
            !event.composedPath().map((el) => el.id).includes('clientEditor') &&
            !event.composedPath().map((el) => el.id).includes('createNewOrder') &&
            !event.composedPath().map((el) => el.id).includes('paymentsEditorWiondow') &&
            !event.composedPath().map((el) => el.id).includes('WriteOfEditor') &&
            !event.composedPath().map((el) => el.id).includes('statusReturnPart')
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

    const handleCreate = () => {
        if (
            checkObject(props.order.client) &&
            checkObject(props.order.kindof_good) &&
            checkObject(props.order.brand) &&
            checkObject(props.order.subtype) &&
            props.order.malfunction
        ) {
            props.createOrder()
        } else {
            if (!checkObject(props.order.client)) props.changeVisibleState({checkedOrderClient: false})
            if (!checkObject(props.order.kindof_good)) props.changeVisibleState({checkedOrderKindofGood: false})
            if (!checkObject(props.order.brand)) props.changeVisibleState({checkedOrderBrand: false})
            if (!checkObject(props.order.subtype)) props.changeVisibleState({checkedOrderSubtype: false})
            if (!props.order.malfunction) props.changeVisibleState({inputMalfunctionChecked: false})
        }
    }

    const handleSave = () => {
        if (
            checkObject(props.order.client) &&
            checkObject(props.order.kindof_good) &&
            checkObject(props.order.brand) &&
            checkObject(props.order.subtype) &&
            props.order.malfunction
        ) {
            props.saveOrder()
        } else {
            if (!checkObject(props.order.client)) props.changeVisibleState({checkedOrderClient: false})
            if (!checkObject(props.order.kindof_good)) props.changeVisibleState({checkedOrderKindofGood: false})
            if (!checkObject(props.order.brand)) props.changeVisibleState({checkedOrderBrand: false})
            if (!checkObject(props.order.subtype)) props.changeVisibleState({checkedOrderSubtype: false})
            if (!props.order.malfunction) props.changeVisibleState({inputMalfunctionChecked: false})
        }
    }


    return (
        <div className="modal">
            <div className="modal__box" id="createNewOrder">
                <div className="modal__body modal__body-order">

                    <div className="modal__body-order-form">

                        <TitleOrderEditor/>
                        {props.order.edit ?
                            <>
                                <Tabs
                                    list={['Информация о заказе', 'Работы и материалы', 'Платежи']}
                                    func={idx => props.changeOrderState({tabs: idx})}
                                    tab={props.order.tabs}
                                />
                                {props.order.tabs === 0 ? <OrderInfo/> : null}
                                {props.order.tabs === 1 ? <OrderWorksMaterials/> : null}
                                {props.order.tabs === 2 ? <OrderPayments/> : null}
                            </> : <OrderInfo/>}
                        <BottomButtons
                            edit={props.order.edit}
                            create={handleCreate}
                            save={handleSave}
                            close={handleClose}
                        />
                    </div>

                    {props.order.edit ? <OrderHistory/> : null}
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    filter: state.filter,
    order: state.order,
    client: state.client,
    statusOrderNotFound: state.view.statusOrderNotFound
})

const mapDispatchToProps = {
    changeVisibleState,
    changeOrderState,
    changeBookState,
    addClients,
    addDiscountMargin,
    createOrder,
    resetOrder,
    addDictService,
    saveOrder,
    resetBookEquipment,
    getOrder
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderEditor)
