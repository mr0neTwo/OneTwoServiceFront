import store from '../store'
import { getRequestConfig, bad_request } from './actionUtils'

export function changeWarehouseForm(value, field) {
    return {
        type: 'CHANGE_WAREHOUSE_FORM',
        field,
        value,
    }
}

export function editWarehouse(warehouse) {
    return {
        type: 'EDIT_WAREHOUSE',
        warehouse
    }
}

export function resetWarehouse() {
    return {
        type: 'RESET_WAREHOUSE',
    }
}

export function chooseWarehouseSelected(value, field) {
    return {
        type: 'SELECTED_WAREHOUSE',
        field,
        value
    }
}

export function changeWarehousePermission(value, field) {
    return {
        type: 'CHANGE_WAREHOUSE_PERMISSION',
        field,
        value
    }
}

export function addWarehouse() {

    const state = store.getState()

    return dispatch => {

        fetch(state.data.url_server + '/get_warehouse', getRequestConfig({}))
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    dispatch({
                        type: 'CHANGE_WAREHOUSE_FORM',
                        field: 'warehouses',
                        value: data.data
                    })
                } else {
                    console.warn(data.massage)
                }
            })
            .catch(() => bad_request('Запрос складов не выполнен'))
    }
}


export function createWarehouse() {

    const state = store.getState()

    const request_config = getRequestConfig({
        title: state.warehouse.title,
        description: state.warehouse.description,
        deleted: state.warehouse.deleted,
        isGlobal: state.warehouse.isGlobal,
        permissions: state.warehouse.permissions,
        employees: state.warehouse.employees,
        branch_id: state.warehouse.branch_id
    })

    return async dispatch => {

        await fetch(state.data.url_server + '/warehouse', request_config)
            .catch(() => bad_request('Запрос на создание склада не выполнен'))

        await fetch(state.data.url_server + '/get_warehouse', getRequestConfig({}))
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    dispatch({
                        type: 'CHANGE_WAREHOUSE_FORM',
                        field: 'warehouses',
                        value: data.data
                    })
                    dispatch({
                        type: 'SET_VISIBLE_FLAG',
                        field: 'statusWarehouseEditor',
                        value: false
                    })
                    dispatch({
                        type: 'RESET_WAREHOUSE'
                    })
                } else {
                    console.warn(data.massage)
                }
            })
            .catch(() => bad_request('Запрос складов не выполнен'))
    }
}


export function saveWarehouse() {

    const state = store.getState()

    let request_config = getRequestConfig({
        id: state.warehouse.edit,
        title: state.warehouse.title,
        description: state.warehouse.description,
        deleted: state.warehouse.deleted,
        isGlobal: state.warehouse.isGlobal,
        permissions: state.warehouse.permissions,
        employees: state.warehouse.employees,
        branch_id: state.warehouse.branch_id
    })
    request_config.method = 'PUT'

    return async dispatch => {

        await fetch(state.data.url_server + '/warehouse', request_config)
            .catch(() => bad_request('Запрос на изменение склада не выполнен'))

        await fetch(state.data.url_server + '/get_warehouse', getRequestConfig({}))
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    dispatch({
                        type: 'CHANGE_WAREHOUSE_FORM',
                        field: 'warehouses',
                        value: data.data
                    })
                    dispatch({
                        type: 'SET_VISIBLE_FLAG',
                        field: 'statusWarehouseEditor',
                        value: false
                    })
                    dispatch({
                        type: 'RESET_WAREHOUSE'
                    })
                } else {
                    console.warn(data.massage)
                }
            })
            .catch(() => bad_request('Запрос складов не выполнен'))
    }
}


export function deleteWarehouse(flag) {

    const state = store.getState()

    let request_config = getRequestConfig({
        id: state.warehouse.edit,
        deleted: flag
    })
    request_config.method = 'PUT'

    return async dispatch => {

        await fetch(state.data.url_server + '/warehouse', request_config)
            .catch(() => bad_request('Запрос на удаление/восстановление склада не выполнен'))

        await fetch(state.data.url_server + '/get_warehouse', getRequestConfig({}))
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    dispatch({
                        type: 'CHANGE_WAREHOUSE_FORM',
                        field: 'warehouses',
                        value: data.data
                    })
                    dispatch({
                        type: 'SET_VISIBLE_FLAG',
                        field: 'statusWarehouseEditor',
                        value: false
                    })
                    dispatch({
                        type: 'RESET_WAREHOUSE'
                    })
                } else {
                    console.warn(data.massage)
                }
            })
            .catch(() => bad_request('Запрос складов не выполнен'))
    }
}