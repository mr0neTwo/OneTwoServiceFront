import store from '../store'
import {bad_request, getRequestConfig} from './actionUtils'


export function changePriceState(data) {
    return {
        type: 'CHANGE_PRICE_STATE',
        data
    }
}

export function editPrice(price) {
    return {
        type: 'EDIT_PRICE',
        price
    }
}

export function resetPrice() {
    return {
        type: 'RESET_PRICE'
    }
}

export function addServicePrices() {

    const state = store.getState()

    return dispatch => {

        fetch(state.data.url_server + '/get_service_prices', getRequestConfig())
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    dispatch({
                        type: 'CHANGE_PRICE_STATE',
                        data: {service_prices: data.service_prices}
                    })
                } else {
                    console.warn(data.message)
                }
            })
            .catch(error => bad_request(dispatch, error, 'Запрос цен на услуги не выполнен'))
    }
}

export function createSaveServicePrice(id, cost, discount_margin_id, service_id) {

    const state = store.getState()

    const request_config = getRequestConfig({
        id,
        cost,
        discount_margin_id,
        service_id
    })

    return async dispatch => {

        await fetch(state.data.url_server + '/service_prices', request_config)
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    dispatch({
                        type: 'CHANGE_PRICE_STATE',
                        data: {service_prices: data.service_prices}
                    })
                } else {
                    console.warn(data.message)
                }
            })
            .catch(error => bad_request(dispatch, error, 'Запрос на создание цены услуги не выполнен'))
    }
}

function getFilter() {
    const state = store.getState()
    return {
        deleted: state.price.showDeleted,
        margin_type: state.price.filter_type,
        page: state.price.page
    }
}

export function addDiscountMargin() {

    const state = store.getState()

    return dispatch => {

        fetch(state.data.url_server + '/get_discount_margin', getRequestConfig(getFilter()))
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    dispatch({
                        type: 'CHANGE_PRICE_STATE',
                        data: {discount_margin: data.discount_margin},
                    })
                } else {
                    console.warn(data.message)
                }
            })
            .catch(error => bad_request(dispatch, error, 'Запрос наценок не выполнен'))
    }
}

export function createDiscountMargin() {

    const state = store.getState()

    const request_config = getRequestConfig({
        title: state.price.title,
        margin: state.price.margin,
        margin_type: state.price.margin_type,
        deleted: state.price.deleted,
        filter: getFilter()
    })

    return async dispatch => {

        await fetch(state.data.url_server + '/discount_margin', request_config)
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    dispatch({
                        type: 'CHANGE_PRICE_STATE',
                        data: {discount_margin: data.discount_margin},
                    })
                    dispatch({
                        type: 'CHANGE_VISIBLE_STATE',
                        data: {statusPriceEditor: false}
                    })
                    dispatch({
                        type: 'RESET_PRICE'
                    })
                } else {
                    console.warn(data.message)
                }
            })
            .catch(error => bad_request(dispatch, error, 'Запрос на создание наценки не выполнен'))
    }
}


export function saveDiscountMargin() {

    const state = store.getState()

    const request_config = getRequestConfig({
        id: state.price.edit,
        title: state.price.title,
        margin: state.price.margin,
        margin_type: state.price.margin_type,
        deleted: state.price.deleted,
        filter: getFilter()
    })
    request_config.method = 'PUT'

    return async dispatch => {

        await fetch(state.data.url_server + '/discount_margin', request_config)
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    dispatch({
                        type: 'CHANGE_PRICE_STATE',
                        data: {discount_margin: data.discount_margin},
                    })
                    dispatch({
                        type: 'CHANGE_VISIBLE_STATE',
                        data: {statusPriceEditor: false}
                    })
                    dispatch({
                        type: 'RESET_PRICE'
                    })
                } else {
                    console.warn(data.message)
                }
            })
            .catch(error => bad_request(dispatch, error, 'Запрос на изменение цены не выполнен'))
    }
}

export function deleteDiscountMargin(flag) {

    const state = store.getState()

    const request_config = getRequestConfig({
        id: state.price.edit,
        deleted: flag,
        filter: getFilter()
    })
    request_config.method = 'PUT'

    return async dispatch => {

        await fetch(state.data.url_server + '/discount_margin', request_config)
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    dispatch({
                        type: 'CHANGE_PRICE_STATE',
                        data: {discount_margin: data.discount_margin},
                    })
                    dispatch({
                        type: 'CHANGE_VISIBLE_STATE',
                        data: {statusPriceEditor: false}
                    })
                    dispatch({
                        type: 'RESET_PRICE'
                    })
                } else {
                    console.warn(data.message)
                }
            })
            .catch(error => bad_request(dispatch, error, 'Запрос на удаление/восстановление наценки не выполнен'))
    }
}
