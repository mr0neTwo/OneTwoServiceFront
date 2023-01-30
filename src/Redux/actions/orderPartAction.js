import store from '../store'
import { getRequestConfig, bad_request } from './actionUtils'
import {getOrderFilter} from './orderActions'
import {showAlert} from '../actions'

export function changeOrderPartState( data ) {
    return {
        type: 'CHANGE_ORDER_PART_STATE',
        data
    }
}

export function editOrderPart(order_part) {
    return {
        type: 'EDIT_ORDER_PART',
        order_part
    }
}

export function resetOrderPart() {
    return {
        type: 'RESET_ORDER_PART'
    }
}

export function selectedOrderPart( value, field, saveToApp=false ) {
    return {
        type: 'SELECTED_ORDER_PART',
        field,
        value,
        saveToApp
    }
}

export function createCustomOrderPart() {

    const state = store.getState()

    const request_config = getRequestConfig({
        amount: state.orderPart.amount,
        cost: state.orderPart.cost || 0,
        discount_value: state.orderPart.discount_value || 0,
        engineer_id: state.orderPart.engineer.id || 0,
        price: state.orderPart.price || 0,
        total: state.orderPart.total || 0,
        title: state.orderPart.title,
        comment: state.orderPart.comment,
        deleted: false,
        warranty_period: state.orderPart.warranty_period,
        order_id: state.order.edit,

        order_type_id: state.order.order_type_id,

        filter_order: getOrderFilter()
    })

    return async dispatch => {

        await  dispatch({
            type: 'CHANGE_VISIBLE_STATE',
            data: {'statusOrderLoader': true}
        })

        await fetch(state.data.url_server + '/order_parts', request_config)
            .then(response =>  response.json())
            .then(data => {
                if (data.success) {
                    dispatch({
                        type: 'EDIT_ORDER',
                        order: data.order
                    })
                    dispatch({
                        type: 'CHANGE_ORDER_STATE',
                        data: {ordersShow: data.orders, events: data.events || []}
                    })
                    showAlert(dispatch, 'alert-success', 'Запчасть успешно добавлена')
                } else {
                    console.warn(data.message)
                }
            })
            .catch(error => bad_request(dispatch, error, 'Запрос на добавление зачасти не выполнен'))

        await  dispatch({
            type: 'CHANGE_VISIBLE_STATE',
            data: {'statusOrderLoader': false}
        })
    }
}

export function saveOrderPart() {

    const state = store.getState()

    let request_config = getRequestConfig({
        id: state.orderPart.edit,
        amount: state.orderPart.amount,
        cost: state.orderPart.cost || 0,
        discount_value: state.orderPart.discount_value || 0,
        engineer_id: state.orderPart.engineer.id || 0,
        price: state.orderPart.price || 0,
        total: state.orderPart.total || 0,
        title: state.orderPart.title,
        comment: state.orderPart.comment,
        warranty_period: state.orderPart.warranty_period,
        order_id: state.order.edit,
        warehouse_parts_id: state.orderPart.warehouse_parts_id || null,

        filter_order: getOrderFilter()
    })
    request_config.method = 'PUT'

    return async dispatch => {

        await  dispatch({
            type: 'CHANGE_VISIBLE_STATE',
            data: {'statusOrderLoader': true}
        })

        await  fetch(state.data.url_server + '/order_parts', request_config)
            .then(response =>  response.json())
            .then(data => {
                if (data.success) {
                    dispatch({
                        type: 'EDIT_ORDER',
                        order: data.order
                    })
                    dispatch({
                        type: 'CHANGE_ORDER_STATE',
                        data: {ordersShow: data.orders, events: data.events || []}
                    })
                    showAlert(dispatch, 'alert-success', 'Запчасть успешно изменена')
                } else {
                    console.warn(data.message)
                }
            })
            .catch(error => bad_request(dispatch, error, 'Запрос на измененеие запчасти не выполнен'))

        await  dispatch({
            type: 'CHANGE_VISIBLE_STATE',
            data: {'statusOrderLoader': false}
        })
    }
}

export function deleteOrderPart(flag) {

    const state = store.getState()

    let request_config = getRequestConfig({
        id: state.orderPart.edit,
        order_id: state.order.edit,
        to_warehouse_id: state.orderPart.to_warehouse_id || null,
        deleted: flag,

        filter_order: getOrderFilter()
    })
    request_config.method = 'PUT'

    return async dispatch => {

        await  dispatch({
            type: 'CHANGE_VISIBLE_STATE',
            data: {'statusOrderLoader': true}
        })

        await fetch(state.data.url_server + '/order_parts', request_config)
            .then(response =>  response.json())
            .then(data => {
                if (data.success) {
                    dispatch({
                        type: 'EDIT_ORDER',
                        order: data.order
                    })
                    dispatch({
                        type: 'CHANGE_ORDER_STATE',
                        data: {ordersShow: data.orders, events: data.events || []}
                    })
                    const text = flag ? 'Запчасть успешно удалена' : 'Запчасть успешно восстановлена'
                    showAlert(dispatch, 'alert-success', text)
                } else {
                    console.warn(data.message)
                }
            })
            .catch(error => bad_request(dispatch, error, 'Запрос заказов не выполнен'))

        await  dispatch({
            type: 'CHANGE_VISIBLE_STATE',
            data: {'statusOrderLoader': false}
        })
    }
}