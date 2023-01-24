import store from '../store'
import { getRequestConfig, bad_request } from './actionUtils'



export function changeClientState( data ) {
    return {
        type: 'CHANGE_CLIENT_STATE',
        data
    }
}

export function changeClientEditorPhone(idx, field, value) {
    return {
        type: 'CHANGE_CLIENT_EDITOR_PHONE',
        idx,
        field,
        value
    }
}

export function addPhoneCounter() {
    return {
        type: 'ADD_PHONE_COUNTER'
    }
}


export function deleteCountNumber(idx) {
    const state = store.getState()

    if (state.client.phone[idx].id) {
        let request_config = getRequestConfig({id: state.client.phone[idx].id})
        request_config.method = 'PUT'

        return dispatch => {

            fetch(state.data.url_server + '/phone', request_config)
                .then(response =>  response.json())
                .then(data => {
                    if (data.success) {
                        dispatch({
                            type: 'CHANGE_CLIENT_STATE',
                            data: {phone: data.phones},
                        })
                    } else {
                        console.warn(data.message)
                    }
                })
                .catch(error => bad_request(dispatch, error, 'Запрос на удаление номера не выполнен'))

        }
    } else {
        return {
            type: 'DELETE_COUNT_NUMBER',
            idx
        }
    }
}

export function resetClient() {
    return {
        type: 'RESET_CLIENT'
    }
}

export function addClientTag(tag) {
    return {
        type: 'ADD_CLIENT_TAG',
        tag
    }
}

export function deleteClientTag(idx) {
    return {
        type: 'DELETE_CLIENT_TAG',
        idx
    }
}

function getFilter () {
    const state = store.getState()
    return {
        deleted: state.client.showDeleted,
        page: state.client.page,
        name: state.client.filter_name || null,
        phone: state.client.filter_phone || null,
        search: state.client.search || null,
    }
}

export function getClient(client_id) {

    const state = store.getState()

    const request_config = getRequestConfig({id: client_id})

    return dispatch => {

        fetch(state.data.url_server + '/get_client', request_config)
            .then(response =>  response.json())
            .then(data => {
                if (data.success) {
                    dispatch({
                        type: 'EDIT_CLIENT',
                        client: data.client,
                    })
                    dispatch({
                        type: 'CHANGE_VISIBLE_STATE',
                        data: {statusClientEditor: true}
                    })
                } else {
                    console.warn(data.message)
                }
            })
            .catch(error => bad_request(dispatch, error, 'Запрос Списаний не выполнен'))

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
                        data: {clients: data.clients}
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


export function createClient() {

    const state = store.getState()

    const request_config = getRequestConfig({
        juridical: state.client.juridical,
        supplier: state.client.supplier,
        conflicted: state.client.conflicted,
        should_send_email: state.client.should_send_email,
        discount_good_type: state.client.discount_good_type,
        discount_materials_type: state.client.discount_materials_type,

        name: state.client.name,
        name_doc: state.client.name_doc,
        email: state.client.email,
        address: state.client.address,
        discount_code: state.client.discount_code,
        notes: state.client.notes,
        ogrn: state.client.ogrn,
        inn: state.client.inn,
        kpp: state.client.kpp,
        juridical_address: state.client.juridical_address,
        director: state.client.director,
        bank_name: state.client.bank_name,
        settlement_account: state.client.settlement_account,
        corr_account: state.client.corr_account,
        bic: state.client.bic,

        discount_goods: state.client.discount_goods,
        discount_materials: state.client.discount_materials,
        discount_services: state.client.discount_services,

        ad_campaign_id: state.client.ad_campaign.id,
        discount_goods_margin_id: state.client.discount_goods_margin_id,
        discount_materials_margin_id: state.client.discount_materials_margin_id,
        discount_service_margin_id: state.client.discount_service_margin_id,
        discount_service_type: state.client.discount_service_type,

        tags: state.client.tags,
        phone: state.client.phone,

        filter: getFilter()
    })

    return dispatch => {

        fetch(state.data.url_server + '/clients', request_config)
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    dispatch({
                        type: 'CHANGE_CLIENT_STATE',
                        data: {clients: data.clients}
                    })
                    dispatch({
                        type: 'CHANGE_VISIBLE_STATE',
                        data: {statusClientEditor: false}
                    })
                    dispatch({
                        type: 'RESET_CLIENT'
                    })
                    if (state.view.statusOrderEditor) {
                        dispatch({
                            type: 'CHANGE_ORDER_STATE',
                            data: {client: data.new_client}
                        })
                    }
                    if (state.view.statusRegistrationEditor){
                        dispatch({
                            type: 'CHANGE_REGISTRATION_STATE',
                            data: {client: data.new_client}
                        })
                    }
                    if (state.view.statusPaymentsEditor) {
                        dispatch({
                            type: 'CHANGE_PAYMENT_STATE',
                            data: {client: data.new_client}
                        })
                    }
                } else {
                    console.warn(data.message)
                }
            })
            .catch(error => bad_request(dispatch, error, 'Запрос на создание клиента не выполнен'))
    }
}

