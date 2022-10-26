import store from '../store'
import { getRequestConfig, bad_request } from './actionUtils'

export function changeWarehouseState(data) {
    return {
        type: 'CHANGE_WAREHOUSE_STATE',
        data
    }
}

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

export function editWarehouseCategory(warehouse_category) {
    return {
        type: 'EDIT_WAREHOUSE_CATEGORY',
        warehouse_category
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
                    console.warn(data.message)
                }
            })
            .catch(error => bad_request(dispatch, error, 'Запрос складов не выполнен'))
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
        branch_id: state.warehouse.branch_id || null
    })

    return async dispatch => {

        await fetch(state.data.url_server + '/warehouse', request_config)
            .catch(error => bad_request(dispatch, error, 'Запрос на создание склада не выполнен'))

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
                    console.warn(data.message)
                }
            })
            .catch(error => bad_request(dispatch, error, 'Запрос складов не выполнен'))
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
        branch_id: state.warehouse.branch_id || null
    })
    request_config.method = 'PUT'

    return async dispatch => {

        await fetch(state.data.url_server + '/warehouse', request_config)
            .catch(error => bad_request(dispatch, error, 'Запрос на изменение склада не выполнен'))

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
                    console.warn(data.message)
                }
            })
            .catch(error => bad_request(dispatch, error, 'Запрос складов не выполнен'))
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
            .catch(error => bad_request(dispatch, error, 'Запрос на удаление/восстановление склада не выполнен'))

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
                    console.warn(data.message)
                }
            })
            .catch(error => bad_request(dispatch, error, 'Запрос складов не выполнен'))
    }
}


export function addWarehouseCategories() {

    const state = store.getState()

    const request_config = getRequestConfig({
        deleted: state.warehouse.showDeleted
    })

    return dispatch => {

        fetch(state.data.url_server + '/get_warehouse_category', request_config)
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    dispatch({
                        type: 'CHANGE_WAREHOUSE_STATE',
                        data: {warehouse_categories: data.warehouse_categories, current_parent_category: data.warehouse_categories}
                    })
                    dispatch({
                        type: 'CHANGE_REMAIN_STATE',
                        data: {filter_category: data.warehouse_categories}
                    })
                } else {
                    console.warn(data.message)
                }
            })
            .catch(error => bad_request(dispatch, error, 'Запрос категорий запчастей не выполнен'))
    }
}

function getCategoryFilter() {
    const state = store.getState()
    return {
        deleted: state.warehouse.showDeleted,
    }
}

export function createWarehouseCategory() {

    const state = store.getState()

    const request_config = getRequestConfig({
        title: state.warehouse.title_category,
        parent_category_id: state.warehouse.current_parent_category.id,
        deleted: state.warehouse.category_deleted,
        filter: getCategoryFilter()
    })

    return async dispatch => {

        await fetch(state.data.url_server + '/warehouse_category', request_config)
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    dispatch({
                        type: 'CHANGE_WAREHOUSE_STATE',
                        data: {warehouse_categories: data.warehouse_categories }
                    })
                    dispatch({
                        type: 'CHANGE_VISIBLE_STATE',
                        data: {statusWarehouseCategoryEditor: false}
                    })
                    dispatch({
                        type: 'RESET_WAREHOUSE'
                    })
                } else {
                    console.warn(data.message)
                }
            })
            .catch(error => bad_request(dispatch, error, 'Запрос на создание категории запчастей не выполнен'))
    }
}


export function saveWarehouseCategory() {

    const state = store.getState()

    let request_config = getRequestConfig({
        id: state.warehouse.edit,
        title: state.warehouse.title_category,
        parent_category_id: state.warehouse.current_parent_category.id,
        filter: getCategoryFilter()
    })
    request_config.method = 'PUT'

    return async dispatch => {

        await fetch(state.data.url_server + '/warehouse_category', request_config)
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    dispatch({
                        type: 'CHANGE_WAREHOUSE_STATE',
                        data: {warehouse_categories: data.warehouse_categories }
                    })
                    dispatch({
                        type: 'CHANGE_VISIBLE_STATE',
                        data: {statusWarehouseCategoryEditor: false}
                    })
                    dispatch({
                        type: 'RESET_WAREHOUSE'
                    })
                } else {
                    console.warn(data.message)
                }
            })
            .catch(error => bad_request(dispatch, error, 'Запрос на изменение категории запчастей не выполнен'))
    }
}

export function deleteWarehouseCategory( flag ) {

    const state = store.getState()

    let request_config = getRequestConfig({
        id: state.warehouse.edit,
        deleted: flag,
        filter: getCategoryFilter()
    })
    request_config.method = 'PUT'

    return async dispatch => {

        await fetch(state.data.url_server + '/warehouse_category', request_config)
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    dispatch({
                        type: 'CHANGE_WAREHOUSE_FORM',
                        field: 'warehouse_categories',
                        value: data.data
                    })
                    dispatch({
                        type: 'SET_VISIBLE_FLAG',
                        field: 'statusWarehouseCategoryEditor',
                        value: false
                    })
                    dispatch({
                        type: 'RESET_WAREHOUSE'
                    })
                } else {
                    console.warn(data.message)
                }
            })
            .catch(error => bad_request(dispatch, error, 'Запрос на изменение категории запчастей не выполнен'))
    }
}