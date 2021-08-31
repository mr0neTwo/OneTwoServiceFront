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


export function changeSetStatusFilter() {
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

    
export function changeStatusSettingRow(id) {
  return {
    type: 'CHANGE_STATUS_SETTING_ROW',
    id
  }}
  
export function changeStatusCteateNewRole() {
  return {
    type: 'CHANGE_STATUS_CREATE_NEW_ROLE'
  }}


export function changeTitleCreateRole(title) {
  return {
    type: 'CHANGE_TITLE_CREATE_ROLE',
    title
  }}

export function changePermissions(value) {
  return {
    type: 'CHANGE_PERMISSION',
    value
  }}
  
export function cahngeEarningsVisibility(bool) {
  return {
    type: 'CHANGE_EARNINGS_VISIBILITY',
    bool
  }}

export function cahngeLeadsVisibility(bool) {
  return {
    type: 'CHANGE_LEADS_VISIBILITY',
    bool
  }}

export function cahngeOrdersVisibility(bool) {
  return {
    type: 'CHANGE_ORDERS_VISIBILITY',
    bool
  }}

export function changeVisibleStatuses(id) {
  return {
    type: 'CHANGE_VISIBLE_STATUSES',
    id
  }}

export function changeSettableStatuses(id) {
  return {
    type: 'CHANGE_SETTABLE_STATUSES',
    id
  }}

  
export function changeSettableMargin(id) {
  return {
    type: 'CHANGE_SETTABLE_MARGIN',
    id
  }}

  
export function editRole(role) {
  return {
    type: 'EDIT_ROLE',
    role
  }}

  
export function changeStatusEmployeeEditor() {
  return {
    type: 'CHANGE_STATUS_EMPLOYEE_EDITOR'
  }}

export function changeEmployeeTabs(tab) {
  return {
    type: 'CHANGE_EMPLOYEE_TAB',
    tab
  }}

  
export function changeEmployeEditorForm(field, value) {
  return {
    type: 'CHANGE_EMPLOYEE_EDITOR_FORM',
    field,
    value
  }}

  
export function changeEmployeeEditorRoleOptions() {
  return {
    type: 'CHANGE_EMPLOYEE_EDITOR_ROLE_OPTIONS'
  }}


export function setRoleEmployeeEdetor(role) {
  return {
    type: 'SET_ROLE_EMPLOYEE_EDITOR',
    role
  }}

export function changeShowDeleted() {
  return {
    type: 'CHANGE_SHOW_DELETED'
  }}

  
export function editEmoloyee(employee) {
  return {
    type: 'EDIT_EMPLOYEE',
    employee
  }}

  
export function changeStatusNewOrder() {
  return {
    type: 'CHANGE_STATUS_NEW_ORDER'
  }}

export function changeTypeListOrder() {
  return {
    type: 'CHANGE_TYPE_LIST_ORDER'
  }}

export function setOrderType(id) {
  return {
    type: 'SET_ORDER_TYPE',
    id
  }}



export function addOrders() {

  const state = store.getState()

  return async dispatch => {
      
    let filters = state.filter.mainFilter
    filters.engineer_id = !state.data.user.role.orders_visibility ? [state.data.user.id] : state.filter.mainFilter.engineer_id
    
    const response = await fetch(state.data.url_server + '/get_orders', getRequestConfig(filters))
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

export function addEmplooys( filters ) {
  
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


export function createEmployee() {
  
  const state = store.getState()

  return async dispatch => {

    let request_config = getRequestConfig({
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
    })

    let response = await fetch(state.data.url_server + '/emplooys', request_config)
    let data = await response.json()
    if (!data.success) {
      console.log(data.message, response.status)
    }
     
    response = await fetch(state.data.url_server + '/get_emplooys', getRequestConfig())
    data = await response.json()
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

export function seveEditEmployee() {
  
  const state = store.getState()

  return async dispatch => {

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
    })

    request_config.method = 'PUT'
    let response = await fetch(state.data.url_server + '/emplooys', request_config)
    let data = await response.json()
    if (!data.success) {
      console.log(data.message, response.status)
    }

    request_config.method = 'POST'
    response = await fetch(state.data.url_server + '/get_emplooys', getRequestConfig())
    data = await response.json()
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

export function deleteEmployee() {
  
  const state = store.getState()

  return async dispatch => {

    let request_config = getRequestConfig({id: state.employee.edit})

    request_config.method = 'DELETE'
    let response = await fetch(state.data.url_server + '/emplooys', request_config)
    let data = await response.json()
    if (!data.success) {
      console.log(data.message, response.status)
    }

    request_config.method = 'POST'
    response = await fetch(state.data.url_server + '/get_emplooys', getRequestConfig())
    data = await response.json()
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

export function addStatus() {

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




          
export function addDiscountMargin() {

  const state = store.getState()

  return async dispatch => {
      const response = await fetch(state.data.url_server + '/get_discount_margin', getRequestConfig())
      const data = await response.json()
      if (data.success) {
        dispatch({
          type: 'ADD_DISCOUNT_MARGIN',
          margin: data.data,
      })
      } else {
        console.log(data.massage, response.status)
        if (response.status === 401) {
          dispatch({
            type: 'LOGUOT'
          })}}}}

          
export function createRole() {

  const state = store.getState()

  let request_config = getRequestConfig({
    title: state.role.title_create,                                       
    earnings_visibility: state.role.earnings_visibility,           
    leads_visibility: state.role.leads_visibility,                  
    orders_visibility: state.role.orders_visibility,               
    permissions: state.role.list_permissions,                           
    settable_statuses: state.role.settable_statuses,                
    visible_statuses: state.role.visible_statuses,                 
    settable_discount_margin: state.role.settable_discount_margin   
  })

  return async dispatch => {
      let response = await fetch(state.data.url_server + '/roles', request_config)
      let data = await response.json()

      response = await fetch(state.data.url_server + '/get_roles', getRequestConfig())
      data = await response.json()
      if (data.success) {
        dispatch({
          type: 'ADD_ROLES',
          roles: data.data,
      })
      } else {
        console.log(data.massage, response.status)
        if (response.status === 401) {
          dispatch({
            type: 'LOGUOT'
          })}}}}

          
export function addRoles() {

  const state = store.getState()

  return async dispatch => {
      const response = await fetch(state.data.url_server + '/get_roles', getRequestConfig())
      const data = await response.json()
      if (data.success) {
        dispatch({
          type: 'ADD_ROLES',
          roles: data.data,
      })
      } else {
        console.log(data.massage, response.status)
        if (response.status === 401) {
          dispatch({
            type: 'LOGUOT'
          })}}}}


export function seveEditRole() {

  const state = store.getState()

  let request_config = getRequestConfig({
    id: state.role.edit,
    title: state.role.title_create,                                       
    earnings_visibility: state.role.earnings_visibility,           
    leads_visibility: state.role.leads_visibility,                  
    orders_visibility: state.role.orders_visibility,               
    permissions: state.role.list_permissions,                           
    settable_statuses: state.role.settable_statuses,                
    visible_statuses: state.role.visible_statuses,                 
    settable_discount_margin: state.role.settable_discount_margin   
  })

  return async dispatch => {
    request_config.method = 'PUT'
    let response = await fetch(state.data.url_server + '/roles', request_config)
    let data = await response.json()

    response = await fetch(state.data.url_server + '/get_roles', getRequestConfig())
    data = await response.json()
    if (data.success) {
      dispatch({
        type: 'ADD_ROLES',
        roles: data.data,
    })
    } else {
      console.log(data.massage, response.status)
      if (response.status === 401) {
        dispatch({
          type: 'LOGUOT'
        })}}}}

        
export function deleteRole() {

  const state = store.getState()

  let request_config = getRequestConfig({id: state.role.edit})

  return async dispatch => {
    request_config.method = 'DELETE'
    let response = await fetch(state.data.url_server + '/roles', request_config)
    let data = await response.json()

    response = await fetch(state.data.url_server + '/get_roles', getRequestConfig())
    data = await response.json()
    if (data.success) {
      dispatch({
        type: 'ADD_ROLES',
        roles: data.data,
    })
    } else {
      console.log(data.massage, response.status)
      if (response.status === 401) {
        dispatch({
          type: 'LOGUOT'
        })}}}}


        
