import store from '../store'
import { getRequestConfig, bad_request } from './actionUtils'

export function changeRegistrationState( data ) {
    return {
        type: 'CHANGE_REGISTRATION_STATE',
        data
    }
}

export function editRegistration(registration) {
    return {
        type: 'EDIT_REGISTRATION',
        registration
    }
}

export function resetRegistration() {
    return {
        type: 'RESET_REGISTRATION'
    }
}

export function resetRegistrationPart() {
    return {
        type: 'RESET_REGISTRATION_PART'
    }
}

export function selectedRegistration( value, field, saveToApp=true ) {
    return {
        type: 'SELECTED_REGISTRATION',
        field,
        value,
        saveToApp
    }
}


export function addRegistrationPart ( ) {
    return {
        type: 'ADD_REGISTRATION_PART'
    }
}

export function saveRegistrationPart ( idx ) {
    return {
        type: 'SAVE_REGISTRATION_PART',
        idx
    }
}

export function editRegistrationPart ( idx, part ) {
    return {
        type: 'EDIT_REGISTRATION_PART',
        idx,
        part
    }
}

export function deleteRegistrationPart ( idx ) {
    return {
        type: 'DELETE_REGISTRATION_PART',
        idx
    }
}


function getFilter() {
    const state = store.getState()
    return {
        deleted: state.registration.showDeleted,
        custom_created_at: state.registration.filter_created_at,
        page: state.registration.page
    }
}

export function addRegistration() {

    const state = store.getState()

    const request_config = getRequestConfig({
        deleted: state.registration.showDeleted,
        custom_created_at: state.registration.filter_created_at,
        page: state.registration.page
    })

    return dispatch => {

        fetch(state.data.url_server + '/get_warehouse_registrations', request_config)
            .then(response =>  response.json())
            .then(data => {
                if (data.success) {
                    dispatch({
                        type: 'CHANGE_REGISTRATION_STATE',
                        data: {registrations: data.warehouse_registrations},
                    })
                } else {
                    console.warn(data.message)
                }
            })
            .catch(error => bad_request(dispatch, error, 'Запрос оприходований не выполнен'))
    }
}

export function createRegistration() {

    const state = store.getState()
    const now = Math.round(Date.now() / 1000)

    const request_config = getRequestConfig({
        number: state.registration.number,
        created_at: state.registration.created_at || now,
        custom_created_at: parseInt(state.registration.custom_created_at) || now,
        deleted: state.registration.deleted,
        description: state.registration.description,
        parts: state.registration.parts,
        client_id: state.registration.client.id,
        warehouse_id: state.registration.warehouse.id,
        employee_id: state.data.user.id,
        price: state.registration.price,
        filter: getFilter()
    })

    return async dispatch => {

        await fetch(state.data.url_server + '/warehouse_registrations', request_config)
            .then(response =>  response.json())
            .then(data => {
                if (data.success) {
                    dispatch({
                        type: 'CHANGE_REGISTRATION_STATE',
                        data: {registrations: data.warehouse_registrations},
                    })
                    dispatch({
                        type: 'CHANGE_VISIBLE_STATE',
                        data: {statusRegistrationEditor: false},
                    })
                    dispatch({
                        type: 'RESET_REGISTRATION'
                    })
                } else {
                    console.warn(data.message)
                }
            })
            .catch(error => bad_request(dispatch, error, 'Запрос на создание оприходования не выполнен'))
    }
}


export function saveRegistration() {

    const state = store.getState()

    const request_config = getRequestConfig({
        id: state.registration.edit,
        number: state.registration.number,
        created_at: state.registration.created_at,
        custom_created_at: state.registration.custom_created_at,
        deleted: state.registration.deleted,
        description: state.registration.description,
        parts: state.registration.parts,
        client_id: state.registration.client.id,
        warehouse_id: state.registration.warehouse.id,
        employee_id: state.registration.employee.id,
        filter: getFilter()
    })
    request_config.method = 'PUT'


    return async dispatch => {

        await fetch(state.data.url_server + '/warehouse_registrations', request_config)
            .then(response =>  response.json())
            .then(data => {
                if (data.success) {
                    dispatch({
                        type: 'CHANGE_REGISTRATION_STATE',
                        data: {registrations: data.warehouse_registrations},
                    })
                    dispatch({
                        type: 'CHANGE_VISIBLE_STATE',
                        data: {statusRegistrationEditor: false},
                    })
                    dispatch({
                        type: 'RESET_REGISTRATION'
                    })
                } else {
                    console.warn(data.message)
                }
            })
            .catch(error => bad_request(dispatch, error, 'Запрос на изменение оприходования не выполнен'))

    }
}

export function deleteRegistration(flag) {

    const state = store.getState()

    let request_config = getRequestConfig({
        id: state.registration.edit,
        deleted: flag,
        filter: getFilter()
    })
    request_config.method = 'PUT'


    return async dispatch => {

        await fetch(state.data.url_server + '/warehouse_registrations', request_config)
            .then(response =>  response.json())
            .then(data => {
                if (data.success) {
                    dispatch({
                        type: 'CHANGE_REGISTRATION_STATE',
                        data: {registrations: data.warehouse_registrations},
                    })
                    dispatch({
                        type: 'CHANGE_VISIBLE_STATE',
                        data: {statusRegistrationEditor: false},
                    })
                    dispatch({
                        type: 'RESET_REGISTRATION'
                    })
                } else {
                    console.warn(data.message)
                }
            })
            .catch(error => bad_request(dispatch, error, 'Запрос на удаление/восстановление оприходования не выполнен'))

    }
}