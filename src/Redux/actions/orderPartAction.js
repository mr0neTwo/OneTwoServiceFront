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
        cost: state.orderPart.cost || 0,
        discount_value: state.orderPart.discount_value || 0,
        engineer_id: state.orderPart.engineer_id,
        price: state.orderPart.price || 0,
        total: state.orderPart.total || 0,
        title: state.orderPart.title,
        comment: state.orderPart.comment,
        deleted: false,
        warranty_period: state.orderPart.warranty_period,
        order_id: state.order.edit,

        order_type_id: state.order.order_type_id,

        filter_order: {
            sort: state.filter.sort,
            field_sort: state.filter.field_sort,
            page: state.filter.page,

            engineer_id: !state.data.user.role.orders_visibility ? state.filter.engineer_id.concat([state.data.user.id]) : state.filter.engineer_id,
            overdue: state.filter.overdue,
            status_id: state.filter.status_id,
            status_overdue: state.filter.status_overdue,
            urgent: state.filter.urgent,
            order_type_id: state.filter.order_type_id,
            manager_id: state.filter.manager_id,
            created_at: state.filter.created_at,
            kindof_good_id: state.filter.kindof_good,
            brand_id: state.filter.brand,
            subtype_id: state.filter.subtype,
            client_id: state.filter.client_id
        }
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
                } else {
                    console.warn(data.message)
                }
            })
            .catch(() => bad_request('Запрос заказов не выполнен'))

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
        engineer_id: state.orderPart.engineer_id,
        price: state.orderPart.price || 0,
        total: state.orderPart.total || 0,
        title: state.orderPart.title,
        comment: state.orderPart.comment,
        warranty_period: state.orderPart.warranty_period,
        order_id: state.order.edit,

        filter_order: {
            sort: state.filter.sort,
            field_sort: state.filter.field_sort,
            page: state.filter.page,

            engineer_id: !state.data.user.role.orders_visibility ? state.filter.engineer_id.concat([state.data.user.id]) : state.filter.engineer_id,
            overdue: state.filter.overdue,
            status_id: state.filter.status_id,
            status_overdue: state.filter.status_overdue,
            urgent: state.filter.urgent,
            order_type_id: state.filter.order_type_id,
            manager_id: state.filter.manager_id,
            created_at: state.filter.created_at,
            kindof_good_id: state.filter.kindof_good,
            brand_id: state.filter.brand,
            subtype_id: state.filter.subtype,
            client_id: state.filter.client_id
        }
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
                } else {
                    console.warn(data.message)
                }
            })
            .catch(() => bad_request('Запрос заказов не выполнен'))

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
        deleted: flag,

        filter_order: {
            sort: state.filter.sort,
            field_sort: state.filter.field_sort,
            page: state.filter.page,

            engineer_id: !state.data.user.role.orders_visibility ? state.filter.engineer_id.concat([state.data.user.id]) : state.filter.engineer_id,
            overdue: state.filter.overdue,
            status_id: state.filter.status_id,
            status_overdue: state.filter.status_overdue,
            urgent: state.filter.urgent,
            order_type_id: state.filter.order_type_id,
            manager_id: state.filter.manager_id,
            created_at: state.filter.created_at,
            kindof_good_id: state.filter.kindof_good,
            brand_id: state.filter.brand,
            subtype_id: state.filter.subtype,
            client_id: state.filter.client_id
        }
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
                } else {
                    console.warn(data.message)
                }
            })
            .catch(() => bad_request('Запрос заказов не выполнен'))

        await  dispatch({
            type: 'CHANGE_VISIBLE_STATE',
            data: {'statusOrderLoader': false}
        })
    }
}