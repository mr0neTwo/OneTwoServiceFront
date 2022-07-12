import store from '../store'
import { getRequestConfig, bad_request } from './actionUtils'


export function changeNotTemplateForm( value, field ) {
    return {
        type: 'CHANGE_NOT_TEMPLATE_FORM',
        field,
        value
    }
}

export function editNotTemplate(template) {
    return {
        type: 'EDIT_NOT_TEMPLATE',
        template
    }
}

export function resetNotTemplate() {
    return {
        type: 'RESET_NOT_TEMPLATE'
    }
}


// export function selectedTemple( value, field, saveToApp=false ) {
//     return {
//         type: 'SELECTED_TEMPLE',
//         field,
//         value,
//         saveToApp
//     }
// }

export function addNotTemplate() {

    const state = store.getState()

    const request_config = getRequestConfig({
        deleted: state.notTemplate.showDeleted
    })

    return dispatch => {

        fetch(state.data.url_server + '/get_notification_template', request_config)
            .then(response =>  response.json())
            .then(data => {
                if (data.success) {
                    dispatch({
                        type: 'CHANGE_NOT_TEMPLATE_FORM',
                        field: 'templates',
                        value: data.data
                    })
                } else {
                    console.warn(data.message)
                }
            })
            .catch(error => {
                if (error.message === 'Unexpected token < in JSON at position 0') {
                    dispatch({
                        type: 'CHANGE_VISIBLE_STATE',
                        data: {statusRefreshPage: true}
                    })
                }
                bad_request('Запрос шаблонов не выполнен')
            })

    }
}

export function createNotTemplate() {

    const state = store.getState()

    const request_config1 = getRequestConfig({
        title: state.notTemplate.title,
        template: state.notTemplate.template,
        deleted: false,
    })

    const request_config2 = getRequestConfig({
        deleted: state.notTemplate.showDeleted
    })

    return async dispatch => {

        await fetch(state.data.url_server + '/notification_template', request_config1)
            .catch(error => {
                if (error.message === 'Unexpected token < in JSON at position 0') {
                    dispatch({
                        type: 'CHANGE_VISIBLE_STATE',
                        data: {statusRefreshPage: true}
                    })
                }
                bad_request('Запрос на создание шаблона не выполнен')
            })

        await fetch(state.data.url_server + '/get_notification_template', request_config2)
            .then(response =>  response.json())
            .then(data => {
                if (data.success) {
                    dispatch({
                        type: 'CHANGE_NOT_TEMPLATE_FORM',
                        field: 'templates',
                        value: data.data
                    })
                    dispatch({
                        type: 'SET_VISIBLE_FLAG',
                        field: 'statusNotTemplateEditor',
                        value: false
                    })
                    dispatch({
                        type: 'RESET_NOT_TEMPLATE'
                    })
                } else {
                    console.warn(data.message)
                }
            })
            .catch(error => {
                if (error.message === 'Unexpected token < in JSON at position 0') {
                    dispatch({
                        type: 'CHANGE_VISIBLE_STATE',
                        data: {statusRefreshPage: true}
                    })
                }
                bad_request('Запрос шаблонов не выполнен')
            })

    }
}



export function saveNotTemplate() {

    const state = store.getState()

    let request_config1 = getRequestConfig({
        id: state.notTemplate.edit,
        title: state.notTemplate.title,
        template: state.notTemplate.template,
        deleted: false,
    })
    request_config1.method = 'PUT'

    const request_config2 = getRequestConfig({
        deleted: state.notTemplate.showDeleted
    })

    return async dispatch => {

        await fetch(state.data.url_server + '/notification_template', request_config1)
            .catch(error => {
                if (error.message === 'Unexpected token < in JSON at position 0') {
                    dispatch({
                        type: 'CHANGE_VISIBLE_STATE',
                        data: {statusRefreshPage: true}
                    })
                }
                bad_request('Запрос на изменение шаблона не выполнен')
            })

        await fetch(state.data.url_server + '/get_notification_template', request_config2)
            .then(response =>  response.json())
            .then(data => {
                if (data.success) {
                    dispatch({
                        type: 'CHANGE_NOT_TEMPLATE_FORM',
                        field: 'templates',
                        value: data.data
                    })
                    dispatch({
                        type: 'SET_VISIBLE_FLAG',
                        field: 'statusNotTemplateEditor',
                        value: false
                    })
                    dispatch({
                        type: 'RESET_NOT_TEMPLATE'
                    })
                } else {
                    console.warn(data.message)
                }
            })
            .catch(error => {
                if (error.message === 'Unexpected token < in JSON at position 0') {
                    dispatch({
                        type: 'CHANGE_VISIBLE_STATE',
                        data: {statusRefreshPage: true}
                    })
                }
                bad_request('Запрос шаблонов не выполнен')
            })

    }
}

export function deleteNotTemplate(flag) {

    const state = store.getState()

    let request_config1 = getRequestConfig({
        id: state.notTemplate.edit,
        deleted: flag
    })
    request_config1.method = 'PUT'

    const request_config2 = getRequestConfig({
        deleted: state.notTemplate.showDeleted
    })

    return async dispatch => {

        await fetch(state.data.url_server + '/notification_template', request_config1)
            .catch(error => {
                if (error.message === 'Unexpected token < in JSON at position 0') {
                    dispatch({
                        type: 'CHANGE_VISIBLE_STATE',
                        data: {statusRefreshPage: true}
                    })
                }
                bad_request('Запрос на удаление/восстановление шаблона не выполнен')
            })

        await fetch(state.data.url_server + '/get_notification_template', request_config2)
            .then(response =>  response.json())
            .then(data => {
                if (data.success) {
                    dispatch({
                        type: 'CHANGE_NOT_TEMPLATE_FORM',
                        field: 'templates',
                        value: data.data
                    })
                    dispatch({
                        type: 'SET_VISIBLE_FLAG',
                        field: 'statusNotTemplateEditor',
                        value: false
                    })
                    dispatch({
                        type: 'RESET_NOT_TEMPLATE'
                    })
                } else {
                    console.warn(data.message)
                }
            })
            .catch(error => {
                if (error.message === 'Unexpected token < in JSON at position 0') {
                    dispatch({
                        type: 'CHANGE_VISIBLE_STATE',
                        data: {statusRefreshPage: true}
                    })
                }
                bad_request('Запрос шиблонов не выполнен')
            })

    }
}