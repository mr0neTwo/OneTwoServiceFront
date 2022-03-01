import store from '../store'
import { getRequestConfig, bad_request } from './actionUtils'


export function changeOrderPartForm( value, field ) {
    return {
        type: 'CHANGE_ORDER_PART_FORM',
        field,
        value
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
        cost: state.orderPart.cost,
        discount_value: state.orderPart.discount_value,
        engineer_id: state.orderPart.engineer_id,
        price: state.orderPart.price,
        total: state.orderPart.total,
        title: state.orderPart.title,
        comment: state.orderPart.comment,
        deleted: false,
        warranty_period: state.orderPart.warranty_period,
        order_id: state.order.edit,

        order_type_id: state.order.order_type_id
    })

    return async dispatch => {

        await fetch(state.data.url_server + '/order_parts', request_config)
            .catch(() => bad_request('Запрос на создание запчати в заказе не выполнен'))

        fetch(state.data.url_server + '/get_orders', getRequestConfig({id: state.order.edit}))
            .then(response =>  response.json())
            .then(data => {
                if (data.success) {
                    dispatch({
                        type: 'EDIT_ORDER',
                        order: data.data[0]
                    })
                } else {
                    console.warn(data.massage)
                }
            })
            .catch(() => bad_request('Запрос заказов не выполнен'))
    }
}



export function saveOrderPart() {

    const state = store.getState()

    let request_config = getRequestConfig({
        id: state.orderPart.edit,
        amount: state.orderPart.amount,
        cost: state.orderPart.cost,
        discount_value: state.orderPart.discount_value,
        engineer_id: state.orderPart.engineer_id,
        price: state.orderPart.price,
        total: state.orderPart.total,
        title: state.orderPart.title,
        comment: state.orderPart.comment,
        warranty_period: state.orderPart.warranty_period,
        order_id: state.order.edit
    })
    request_config.method = 'PUT'

    return async dispatch => {

        await fetch(state.data.url_server + '/order_parts', request_config)
            .catch(() => bad_request('Запрос на изменение запчати в заказе не выполнен'))

        fetch(state.data.url_server + '/get_orders', getRequestConfig({id: state.order.edit}))
            .then(response =>  response.json())
            .then(data => {
                if (data.success) {
                    dispatch({
                        type: 'EDIT_ORDER',
                        order: data.data[0]
                    })
                } else {
                    console.warn(data.massage)
                }
            })
            .catch(() => bad_request('Запрос заказов не выполнен'))

    }
}

export function deleteOrderPart(flag) {

    const state = store.getState()

    let request_config = getRequestConfig({
        id: state.orderPart.edit,
        deleted: flag
    })
    request_config.method = 'PUT'

    return async dispatch => {

        await fetch(state.data.url_server + '/order_parts', request_config)
            .catch(() => bad_request('Запрос на удаление/восстановление запчати в заказе не выполнен'))

        fetch(state.data.url_server + '/get_orders', getRequestConfig({id: state.order.edit}))
            .then(response =>  response.json())
            .then(data => {
                if (data.success) {
                    dispatch({
                        type: 'EDIT_ORDER',
                        order: data.data[0]
                    })
                } else {
                    console.warn(data.massage)
                }
            })
            .catch(() => bad_request('Запрос заказов не выполнен'))

    }
}