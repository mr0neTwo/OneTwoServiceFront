import store from '../store'
import {getRequestConfig, bad_request} from './actionUtils'
import {showAlert} from '../actions'

export function changeOrderState(data) {
    return {
        type: 'CHANGE_ORDER_STATE',
        data
    }
}

export function selectedOrder(value, field, saveToApp=false) {
    return {
        type: 'SELECTED_ORDER',
        field,
        value,
        saveToApp
    }
}

export function editOrder(order) {
    return {
        type: 'EDIT_ORDER',
        order
    }
}

export function resetOrder() {
    return {
        type: 'RESET_ORDER'
    }
}

export function changeOrderField(id, field, value) {
    return {
        type: 'CHANGE_ORDER_FIELD',
        id,
        field,
        value
    }
}

export function reorderOrderField(id, order) {
    return {
        type: 'REORDER_ORDER_FIELD',
        id,
        order
    }
}

export function getOrderFilter() {
    const state = store.getState()
    return {
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
        client_id: state.filter.client_id,
        branch_id: state.branch.current_branch.id,

        search: state.filter.search,

        update_badges: true
    }
}

export function addOrders() {

    const state = store.getState()

    const request_config = getRequestConfig(getOrderFilter())

    return async dispatch => {

        await  dispatch({
            type: 'SET_VISIBLE_FLAG',
            field: 'statusOrderLoader',
            value: true
        })

        await fetch(state.data.url_server + '/get_orders', request_config)
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    dispatch({
                        type: 'CHANGE_ORDER_STATE',
                        data: {ordersShow: data.data, count: data.count}
                    })
                    dispatch({
                        type: 'CHANGE_VISIBLE_STATE',
                        data: {statusOrderLoader: false}
                    })
                } else {
                    console.warn(data.message)
                }
            })
            .catch(error => bad_request(dispatch, error, 'Запрос заказов не выполнен'))
    }
}

export function createOrder() {

    const state = store.getState()

    const request_config = getRequestConfig({
        estimated_done_at: state.order.estimated_done_at,

        order_type_id: state.order.order_type_id,
        client_id: state.order.client.id,
        ad_campaign_id: state.order.ad_campaign_id,
        manager_id: state.order.manager_id,
        engineer_id: state.order.engineer_id,
        created_by_id: state.data.user.id,
        branch_id: state.branch.current_branch.id,
        status_id: 1,

        kindof_good_id: state.order.kindof_good.id,
        brand_id: state.order.brand.id,
        subtype_id: state.order.subtype.id,
        model_id: state.order.model.id || null,
        malfunction: state.order.malfunction,
        packagelist: state.order.packagelist,
        appearance: state.order.appearance,
        urgent: state.order.urgent,

        manager_notes: state.order.manager_notes,
        estimated_cost: state.order.estimated_cost,

        filter: getOrderFilter()
    })


    return async dispatch => {

        await dispatch({
            type: 'CHANGE_VISIBLE_STATE',
            data: {statusOrderLoader: true, statusOrderEditor: false}
        })

        await fetch(state.data.url_server + '/orders', request_config)
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    dispatch({
                        type: 'EDIT_ORDER',
                        order: data.order
                    })
                    if (state.view.checkOrderSticker) {
                        dispatch({
                            type: 'CHANGE_VISIBLE_STATE',
                            data: {statusOrderSticker: true, needToResetOrder: true}
                        })
                    }
                    dispatch({
                        type: 'CHANGE_ORDER_STATE',
                        data: {ordersShow: data.data, count: data.count, events: data.events || []}
                    })
                    dispatch({
                        type: 'CHANGE_FILTER_STATE',
                        data: {badges: data.badges}
                    })
                    showAlert(dispatch, 'alert-success', 'Заказ успешно создан')
                } else {
                    console.warn(data.message)
                }
            })
            .catch(error => bad_request(dispatch, error,'Запрос на создание заказа не выполнен'))

        if (state.view.checkOrderSticker) {
             await dispatch({
                type: 'CHANGE_VISIBLE_STATE',
                data: {statusOrderSticker: true}
            })
        } else {
            await dispatch({
                type: 'RESET_ORDER'
            })
        }

        await dispatch({
            type: 'CHANGE_VISIBLE_STATE',
            data: {statusOrderLoader: false}
        })
    }
}

