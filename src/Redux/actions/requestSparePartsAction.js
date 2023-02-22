import store from '../store'

import { getRequestConfig, bad_request } from './actionUtils'
import {showAlert} from '../actions'
import {Modal} from "../../data/data";

export function changeReqSparePartState( data ) {
    return {
        type: 'CHANGE_REQUEST_SPARE_PARTS_STATE',
        data
    }
}

export function editReqSparePart(reqsp) {
    return {
        type: 'EDIT_REQUEST_SPARE_PARTS',
        reqsp
    }
}

export function resetReqSparePart() {
    return {
        type: 'RESET_REQUEST_SPARE_PARTS'
    }
}

export function selectedReqSparePart( value, field, saveToApp=true ) {
    return {
        type: 'SELECTED_REQUEST_SPARE_PARTS',
        field,
        value,
        saveToApp
    }
}

function getFilter() {
    const state = store.getState()
    return {
        deleted: state.reqsp.show_deleted,
        created_at: state.reqsp.filter_created_at.some(created_at => !!created_at) ? state.reqsp.filter_created_at : null,
        status_id: state.reqsp.filter_status.map(employee => employee.id),
        created_by_id: state.reqsp.filter_created_by.map(employee => employee.id),
        executor_id: state.reqsp.filter_executor.map(employee => employee.id),
        supplier_id: state.reqsp.filter_supplier.id,
        page: 0
    }
}

export function getReqSparePart(request_spare_part_id) {

    const state = store.getState()

    const request_config = getRequestConfig({id: request_spare_part_id})

    return dispatch => {

        fetch(state.data.url_server + '/get_request_spare_part', request_config)
            .then(response =>  response.json())
            .then(data => {
                if (data.success) {
                    dispatch({
                        type: 'EDIT_REQUEST_SPARE_PARTS',
                        reqsp: data.request_spare_part,
                    })
                    dispatch({
                        type: 'CHANGE_REQUEST_SPARE_PARTS_STATE',
                        data: {events: data.events},
                    })
                    dispatch({
                        type: 'CHANGE_VISIBLE_STATE',
                        data: {isRightModalOpen: true, modalType: Modal.Type.REQUEST_SPARE_PART}
                    })
                } else {
                    console.warn(data.message)
                }
            })
            .catch(error => bad_request(dispatch, error, 'Запрос Запроса запчастей не выполнен'))
    }
}

export function addReqSparePart() {

    const state = store.getState()

    const request_config = getRequestConfig(getFilter())

    return dispatch => {

        fetch(state.data.url_server + '/get_request_spare_parts', request_config)
            .then(response =>  response.json())
            .then(data => {
                if (data.success) {
                    dispatch({
                        type: 'CHANGE_REQUEST_SPARE_PARTS_STATE',
                        data: {request_spare_parts: data.request_spare_parts, count: data.count},
                    })
                } else {
                    console.warn(data.message)
                }
            })
            .catch(error => bad_request(dispatch, error, 'Запрос Запросов запчастей не выполнен'))
    }
}

export function createReqSparePart() {

    const state = store.getState()

    const request_config = getRequestConfig({
        created_at: Math.round(new Date() / 1000),
        estimated_come_at: state.reqsp.estimated_come_at,
        amount: state.reqsp.amount,
        cost: state.reqsp.cost,
        delivery_cost: state.reqsp.delivery_cost,
        description: state.reqsp.description,
        part_id: state.reqsp.part.id,
        executor_id: state.reqsp.executor.id,
        client_id: state.reqsp.client.id,
        supplier_id: state.reqsp.supplier.id,
        order_id: state.reqsp.order.id,
        status_id: 35,
        branch_id: state.branch.current_branch.id,
        filter: getFilter()
    })

    return async dispatch => {

        await fetch(state.data.url_server + '/request_spare_parts', request_config)
            .then(response =>  response.json())
            .then(data => {
                if (data.success) {
                    dispatch({
                        type: 'CHANGE_REQUEST_SPARE_PARTS_STATE',
                        data: {request_spare_parts: data.request_spare_parts, count: data.count},
                    })
                    dispatch({
                        type: 'CHANGE_VISIBLE_STATE',
                        data: {statusReqSparePartEditor: false},
                    })
                    dispatch({
                        type: 'RESET_REQUEST_SPARE_PARTS'
                    })
                } else {
                    console.warn(data.message)
                }
            })
            .catch(error => bad_request(dispatch, error, 'Запрос на создание Запроса запчастей не выполнен'))

    }
}

