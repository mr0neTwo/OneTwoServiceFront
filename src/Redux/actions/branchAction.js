import store from '../store'
import { getRequestConfig, bad_request } from './actionUtils'

export function changeBranchState( data ) {
    return {
        type: 'CHANGE_BRANCH_STATE',
        data
    }
}

export function changeShedule(idx, field, value) {
    return {
        type: 'CHANGE_SCHEDULE',
        idx,
        field,
        value
    }
}

export function setBranchEmployee(id) {
    return {
        type: 'SET_BRANCH_EMPLOYEE',
        id
    }
}

export function editBranch(branch) {
    return {
        type: 'EDIT_BRANCH',
        branch
    }
}

export function resetBranch() {
    return {
        type: 'RESET_BRANCH'
    }
}

function getFilter() {
    const state = store.getState()
    return {
        employee_id: state.data.user.id,
        deleted: state.branch.showDeleted,
        page: 0
    }
}



export function addBranches() {

    const state = store.getState()

    const request_config = getRequestConfig(getFilter())

    return dispatch => {

        fetch(state.data.url_server + '/get_branch', request_config)
            .then(response =>  response.json())
            .then(data => {
                if (data.success) {
                    dispatch({
                        type: 'CHANGE_BRANCH_STATE',
                        data: {branches: data.data},
                    })
                } else {
                    console.warn(data.message)
                }
            })
            .catch(() => bad_request('Запрос филиалов не выполнен'))
    }
}



export function createBranch() {

    const state = store.getState()

    const request_config = getRequestConfig({
        name: state.branch.name,
        address: state.branch.address,
        phone: state.branch.phone,
        color: state.branch.color,
        icon: state.branch.icon,
        orders_type_id: state.branch.orders_type_id,
        orders_type_strategy: state.branch.orders_type_strategy,
        orders_prefix: state.branch.orders_prefix,
        documents_prefix: state.branch.documents_prefix,
        employees: state.branch.employees,
        deleted: state.branch.deleted,
        schedule: state.branch.schedule,
        filter: getFilter()
    })

    return async dispatch => {

        await fetch(state.data.url_server + '/branch', request_config)
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    dispatch({
                        type: 'CHANGE_BRANCH_STATE',
                        data: {branches: data.branches},
                    })
                    dispatch({
                        type: 'CHANGE_VISIBLE_STATE',
                        data: {statusBranchEditor: false}
                    })
                    dispatch({
                        type: 'RESET_BRANCH'
                    })
                } else {
                    console.warn(data.message)
                }
            })
            .catch(() => bad_request('Запрос на создание филиалов не выполнен'))
    }
}

export function saveBranch() {

    const state = store.getState()

    let request_config = getRequestConfig({

        id: state.branch.edit,
        name: state.branch.name,
        address: state.branch.address,
        phone: state.branch.phone,
        color: state.branch.color,
        icon: state.branch.icon,
        orders_type_id: state.branch.orders_type_id,
        orders_type_strategy: state.branch.orders_type_strategy,
        orders_prefix: state.branch.orders_prefix,
        documents_prefix: state.branch.documents_prefix,
        employees: state.branch.employees,
        deleted: state.branch.deleted,
        schedule: state.branch.schedule,
        filter: getFilter()
    })
    request_config.method = 'PUT'

    return async dispatch => {

        await fetch(state.data.url_server + '/branch', request_config)
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    dispatch({
                        type: 'CHANGE_BRANCH_STATE',
                        data: {branches: data.branches},
                    })
                    dispatch({
                        type: 'CHANGE_VISIBLE_STATE',
                        data: {statusBranchEditor: false}
                    })
                    dispatch({
                        type: 'RESET_BRANCH'
                    })
                } else {
                    console.warn(data.message)
                }
            })
            .catch(() => bad_request('Запрос на изменение филиала не выполнен'))
    }
}


export function deleteBranch(flag) {

    const state = store.getState()

    let request_config = getRequestConfig({
        id: state.branch.edit,
        deleted: flag,
        filter: getFilter()
    })
    request_config.method = 'PUT'

    return async dispatch => {

        await fetch(state.data.url_server + '/branch', request_config)
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    dispatch({
                        type: 'CHANGE_BRANCH_STATE',
                        data: {branches: data.branches},
                    })
                    dispatch({
                        type: 'CHANGE_VISIBLE_STATE',
                        data: {statusBranchEditor: false}
                    })
                    dispatch({
                        type: 'RESET_BRANCH'
                    })
                } else {
                    console.warn(data.message)
                }
            })
            .catch(() => bad_request('Запрос на удаление/восстановление филиала не выполнен'))
    }
}