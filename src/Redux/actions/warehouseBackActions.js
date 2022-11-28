import store from '../store'
import { getRequestConfig, bad_request } from './actionUtils'

export function changeBackState( data ) {
    return {
        type: 'CHANGE_BACK_STATE',
        data
    }
}

export function editBack(back) {
    return {
        type: 'EDIT_BACK',
        back
    }
}

export function resetBack() {
    return {
        type: 'RESET_BACK'
    }
}


export function selectedBack( value, field, saveToApp=true ) {
    return {
        type: 'SELECTED_BACK',
        field,
        value,
        saveToApp
    }
}

function getFilter() {
    const state = store.getState()
    return {
        filter_created_at: state.back.filter_created_at,
        page: 0
    }
}

export function getBack(back_id) {

    const state = store.getState()

    const request_config = getRequestConfig({id: back_id})

    return dispatch => {

        fetch(state.data.url_server + '/get_warehouse_back', request_config)
            .then(response =>  response.json())
            .then(data => {
                if (data.success) {
                    dispatch({
                        type: 'EDIT_BACK',
                        back: data.back,
                    })
                    dispatch({
                        type: 'CHANGE_VISIBLE_STATE',
                        data: {statusBackEditor: true}
                    })
                } else {
                    console.warn(data.message)
                }
            })
            .catch(error => bad_request(dispatch, error, 'Запрос Возврата не выполнен'))

    }
}

export function addBacks() {

    const state = store.getState()

    const request_config = getRequestConfig({...getFilter()})

    return dispatch => {

        fetch(state.data.url_server + '/get_warehouse_backs', request_config)
            .then(response =>  response.json())
            .then(data => {
                if (data.success) {
                    dispatch({
                        type: 'CHANGE_BACK_STATE',
                        data: {warehouse_backs: data.backs, count: data.count},
                    })
                } else {
                    console.warn(data.message)
                }
            })
            .catch(error => bad_request(dispatch, error, 'Запрос возвратов не выполнен'))

    }
}

export function createBack() {

    const state = store.getState()

    const request_config = getRequestConfig({
        label: state.back.label,
        created_at: parseInt(new Date() / 1000),
        parts: state.back.parts,
        description: state.back.description,
        price: state.back.price,
        created_by_id: state.back.created_by.id,
        warehouse_id: state.remain.filter_warehouse.id,
        client_id: state.back.client.id,
        registration_id: state.back.registration.id,
        filter: getFilter()
    })

    return async dispatch => {

        await fetch(state.data.url_server + '/warehouse_backs', request_config)
            .then(response =>  response.json())
            .then(data => {
                if (data.success) {
                    dispatch({
                        type: 'CHANGE_BACK_STATE',
                        data: {warehouse_backs: data.backs, count: data.count}
                    })
                    dispatch({
                        type: 'CHANGE_VISIBLE_STATE',
                        data: {statusBackEditor: false},
                    })
                    dispatch({
                        type: 'RESET_BACK'
                    })
                } else {
                    console.warn(data.message)
                }
            })
            .catch(error => bad_request(dispatch, error, 'Запрос на создание Возврата не выполнен'))

    }
}



export function saveBack() {

    const state = store.getState()

    const request_config = getRequestConfig({
        id: state.back.edit,
        description: state.back.description,
        filter: getFilter()
    })
    request_config.method = 'PUT'


    return async dispatch => {

        await fetch(state.data.url_server + '/warehouse_backs', request_config)
            .then(response =>  response.json())
            .then(data => {
                if (data.success) {
                    dispatch({
                        type: 'CHANGE_BACK_STATE',
                        data: {warehouse_backs: data.backs, count: data.count}
                    })
                    dispatch({
                        type: 'CHANGE_VISIBLE_STATE',
                        data: {statusBackEditor: false},
                    })
                    dispatch({
                        type: 'RESET_BACK'
                    })
                } else {
                    console.warn(data.message)
                }
            })
            .catch(error => bad_request(dispatch, error, 'Запрос на изменение Возврата не выполнен'))

    }
}
