import store from '../store'
import { getRequestConfig, bad_request } from './actionUtils'



export function editOrder( order ) {
  return {
    type: 'EDIT_ORDER',
    order
  }
}

export function resetOrder () {
  return {
    type: 'RESET_ORDER'
  }
}

export function addOrders() {

  const state = store.getState()

  let filters = state.filter.mainFilter
  filters.engineer_id = !state.data.user.role.orders_visibility ? [state.data.user.id] : state.filter.mainFilter.engineer_id

  return dispatch => {
      
    fetch(state.data.url_server + '/get_orders', getRequestConfig(filters))
    .then(response =>  response.json())
    .then(data => {
      if (data.success) {
        dispatch({
          type: 'ADD_ORDERS_SHOW',
          ordersShow: data.data,
          count: data.count
        })
      } else {
        console.warn(data.massage)
      }
    })
    .catch(() => bad_request('Запрос заказов не выполнен'))
  }
}

export function createOrder() {

  const state = store.getState()

    const request_config = getRequestConfig({
          estimated_done_at: state.order.estimated_done_at,
    
          order_type_id: state.order.order_type_id,
          client_id: state.order.client.id,
          ad_campaign_id: state.order.ad_campaign_id,
          manager_id: state.order.manager_id,
          engineer_id: state.order.engineer_id ? state.order.engineer_id : null,
          created_by_id: state.data.user.id,
          branch_id: state.data.current_branch.id,
          status_id: 1,

          equipments: state.order.equipments,
    
          manager_notes: state.order.manager_notes,
          estimated_cost: state.order.estimated_cost
        })
    
    let filters = state.filter.mainFilter
    filters.engineer_id = !state.data.user.role.orders_visibility ? [state.data.user.id] : state.filter.mainFilter.engineer_id

    return async dispatch => {
  
      await fetch(state.data.url_server + '/orders', request_config)
      .catch(() => bad_request('Запрос на создание заказов не выполнен'))

      await fetch(state.data.url_server + '/get_orders', getRequestConfig(filters))
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          dispatch({
            type: 'ADD_DATA',
            field: 'ordersShow',
            data: data.data
          })
          dispatch({
            type: 'ADD_DATA',
            field: 'count',
            data: data.count
          })
          dispatch({
            type: 'SET_VISIBLE_FLAG',
            field: 'statusOrderEditor',
            value: false
          })
          dispatch({
            type: 'RESET_ORDER'
          })
        } else {
          console.warn(data.massage)
        }
      })
      .catch(() => bad_request('Запрос заказов не выполнен'))  
      }
    }

export function changeStatus( status_id, order_id) {

   const state = store.getState()
 
   const request_config1 = getRequestConfig({
     id: order_id,
     status_id: status_id
   }) 
   const request_config2 = getRequestConfig(state.filter.mainFilter)
 
 
   return async dispatch => {
     
     await fetch(state.data.url_server + '/change_order_status', request_config1)
     .catch(() => bad_request('Запрос изменения статуса заказа не выполнен'))
 
     await fetch(state.data.url_server + '/get_orders', request_config2)
     .then(response => response.json())
     .then(data => {
       if (data.success) {
         dispatch({
           type: 'ADD_ORDERS_SHOW',
           ordersShow: data.data,
           count: data.count
         })
         if (state.order.edit) {
           dispatch({
             type: 'EDIT_ORDER',
             order: data.data.find(order => order.id === state.order.edit),
           })
         }
       } else {
         console.warn(data.massage)
       }
     })
     .catch(() => bad_request('Запрос заказов не выполнен'))
   }
 }

export function saveOrder() {

  const state = store.getState()

    let request_config = getRequestConfig({
      id: state.order.edit,   
      assigned_at: state.order.assigned_at,
      duration: state.order.duration,
      estimated_done_at: state.order.estimated_done_at,
      scheduled_for: state.order.scheduled_for,
      warranty_date: state.order.warranty_date, 
      status_deadline: state.order.status_deadline,
   
      ad_campaign_id: state.order.ad_campaign_id,
      client: state.order.client.id,
      order_type_id: state.order_type_id,
      manager_id: state.order.manager_id,
      engineer_id: state.order.engineer_id,
      kindof_good: state.order.kindof_good.id,
      brand: state.order.brand.id,
      subtype: state.order.subtype.id,
      model: state.order.model.id,

      serial: state.order.serial,
      malfunction: state.order.malfunction,
      packagelist: state.order.packagelist,
      appearance: state.order.appearance,
      engineer_notes: state.order.engineer_notes,
      manager_notes: state.order.manager_notes,
      resume: state.order.resume,
      cell: state.order.cell, 
   
      estimated_cost: state.order.estimated_cost,
      discount_sum: state.order.discount_sum,
      payed: state.order.payed,
      price: state.order.price,
      overdue: state.order.overdue
    })
    request_config.method = 'PUT'
    
    let filters = state.filter.mainFilter
    filters.engineer_id = !state.data.user.role.orders_visibility ? [state.data.user.id] : state.filter.mainFilter.engineer_id

    return async dispatch => {
  
      await fetch(state.data.url_server + '/orders', request_config)
      .catch(() => bad_request('Запрос на изменение заказов не выполнен'))

      await fetch(state.data.url_server + '/get_orders', getRequestConfig({id: state.order.edit}))
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