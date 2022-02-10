import store from '../store'
import { getRequestConfig, bad_request } from './actionUtils'


export function changeOperationForm( value, field ) {
   return {
     type: 'CHANGE_OPERATION_FORM',
     field,
     value
   }
 }

export function editOperation(operation) {
   return {
     type: 'EDIT_OPERATION',
     operation
   }
 }
 
 export function resetOperation() {
   return {
     type: 'RESET_OPERATION'
   }
 }
 
 
 export function selectedOperation( value, field ) {
   return {
     type: 'SELECTED_SERVICE',
     field,
     value
   }
 }

export function createOperation(service) {

   const state = store.getState()
 
   const price = state.order.client.discount_service_type ? (
     state.data.service_prices.find(price => 
       price.service_id === service.id && 
       price.discount_margin_id === state.order.client.discount_service_margin_id
     )) : ( service.price )

   const discount_value = state.order.client.discount_service_type ? 
   price - service.price : 
   service.price * state.order.client.discount_services / 100
 
   const request_config = getRequestConfig({
     amount: 1,
     cost: service.cost,
     discount_value: discount_value, 
     engineer_id: state.order.engineer_id,
     price: price,
     total: price - discount_value,
     title: service.title,
     comment: '',
     warranty_period: service.warranty_period,
     order_id: state.order.edit,
     dict_id: service.id,

     earnings_percent: service.earnings_percent,
     earnings_summ: service.earnings_summ,
     order_type_id: state.order.order_type_id
   })
 
   return async dispatch => {
 
     await fetch(state.data.url_server + '/operations', request_config)
     .catch(() => bad_request('Запрос на создание операции не выполнен'))
 
     fetch(state.data.url_server + '/get_orders', getRequestConfig({id: state.order.edit}))
     .then(response =>  response.json())
     .then(data => {
       if (data.success) {
         dispatch({
           type: 'EDIT_ORDER',
           order: data.data[0]
         })
       } else {
         console.warn(data.massage)
       }
     })
     .catch(() => bad_request('Запрос заказов не выполнен'))
      
   }
 }

 
 export function createCustomOperation() {

   const state = store.getState()
 
   const request_config = getRequestConfig({
      title: state.operation.title,
      price: state.operation.price,
      amount: state.operation.amount,
      cost: state.operation.cost,
      discount_value: state.operation.discount_value, 
      engineer_id: state.operation.engineer_id,
      total: state.operation.total,
      comment: state.operation.comment,
      warranty_period: state.operation.warranty_period,
      order_id: state.order.edit,
      dict_id: null,

      order_type_id: state.order.order_type_id
   })
 
   return async dispatch => {
 
     await fetch(state.data.url_server + '/operations', request_config)
     .catch(() => bad_request('Запрос на создание операции не выполнен'))
 
     fetch(state.data.url_server + '/get_orders', getRequestConfig({id: state.order.edit}))
     .then(response =>  response.json())
     .then(data => {
       if (data.success) {
         dispatch({
           type: 'EDIT_ORDER',
           order: data.data[0]
         })
       } else {
         console.warn(data.massage)
       }
     })
     .catch(() => bad_request('Запрос заказов не выполнен'))
      
   }
 }

 
 export function saveOperation() {

   const state = store.getState()
 
   let request_config = getRequestConfig({
      id: state.operation.edit,
      title: state.operation.title,
      price: state.operation.price,
      amount: state.operation.amount,
      cost: state.operation.cost,
      discount_value: state.operation.discount_value, 
      engineer_id: state.operation.engineer_id,
      total: state.operation.total,
      comment: state.operation.comment,
      warranty_period: state.operation.warranty_period,
      order_id: state.order.edit
   })
   request_config.method = 'PUT'
 
   return async dispatch => {
 
     await fetch(state.data.url_server + '/operations', request_config)
     .catch(() => bad_request('Запрос на изменение операции не выполнен'))
 
     fetch(state.data.url_server + '/get_orders', getRequestConfig({id: state.order.edit}))
     .then(response =>  response.json())
     .then(data => {
       if (data.success) {
         dispatch({
           type: 'EDIT_ORDER',
           order: data.data[0]
         })
       } else {
         console.warn(data.massage)
       }
     })
     .catch(() => bad_request('Запрос заказов не выполнен'))
      
   }
 }

 export function deleteOperation(flag) {

   const state = store.getState()
 
   let request_config = getRequestConfig({
      id: state.operation.edit,
      deleted: flag
   })
   request_config.method = 'PUT'
 
   return async dispatch => {
 
     await fetch(state.data.url_server + '/operations', request_config)
     .catch(() => bad_request('Запрос на удаление/восстановление операции не выполнен'))
 
     fetch(state.data.url_server + '/get_orders', getRequestConfig({id: state.order.edit}))
     .then(response =>  response.json())
     .then(data => {
       if (data.success) {
         dispatch({
           type: 'EDIT_ORDER',
           order: data.data[0]
         })
       } else {
         console.warn(data.massage)
       }
     })
     .catch(() => bad_request('Запрос заказов не выполнен'))
      
   }
 }