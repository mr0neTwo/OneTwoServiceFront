import store from '../store'
import { getRequestConfig, bad_request } from './actionUtils'
import {getOrderFilter} from './orderActions'


export function changePaymentState( data ) {
    return {
        type: 'CHANGE_PAYMENT_STATE',
        data
    }
}

export function addPaymentTag(tag) {
    return {
        type: 'ADD_PAYMENT_TAG',
        tag
    }
}

export function deletePaymentTag(idx) {
    return {
        type: 'DELETE_PAYMENT_TAG',
        idx
    }
}

export function resetPayments() {
    return {
        type: 'RESET_PAYMENTS'
    }
}

export function createPayment(context) {

    const state = store.getState()

    const now = Math.round(Date.now() / 1000)
    const cashbox1 = state.cashbox.cashboxes.find(cashbox => cashbox.id === state.payment.cashbox_id).title
    const cashbox2 = state.payment.target_cashbox_id ? state.cashbox.cashboxes.find(cashbox => cashbox.id === state.payment.target_cashbox_id).title : ''

    const disc = `Перемещение денег из кассы "${cashbox1}" в кассу "${cashbox2}".`

    let request_body = {
        cashflow_category: state.payment.direction ? state.data.item_payments.find(item => item.id === state.payment.cashflow_category).title : null,
        description: state.payment.direction ? state.payment.description : disc + state.payment.description,
        deposit: state.cashbox.cashboxes.find(cashbox => cashbox.id === state.payment.cashbox_id).balance + state.payment.income - state.payment.outcome,
        income: parseFloat(state.payment.income),
        outcome: -parseFloat(state.payment.outcome),
        direction: state.payment.direction,
        deleted: false,
        can_print_fiscal: state.payment.can_print_fiscal,
        is_fiscal: state.payment.is_fiscal,
        created_at: now,
        custom_created_at: state.payment.custom_created_at || now,
        tags: state.payment.tags,
        relation_type: state.payment.relation_type,
        cashbox_id: state.payment.cashbox_id ? state.payment.cashbox_id : null,
        client_id: state.payment.client_id ? state.payment.client_id : null,
        employee_id: state.payment.employee_id,
        order_id: state.payment.order_id ? state.payment.order_id : null,
        target_cashbox_id: state.payment.direction ? null : state.payment.target_cashbox_id
    }
    if (context.type === 'payment') {
        request_body.filter_cashboxes = {
            deleted: null
        }
        request_body.filter_payments = {
            custom_created_at: state.payment.filter_created_at,
            cashbox_id: state.cashbox.current_cashbox.id,
            tags: state.payment.filter_tags.length ? state.payment.filter_tags : null,
            deleted: null
        }
    }
    if (context.type === 'order') request_body.filter_order = getOrderFilter()
    if (context.type === 'closed_order') {
        request_body.closed_order = {
            order_id: context.order_id,
            status_id: context.status_id,
            filter: getOrderFilter()
        }
    }
    const request_config = getRequestConfig(request_body)

    return async dispatch => {

        await  dispatch({
            type: 'CHANGE_VISIBLE_STATE',
            data: {statusOrderLoader: true}
        })

        await fetch(state.data.url_server + '/payments', request_config)
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    if (context.type === 'payment') {
                        dispatch({
                            type: 'CHANGE_PAYMENT_STATE',
                            data: {payments: data.payments}
                        })
                        dispatch({
                            type: 'CHANGE_CASHBOX_STATE',
                            data: {cashboxes: data.cashboxes},
                        })
                    }
                    if (context.type === 'order') {
                        dispatch({
                            type: 'EDIT_ORDER',
                            order: data.order
                        })
                        dispatch({
                            type: 'CHANGE_ORDER_STATE',
                            data: {ordersShow: data.orders, events: data.events}
                        })
                    }
                    if (context.type === 'closed_order') {
                        if (state.order.edit) {
                            dispatch({
                                type: 'EDIT_ORDER',
                                order: data.order
                            })
                            dispatch({
                                type: 'CHANGE_ORDER_STATE',
                                data: {events: data.events}
                            })
                        }
                        dispatch({
                            type: 'CHANGE_ORDER_STATE',
                            data: {ordersShow: data.orders, count: data.orders_count}
                        })
                        dispatch({
                            type: 'CHANGE_FILTER_STATE',
                            data: {badges: data.badges}
                        })
                    }
                } else {
                    console.warn(data.message)
                }
            })
            .catch(() => bad_request('Запрос на создание платежа не выполнен'))

        await dispatch({
            type: 'RESET_PAYMENTS'
        })

        await dispatch({
            type: 'CHANGE_VISIBLE_STATE',
            data: {statusOrderLoader: false, statusPaymentsEditor: false}
        })
    }
}

