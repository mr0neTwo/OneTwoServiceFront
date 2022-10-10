import store from '../store'
import { getRequestConfig, bad_request } from './actionUtils'

export function changeTempleState( data ) {
    return {
        type: 'CHANGE_FILTER_STATE',
        data
    }
}

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

function getFilter() {
    const state = store.getState()
    return {
        ability1: state.temple.ability1,
        ability2: state.temple.ability2,
        page: 0
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
                        type: 'CHANGE_TEMPLE_STATE',
                        data: {},
                    })
                } else {
                    console.warn(data.message)
                }
            })
            .catch(error => bad_request(dispatch, error, 'Запрос temple не выполнен'))

    }
}

export function createTemple() {

    const state = store.getState()

    const request_config = getRequestConfig({
        ability1: 0,
        ability2: 0,
        filter: getFilter()
    })

    return async dispatch => {

        await fetch(state.data.url_server + '/temple', request_config)
            .then(response =>  response.json())
            .then(data => {
                if (data.success) {
                    dispatch({
                        type: 'CHANGE_TEMPLE_STATE',
                        data: {},
                    })
                    dispatch({
                        type: 'CHANGE_VISIBLE_STATE',
                        data: {statusTempleEditor: false},
                    })
                    dispatch({
                        type: 'RESET_TEMPLE'
                    })
                } else {
                    console.warn(data.message)
                }
            })
            .catch(error => bad_request(dispatch, error, 'Запрос на создание temple не выполнен'))

    }
}



export function saveTemple() {

    const state = store.getState()

    const request_config = getRequestConfig({
        ability1: 0,
        ability2: 0,
        filter: getFilter()
    })
    request_config.method = 'PUT'


    return async dispatch => {

        await fetch(state.data.url_server + '/temple', request_config)
            .then(response =>  response.json())
            .then(data => {
                if (data.success) {
                    dispatch({
                        type: 'CHANGE_TEMPLE_STATE',
                        data: {},
                    })
                    dispatch({
                        type: 'CHANGE_VISIBLE_STATE',
                        data: {statusTempleEditor: false},
                    })
                    dispatch({
                        type: 'RESET_TEMPLE'
                    })
                } else {
                    console.warn(data.message)
                }
            })
            .catch(error => bad_request(dispatch, error, 'Запрос на изменение temple не выполнен'))

    }
}

export function deleteTemple(flag) {

    const state = store.getState()

    let request_config = getRequestConfig({
        id: state.temple.edit,
        deleted: flag,
        filter: getFilter()
    })
    request_config.method = 'PUT'


    return async dispatch => {

        await fetch(state.data.url_server + '/temple', request_config)
            .then(response =>  response.json())
            .then(data => {
                if (data.success) {
                    dispatch({
                        type: 'CHANGE_TEMPLE_STATE',
                        data: {},
                    })
                    dispatch({
                        type: 'CHANGE_VISIBLE_STATE',
                        data: {statusTempleEditor: false},
                    })
                    dispatch({
                        type: 'RESET_TEMPLE'
                    })
                } else {
                    console.warn(data.message)
                }
            })
            .catch(error => bad_request(dispatch, error, 'Запрос на удаление/восстановление temple не выполнен'))

    }
}