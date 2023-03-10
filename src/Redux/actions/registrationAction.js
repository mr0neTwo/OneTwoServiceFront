import store from '../store'
import { getRequestConfig, bad_request } from './actionUtils'
import {Modal} from "../../data/data";

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
        page: state.registration.page ? state.registration.page - 1 : 0
    }
}

export function getRegistration(registration_id) {

    const state = store.getState()

    const request_config = getRequestConfig({id: registration_id})

    return async dispatch => {
        if (state.data.user.role.permissions.includes('edit_registrations')) {

            await  dispatch({
                type: 'CHANGE_VISIBLE_STATE',
                data: {'statusOrderLoader': true}
            })

            await fetch(state.data.url_server + '/get_warehouse_registration', request_config)
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        dispatch({
                            type: 'EDIT_REGISTRATION',
                            registration:  data.registration
                        })
                        dispatch({
                            type: 'CHANGE_VISIBLE_STATE',
                            data: {isRightModalOpen: true, modalType: Modal.Type.REGISTRATION}
                        })
                    } else {
                        console.warn(data.message)
                    }
                })
                .catch(error => bad_request(dispatch, error, '???????????? ?????????????????????????? ???? ????????????????'))

            await dispatch({
                type: 'CHANGE_VISIBLE_STATE',
                data: {'statusOrderLoader': false}
            })
        }
    }
}

export function addRegistration() {

    const state = store.getState()


    const request_config = getRequestConfig({...getFilter()})

    return dispatch => {

        fetch(state.data.url_server + '/get_warehouse_registrations', request_config)
            .then(response =>  response.json())
            .then(data => {
                if (data.success) {
                    dispatch({
                        type: 'CHANGE_REGISTRATION_STATE',
                        data: {registrations: data.warehouse_registrations, registrations_count: data.count},
                    })
                } else {
                    console.warn(data.message)
                }
            })
            .catch(error => bad_request(dispatch, error, '???????????? ?????????????????????????? ???? ????????????????'))
    }
}

export function createRegistration() {

    const state = store.getState()
    const now = Math.round(Date.now() / 1000)
    const parts = state.registration.parts.filter(part => !state.registration.inventory_id || part.checked)

    const request_config = getRequestConfig({
        number: state.registration.number,
        created_at: state.registration.created_at || now,
        custom_created_at: parseInt(state.registration.custom_created_at) || now,
        deleted: state.registration.deleted,
        description: state.registration.description,
        parts,
        client_id: state.registration.client.id,
        warehouse_id: state.registration.warehouse.id,
        employee_id: state.data.user.id,
        price: state.registration.price,
        inventory_id: state.registration.inventory_id || null,
        filter: getFilter()
    })

    return async dispatch => {

        await fetch(state.data.url_server + '/warehouse_registrations', request_config)
            .then(response =>  response.json())
            .then(data => {
                if (data.success) {
                    dispatch({
                        type: 'CHANGE_REGISTRATION_STATE',
                        data: {registrations: data.warehouse_registrations, registrations_count: data.count},
                    })
                    if (state.inventory.edit) {
                        dispatch({
                            type: 'EDIT_INVENTORY',
                            inventory: data.inventory
                        })
                    }
                    dispatch({
                        type: 'CHANGE_VISIBLE_STATE',
                        data: {isRightModalOpen: false, modalType: ''},
                    })
                    dispatch({
                        type: 'RESET_REGISTRATION'
                    })
                } else {
                    console.warn(data.message)
                }
            })
            .catch(error => bad_request(dispatch, error, '???????????? ???? ???????????????? ?????????????????????????? ???? ????????????????'))
    }
}


export function saveRegistration() {

    const state = store.getState()

    const request_config = getRequestConfig({
        id: state.registration.edit,
        number: state.registration.number,
        description: state.registration.description,
        parts: state.registration.parts,
        price: state.registration.price,
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
                        data: {registrations: data.warehouse_registrations, registrations_count: data.count},
                    })
                    dispatch({
                        type: 'CHANGE_VISIBLE_STATE',
                        data: {isRightModalOpen: false, modalType: ''},
                    })
                    dispatch({
                        type: 'RESET_REGISTRATION'
                    })
                } else {
                    console.warn(data.message)
                }
            })
            .catch(error => bad_request(dispatch, error, '???????????? ???? ?????????????????? ?????????????????????????? ???? ????????????????'))

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
                        data: {registrations: data.warehouse_registrations, registrations_count: data.count},
                    })
                    dispatch({
                        type: 'CHANGE_VISIBLE_STATE',
                        data: {isRightModalOpen: false, modalType: ''},
                    })
                    dispatch({
                        type: 'RESET_REGISTRATION'
                    })
                } else {
                    console.warn(data.message)
                }
            })
            .catch(error => bad_request(dispatch, error, '???????????? ???? ????????????????/???????????????????????????? ?????????????????????????? ???? ????????????????'))

    }
}