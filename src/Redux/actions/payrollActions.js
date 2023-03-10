import store from '../store'
import {getRequestConfig, bad_request} from './actionUtils'
import {currentMonth} from '../../components/general/utils'
import {showAlert} from '../actions'


export function changePayrollState(data) {
    return {
        type: 'CHANGE_PAYROLL_STATE',
        data
    }
}

export function editPayroll(payroll) {
    return {
        type: 'EDIT_PAYROLL',
        payroll
    }
}

export function resetPayroll() {
    return {
        type: 'RESET_PAYROLL'
    }
}


export function selectedPayroll(value, field) {
    return {
        type: 'SELECTED_PAYROLL',
        field,
        value
    }
}

function getFilter() {
    const state = store.getState()
    return {
        custom_created_at: state.payroll.filter_created_at,
        employee_id: state.payroll.setted_employee.id,
        deleted: state.payroll.showDeleted
    }
}

export function addPayrolls() {

    const state = store.getState()

    const request_config = getRequestConfig(getFilter())

    return dispatch => {

        fetch(state.data.url_server + '/get_payrolls', request_config)
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    dispatch({
                        type: 'CHANGE_PAYROLL_STATE',
                        data: {payrolls: data.data}
                    })
                } else {
                    console.warn(data.message)
                }
            })
            .catch(error => bad_request(dispatch, error, 'Запрос начислений не выполнен'))
    }
}

export function addMonthBalance() {

    const state = store.getState()

    const request_config = getRequestConfig({
        custom_created_at: currentMonth(),
        employee_id: state.payroll.setted_employee.id
    })

    return dispatch => {

        fetch(state.data.url_server + '/get_payroll_sum', request_config)
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    dispatch({
                        type: 'CHANGE_PAYROLL_STATE',
                        data: {month_balance: data.sum},
                    })
                } else {
                    console.warn(data.message)
                }
            })
            .catch(error => bad_request(dispatch, error, 'Запрос баланса не выполнен'))
    }
}

export function createPayroll() {

    const state = store.getState()

    const now = Math.round(Date.now() / 1000)

    const request_config = getRequestConfig({
        description: state.payroll.description,
        income: state.payroll.income,
        outcome: -state.payroll.outcome,
        direction: state.payroll.direction,
        deleted: state.payroll.deleted,
        reimburse: state.payroll.reimburse,
        created_at: now,
        custom_created_at: state.payroll.custom_created_at || now,
        relation_type: state.payroll.relation_type,
        relation_id: state.payroll.relation_id,
        employee_id: state.payroll.employee.id,
        order_id: state.payroll.order_id,
        payment: state.payroll.relation_type === 12 ? {
            cashbox_id: state.payroll.payment_cashbox.id,
            cashflow_category: state.payroll.payment_cashflow_category.id
        } : null,
        filter: getFilter()
    })

    return async dispatch => {

        await fetch(state.data.url_server + '/payroll', request_config)
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    dispatch({
                        type: 'CHANGE_PAYROLL_STATE',
                        data: {payrolls: data.payrolls}
                    })
                    dispatch({
                        type: 'RESET_PAYROLL',
                    })
                    dispatch({
                        type: 'CHANGE_VISIBLE_STATE',
                        data: {statusPayrollEditor: false}
                    })
                    showAlert(dispatch, 'success', 'Начисление успешно создано')
                } else {
                    console.warn(data.message)
                }
            })
            .catch(error => bad_request(dispatch, error, 'Запрос на создание начисления не выполнен'))
    }
}

export function deletePayroll(flag) {

    const state = store.getState()

    let request_config = getRequestConfig({
        id: state.payroll.edit,
        deleted: flag,
        filter: getFilter()
    })
    request_config.method = 'PUT'

    return async dispatch => {

        fetch(state.data.url_server + '/payroll', request_config)
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    dispatch({
                        type: 'CHANGE_PAYROLL_STATE',
                        data: {payrolls: data.payrolls}
                    })
                    dispatch({
                        type: 'RESET_PAYROLL',
                    })
                    dispatch({
                        type: 'CHANGE_VISIBLE_STATE',
                        data: {statusPayrollEditor: false}
                    })
                    const text = flag ? 'Начисление успешно удалено' : 'Начисление успешно восстановленно'
                    showAlert(dispatch, 'success', text)
                } else {
                    console.warn(data.message)
                }
            })
            .catch(error => bad_request(dispatch, error, 'Запрос на удаление/восстановление начисления не выполнен'))
    }
}