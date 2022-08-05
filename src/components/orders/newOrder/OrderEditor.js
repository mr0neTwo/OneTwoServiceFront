import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {useHistory} from 'react-router-dom'

import {addDiscountMargin, addDictService, changeVisibleState} from '../../../Redux/actions'
import {createOrder, resetOrder, saveOrder, addOrders, getOrder} from '../../../Redux/actions/orderActions'
import {changeOrderState} from '../../../Redux/actions/orderActions'

import {changeBookState, resetBookEquipment} from "../../../Redux/actions/bookActions";
import {addClients} from '../../../Redux/actions/clientAction'

import BottomButtons from '../../general/BottomButtons'
import TitleOrderEditor from './TitleOrderEditor'
import Tabs from '../../general/Tabs'
import OrderInfo from './info/OrderInfo'
import OrderWorksMaterials from './work_matireal/OrderWorksMaterials'
import OrderPayments from './payments/OrderPayments'
import OrderHistory from './orderHisroy/OrderHistory'



const OrderEditor = (props) => {

    const history = useHistory()
    // console.log(history.location)
    const edit = history.location.state && history.location.state.order_id

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
            checkedOrderClient: false,
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
        if (edit) history.goBack()
    }

    const clickHandel = (event) => {
        if (
            !event.path.map((el) => el.id).includes('addOrder') &&
            !event.path.map((el) => el.id).includes('createNewOrder') &&
            !event.path.map((el) => el.id).includes('paymentsEditorWiondow')
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


    useEffect(() => {
        if (edit) props.getOrder(history.location.state.order_id)
    }, [])


    const handleCreate = () => {
        if (
            Object.values(props.order.client).length &&
            Object.values(props.order.kindof_good).length &&
            Object.values(props.order.brand).length &&
            Object.values(props.order.subtype).length &&
            props.order.malfunction
        ) {
            props.createOrder()
        } else {
            if (!Object.values(props.order.client).length) props.changeVisibleState({checkedOrderClient: true})
            if (!Object.values(props.order.kindof_good).length) props.changeVisibleState({checkedOrderKindofGood: false})
            if (!Object.values(props.order.brand).length) props.changeVisibleState({checkedOrderBrand: false})
            if (!Object.values(props.order.subtype).length) props.changeVisibleState({checkedOrderSubtype: false})
            if (!props.order.malfunction) props.changeVisibleState({inputMalfunctionChecked: false})
        }
    }

    const handleSave = () => {
        if (
            Object.values(props.order.client).length &&
            Object.values(props.order.kindof_good).length &&
            Object.values(props.order.brand).length &&
            Object.values(props.order.subtype).length

        ) {
            props.saveOrder()
        } else {
            if (!Object.values(props.order.client).length) props.changeVisibleState({checkedOrderClient: true})
            if (!Object.values(props.order.kindof_good).length) props.changeVisibleState({checkedOrderKindofGood: false})
            if (!Object.values(props.order.brand).length) props.changeVisibleState({checkedOrderBrand: false})
            if (!Object.values(props.order.subtype).length) props.changeVisibleState({checkedOrderSubtype: false})
            if (!props.order.malfunction) props.changeVisibleState({inputMalfunctionChecked: false})
        }
    }


    return edit && !props.order.edit ? null : (
        <div className="rightBlock">
            <div className="rightBlockWindow" id="createNewOrder">
                <div className="cteateNewOrderContent">

                    <div className="createOrderForm mt20">

                        <TitleOrderEditor/>
                        {props.order.edit ?
                            <div>
                                <Tabs
                                    list={['Информация о заказе', 'Работы и материалы', 'Платежи']}
                                    func={idx => props.changeOrderState({tabs: idx})}
                                    tab={props.order.tabs}
                                />
                                {props.order.tabs === 0 ? <OrderInfo/> : null}
                                {props.order.tabs === 1 ? <OrderWorksMaterials/> : null}
                                {props.order.tabs === 2 ? <OrderPayments/> : null}
                            </div> : <OrderInfo/>}
                    </div>

                    <OrderHistory/>
                </div>

                <div className="boxOrderButtons">
                    <BottomButtons
                        edit={props.order.edit}
                        create={handleCreate}
                        save={handleSave}
                        // delete={() => props.deleteClient(props.client.edit)}
                        close={handleClose}
                    />
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    filter: state.filter,
    order: state.order,
    client: state.client
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
    addOrders,
    resetBookEquipment,
    getOrder
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderEditor)
