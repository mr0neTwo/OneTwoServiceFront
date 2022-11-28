import store from '../store'
import { getRequestConfig, bad_request } from './actionUtils'

export function changeMovementState( data ) {
    return {
        type: 'CHANGE_MOVEMENT_STATE',
        data
    }
}

export function editMovement(movement) {
    return {
        type: 'EDIT_MOVEMENT',
        movement
    }
}

export function resetMovement() {
    return {
        type: 'RESET_MOVEMENT'
    }
}

export function selectedMovement( value, field, saveToApp=false ) {
    return {
        type: 'SELECTED_MOVEMENT',
        field,
        value,
        saveToApp
    }
}

function getFilter() {
    const state = store.getState()
    return {
        filter_created_at: state.movement.filter_created_at,
        page: 0
    }
}

export function getMovement(movement_id) {

    const state = store.getState()

    const request_config = getRequestConfig({id: movement_id})

    return dispatch => {

        fetch(state.data.url_server + '/get_warehouse_movement', request_config)
            .then(response =>  response.json())
            .then(data => {
                if (data.success) {
                    dispatch({
                        type: 'EDIT_MOVEMENT',
                        movement: data.warehouse_movement,
                    })
                    dispatch({
                        type: 'CHANGE_VISIBLE_STATE',
                        data: {statusMovementEditor: true}
                    })
                } else {
                    console.warn(data.message)
                }
            })
            .catch(error => bad_request(dispatch, error, 'Запрос Перемещения не выполнен'))

    }
}

export function addMovements() {

    const state = store.getState()

    const request_config = getRequestConfig({...getFilter()})

    return dispatch => {

        fetch(state.data.url_server + '/get_warehouse_movements', request_config)
            .then(response =>  response.json())
            .then(data => {
                if (data.success) {
                    dispatch({
                        type: 'CHANGE_MOVEMENT_STATE',
                        data: {warehouse_movements: data.warehouse_movements, count: data.count},
                    })
                } else {
                    console.warn(data.message)
                }
            })
            .catch(error => bad_request(dispatch, error, 'Запрос Перемещений не выполнен'))

    }
}

export function createMovements() {

    const state = store.getState()

    const request_config = getRequestConfig({
        created_at: parseInt(new Date() / 1000),
        parts: state.movement.parts,
        description: state.movement.description,
        warehouse_id: state.remain.filter_warehouse.id,
        target_warehouse_id: state.movement.target_warehouse.id,
        filter: getFilter()
    })

    return async dispatch => {

        await fetch(state.data.url_server + '/warehouse_movement', request_config)
            .then(response =>  response.json())
            .then(data => {
                if (data.success) {
                    dispatch({
                        type: 'CHANGE_MOVEMENT_STATE',
                        data: {warehouse_movements: data.warehouse_movements, count: data.count},
                    })
                    dispatch({
                        type: 'CHANGE_VISIBLE_STATE',
                        data: {statusMovementEditor: false},
                    })
                    dispatch({
                        type: 'RESET_MOVEMENT'
                    })
                } else {
                    console.warn(data.message)
                }
            })
            .catch(error => bad_request(dispatch, error, 'Запрос на создание Перемещения не выполнен'))

    }
}


export function saveMovements() {

    const state = store.getState()

    const request_config = getRequestConfig({
        id: state.movement.edit,
        description: state.movement.description,
        filter: getFilter()
    })
    request_config.method = 'PUT'


    return async dispatch => {

        await fetch(state.data.url_server + '/warehouse_movement', request_config)
            .then(response =>  response.json())
            .then(data => {
                if (data.success) {
                    dispatch({
                        type: 'CHANGE_MOVEMENT_STATE',
                        data: {warehouse_movements: data.warehouse_movements, count: data.count},
                    })
                    dispatch({
                        type: 'CHANGE_VISIBLE_STATE',
                        data: {statusMovementEditor: false},
                    })
                    dispatch({
                        type: 'RESET_MOVEMENT'
                    })
                } else {
                    console.warn(data.message)
                }
            })
            .catch(error => bad_request(dispatch, error, 'Запрос на изменение Перемещения не выполнен'))
    }
}
