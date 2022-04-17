import store from '../store'
import { getRequestConfig, bad_request } from './actionUtils'


export function changeNotEventForm( value, field ) {
    return {
        type: 'CHANGE_NOT_EVENT_FORM',
        field,
        value
    }
}

export function editNotEvent(event) {
    return {
        type: 'EDIT_NOT_EVENT',
        event
    }
}

export function resetNotEvent() {
    return {
        type: 'RESET_NOT_EVENT'
    }
}


export function selectedNotEvent( value, field, saveToApp=false ) {
    return {
        type: 'SELECTED_NOT_EVENT',
        field,
        value,
        saveToApp
    }
}

export function addNotEvent() {

    const state = store.getState()

    const request_config = getRequestConfig({
        deleted: state.notEvent.showDeleted,
        target_audience: state.notEvent.filter_target_audience
    })

    return dispatch => {

        fetch(state.data.url_server + '/get_notification_events', request_config)
            .then(response =>  response.json())
            .then(data => {
                if (data.success) {
                    dispatch({
                        type: 'CHANGE_NOT_EVENT_FORM',
                        field: 'events',
                        value: data.data
                    })
                } else {
                    console.warn(data.message)
                }
            })
            .catch(() => bad_request('Запрос событий не выполнен'))

    }
}

export function createNotEvent() {

    const state = store.getState()

    const request_config1 = getRequestConfig({
        event: state.notEvent.event,
        target_audience: state.notEvent.target_audience,
        notification_type: state.notEvent.notification_type,
        statuses: state.notEvent.statuses,
        notification_template_id: state.notEvent.notification_template_id,
        deleted: false,
    })

    const request_config2 = getRequestConfig({
        deleted: state.notEvent.showDeleted,
        target_audience: state.notEvent.filter_target_audience
    })

    return async dispatch => {

        await fetch(state.data.url_server + '/notification_events', request_config1)
            .catch(() => bad_request('Запрос на создание события не выполнен'))

        await fetch(state.data.url_server + '/get_notification_events', request_config2)
            .then(response =>  response.json())
            .then(data => {
                if (data.success) {
                    dispatch({
                        type: 'CHANGE_NOT_EVENT_FORM',
                        field: 'events',
                        value: data.data
                    })
                    dispatch({
                        type: 'SET_VISIBLE_FLAG',
                        field: 'statusNotEventEditor',
                        value: false
                    })
                    dispatch({
                        type: 'RESET_NOT_EVENT'
                    })
                } else {
                    console.warn(data.message)
                }
            })
            .catch(() => bad_request('Запрос событий не выполнен'))

    }
}



export function saveNotEvent() {

    const state = store.getState()

    let request_config1 = getRequestConfig({
        id: state.notEvent.edit,
        event: state.notEvent.event,
        target_audience: state.notEvent.target_audience,
        statuses: state.notEvent.statuses,
        notification_template_id: state.notEvent.notification_template_id
    })
    request_config1.method = 'PUT'

    const request_config2 = getRequestConfig({
        deleted: state.notEvent.showDeleted,
        target_audience: state.notEvent.filter_target_audience
    })

    return async dispatch => {

        await fetch(state.data.url_server + '/notification_events', request_config1)
            .catch(() => bad_request('Запрос на изменение события не выполнен'))

        await fetch(state.data.url_server + '/get_notification_events', request_config2)
            .then(response =>  response.json())
            .then(data => {
                if (data.success) {
                    dispatch({
                        type: 'CHANGE_NOT_EVENT_FORM',
                        field: 'events',
                        value: data.data
                    })
                    dispatch({
                        type: 'SET_VISIBLE_FLAG',
                        field: 'statusNotEventEditor',
                        value: false
                    })
                    dispatch({
                        type: 'RESET_NOT_EVENT'
                    })
                } else {
                    console.warn(data.message)
                }
            })
            .catch(() => bad_request('Запрос событий не выполнен'))

    }
}

export function deleteNotEvent(flag) {

    const state = store.getState()

    let request_config1 = getRequestConfig({
        id: state.notEvent.edit,
        deleted: flag
    })
    request_config1.method = 'PUT'

    const request_config2 = getRequestConfig({
        deleted: state.notEvent.showDeleted,
        target_audience: state.notEvent.filter_target_audience
    })

    return async dispatch => {

        await fetch(state.data.url_server + '/notification_events', request_config1)
            .catch(() => bad_request('Запрос на удаление/восстановление события не выполнен'))

        await fetch(state.data.url_server + '/get_notification_events', request_config2)
            .then(response =>  response.json())
            .then(data => {
                if (data.success) {
                    dispatch({
                        type: 'CHANGE_NOT_EVENT_FORM',
                        field: 'events',
                        value: data.data
                    })
                    dispatch({
                        type: 'SET_VISIBLE_FLAG',
                        field: 'statusNotEventEditor',
                        value: false
                    })
                    dispatch({
                        type: 'RESET_NOT_EVENT'
                    })
                } else {
                    console.warn(data.message)
                }
            })
            .catch(() => bad_request('Запрос событий не выполнен'))

    }
}