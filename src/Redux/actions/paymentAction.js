import store from '../store'
import { getRequestConfig, bad_request } from './actionUtils'

export function changePaymentForm(value, field) {
    return {
        type: 'CHANGE_PAYMENT_FORM',
        field,
        value
    }
}

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
    const cashbox1 = state.data.cashboxes.find(cashbox => cashbox.id === state.payment.cashbox_id).title
    const cashbox2 = state.payment.target_cashbox_id ? state.data.cashboxes.find(cashbox => cashbox.id === state.payment.target_cashbox_id).title : ''

    const disc = `Перемещение денег из кассы "${cashbox1}" в кассу "${cashbox2}".`

    const request_config = getRequestConfig({
        cashflow_category: state.payment.direction ? state.data.item_payments.find(item => item.id === state.payment.cashflow_category).title : null,
        description: state.payment.direction ? state.payment.description : disc + state.payment.description,
        deposit: state.data.cashboxes.find(cashbox => cashbox.id === state.payment.cashbox_id).balance + state.payment.income - state.payment.outcome,
        income: state.payment.income,
        outcome: -state.payment.outcome,
        direction: state.payment.direction,
        deleted: false,
        can_print_fiscal: state.payment.can_print_fiscal,
        is_fiscal: state.payment.is_fiscal,
        created_at: now,
        custom_created_at: state.payment.custom_created_at ? state.payment.custom_created_at : now,
        tags: state.payment.tags,
        cashbox_id: state.payment.cashbox_id ? state.payment.cashbox_id : null,
        client_id: state.payment.client_id ? state.payment.client_id : null,
        employee_id: state.payment.employee_id,
        order_id: state.payment.order_id ? state.payment.order_id : null,
        target_cashbox_id: state.payment.direction ? null : state.payment.target_cashbox_id
    })

    const request_config_2 = getRequestConfig({
        custom_created_at: [state.payment.filter_created_at[0], state.payment.filter_created_at[1] + 86399],
        cashbox_id: state.cashbox.current_cashbox.id,
        tags: state.payment.filter_tags.length ? state.payment.filter_tags : null
    })

    return async dispatch => {

        await fetch(state.data.url_server + '/payments', request_config)
            .catch(() => bad_request('Запрос на создание платежа не выполнен'))

        if (context.type === 'payment') {
            await fetch(state.data.url_server + '/get_payments', request_config_2)
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        dispatch({
                            type: 'ADD_DATA',
                            field: 'payments',
                            data: data.data,
                        })
                        dispatch({
                            type: 'SET_VISIBLE_FLAG',
                            field: 'statusPaymentsEditor',
                            value: false
                        })
                        dispatch({
                            type: 'RESET_PAYMENTS'
                        })
                    } else {
                        console.warn(data.massage)
                    }
                })
                .catch(() => bad_request('Запрос платежей не выполнен'))

            await fetch(state.data.url_server + '/get_cashbox', getRequestConfig())
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        dispatch({
                            type: 'ADD_DATA',
                            field: 'cashboxes',
                            data: data.data,
                        })
                    } else {
                        console.warn(data.massage)
                    }
                })
                .catch(() => bad_request('Запрос касс не выполнен'))
        }

        if (context.type === 'order') {
            fetch(state.data.url_server + '/get_orders', getRequestConfig({id: state.order.edit}))
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        dispatch({
                            type: 'EDIT_ORDER',
                            order: data.data[0]
                        })
                        dispatch({
                            type: 'SET_VISIBLE_FLAG',
                            field: 'statusPaymentsEditor',
                            value: false
                        })
                        dispatch({
                            type: 'RESET_PAYMENTS'
                        })
                    } else {
                        console.warn(data.massage)
                    }
                })
                .catch(() => bad_request('Запрос заказов не выполнен'))
        }

        if (context.type === 'closed_order') {
            const request_config3 = getRequestConfig({
                id: context.order_id,
                status_id: context.status_id
            })
            const request_config4 = getRequestConfig(state.filter.mainFilter)

            await fetch(state.data.url_server + '/change_order_status', request_config3)
                .catch(() => bad_request('Запрос изменения статуса заказа не выполнен'))

            await fetch(state.data.url_server + '/get_orders', request_config4)
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        dispatch({
                            type: 'ADD_ORDERS_SHOW',
                            ordersShow: data.data,
                            count: data.count
                        })
                        dispatch({
                            type: 'SET_VISIBLE_FLAG',
                            field: 'statusPaymentsEditor',
                            value: false
                        })
                        dispatch({
                            type: 'RESET_PAYMENTS'
                        })
                    } else {
                        console.warn(data.massage)
                    }
                })
                .catch(() => bad_request('Запрос заказов не выполнен'))
        }

        if (context.type === 'closed_order_editor') {
            const request_config5 = getRequestConfig({
                id: context.order_id,
                status_id: context.status_id
            })
            const request_config6 = getRequestConfig({
                id: context.order_id
            })

            await fetch(state.data.url_server + '/change_order_status', request_config5)
                .catch(() => bad_request('Запрос изменения статуса заказа не выполнен'))

            await fetch(state.data.url_server + '/get_orders', request_config6)
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        dispatch({
                            type: 'EDIT_ORDER',
                            order: data.data[0],
                        })
                        dispatch({
                            type: 'SET_VISIBLE_FLAG',
                            field: 'statusPaymentsEditor',
                            value: false
                        })
                        dispatch({
                            type: 'RESET_PAYMENTS'
                        })
                    } else {
                        console.warn(data.massage)
                    }
                })
                .catch(() => bad_request('Запрос на обновление заказа не выполнен'))
        }
    }
}

