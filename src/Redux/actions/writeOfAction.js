import store from '../store'
import { getRequestConfig, bad_request } from './actionUtils'
import {Modal} from "../../data/data";

export function changeWriteOfState( data ) {
    return {
        type: 'CHANGE_WRITE_OF_STATE',
        data
    }
}

export function editWriteOf(temple) {
    return {
        type: 'EDIT_WRITE_OF',
        temple
    }
}

export function resetWriteOf() {
    return {
        type: 'RESET_WRITE_OF'
    }
}


export function selectedWriteOf( value, field, saveToApp=true ) {
    return {
        type: 'SELECTED_WRITE_OF',
        field,
        value,
        saveToApp
    }
}

function getFilter() {
    const state = store.getState()
    return {
        created_at: state.writeof.filter_created_at,
        page: state.writeof.page ? state.writeof.page - 1 : 0
    }
}


export function getWriteOf(write_of_id) {

    const state = store.getState()

    const request_config = getRequestConfig({id: write_of_id})

    return dispatch => {

        fetch(state.data.url_server + '/get_warehouse_write_of', request_config)
            .then(response =>  response.json())
            .then(data => {
                if (data.success) {
                    dispatch({
                        type: 'EDIT_WRITE_OF',
                        write_of: data.write_of,
                    })
                    dispatch({
                        type: 'CHANGE_VISIBLE_STATE',
                        data: {isCentralModalOpen: true, modalCentralType: Modal.Type.WRITE_OFF}
                    })
                } else {
                    console.warn(data.message)
                }
            })
            .catch(error => bad_request(dispatch, error, 'Запрос Списаний не выполнен'))

    }
}

export function addWriteOf () {

    const state = store.getState()

    const request_config = getRequestConfig({...getFilter()})

    return async dispatch => {

        await fetch(state.data.url_server + '/get_warehouse_write_offs', request_config)
            .then(response =>  response.json())
            .then(data => {
                if (data.success) {
                    dispatch({
                        type: 'CHANGE_WRITE_OF_STATE',
                        data: {write_offs: data.write_offs, count: data.count},
                    })
                } else {
                    console.warn(data.message)
                }
            })
            .catch(error => bad_request(dispatch, error, 'Запрос на создание Списания не выполнен'))

    }
}

export function createWriteOf() {

    const state = store.getState()

    const parts = state.writeof.parts.filter(part => !state.writeof.inventory_id || part.checked)

    const request_config = getRequestConfig({
        engineer_id: state.writeof.engineer.id,
        discount_margin_id: state.writeof.discount_margin.id,
        write_of_type: state.writeof.write_of_type,
        parts,
        description: state.writeof.description,
        inventory_id: state.writeof.inventory_id || null,
        warehouse_id: state.remain.filter_warehouse.id,
        filter: getFilter()
    })

    return async dispatch => {

        await fetch(state.data.url_server + '/warehouse_write_of', request_config)
            .then(response =>  response.json())
            .then(data => {
                if (data.success) {
                    if (state.writeof.write_of_type.type === 'WAREHOUSE') {
                        dispatch({
                            type: 'CHANGE_WRITE_OF_STATE',
                            data: {write_offs: data.write_offs, count: data.count},
                        })
                    }
                    if (state.writeof.write_of_type.type === 'ORDER') {
                        dispatch({
                            type: 'EDIT_ORDER',
                            order: data.order
                        })
                        dispatch({
                            type: 'CHANGE_ORDER_STATE',
                            data: {events: data.events || []},
                        })
                    }
                    if (state.inventory.edit) {
                        dispatch({
                            type: 'EDIT_INVENTORY',
                            inventory: data.inventory
                        })
                    }
                    dispatch({
                        type: 'RESET_WRITE_OF'
                    })
                    dispatch({
                        type: 'CHANGE_VISIBLE_STATE',
                        data: {isCentralModalOpen: false, modalCentralType: ''}
                    })
                } else {
                    console.warn(data.message)
                }
            })
            .catch(error => bad_request(dispatch, error, 'Запрос на создание Списания не выполнен'))

    }
}



export function saveWriteOf() {

    const state = store.getState()

    const request_config = getRequestConfig({
        id: state.writeof.edit,
        description: state.writeof.description,
        filter: getFilter()
    })
    request_config.method = 'PUT'


    return async dispatch => {

        await fetch(state.data.url_server + '/warehouse_write_of', request_config)
            .then(response =>  response.json())
            .then(data => {
                if (data.success) {
                    dispatch({
                        type: 'CHANGE_WRITE_OF_STATE',
                        data: {write_offs: data.write_offs, count: data.count},
                    })
                    dispatch({
                        type: 'RESET_WRITE_OF'
                    })
                    dispatch({
                        type: 'CHANGE_VISIBLE_STATE',
                        data: {isCentralModalOpen: false, modalCentralType: ''}
                    })
                } else {
                    console.warn(data.message)
                }
            })
            .catch(error => bad_request(dispatch, error, 'Запрос на изменение Списания не выполнен'))

    }
}

