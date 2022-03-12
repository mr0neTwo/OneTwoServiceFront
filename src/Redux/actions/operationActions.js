import store from '../store'
import {getRequestConfig, bad_request} from './actionUtils'


export function changeOperationForm(value, field) {
    return {
        type: 'CHANGE_OPERATION_FORM',
        field,
        value
    }
}

export function editOperation(operation) {
    return {
        type: 'EDIT_OPERATION',
        operation
    }
}

export function resetOperation() {
    return {
        type: 'RESET_OPERATION'
    }
}


export function selectedOperation(value, field, saveToApp = false) {
    return {
        type: 'SELECTED_SERVICE',
        field,
        value,
        saveToApp
    }
}

export function createOperation(service) {

    const state = store.getState()

    // const price = state.order.client.discount_service_type ? (
    //     state.data.service_prices.find(price =>
    //         price.service_id === service.id &&
    //         price.discount_margin_id === state.order.client.discount_service_margin_id
    //     ).cost || 0
    // ) : (service.price)

    const getPrice = (service, state) => {
        if (state.order.client.discount_service_type) {
            const price = state.data.service_prices.find(price =>
                price.service_id === service.id &&
                price.discount_margin_id === state.order.client.discount_service_margin_id
            )
            if (price) return price.cost
            return 0
        } else {
            return service.price
        }
    }

    const price = getPrice(service, state)

    const discount_value = state.order.client.discount_service_type ?
        service.price - price :
        (service.price * state.order.client.discount_services / 100) || 0

    const request_config = getRequestConfig({
        amount: 1,
        cost: service.cost || 0,
        discount_value: discount_value,
        engineer_id: state.operation.engineer_id,
        price: service.price || 0,
        total: state.order.client.discount_service_type ? price : price - discount_value,
        title: service.title,
        comment: '',
        percent: !state.order.client.discount_service_type,
        discount: state.order.client.discount_service_type ? (discount_value || 0) : state.order.client.discount_services,
        warranty_period: service.warranty_period,
        order_id: state.order.edit,
        dict_id: service.id,

        earnings_percent: service.earnings_percent,
        earnings_summ: service.earnings_summ,
        order_type_id: state.order.order_type_id
    })

    return async dispatch => {

        await fetch(state.data.url_server + '/operations', request_config)
            .catch(() => bad_request('Запрос на создание операции не выполнен'))

        fetch(state.data.url_server + '/get_orders', getRequestConfig({id: state.order.edit}))
            .then(response => response.json())
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


export function createCustomOperation() {

    const state = store.getState()

    const request_config = getRequestConfig({
        title: state.operation.title,
        price: state.operation.price || 0,
        amount: state.operation.amount,
        cost: state.operation.cost || 0,
        discount_value: state.operation.discount_value || 0,
        engineer_id: state.operation.engineer_id,
        total: state.operation.total || 0,
        comment: state.operation.comment,
        percent: state.operation.percent,
        discount: state.operation.discount,
        warranty_period: state.operation.warranty_period,
        order_id: state.order.edit,
        dict_id: null,

        order_type_id: state.order.order_type_id
    })

    return async dispatch => {

        await fetch(state.data.url_server + '/operations', request_config)
            .catch(() => bad_request('Запрос на создание операции не выполнен'))

        fetch(state.data.url_server + '/get_orders', getRequestConfig({id: state.order.edit}))
            .then(response => response.json())
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


export function saveOperation() {

    const state = store.getState()

    let request_config = getRequestConfig({
        id: state.operation.edit,
        title: state.operation.title,
        price: state.operation.price || 0,
        amount: state.operation.amount,
        cost: state.operation.cost || 0,
        discount_value: state.operation.discount_value || 0,
        engineer_id: state.operation.engineer_id,
        total: state.operation.total || 0,
        comment: state.operation.comment,
        percent: state.operation.percent,
        discount: state.operation.discount,
        warranty_period: state.operation.warranty_period,
        order_id: state.order.edit
    })
    request_config.method = 'PUT'

    return async dispatch => {

        await fetch(state.data.url_server + '/operations', request_config)
            .catch(() => bad_request('Запрос на изменение операции не выполнен'))

        fetch(state.data.url_server + '/get_orders', getRequestConfig({id: state.order.edit}))
            .then(response => response.json())
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

export function deleteOperation(flag) {

    const state = store.getState()

    let request_config = getRequestConfig({
        id: state.operation.edit,
        deleted: flag
    })
    request_config.method = 'PUT'

    return async dispatch => {

        await fetch(state.data.url_server + '/operations', request_config)
            .catch(() => bad_request('Запрос на удаление/восстановление операции не выполнен'))

        fetch(state.data.url_server + '/get_orders', getRequestConfig({id: state.order.edit}))
            .then(response => response.json())
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