export function addPayments() {

    const state = store.getState()

    const request_config = getRequestConfig({
        custom_created_at: [state.payment.filter_created_at[0], state.payment.filter_created_at[1] + 86399],
        cashbox_id: state.cashbox.current_cashbox.id,
        tags: state.payment.filter_tags.length ? state.payment.filter_tags : null
    })

    return dispatch => {

        fetch(state.data.url_server + '/get_payments', request_config)
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    dispatch({
                        type: 'ADD_DATA',
                        field: 'payments',
                        data: data.data,
                    })
                } else {
                    console.warn(data.massage)
                }
            })
            .catch(() => bad_request('Запрос платежей не выполнен'))
    }
}

export function deletePayment(flag) {

    const state = store.getState()

    let request_config = getRequestConfig({
        id: state.payment.edit,
        relation_id: state.payment.relation_id ? state.payment.relation_id : null,
        deleted: flag
    })
    request_config.method = 'PUT'

    const request_config2 = getRequestConfig({
        custom_created_at: [state.payment.filter_created_at[0], state.payment.filter_created_at[1] + 86399],
        cashbox_id: state.cashbox.current_cashbox.id,
        tags: state.payment.filter_tags.length ? state.payment.filter_tags : null
    })

    return async dispatch => {

        await fetch(state.data.url_server + '/payments', request_config)
            .catch(() => bad_request('Запрос на удаление/восстановление платежа не выполнен'))

        await fetch(state.data.url_server + '/get_payments', request_config2)
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    dispatch({
                        type: 'ADD_DATA',
                        field: 'payments',
                        data: data.data,
                    })
                    dispatch({
                        type: 'SET_VISIBLE_FLAG',
                        field: 'statusPaymentsCard',
                        value: false
                    })
                    dispatch({
                        type: 'RESET_PAYMENTS'
                    })
                } else {
                    console.warn(data.massage)
                }
            })
            .catch(() => bad_request('Запрос платежей не выполнен'))

        await fetch(state.data.url_server + '/get_cashbox', getRequestConfig())
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    dispatch({
                        type: 'ADD_DATA',
                        field: 'cashboxes',
                        data: data.data,
                    })
                } else {
                    console.warn(data.massage)
                }
            })
            .catch(() => bad_request('Запрос касс не выполнен'))
    }
}