import store from '../store'
import { getRequestConfig, bad_request } from './actionUtils'

export function changeWarehouseForm(value, field) {
    return {
        type: 'CHANGE_WAREHOUSE_FORM',
        field,
        value,
    }
}

export function editOperation(warehouse) {
    return {
        type: 'EDIT_WAREHOUSE',
        warehouse
    }
}

export function resetWarehouse() {
    return {
        type: 'RESET_WAREHOUSE',
    }
}

export function chooseWarehouseSelected(value, field) {
    return {
        type: 'SELECTED_WAREHOUSE',
        field,
        value
    }
}

export function addWarehouse() {

    const state = store.getState()

    return dispatch => {

        fetch(state.data.url_server + '/get_warehouse', getRequestConfig({}))
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    dispatch({
                        type: 'CHANGE_WAREHOUSE_FORM',
                        field: 'warehouses',
                        value: data.data
                    })
                } else {
                    console.warn(data.massage)
                }
            })
            .catch(() => bad_request('Запрос начислений не выполнен'))
    }
}