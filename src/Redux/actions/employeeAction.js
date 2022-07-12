import store from '../store'
import { getRequestConfig, bad_request } from './actionUtils'

export function changeEmployeeState(data) {
    return {
        type: 'CHANGE_EMPLOYEE_STATE',
        data
    }
}

export function editEmployee(employee) {
    return {
        type: 'EDIT_EMPLOYEE',
        employee
    }
}

export function resetEmployee() {
    return {
        type: 'RESET_EMPLOYEE'
    }
}

function getFilter() {
    const state = store.getState()
    return {
        deleted: state.employee.showDeleted,
        page: 0
    }
}

export function addEmployees(filters) {

    const state = store.getState()

    return dispatch => {

        fetch(state.data.url_server + '/get_employee', getRequestConfig(filters))
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    dispatch({
                        type: 'CHANGE_EMPLOYEE_STATE',
                        data: {employees: data.data},
                    })
                } else {
                    console.warn(data.message)
                }
            })
            .catch(() => bad_request('Запрос сотрудников не выполнен'))
    }
}

export function createEmployee() {

    const state = store.getState()

    const request_config = getRequestConfig({
        first_name: state.employee.first_name,
        last_name: state.employee.last_name,
        email: state.employee.email,
        notes: state.employee.notes,
        phone: state.employee.phone.replace(/[^0-9]/g, ''),
        password: state.employee.password,
        role_id: state.employee.role_id,
        login: state.employee.login,
        inn: state.employee.inn,
        doc_name: state.employee.doc_name,
        avatar: state.employee.avatar,
        img: state.employee.img || null,
        filter: getFilter()
    })

    return dispatch => {

        fetch(state.data.url_server + '/employee', request_config)
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    dispatch({
                        type: 'CHANGE_EMPLOYEE_STATE',
                        data: {employees: data.employees},
                    })
                    dispatch({
                        type: 'CHANGE_VISIBLE_STATE',
                        data: {statusEmployeeEditor: false}
                    })
                } else {
                    console.warn(data.message)
                }
            })
            .catch(() => bad_request('Запрос на создание сотрудника не выполнен'))
    }
}

export function saveEditEmployee() {

    const state = store.getState()

    let request_config = getRequestConfig({
        id: state.employee.edit,
        first_name: state.employee.first_name,
        last_name: state.employee.last_name,
        email: state.employee.email,
        notes: state.employee.notes,
        phone: state.employee.phone.replace(/[^0-9]/g, ''),
        password: state.employee.password,
        role_id: state.employee.role_id,
        login: state.employee.login,
        inn: state.employee.inn,
        doc_name: state.employee.doc_name,
        avatar: state.employee.avatar,
        img: state.employee.img || null,
        filter: getFilter()
    })
    request_config.method = 'PUT'

    return dispatch => {

        fetch(state.data.url_server + '/employee', request_config)
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    dispatch({
                        type: 'CHANGE_EMPLOYEE_STATE',
                        data: {employees: data.employees},
                    })
                    dispatch({
                        type: 'CHANGE_VISIBLE_STATE',
                        data: {statusEmployeeEditor: false}
                    })
                } else {
                    console.warn(data.message)
                }
            })
            .catch(() => bad_request('Запрос на изменение сотрудника не выполнен'))
    }
}

export function deleteEmployee(flag) {

    const state = store.getState()

    let request_config = getRequestConfig({
        id: state.employee.edit,
        deleted: flag,
        filter: getFilter()
    })
    request_config.method = 'PUT'

    return dispatch => {

        fetch(state.data.url_server + '/employee', request_config)
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    dispatch({
                        type: 'CHANGE_EMPLOYEE_STATE',
                        data: {employees: data.employees},
                    })
                    dispatch({
                        type: 'CHANGE_VISIBLE_STATE',
                        data: {statusEmployeeEditor: false}
                    })
                } else {
                    console.warn(data.message)
                }
            })
            .catch(() => bad_request('Запрос удаление/восстановление сотрудника не выполнен'))
    }
}


export function saveAvatar(data) {

    const state = store.getState()

    const request_config = getRequestConfig({
        employee_id: state.employee.edit,
        left: data.avaPosition[0],
        top: data.avaPosition[1],
        size: data.size,
        img: state.employee.img
    })

    return dispatch => {

        fetch(state.data.url_server + '/change_avatar', request_config)
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    dispatch({
                        type: 'CHANGE_DATA_STATE',
                        data: {user: data.user},
                    })
                } else {
                    console.warn(data.message)
                }
            })
            .catch(() => bad_request('Запрос на изменение аватара не выполнен'))
    }
}

export function logout() {
    const url = process.env.REACT_APP_URL_SERVER + '/logout'


    return dispatch => {
        fetch(url)
    }
}