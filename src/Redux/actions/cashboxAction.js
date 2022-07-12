import store from '../store'
import { getRequestConfig, bad_request } from './actionUtils'


export function changeCashboxState( data ) {
    return {
        type: 'CHANGE_CASHBOX_STATE',
        data
    }
}

export function chooseCashboxSelected(id, field) {
    return {
        type: 'CHOOSE_CASHBOX_SELECTED',
        id,
        field
    }
}

export function changeCashboxPermissions(value, field) {
    return {
        type: 'CHANGE_CASHBOX_PERMISSION',
        value,
        field
    }
}

export function editCashbox(cashbox) {
    return {
        type: 'EDIT_CASHBOX',
        cashbox
    }
}

export function get_cashbox_filter() {

    const state = store.getState()

    return {
        deleted: state.cashbox.showDeleted,
        branch_id: Object.values(state.branch.current_branch).length ? state.branch.current_branch.id : null
    }
}

export function addCashboxes() {

    const state = store.getState()

    const request_config = getRequestConfig(get_cashbox_filter())

    return dispatch => {

        fetch(state.data.url_server + '/get_cashbox', request_config)
            .then(response =>  response.json())
            .then(data => {
                if (data.success) {
                    dispatch({
                        type: 'CHANGE_CASHBOX_STATE',
                        data: {cashboxes: data.data, current_cashbox: data.data.length ? data.data[0] : {}},
                    })
                } else {
                    console.warn(data.message)
                }
            })
            .catch(() => bad_request('Запрос касс не выполнен'))

    }
}

export function createCashbox() {

    const state = store.getState()

    let request_config = getRequestConfig({
        title: state.cashbox.title,
        balance: state.cashbox.balance,
        type: state.cashbox.type,
        isGlobal: state.cashbox.isGlobal,
        isVirtual: state.cashbox.isVirtual,
        deleted: state.cashbox.deleted,
        permissions: state.cashbox.permissions,
        employees: state.cashbox.employees,
        branch_id: state.branch.current_branch.id,
        filter: get_cashbox_filter()
    })

    return async dispatch => {

        await fetch(state.data.url_server + '/cashbox', request_config)
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    dispatch({
                        type: 'CHANGE_CASHBOX_STATE',
                        data: {cashboxes: data.cashboxes},
                    })
                    dispatch({
                        type: 'CHANGE_VISIBLE_STATE',
                        data: {statusCashboxEditor: false}
                    })
                    dispatch({
                        type: 'RESET_CASHBOX'
                    })
                } else {
                    console.warn(data.message)
                }
            })
            .catch(() => bad_request('Запрос на создание кассы не выполнен'))
    }
}



export function saveEditCashbox() {

    const state = store.getState()

    let request_config = getRequestConfig({
        id: state.cashbox.edit,
        title: state.cashbox.title,
        balance: state.cashbox.balance,
        type: state.cashbox.type,
        isGlobal: state.cashbox.isGlobal,
        isVirtual: state.cashbox.isVirtual,
        deleted: state.cashbox.deleted,
        permissions: state.cashbox.permissions,
        employees: state.cashbox.employees,
        branch_id: state.branch.current_branch.id,
        filter: get_cashbox_filter()
    })
    request_config.method = 'PUT'

    return async dispatch => {

        await fetch(state.data.url_server + '/cashbox', request_config)
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    dispatch({
                        type: 'CHANGE_CASHBOX_STATE',
                        data: {cashboxes: data.cashboxes},
                    })
                    dispatch({
                        type: 'CHANGE_VISIBLE_STATE',
                        data: {statusCashboxEditor: false}
                    })
                    dispatch({
                        type: 'RESET_CASHBOX'
                    })
                } else {
                    console.warn(data.message)
                }
            })
            .catch(() => bad_request('Запрос на изменение кассы не выполнен'))
    }
}

export function deleteCashbox(flag) {

    const state = store.getState()

    let request_config = getRequestConfig({
        id: state.cashbox.edit,
        deleted: flag,
        filter: get_cashbox_filter()
    })
    request_config.method = 'PUT'

    return async dispatch => {

        await fetch(state.data.url_server + '/cashbox', request_config)
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    dispatch({
                        type: 'CHANGE_CASHBOX_STATE',
                        data: {cashboxes: data.cashboxes},
                    })
                    dispatch({
                        type: 'CHANGE_VISIBLE_STATE',
                        data: {statusCashboxEditor: false}
                    })
                    dispatch({
                        type: 'RESET_CASHBOX'
                    })
                } else {
                    console.warn(data.message)
                }
            })
            .catch(() => bad_request('Запрос на удаление/восстановление кассы не выполнен'))
    }
}