export function changeStatus(status_id, order_id) {

    const state = store.getState()

    let filter = getOrderFilter()
    filter.update_order = state.order.edit

    const request_config = getRequestConfig({
        order_id: order_id,
        status_id: status_id,
        filter
    })

    return async dispatch => {

        await  dispatch({
            type: 'SET_VISIBLE_FLAG',
            field: 'statusOrderLoader',
            value: true
        })

        await fetch(state.data.url_server + '/change_order_status', request_config)
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    if (state.order.edit) {
                        dispatch({
                            type: 'EDIT_ORDER',
                            order: data.order
                        })
                    }
                    dispatch({
                        type: 'CHANGE_ORDER_STATE',
                        data: {ordersShow: data.data, count: data.count, events: data.events || []}
                    })
                    dispatch({
                        type: 'CHANGE_FILTER_STATE',
                        data: {badges: data.badges}
                    })
                    if (state.view.checkOrderSticker) {
                        dispatch({
                            type: 'CHANGE_VISIBLE_STATE',
                            data: {statusOrderSticker: true, needToResetOrder: true}
                        })
                    }
                    dispatch({
                        type: 'CHANGE_FILTER_STATE',
                        data: {badges: data.badges}
                    })
                    showAlert(dispatch, 'alert-success', 'Статус успешно изменен')
                } else {
                    console.warn(data.message)
                }
            })
            .catch(error => bad_request(dispatch, error, 'Запрос на изменение статуса не выполнен'))

        await dispatch({
            type: 'SET_VISIBLE_FLAG',
            field: 'statusOrderLoader',
            value: false
        })
    }
}

export function saveOrder() {

    const state = store.getState()

    let request_config = getRequestConfig({
        id: state.order.edit,
        assigned_at: state.order.assigned_at,
        duration: state.order.duration,
        estimated_done_at: state.order.estimated_done_at,
        scheduled_for: state.order.scheduled_for,
        warranty_date: state.order.warranty_date,
        status_deadline: state.order.status_deadline,

        ad_campaign_id: state.order.ad_campaign_id,
        client_id: state.order.client.id,
        order_type_id: state.order_type_id,
        manager_id: state.order.manager_id,
        engineer_id: state.order.engineer_id,
        kindof_good_id: state.order.kindof_good.id,
        brand_id: state.order.brand.id,
        subtype_id: state.order.subtype.id,
        model_id: state.order.model.id,

        serial: state.order.serial,
        malfunction: state.order.malfunction,
        packagelist: state.order.packagelist,
        appearance: state.order.appearance,
        engineer_notes: state.order.engineer_notes,
        manager_notes: state.order.manager_notes,
        resume: state.order.resume,
        cell: state.order.cell,

        estimated_cost: state.order.estimated_cost,
        urgent: state.order.urgent,
        filter: getOrderFilter()
    })
    request_config.method = 'PUT'


    return async dispatch => {

        await  dispatch({
            type: 'CHANGE_VISIBLE_STATE',
            data: {'statusOrderLoader': true}
        })

        await fetch(state.data.url_server + '/orders', request_config)
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    dispatch({
                        type: 'EDIT_ORDER',
                        order: data.order
                    })
                    dispatch({
                        type: 'CHANGE_ORDER_STATE',
                        data: {ordersShow: data.data, count: data.count, events: data.events || []}
                    })
                    dispatch({
                        type: 'CHANGE_FILTER_STATE',
                        data: {badges: data.badges}
                    })
                    showAlert(dispatch, 'alert-success', 'Заказ успешно изменен')
                } else {
                    console.warn(data.message)
                }
            })
            .catch(error => bad_request(dispatch, error, 'Запрос на именение заказа не выполнен'))

        await  dispatch({
            type: 'CHANGE_VISIBLE_STATE',
            data: {'statusOrderLoader': false}
        })
    }
}

export function getOrder(order_id) {

    const state = store.getState()

    const request_config = getRequestConfig({id: order_id})

    return async dispatch => {

        await  dispatch({
            type: 'CHANGE_VISIBLE_STATE',
            data: {'statusOrderLoader': true}
        })
        
        await fetch(state.data.url_server + '/get_order', request_config)
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    dispatch({
                        type: 'EDIT_ORDER',
                        order: data.data
                    })
                    dispatch({
                        type: 'CHANGE_BOOK_STATE',
                        data: {
                            equipment_type: data.data.kindof_good,
                            equipment_brand: data.data.brand,
                            equipment_subtype: data.data.subtype,
                            equipment_model: data.data.model
                        }
                    })
                    dispatch({
                        type: 'CHANGE_ORDER_STATE',
                        data: {events: data.events || []}
                    })

                } else {
                    dispatch({
                        type: 'CHANGE_VISIBLE_STATE',
                        data: {'statusOrderNotFound': true}
                    })
                    console.warn(data.message)
                }
            })
            .catch(error => bad_request(dispatch, error, 'Запрос заказа не выполнен'))

        await  dispatch({
            type: 'CHANGE_VISIBLE_STATE',
            data: {'statusOrderLoader': false}
        })
    }
}

export function addEventComment() {

    const state = store.getState()

    const request_config = getRequestConfig({
        order_id: state.order.edit,
        current_status_id: state.order.status.id,
        branch_id: state.branch.current_branch.id,
        comment: state.order.event_comment
    })

    return async dispatch => {

        await fetch(state.data.url_server + '/order_comment', request_config)
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    dispatch({
                        type: 'CHANGE_ORDER_STATE',
                        data: {events: data.events || [], event_comment: ''}
                    })
                    showAlert(dispatch, 'alert-success', 'Комментарий успешно добавлен')
                } else {
                    console.warn(data.message)
                }
            })
            .catch(error => bad_request(dispatch, error, 'Запрос на создание коментариев не выполнен'))
    }

}