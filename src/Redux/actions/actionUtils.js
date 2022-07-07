import store from '../store'

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

export function bad_request(message = '') {
    sessionStorage.clear()
    console.warn(message)
    return {type: 'LOGUOT'}
}
// 'Authorization': `Bearer ${state.data.token}`,