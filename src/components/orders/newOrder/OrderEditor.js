import React, {useEffect, useMemo} from 'react'
import {connect} from 'react-redux'
import {useHistory, useLocation} from 'react-router-dom'

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
    }

    const clickHandel = (event) => {
        if (
            !event.composedPath().map((el) => el.id).includes('addOrder') &&
            !event.composedPath().map((el) => el.id).includes('clientEditor') &&
            !event.composedPath().map((el) => el.id).includes('createNewOrder') &&
            !event.composedPath().map((el) => el.id).includes('paymentsEditorWiondow') &&
            !event.composedPath().map((el) => el.id).includes('writeOfEditor') &&
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


    return (
        <div className="rightBlock z99">
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
