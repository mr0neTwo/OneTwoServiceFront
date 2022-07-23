import store from '../store'
import {getRequestConfig, bad_request} from './actionUtils'


export function changeSalaryRuleForm(value, field) {
    return {
        type: 'CHANGE_SALARY_FORM',
        field,
        value
    }
}

export function changeSalaryCoefForm(idx, field, value) {
    return {
        type: 'CHANGE_SALARY_COEF_FORM',
        idx,
        field,
        value
    }
}

export function addSalaryCountCoef() {
    return {
        type: 'ADD_SALARY_COUNT_COEF'
    }
}

export function deleteSalaryCountCoef(idx) {
    return {
        type: 'DELETE_SALARY_COUNT_COEF',
        idx
    }
}

export function editPayrule(salary_rule) {
    return {
        type: 'EDIT_SALARY',
        salary_rule
    }
}

export function resetPayrule() {
    return {
        type: 'RESET_SALARY_RULE'
    }
}


export function addPayrules() {

    const state = store.getState()

    return async dispatch => {

        await fetch(state.data.url_server + '/get_payrules', getRequestConfig({}))
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    dispatch({
                        type: 'ADD_DATA',
                        field: 'payrules',
                        data: data.data,
                    })
                } else {
                    console.warn(data.message)
                }
            })
            .catch(error => bad_request(dispatch, error, 'Запрос правил не выполнен'))
    }
}

export function createSalaryRule() {

    const state = store.getState()

    const request_config = getRequestConfig({
        title: state.salaryRule.list_type_rule.find(rule => rule.id === state.salaryRule.type_rule).title,
        type_rule: state.salaryRule.type_rule,
        order_type: state.salaryRule.order_type,
        method: state.salaryRule.method,
        coefficient: state.salaryRule.coefficient,
        count_coeff: state.salaryRule.count_coeff,
        fix_salary: state.salaryRule.fix_salary,
        deleted: state.salaryRule.deleted,
        employee_id: state.data.user.id,
        check_status: state.salaryRule.check_status
    })

    return async dispatch => {

        await fetch(state.data.url_server + '/payrule', request_config)
            .catch(error => bad_request(dispatch, error, 'Запрос на создание правила не выполнен'))

        await fetch(state.data.url_server + '/get_payrules', getRequestConfig({}))
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    dispatch({
                        type: 'ADD_DATA',
                        field: 'payrules',
                        data: data.data,
                    })
                    dispatch({
                        type: 'SET_VISIBLE_FLAG',
                        field: 'statusSalaryEditor',
                        value: false
                    })
                    dispatch({
                        type: 'RESET_SALARY_RULE'
                    })
                } else {
                    console.warn(data.message)
                }
            })
            .catch(error => bad_request(dispatch, error, 'Запрос правил не выполнен'))
    }
}

export function saveSalaryRule() {

    const state = store.getState()

    const request_config = getRequestConfig({
        id: state.salaryRule.edit,
        title: state.salaryRule.list_type_rule.find(rule => rule.id === state.salaryRule.type_rule).title,
        type_rule: state.salaryRule.type_rule,
        order_type: state.salaryRule.order_type,
        method: state.salaryRule.method,
        coefficient: state.salaryRule.coefficient,
        count_coeff: state.salaryRule.count_coeff,
        fix_salary: state.salaryRule.fix_salary,
        deleted: state.salaryRule.deleted,
        employee_id: state.data.user.id,
        check_status: state.salaryRule.check_status
    })
    request_config.method = 'PUT'

    return async dispatch => {

        await fetch(state.data.url_server + '/payrule', request_config)
            .catch(error => bad_request(dispatch, error, 'Запрос на изменение правила не выполнен'))

        await fetch(state.data.url_server + '/get_payrules', getRequestConfig({}))
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    dispatch({
                        type: 'ADD_DATA',
                        field: 'payrules',
                        data: data.data,
                    })
                    dispatch({
                        type: 'SET_VISIBLE_FLAG',
                        field: 'statusSalaryEditor',
                        value: false
                    })
                    dispatch({
                        type: 'RESET_SALARY_RULE'
                    })
                } else {
                    console.warn(data.message)
                }
            })
            .catch(error => bad_request(dispatch, error, 'Запрос правил не выполнен'))
    }
}


export function deleteSalaryRule(flag) {

    const state = store.getState()

    const request_config = getRequestConfig({
        id: state.salaryRule.edit,
        deleted: flag
    })
    request_config.method = 'PUT'

    return async dispatch => {

        await fetch(state.data.url_server + '/payrule', request_config)
            .catch(error => bad_request(dispatch, error, 'Запрос на удаление правила не выполнен'))

        await fetch(state.data.url_server + '/get_payrules', getRequestConfig({}))
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    dispatch({
                        type: 'ADD_DATA',
                        field: 'payrules',
                        data: data.data,
                    })
                    dispatch({
                        type: 'SET_VISIBLE_FLAG',
                        field: 'statusSalaryEditor',
                        value: false
                    })
                    dispatch({
                        type: 'RESET_SALARY_RULE'
                    })
                } else {
                    console.warn(data.message)
                }
            })
            .catch(error => bad_request(dispatch, error, 'Запрос правил не выполнен'))
    }
}