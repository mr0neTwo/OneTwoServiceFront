import store from '../store'
import {showAlert} from '../actions'

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
    console.log(error)
    if (error.code === 401) {
        sessionStorage.clear()
        dispatch({
            type: 'CHANGE_VISIBLE_STATE',
            data: {statusRefreshPage: true, statusOrderLoader: false}
        })
    }
    showAlert(dispatch, 'danger', message)
}
