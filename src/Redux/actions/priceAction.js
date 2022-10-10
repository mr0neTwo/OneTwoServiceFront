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
                        type: 'ADD_DATA',
                        field: 'service_prices',
                        data: data.data,
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
