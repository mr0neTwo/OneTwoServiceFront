import store from '../store'
import { getRequestConfig, bad_request } from './actionUtils'
import {checkObject} from '../../components/general/utils'

export function changeRemainState( data ) {
    return {
        type: 'CHANGE_REMAIN_STATE',
        data
    }
}

export function editRemain(registration) {
    return {
        type: 'EDIT_REMAIN',
        registration
    }
}

export function resetRemain() {
    return {
        type: 'RESET_REMAIN'
    }
}

export function selectedRemain( value, field, saveToApp=true ) {
    return {
        type: 'SELECTED_REMAIN',
        field,
        value,
        saveToApp
    }
}

export function addRemain() {

    const state = store.getState()

    const request_config = getRequestConfig({
        deleted: state.remain.showDeleted,
        warehouse_id: checkObject(state.remain.filter_warehouse) ? state.remain.filter_warehouse.id : null,
        warehouse_category_id: checkObject(state.remain.filter_category) ? state.remain.filter_category.id : null,
        filter_type: state.remain.filter_type.id,
        page: state.remain.page
    })

    return dispatch => {

        fetch(state.data.url_server + '/get_warehouse_remains', request_config)
            .then(response =>  response.json())
            .then(data => {
                if (data.success) {
                    dispatch({
                        type: 'CHANGE_REMAIN_STATE',
                        data: {warehouse_remains: data.warehouse_remains},
                    })
                } else {
                    console.warn(data.message)
                }
            })
            .catch(error => bad_request(dispatch, error, 'Запрос оприходований не выполнен'))
    }
}