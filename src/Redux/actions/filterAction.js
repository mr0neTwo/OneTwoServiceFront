import store from '../store'
import { getRequestConfig, bad_request } from './actionUtils'
import {showAlert} from '../actions'


export function changeFilterForm( value, field ) {
    return {
        type: 'CHANGE_FILTER_FORM',
        field,
        value
    }
}

export function changeFilterState( data ) {
    return {
        type: 'CHANGE_FILTER_STATE',
        data
    }
}

// export function editFilter(filter) {
//     return {
//         type: 'EDIT_FILTER',
//         filter
//     }
// }

export function resetFilter() {
    return {
        type: 'RESET_FILTER'
    }
}

export function resetTempFilter() {
    return {
        type: 'RESET_TEMP_FILTER'
    }
}


export function selectedFilter( value, field, saveToApp=false ) {
    return {
        type: 'SELECTED_FILTER',
        field,
        value,
        saveToApp
    }
}


export function addBadges() {

    const state = store.getState()

    const request_config = getRequestConfig({
        employee_access: !state.data.user.role.orders_visibility ? state.data.user.id : null,
    })

    return dispatch => {

        fetch(state.data.url_server + '/bagges', request_config)
            .then(response =>  response.json())
            .then(data => {
                if (data.success) {
                    dispatch({
                        type: 'CHANGE_FILTER_STATE',
                        data: {badges: data.data}
                    })
                } else {
                    console.warn(data.message)
                }
            })
            .catch(error => bad_request(dispatch, error, 'Запрос temple не выполнен'))
    }
}

export function addCustomFilters() {

    const state = store.getState()

    const request_config = getRequestConfig({employee_id: state.data.user.id})

    return dispatch => {

        fetch(state.data.url_server + '/get_custom_filters', request_config)
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    dispatch({
                        type: 'CHANGE_FILTER_STATE',
                        data: {customFilters: data.data}
                    })
                } else {
                    console.warn(data.message)
                }
            })
            .catch(error => bad_request(dispatch, error, 'Запрос пользовательских фильтров не выполнен'))
    }
}

export function createCustomFilter() {

    const state = store.getState()

    const request_config = getRequestConfig({
        title: state.filter.title,
        general: state.filter.general,
        employee_id: state.data.user.id,
        filters: {
            page: 0,
            engineer_id: state.filter.temp_engineers.length ? state.filter.temp_engineers : null,
            overdue: null,
            status_id: state.filter.temp_statuses.length ? state.filter.temp_statuses : null,
            status_overdue: null,
            urgent: null,
            order_type_id: state.filter.temp_order_types.length ? state.filter.temp_order_types : null,
            manager_id: state.filter.temp_managers.length ? state.filter.temp_managers : null,
            created_at: state.filter.temp_created_at.some(date => date) ? state.filter.temp_created_at : null,
            kindof_good: state.filter.temp_kindof_good_id,
            brand: state.filter.temp_brand,
            subtype: state.filter.temp_subtype,
            client_id: Object.values(state.filter.temp_client).length ? [state.filter.temp_client.id] : null
        }
    })

    return async dispatch => {

        await fetch(state.data.url_server + '/custom_filters', request_config)
            .then(response =>  response.json())
            .then(data => {
                if (data.success) {
                    dispatch({
                        type: 'CHANGE_FILTER_STATE',
                        data: {customFilters: data.data}
                    })
                    dispatch({
                        type: 'CHANGE_VISIBLE_STATE',
                        data: {statusCreateNewFilter: false}
                    })
                    dispatch({
                        type: 'RESET_DATA_FILTER'
                    })
                    showAlert(dispatch, 'alert-success', 'Фильтр успешно создан')
                } else {
                    console.warn(data.message)
                }
            })
            .catch(error => bad_request(dispatch, error, 'Запрос на создание  фильтра не выполнен'))

    }
}


export function deleteFilter() {

    const state = store.getState()

    let request_config = getRequestConfig({
        id: state.filter.active_filter,
        employee_id: state.data.user.id
    })
    request_config.method = 'DELETE'


    return async dispatch => {

        await fetch(state.data.url_server + '/custom_filters', request_config)
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    dispatch({
                        type: 'CHANGE_FILTER_STATE',
                        data: {
                            customFilters: data.data,
                            active_filter: 0
                        }
                    })
                    dispatch({
                        type: 'CHANGE_VISIBLE_STATE',
                        data: {statusCreateNewFilter: false}
                    })
                    dispatch({
                        type: 'RESET_DATA_FILTER'
                    })
                    showAlert(dispatch, 'alert-success', 'Фильтр успешно удален')
                } else {
                    console.warn(data.message)
                }
            })
            .catch(error => bad_request(dispatch, error, 'Запрос на удаление фильтра не выполнен'))
    }
}