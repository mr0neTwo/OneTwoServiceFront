import store from '../store'
import { getRequestConfig, bad_request } from './actionUtils'
import { currentMonth } from '../../components/general/utils'


export function changePayrollForm( value, field ) {
   return {
     type: 'CHANGE_PAYROLL_FORM',
     field,
     value
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
 
 
 export function selectedPayroll( value, field ) {
   return {
     type: 'SELECTED_PAYROLL',
     field,
     value
   }
 }

export function addPayrolls() {

   const state = store.getState()

   const request_config = getRequestConfig({
    custom_created_at: state.payroll.filter_created_at,
    employee_id: state.payroll.setted_employee
  })
 
   return dispatch => {
 
     fetch(state.data.url_server + '/get_payrolls', request_config)
     .then(response => response.json())
     .then(data => {
       if (data.success) {
         dispatch({
           type: 'ADD_DATA',
           field: 'payrolls',
           data: data.data,
         })
       } else {
         console.warn(data.massage)
       }
     })
     .catch(() => bad_request('Запрос начислений не выполнен'))
   }
 }

 export function addMonthBalance() {

  const state = store.getState()

  const request_config = getRequestConfig({
   custom_created_at: currentMonth(),
   employee_id: state.payroll.setted_employee
 })

  return dispatch => {

    fetch(state.data.url_server + '/get_payroll_sum', request_config)
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        dispatch({
          type: 'CHANGE_PAYROLL_FORM',
          field: 'month_balance',
          value: data.sum,
        })
      } else {
        console.warn(data.massage)
      }
    })
    .catch(() => bad_request('Запрос баланса не выполнен'))
  }
}

export function createPayroll() {

  const state = store.getState()

  const request_config1 = getRequestConfig({
    description: state.payroll.description,      
    income: state.payroll.income,
    outcome: -state.payroll.outcome,
    direction: state.payroll.direction,
    deleted: state.payroll.deleted,
    reimburse: state.payroll.reimburse,
    created_at: state.payroll.created_at,
    custom_created_at: state.payroll.custom_created_at,
    relation_type: state.payroll.relation_type,
    relation_id: state.payroll.relation_id,
    employee_id: state.payroll.employee_id,
    order_id: state.payroll.order_id
  })

  const request_config2 = getRequestConfig({
    custom_created_at: state.payroll.filter_created_at,
    employee_id: state.payroll.setted_employee
  })

  return async dispatch => {

    await fetch(state.data.url_server + '/payroll', request_config1)
    .catch(() => bad_request('Запрос на создание начисления не выполнен'))

    await fetch(state.data.url_server + '/get_payrolls', request_config2)
      .then(response =>  response.json())
      .then(data => {
        if (data.success) {
          dispatch({
            type: 'ADD_DATA',
            field: 'payrolls',
            data: data.data,
          })
          dispatch({
            type: 'RESET_PAYROLL',
          })
          dispatch({
            type: 'SET_VISIBLE_FLAG',
            field: 'statusPayrollEditor',
            value: false
          })
        } else {
          console.warn(data.massage)
        }
      })
      .catch(() => bad_request('Запрос начислений не выполнен'))
     
  }
}

export function deletePayroll(flag) {

  const state = store.getState()

  let request_config1 = getRequestConfig({
    id: state.payroll.edit,      
    deleted: flag
  })
  request_config1.method = 'PUT'

  const request_config2 = getRequestConfig({
    custom_created_at: state.payroll.filter_created_at,
    employee_id: state.payroll.setted_employee
  })

  return async dispatch => {

    await fetch(state.data.url_server + '/payroll', request_config1)
    .catch(() => bad_request('Запрос на создание начисления не выполнен'))

    fetch(state.data.url_server + '/get_payrolls', request_config2)
    .then(response =>  response.json())
    .then(data => {
      if (data.success) {
        dispatch({
          type: 'ADD_DATA',
          field: 'payrolls',
          data: data.data,
        })
        dispatch({
          type: 'RESET_PAYROLL',
        })
        dispatch({
          type: 'SET_VISIBLE_FLAG',
          field: 'statusPayrollEditor',
          value: false
        })
      } else {
        console.warn(data.massage)
      }
    })
    .catch(() => bad_request('Запрос начислений не выполнен'))
     
  }
}