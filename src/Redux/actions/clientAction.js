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
            .catch(error => bad_request(dispatch, error, 'Запрос клиентов не выполнен'))
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
            .catch(error => bad_request(dispatch, error, 'Запрос клиентa не выполнен'))

    }
}
