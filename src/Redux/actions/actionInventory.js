import store from '../store'
import { getRequestConfig, bad_request } from './actionUtils'
import {Modal} from "../../data/data";

export function changeInventoryState( data ) {
    return {
        type: 'CHANGE_INVENTORY_STATE',
        data
    }
}

export function editInventory(inventory) {
    return {
        type: 'EDIT_INVENTORY',
        inventory
    }
}

export function resetInventory() {
    return {
        type: 'RESET_INVENTORY'
    }
}


export function selectedInventory( value, field, saveToApp=true ) {
    return {
        type: 'SELECTED_INVENTORY',
        field,
        value,
        saveToApp
    }
}

function getFilter() {
    const state = store.getState()
    return {
        filter_created_at: state.inventory.filter_created_at,
        page: state.inventory.page
    }
}

export function getInventory(inventory_id) {

    const state = store.getState()

    const request_config = getRequestConfig({id: inventory_id})

    return dispatch => {

        fetch(state.data.url_server + '/get_warehouse_inventory', request_config)
            .then(response =>  response.json())
            .then(data => {
                if (data.success) {
                    dispatch({
                        type: 'EDIT_INVENTORY',
                        inventory: data.inventory,
                    })
                    dispatch({
                        type: 'CHANGE_VISIBLE_STATE',
                        data: {isRightModalOpen: true, modalType: Modal.Type.INVENTORY}
                    })
                } else {
                    console.warn(data.message)
                }
            })
            .catch(error => bad_request(dispatch, error, 'Запрос Инвентаризации не выполнен'))

    }
}

export function addInventory() {

    const state = store.getState()

    const request_config = getRequestConfig(getFilter())

    return dispatch => {

        fetch(state.data.url_server + '/get_warehouse_inventories', request_config)
            .then(response =>  response.json())
            .then(data => {
                if (data.success) {
                    dispatch({
                        type: 'CHANGE_INVENTORY_STATE',
                        data: {warehouse_inventories: data.inventories, count: data.count},
                    })
                } else {
                    console.warn(data.message)
                }
            })
            .catch(error => bad_request(dispatch, error, 'Запрос инвентаризаций не выполнен'))

    }
}

export function createInventory() {

    const state = store.getState()

    const parts = state.remain.warehouse_remains
        .filter(remain => !state.inventory.parts.map(part => part.title).includes(remain.title))
        .map(remain => {
            if (state.inventory.isZero) {
                remain.actual_count = 0
                return remain
            } else {
                remain.actual_count = remain.count
                return remain
            }
        })

    const request_config = getRequestConfig({
        created_at: parseInt(new Date() / 1000),
        parts: state.inventory.parts.concat(parts),
        description: state.inventory.description,
        warehouse_id: state.remain.filter_warehouse.id,
        warehouse_category_id: state.remain.filter_category.id,
        filter: getFilter()
    })

    return async dispatch => {

        await fetch(state.data.url_server + '/warehouse_inventory', request_config)
            .then(response =>  response.json())
            .then(data => {
                if (data.success) {
                    dispatch({
                        type: 'CHANGE_INVENTORY_STATE',
                        data: {warehouse_inventories: data.inventories, count: data.count},
                    })
                    dispatch({
                        type: 'EDIT_INVENTORY',
                        inventory: data.inventory,
                    })
                } else {
                    console.warn(data.message)
                }
            })
            .catch(error => bad_request(dispatch, error, 'Запрос на создание Инвентаризации не выполнен'))
    }
}


export function saveInventory() {

    const state = store.getState()

    const request_config = getRequestConfig({
        parts: state.inventory.parts,
        description: state.inventory.description,
        filter: getFilter()
    })
    request_config.method = 'PUT'


    return async dispatch => {

        await fetch(state.data.url_server + '/warehouse_inventory', request_config)
            .then(response =>  response.json())
            .then(data => {
                if (data.success) {
                    dispatch({
                        type: 'CHANGE_INVENTORY_STATE',
                        data: {warehouse_inventories: data.inventories, count: data.count},
                    })
                    dispatch({
                        type: 'CHANGE_VISIBLE_STATE',
                        data: {isRightModalOpen: false, modalType: ''},
                    })
                    dispatch({
                        type: 'RESET_INVENTORY'
                    })
                } else {
                    console.warn(data.message)
                }
            })
            .catch(error => bad_request(dispatch, error, 'Запрос на изменение Инвентаризации не выполнен'))

    }
}