export function saveReqSparePart() {

    const state = store.getState()

    const request_config = getRequestConfig({
        id: state.reqsp.edit,
        estimated_come_at: state.reqsp.estimated_come_at,
        amount: state.reqsp.amount,
        cost: state.reqsp.cost,
        delivery_cost: state.reqsp.delivery_cost,
        description: state.reqsp.description,
        part_id: state.reqsp.part.id,
        executor_id: state.reqsp.executor.id,
        client_id: state.reqsp.client.id,
        supplier_id: state.reqsp.supplier.id,
        order_id: state.reqsp.order.id,
        status_id: state.reqsp.status.id,
        branch_id: state.branch.current_branch.id,
        filter: getFilter()
    })
    request_config.method = 'PUT'


    return async dispatch => {

        await fetch(state.data.url_server + '/request_spare_parts', request_config)
            .then(response =>  response.json())
            .then(data => {
                if (data.success) {
                    dispatch({
                        type: 'CHANGE_REQUEST_SPARE_PARTS_STATE',
                        data: {request_spare_parts: data.request_spare_parts, count: data.count},
                    })
                    dispatch({
                        type: 'CHANGE_VISIBLE_STATE',
                        data: {statusReqSparePartEditor: false},
                    })
                    dispatch({
                        type: 'RESET_REQUEST_SPARE_PARTS'
                    })
                } else {
                    console.warn(data.message)
                }
            })
            .catch(error => bad_request(dispatch, error, 'Запрос на изменение Запроса запчастей не выполнен'))

    }
}

export function deleteReqSparePart(flag) {

    const state = store.getState()

    let request_config = getRequestConfig({
        id: state.reqsp.edit,
        deleted: flag,
        filter: getFilter()
    })
    request_config.method = 'PUT'

    return async dispatch => {

        await fetch(state.data.url_server + '/request_spare_parts', request_config)
            .then(response =>  response.json())
            .then(data => {
                if (data.success) {
                    dispatch({
                        type: 'CHANGE_REQUEST_SPARE_PARTS_STATE',
                        data: {request_spare_parts: data.request_spare_parts, count: data.count},
                    })
                    dispatch({
                        type: 'CHANGE_VISIBLE_STATE',
                        data: {statusReqSparePartEditor: false},
                    })
                    dispatch({
                        type: 'RESET_REQUEST_SPARE_PARTS'
                    })
                } else {
                    console.warn(data.message)
                }
            })
            .catch(error => bad_request(dispatch, error, 'Запрос на удаление/восстановление Запроса запчастей не выполнен'))

    }
}

export function addEventComment() {

    const state = store.getState()

    const request_config = getRequestConfig({
        request_spare_part_id: state.reqsp.edit,
        current_status_id: state.reqsp.status.id,
        branch_id: state.branch.current_branch.id,
        comment: state.reqsp.event_comment
    })

    return async dispatch => {

        await fetch(state.data.url_server + '/request_spare_part_comment', request_config)
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    dispatch({
                        type: 'CHANGE_REQUEST_SPARE_PARTS_STATE',
                        data: {events: data.events || [], event_comment: ''}
                    })
                    showAlert(dispatch, 'success', 'Комментарий успешно добавлен')
                } else {
                    console.warn(data.message)
                }
            })
            .catch(error => bad_request(dispatch, error, 'Запрос на создание коментариев не выполнен'))
    }

}


export function changeStatus(status_id, request_spare_part_id) {

    const state = store.getState()

    const request_config = getRequestConfig({
        request_spare_part_id,
        status_id,
        branch_id: state.branch.current_branch.id,
        filter: getFilter()
    })

    return async dispatch => {

        await  dispatch({
            type: 'SET_VISIBLE_FLAG',
            field: 'statusOrderLoader',
            value: true
        })

        await fetch(state.data.url_server + '/change_request_spare_part_status', request_config)
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    if (state.reqsp.edit) {
                        dispatch({
                            type: 'CHANGE_REQUEST_SPARE_PARTS_STATE',
                            data: {status: data.status, events: data.events}
                        })
                    }
                    dispatch({
                        type: 'CHANGE_REQUEST_SPARE_PARTS_STATE',
                        data: {request_spare_parts: data.request_spare_parts, count: data.count}
                    })
                    showAlert(dispatch, 'success', 'Статус успешно изменен')
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