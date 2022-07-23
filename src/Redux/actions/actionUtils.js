import store from '../store'
import {csrf, showAlert} from '../actions'

export function getRequestConfig(body = {}) {

    const state = store.getState()

    return {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": state.data.csrfToken,
        },
        credentials: state.data.credentials,
        body: JSON.stringify(body)
    }
}

export function bad_request(dispatch, error, message = '') {
    console.warn(message)
    if (error.message === 'Unexpected token < in JSON at position 0') {
        sessionStorage.clear()
        dispatch({
            type: 'CHANGE_VISIBLE_STATE',
            data: {statusRefreshPage: true, statusOrderLoader: false}
        })
    }
    showAlert(dispatch, 'alert-danger', message)
}
