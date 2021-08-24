import store from "./store"

function getRequestConfig(body = {}) {

  const state = store.getState()

  return {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${state.data.token}`,
      Accept: 'application/json',
    },
    body: JSON.stringify(body)
  }
}

export function loginAction(token) {
  return {
    type: 'LOGIN',
    token,
  }
}

export function loguotAction() {
  return {
    type: 'LOGUOT'
  }
}

export function addUserAction(user) {
  return {
    type: 'ADD_USER',
    user: user
  }
}

export function changePageAction(page) {
  return {
    type: 'CHANGE_PAGE',
    page: page
  }
}

export function changeSortAction(field) {
  return {
    type: 'CHANGE_SORT',
    field: field
  }
}

export function initStatusMenuVisibleAction(list_id) {
  return {
    type: 'INIT_STATUS_MENU_VISIBLE',
    data: list_id
  }
}

export function changeStatusMenuVisibleAction(id_order) {
  return {
    type: 'CANGE_STATUS_MENU_VISIBLE',
    id_order: id_order
  }
}

export function changeFilterAction(word) {
  return {
    type: 'CANGE_FILTER',
    word: word
  }
}

export function activeBadgeAction(filters) {
  return {
    type: 'ACTIVE_BADGE',
    filters
  }
}


export function changeSetStatusFilterAction() {
  return {
    type: 'CHANGE_STATUS_SET_STATUS_FILTER'
  }
}

export function changeStausListFilter() {
  return {
    type: 'CHANGE_STATUS_LIST_FILTER'
  }
}

export function changeCheckStatus(field) {
  return {
    type: 'CHANGE_CHECK_STATUS',
    field
  }
}

export function setAllStatusFalse() {
  return {
    type: 'SET_ALL_STATUS_FALSE'
  }
}

export function setAllStatusTrue() {
  return {
    type: 'SET_ALL_STATUS_TRUE'
  }
}

export function changeTypeListFilter() {
  return {
    type: 'CHANGE_TYPE_LIST_FILTER'
  }
}


export function changeCheckType(field) {
  return {
    type: 'CHANGE_CHECK_TYPE',
    field
  }
}

export function setAllTypeTrue() {
  return {
    type: 'SET_ALL_TYPE_TRUE'
  }
}

export function setAllTypeFalse() {
  return {
    type: 'SET_ALL_TYPE_FALSE'
  }
}

export function changeManagerListFilter() {
  return {
    type: 'CHANGE_MANAGER_LIST_FILTER'
  }
}


export function changeCheckManager(field) {
  return {
    type: 'CHANGE_CHECK_MANAGER',
    field
  }
}

export function setAllManagerTrue() {
  return {
    type: 'SET_ALL_MANAGER_TRUE'
  }
}

export function setAllManagerFalse() {
  return {
    type: 'SET_ALL_MANAGER_FALSE'
  }
}

export function changeEngineerListFilter() {
  return {
    type: 'CHANGE_ENGINEER_LIST_FILTER'
  }
}


export function changeCheckEngineer(field) {
  return {
    type: 'CHANGE_CHECK_ENGINEER',
    field
  }
}

export function setAllEngineerTrue() {
  return {
    type: 'SET_ALL_ENGINEER_TRUE'
  }
}

export function setAllEngineerFalse() {
  return {
    type: 'SET_ALL_ENGINEER_FALSE'
  }
}

export function changeGroupListFilter() {
  return {
    type: 'CHANGE_GROUP_LIST_FILTER'
  }
}


export function changeGroupMainFilter(word) {
  return {
    type: 'CHANGE_GROUP_MAINFILTER',
    word
  }
}

export function changeBrandListFilter() {
  return {
    type: 'CHANGE_BRAND_LIST_FILTER'
  }
}

export function changeBrandMainFilter(word) {
  return {
    type: 'CHANGE_BRAND_MAINFILTER',
    word
  }
}

export function changeSubtypeListFilter() {
  return {
    type: 'CHANGE_SUBTYPE_LIST_FILTER'
  }
}

export function changeSubtypeMainFilter(word) {
  return {
    type: 'CHANGE_SUBTYPE_MAINFILTER',
    word
  }
}

export function changeClientListFilter() {
  return {
    type: 'CHANGE_CLIENT_LIST_FILTER'
  }
}

export function changeClientMainFilter(word) {
  return {
    type: 'CHANGE_CLIENT_MAINFILTER',
    word
  }
}

export function changeNameClientFilter(word) {
  return {
    type: 'CHANGE_NAME_CLIENTFILTER',
    word
  }
}

export function changeCreateAtMainFilter(range) {
  return {
    type: 'CHANGE_CREATE_AT_MAINFILTER',
    range
  }
}

export function appFilter() {
  return {
    type: 'APPLY_FILTER'
  }
}

export function resetFilter() {
  return {
    type: 'RESET_FILTER'
  }
}

  
export function changeStatusCreateNewFilter() {
  return {
    type: 'CHANGE_STATUS_CREATE_NEW_FILTER'
  }
  }

export function changeTitleCreate(title) {
  return {
    type: 'CHANGE_TITLE_CREATE',
    title
  }}

  
export function changeGeneraleCreate() {
  return {
    type: 'CHANGE_GENERALE_CREATE'
  }}

  
export function appCustomFilter(filter, id) {
  return {
    type: 'APPLY_CUSTOM_FILTER',
    filter,
    id
  }}

  export function changeStatusMenuRow(id) {
    return {
      type: 'CHANGE_STATUS_MENU_ROW',
      id
    }}










export function addMenuRows() {

  const state = store.getState()

  return async dispatch => {
      const response = await fetch(state.data.url_server + '/get_menu_rows', getRequestConfig())
      const data = await response.json()
      if (data.success) {
        dispatch({
          type: 'ADD_MENU_ROWS',
          rows: data.data,
      })
      } else {
        console.log(data.massage, response.status)
        if (response.status === 401) {
          dispatch({
            type: 'LOGUOT'
          })
        }
      }
  }
}



export function addOrdersAction() {

  const state = store.getState()

  return async dispatch => {
      
      const response = await fetch(state.data.url_server + '/get_orders', getRequestConfig(state.filter.mainFilter))
      const data = await response.json()
      
      if (data.success) {
        dispatch({
          type: 'ADD_ORDERS_SHOW',
          ordersShow: data.data,
          count: data.count
        })
      } else {
        console.log(data.massage, response.status)
        if (response.status === 401) {
          dispatch({
            type: 'LOGUOT'
          })}}}}

export function addClients() {

  const state = store.getState()
  console.log(state.clientFilter)

  return async dispatch => {
      
      const response = await fetch(state.data.url_server + '/get_clients', getRequestConfig(state.filter.clientFilter))
      const data = await response.json()
      
      if (data.success) {
        dispatch({
          type: 'ADD_CLIENTS_SHOW',
          clientShow: data.data,
          count: data.count
        })
      } else {
        console.log(data.massage, response.status)
        if (response.status === 401) {
          dispatch({
            type: 'LOGUOT'
          })}}}}

export function addEmplooysAction( filters ) {
  
  const state = store.getState()

  return async dispatch => {
     
      const response = await fetch(state.data.url_server + '/get_emplooys', getRequestConfig(filters))
      const data = await response.json()
      if (data.success) {
        dispatch({
          type: 'ADD_EMPLOOYS',
          employees: data.data,
        })
      } else {
        console.log(data.massage, response.status)
        if (response.status === 401) {
          dispatch({
            type: 'LOGUOT'
          })
        }
      }
  }
}


export function addStatusAction() {

  const state = store.getState()

  return async dispatch => {
      
      const response = await fetch(state.data.url_server + '/get_status', getRequestConfig())
      const data = await response.json()
      if (data.success) {
        dispatch({
          type: 'ADD_STATUS',
          status: data.data,
        })
      } else {
        console.log(data.massage, response.status)
        if (response.status === 401) {
          dispatch({
            type: 'LOGUOT'
          })
        }
      }
  }
}


export function changeStatusAction( status_id, order_id) {

  const state = store.getState()

  return async dispatch => {
      let request_config = getRequestConfig({
        id: order_id,
        status_id: status_id
      })
       request_config.method = 'PUT'
      
      let response = await fetch(state.data.url_server + '/orders', request_config)
      let data = await response.json()
      if (!data.success) {
        console.log(data.massage, response.status)
        if (response.status === 401) {
          dispatch({
            type: 'LOGUOT'
          })
        }
      }
      request_config.method = "POST"
      request_config.body = JSON.stringify(state.filter.mainFilter)
      response = await fetch(state.data.url_server + '/get_orders', request_config)
      data = await response.json()
      if (data.success) {
        dispatch({
          type: 'ADD_ORDERS_SHOW',
          ordersShow: data.data,
          count: data.count
        })
      } else {
        console.log(data.massage, response.status)
        if (response.status === 401) {
          dispatch({
            type: 'LOGUOT'
          })}}}}

export function addBaggesAction() {

  const state = store.getState()

  return async dispatch => {
      
      const response = await fetch(state.data.url_server + '/bagges', getRequestConfig({employee_id: state.data.user.id}))
      const data = await response.json()
      if (data.success) {
        dispatch({
          type: 'ADD_BADGES',
          badges: data.data,
        })
      } else {
        console.log(data.massage, response.status)
        if (response.status === 401) {
          dispatch({
            type: 'LOGUOT'
          })}}}}

          
export function  addStatusGroupAction() {

  const state = store.getState()

  return async dispatch => {
      
      const response = await fetch(state.data.url_server + '/get_status_group', getRequestConfig())
      const data = await response.json()
      if (data.success) {
        dispatch({
          type: 'ADD_STATUS_GROUP',
          status_group: data.data,
        })
      } else {
        console.log(data.massage, response.status)
        if (response.status === 401) {
          dispatch({
            type: 'LOGUOT'
          })}}}}


export function  addOrdersTypeAction() {

  const state = store.getState()

  return async dispatch => {
      
      const response = await fetch(state.data.url_server + '/get_order_type', getRequestConfig())
      const data = await response.json()
      if (data.success) {
        dispatch({
          type: 'ADD_ORDER_TYPE',
          order_type: data.data,
        })
      } else {
        console.log(data.massage, response.status)
        if (response.status === 401) {
          dispatch({
            type: 'LOGUOT'
          })}}}}


export function  addEquipment() {

  const state = store.getState()

  return async dispatch => {
      
      const response = await fetch(state.data.url_server + '/get_equipment_type', getRequestConfig())
      const data = await response.json()
      if (data.success) {
        dispatch({
          type: 'ADD_EQUIPMENT',
          equipment: data.data,
        })
      } else {
        console.log(data.massage, response.status)
        if (response.status === 401) {
          dispatch({
            type: 'LOGUOT'
          })}}}}


export function addCustomFilter() {

  const state = store.getState()

  return async dispatch => {
      let request_config = getRequestConfig({
        employee_id: state.data.user.id,
        title: state.filter.title_create,
        filters: state.filter.tempFilter,
        general: state.filter.addCustomFilter
      })
      
      let response = await fetch(state.data.url_server + '/custom_filters', request_config)
      let data = await response.json()
      if (!data.success) {
        console.log(data.massage, response.status)
        if (response.status === 401) {
          dispatch({
            type: 'LOGUOT'
          })
        }
      }
      
      response = await fetch(state.data.url_server + '/get_custom_filters', getRequestConfig({
        employee_id: state.data.user.id
      }))
      data = await response.json()
      if (data.success) {
        dispatch({
          type: 'ADD_CUSTOM_FILTERS',
          filters: data.data,
        })
      } else {
        console.log(data.massage, response.status)
        if (response.status === 401) {
          dispatch({
            type: 'LOGUOT'
          })}}
        }}

        
export function  addCustomFilters() {

  const state = store.getState()

  return async dispatch => {
      
      const response = await fetch(state.data.url_server + '/get_custom_filters', getRequestConfig({
        employee_id: state.data.user.id
      }))
      const data = await response.json()
      if (data.success) {
        dispatch({
          type: 'ADD_CUSTOM_FILTERS',
          filters: data.data,
        })
      } else {
        console.log(data.massage, response.status)
        if (response.status === 401) {
          dispatch({
            type: 'LOGUOT'
          })}}}}

          
export function saveCustomFilter() {

  const state = store.getState()
  const idActiveFilter = state.filter.customFilters.find(filter => filter.active === true).id

  return async dispatch => {
      let request_config = getRequestConfig({
        id: idActiveFilter,
        filters: state.filter.tempFilter
      })

      request_config.method = 'PUT'
      let response = await fetch(state.data.url_server + '/custom_filters', request_config)
      let data = await response.json()
      if (!data.success) {
        console.log(data.massage, response.status)
        if (response.status === 401) {
          dispatch({
            type: 'LOGUOT'
          })}}
      
      request_config.method = 'POST'
      response = await fetch(state.data.url_server + '/get_custom_filters', getRequestConfig({
        employee_id: state.data.user.id
      }))
      data = await response.json()
      if (data.success) {
        dispatch({
          type: 'ADD_CUSTOM_FILTERS',
          filters: data.data,
        })
        dispatch({
          type: 'APPLY_CUSTOM_FILTER',
          id: idActiveFilter,
          filter: data.data.find(filter => filter.id === idActiveFilter).filters
        })

      } else {
        console.log(data.massage, response.status)
        if (response.status === 401) {
          dispatch({
            type: 'LOGUOT'
          })}}
        }}

        
export function removeFilter() {

  const state = store.getState()

  return async dispatch => {
      let request_config = getRequestConfig({
        id: state.filter.customFilters.find(filter => filter.active === true).id
      })
      request_config.method = 'DELETE'
      let response = await fetch(state.data.url_server + '/custom_filters', request_config)
      let data = await response.json()
      if (!data.success) {
        console.log(data.massage, response.status)
        if (response.status === 401) {
          dispatch({
            type: 'LOGUOT'
          })}}
      
      request_config.method = 'POST'
      response = await fetch(state.data.url_server + '/get_custom_filters', getRequestConfig({
        employee_id: state.data.user.id
      }))
      data = await response.json()
      if (data.success) {
        dispatch({
          type: 'ADD_CUSTOM_FILTERS',
          filters: data.data,
        })
        dispatch({
          type: 'RESET_FILTER',
        })
      } else {
        console.log(data.massage, response.status)
        if (response.status === 401) {
          dispatch({
            type: 'LOGUOT'
          })}}
        }}