export function addPayments() {

    const state = store.getState()

    const request_config = getRequestConfig({
        custom_created_at: state.payment.filter_created_at,
        cashbox_id: state.cashbox.current_cashbox.id,
        tags: state.payment.filter_tags.length ? state.payment.filter_tags : null
    })

    return async dispatch => {

        await  dispatch({
            type: 'CHANGE_VISIBLE_STATE',
            data: {'statusOrderLoader': true}
        })

        await fetch(state.data.url_server + '/get_payments', request_config)
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    dispatch({
                        type: 'CHANGE_PAYMENT_STATE',
                        data: {payments: data.data}
                    })
                } else {
                    console.warn(data.message)
                }
            })
            .catch(() => bad_request('Запрос платежей не выполнен'))

        await  dispatch({
            type: 'CHANGE_VISIBLE_STATE',
            data: {'statusOrderLoader': false}
        })
    }
}

export function deletePayment(flag) {

    const state = store.getState()

    let request_body = {
        id: state.payment.edit,
        relation_type: state.payment.relation_type,
        relation_id: state.payment.relation_id ? state.payment.relation_id : null,
        order_id: state.payment.order.id,
        deleted: flag
    }
    if (state.order.edit) {
        request_body.filter_order = getOrderFilter()
    } else {
        request_body.filter_cashboxes = {
            deleted: null
        }
        request_body.filter_payments = {
            custom_created_at: state.payment.filter_created_at,
            cashbox_id: state.cashbox.current_cashbox.id,
            tags: state.payment.filter_tags.length ? state.payment.filter_tags : null,
            deleted: null
        }
    }
    let request_config = getRequestConfig(request_body)
    request_config.method = 'PUT'

    return async dispatch => {

        await  dispatch({
            type: 'CHANGE_VISIBLE_STATE',
            data: {'statusOrderLoader': true}
        })

        await fetch(state.data.url_server + '/payments', request_config)
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    if (state.order.edit) {
                        dispatch({
                            type: 'EDIT_ORDER',
                            order: data.order
                        })
                        dispatch({
                            type: 'CHANGE_ORDER_STATE',
                            data: {ordersShow: data.orders, events: data.events}
                        })
                    } else {
                        dispatch({
                            type: 'CHANGE_PAYMENT_STATE',
                            data: {payments: data.payments}
                        })
                        dispatch({
                            type: 'RESET_PAYMENTS'
                        })
                        dispatch({
                            type: 'CHANGE_CASHBOX_STATE',
                            data: {cashboxes: data.cashboxes}
                        })
                    }
                    dispatch({
                        type: 'CHANGE_VISIBLE_STATE',
                        data: {statusPaymentsCard: false}
                    })
                } else {
                    console.warn(data.message)
                }
            })
            .catch(() => bad_request('Запрос удаление платежа не выполнен'))

        await dispatch({
            type: 'RESET_PAYMENTS'
        })

        await  dispatch({
            type: 'CHANGE_VISIBLE_STATE',
            data: {'statusOrderLoader': false}
        })
    }
}