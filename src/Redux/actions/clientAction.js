import store from '../store'
import { getRequestConfig, bad_request } from './actionUtils'


export function changeClientForm( value, field ) {
    return {
        type: 'CHANGE_CLIENT_FORM',
        field,
        value
    }
}

export function changeClientState( data ) {
    return {
        type: 'CHANGE_CLIENT_STATE',
        data
    }
}


export function addClients() {

    const state = store.getState()

    const request_config = getRequestConfig({
        page: state.client.page,
        name: state.client.filter_name,
        phone: state.client.filter_phone
    })

    return dispatch => {

        fetch(state.data.url_server + '/get_clients', request_config)
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    dispatch({
                        type: 'CHANGE_CLIENT_STATE',
                        data: {clients: data.data}
                    })
                } else {
                    console.warn(data.message)
                }
            })
            .catch(() => bad_request('Запрос клиентов не выполнен'))
    }
}

export function addClientToTempFilter(id) {

    const state = store.getState()


    return dispatch => {

        fetch(state.data.url_server + '/get_clients', getRequestConfig({id}))
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    if (data.count) {
                        dispatch({
                            type: 'CHANGE_FILTER_STATE',
                            data: {temp_client: data.data[0]}
                        })
                    }
                } else {
                    console.warn(data.message)
                }
            })
            .catch(() => bad_request('Запрос клиентa не выполнен'))

    }
}

/*
export function editTemple(temple) {
    return {
        type: 'EDIT_TEMPLE',
        temple
    }
}

export function resetTemple() {
    return {
        type: 'RESET_TEMPLE'
    }
}


export function selectedTemple( value, field, saveToApp=false ) {
    return {
        type: 'SELECTED_TEMPLE',
        field,
        value,
        saveToApp
    }
}

export function addTemple() {

    const state = store.getState()

    const request_config = getRequestConfig({
        ability1: 0,
        ability2: 0
    })

    return dispatch => {

        fetch(state.data.url_server + '/get_temple', request_config)
            .then(response =>  response.json())
            .then(data => {
                if (data.success) {
                    dispatch({
                        type: 'CHANGE_TEMPLE_FORM',
                        field: 'temple',
                        value: data.data
                    })
                } else {
                    console.warn(data.message)
                }
            })
            .catch(() => bad_request('Запрос temple не выполнен'))

    }
}

export function createTemple() {

    const state = store.getState()

    const request_config1 = getRequestConfig({
        ability1: 0,
        ability2: 0
    })

    const request_config2 = getRequestConfig({
        ability1: 0,
        ability2: 0
    })

    return async dispatch => {

        await fetch(state.data.url_server + '/temple', request_config1)
            .catch(() => bad_request('Запрос на создание temple не выполнен'))

        await fetch(state.data.url_server + '/get_temple', request_config2)
            .then(response =>  response.json())
            .then(data => {
                if (data.success) {
                    dispatch({
                        type: 'CHANGE_TEMPLE_FORM',
                        field: 'temple',
                        value: data.data
                    })
                    dispatch({
                        type: 'SET_VISIBLE_FLAG',
                        field: 'statusTempleEditor',
                        value: false
                    })
                    dispatch({
                        type: 'RESET_TEMPLE'
                    })
                } else {
                    console.warn(data.message)
                }
            })
            .catch(() => bad_request('Запрос temple не выполнен'))

    }
}



export function saveTemple() {

    const state = store.getState()

    let request_config1 = getRequestConfig({
        ability1: 0,
        ability2: 0
    })
    request_config.method = 'PUT'

    const request_config2 = getRequestConfig({
        ability1: 0,
        ability2: 0
    })

    return async dispatch => {

        await fetch(state.data.url_server + '/temple', request_config1)
            .catch(() => bad_request('Запрос на изменение temple не выполнен'))

        await fetch(state.data.url_server + '/get_temple', request_config2)
            .then(response =>  response.json())
            .then(data => {
                if (data.success) {
                    dispatch({
                        type: 'CHANGE_TEMPLE_FORM',
                        field: 'temple',
                        value: data.data
                    })
                    dispatch({
                        type: 'SET_VISIBLE_FLAG',
                        field: 'statusTempleEditor',
                        value: false
                    })
                    dispatch({
                        type: 'RESET_TEMPLE'
                    })
                } else {
                    console.warn(data.message)
                }
            })
            .catch(() => bad_request('Запрос temple не выполнен'))

    }
}

export function deleteOperation(flag) {

    const state = store.getState()

    let request_config1 = getRequestConfig({
        id: state.temple.edit,
        deleted: flag
    })
    request_config.method = 'PUT'

    const request_config2 = getRequestConfig({
        ability1: 0,
        ability2: 0
    })

    return async dispatch => {

        await fetch(state.data.url_server + '/temple', request_config1)
            .catch(() => bad_request('Запрос на удаление/восстановление temple не выполнен'))

        await fetch(state.data.url_server + '/get_temple', request_config2)
            .then(response =>  response.json())
            .then(data => {
                if (data.success) {
                    dispatch({
                        type: 'CHANGE_TEMPLE_FORM',
                        field: 'temple',
                        value: data.data
                    })
                    dispatch({
                        type: 'SET_VISIBLE_FLAG',
                        field: 'statusTempleEditor',
                        value: false
                    })
                    dispatch({
                        type: 'RESET_TEMPLE'
                    })
                } else {
                    console.warn(data.message)
                }
            })
            .catch(() => bad_request('Запрос temple не выполнен'))

    }
}

*/