export function saveChangeClient() {

    const state = store.getState()

    let request_config = getRequestConfig({
        id: state.client.edit,
        juridical: state.client.juridical,
        supplier: state.client.supplier,
        conflicted: state.client.conflicted,
        should_send_email: state.client.should_send_email,
        discount_good_type: state.client.discount_good_type,
        discount_materials_type: state.client.discount_materials_type,
        discount_service_type: state.client.discount_service_type,

        name: state.client.name,
        name_doc: state.client.name_doc,
        email: state.client.email,
        address: state.client.address,
        discount_code: state.client.discount_code,
        notes: state.client.notes,
        ogrn: state.client.ogrn,
        inn: state.client.inn,
        kpp: state.client.kpp,
        juridical_address: state.client.juridical_address,
        director: state.client.director,
        bank_name: state.client.bank_name,
        settlement_account: state.client.settlement_account,
        corr_account: state.client.corr_account,
        bic: state.client.bic,

        discount_goods: state.client.discount_goods,
        discount_materials: state.client.discount_materials,
        discount_services: state.client.discount_services,

        ad_campaign_id: state.client.ad_campaign.id,
        discount_goods_margin_id: state.client.discount_goods_margin_id,
        discount_materials_margin_id: state.client.discount_materials_margin_id,
        discount_service_margin_id: state.client.discount_service_margin_id,

        tags: state.client.tags,
        phone: state.client.phone,
        filter: getFilter()
    })
    request_config.method = 'PUT'

    return dispatch => {

        fetch(state.data.url_server + '/clients', request_config)
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    dispatch({
                        type: 'CHANGE_CLIENT_STATE',
                        data: {clients: data.clients}
                    })
                    dispatch({
                        type: 'CHANGE_VISIBLE_STATE',
                        data: {statusClientEditor: false}
                    })
                    dispatch({
                        type: 'RESET_CLIENT'
                    })
                } else {
                    console.warn(data.message)
                }
            })
            .catch(error => bad_request(dispatch, error,'Запрос на изменение данных клиента не выполнен'))
    }
}

export function editClient(id) {

    const state = store.getState()

    return dispatch => {

        fetch(state.data.url_server + '/get_clients', getRequestConfig({id}))
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    dispatch({
                        type: 'EDIT_CLIENT',
                        client: data.clients[0]
                    })
                } else {
                    console.warn(data.message)
                }
            })
            .catch(error => bad_request(dispatch, error,'Запрос данных клиента не выполнен'))
    }
}

export function deleteClient(flag) {

    const state = store.getState()

    let request_config = getRequestConfig({
        id: state.client.edit,
        deleted: flag
    })
    request_config.method = 'PUT'

    return dispatch => {

        fetch(state.data.url_server + '/clients', request_config)
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    dispatch({
                        type: 'CHANGE_CLIENT_STATE',
                        data: {clients: data.clients}
                    })
                    dispatch({
                        type: 'CHANGE_VISIBLE_STATE',
                        data: {statusClientEditor: false}
                    })
                    dispatch({
                        type: 'RESET_CLIENT'
                    })
                } else {
                    console.warn(data.message)
                }
            })
            .catch(error => bad_request(dispatch, error,'Запрос на изменение клиента не выполнен'))
    }
}
