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

export function changePhoneClientFilter(word) {
  return {
    type: 'CHANGE_PHONE_CLIENTFILTER',
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
  }
}
  


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


export function changeEmployeeTabs(tab) {
  return {
    type: 'CHANGE_EMPLOYEE_TAB',
    tab
  }}

  
export function changeEmployeEditorForm( value, field) {
  return {
    type: 'CHANGE_EMPLOYEE_EDITOR_FORM',
    value,
    field
  }
}
  
export function changeEmployeeSelected( value, field ) {
  return {
    type: 'CHOOSE_EMPLOYEE_SELECTED',
    value,
    field
  }
}

  
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
  }
}
  
export function resetEmoloyee() {
  return {
    type: 'RESET_EMPLOYEE'
  }
}

export function changeTypeListOrder() {
  return {
    type: 'CHANGE_TYPE_LIST_ORDER'
  }
}

export function setOrderType(id) {
  return {
    type: 'SET_ORDER_TYPE',
    id
  }
}

export function changeClienListOrder() {
  return {
    type: 'CHANGE_CLIENT_LIST_ORDER'
  }
}

export function setClientId(id) {
  return {
    type: 'SET_CLIENT_ID',
    id
  }
}

  
export function resetClient() {
  return {
    type: 'RESET_CLIENT'
  }}

  
export function changeClienListOrderPhone() {
  return {
    type: 'CHANGE_CLIENT_LIST_ORDER_PHONE'
  }}


  
export function setClietnCheckbox(field, value) {
  return {
    type: 'SET_CLIENT_CHECKBOX',
    field,
    value
  }}

  
export function changeClientEditorForm(field, value) {
  return {
    type: 'CHANGE_CLIENT_EDITOR_FORM',
    field,
    value
  }}

  
export function changeClientEditorPhone(idx, value) {
  return {
    type: 'CHANGE_CLIENT_EDITOR_PHONE',
    idx,
    value
  }}

  
export function addPhoneCounter() {
  return {
    type: 'ADD_PHONE_COUNTER'
  }}

  
export function deleteCountNumber(idx) {
  return {
    type: 'DELETE_COUNT_NUMBER',
    idx
  }}

  
export function setPhoneNotify(idx) {
  return {
    type: 'SET_PHONE_NOTIFY',
    idx
  }}
  
  
export function changeStatusPhoneList(idx) {
  return {
    type: 'CHANGE_STATUS_PHONE_LIST',
    idx
  }}

  
export function setPhoneTitle(idx, title) {
  return {
    type: 'SET_PHONE_TITLE',
    idx,
    title
  }}

  
export function changeStatusAddTitle(idx) {
  return {
    type: 'CHANGE_STATUS_ADD_TITLE',
    idx
  }}

export function changeStatusAdCampaignClient() {
  return {
    type: 'CHANGE_STATUS_AD_CAMPAIGN_CLIENT'
  }
}

export function setAdCampaignClient(id) {
  return {
    type: 'SET_AD_CANMPAIGN_CLIENT',
    id
  }
}

export function setTypeDiscountGood(id) {
  return {
    type: 'SET_TYPE_DISCOUNT_GOOD',
    id
  }
}

export function setTypeDiscountMaterials(id) {
  return {
    type: 'SET_TYPE_DISCOUNT_MATERIALS',
    id
  }
}

export function addClientTag(tag) {
  return {
    type: 'ADD_CLIENT_TAG',
    tag
  }
}

export function deleteClientTag(idx) {
  return {
    type: 'DELETE_CLIENT_TAG',
    idx
  }
}

export function addPaymentTag(tag) {
  return {
    type: 'ADD_PAYMENT_TAG',
    tag
  }
}

export function deletePaymentTag(idx) {
  return {
    type: 'DELETE_PAYMENT_TAG',
    idx
  }
}

export function setVisibleFlag(field, value) {
  return {
    type: 'SET_VISIBLE_FLAG',
    field,
    value
  }
}

export function setVisibleListFlag(field, idx, value) {
  return {
    type: 'SET_VISIBLE_LIST_FLAG',
    field,
    idx,
    value
  }
}

export function addVisibleFlag(field) {
  return {
    type: 'ADD_FLAG',
    field
  }
}

export function deleteVisibleFlag(field, idx) {
  return {
    type: 'DELETE_FLAG',
    field,
    idx
  }
}


export function resetDataClient() {
  return {
    type: 'RESET_DATA_CLIENT'
  }
}


export function changeClientTabs(tab) {
  return {
    type: 'CHANGE_CLIENT_TABS',
    tab
  }
}

export function setOrderAdCampaing(id) {
  return {
    type: 'SET_ORDER_AD_CAMPAING',
    id
  }
}


export function resetEquipment(idx, field) {
  return {
    type: 'RESET_EQUIPMENT',
    idx,
    field
  }
}

export function setOrderEquipment(idx, field, data) {
  return {
    type: 'SET_ORDER_EQUIPMENT',
    idx,
    field,
    data
  }
}


export function changeOrderForm(idx, field, value) {
  return {
    type: 'CHANGE_ORDER_FORM',
    idx,
    field,
    value
  }
}


export function addAnotherEquipment() {
  return {
    type: 'ADD_ANOTHER_EQUIPMENT'
  }
}


export function deleteDevice(idx) {
  return {
    type: 'DELETE_DEVICE',
    idx
  }
}


export function changeOrderFormS(value, field) {
  return {
    type: 'CHANGE_ORDER_FORM_S',
    field,
    value
  }
}


export function changeMaindataForm(field, value) {
  return {
    type: 'CHANGE_MAINDATA_FORM',
    field,
    value
  }
}


export function changeBranchForm(field, value) {
  return {
    type: 'CHANGE_BRANCH_FORM',
    field,
    value
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
  return dispatch => {
    dispatch({
      type: 'EDIT_BRANCH',
      branch
    })
    dispatch({
      type: 'SET_VISIBLE_FLAG',
      field: 'statusBranchEditor',
      value: true
    })
  }
}


export function changeBookForm( value, field ) {
  return {
    type: 'CHANGE_BOOK_FORM',
    field,
    value
  }
}


export function chooseEquipmentBranches( id ) {
  return {
    type: 'CHOOSE_EQUIPMENT_BRANCHES',
    id
  }
}


export function editEquipment( equipment ) {
  return {
    type: 'EDIT_EQUIPMENT',
    equipment
  }
}

export function resetBookEquipment() {
  return {
    type: 'RESET_BOOK_EQUIPMENT'
  }
}

export function chooseBookSelected( id, field ) {
  return {
    type: 'CHOOSE_BOOK_SELECTED',
    id,
    field
  }
}


export function changeCashboxForm( value, field ) {
  return {
    type: 'CHANGE_CASHBOX_FORM',
    field,
    value
  }
}

export function chooseCashboxSelected( id, field ) {
  return {
    type: 'CHOOSE_CASHBOX_SELECTED',
    id,
    field
  }
}

export function changeCashboxPermissions( value, field ) {
  return {
    type: 'CHANGE_CASHBOX_PERMISSION',
    value,
    field
  }
}

export function addData( data, field ) {
  return {
    type: 'ADD_DATA',
    data,
    field
  }
}

export function activeCashbox( id ) {
  return {
    type: 'ACTIVE_CASHBOX',
    id
  }
}

export function editCashbox( cashbox ) {
  return {
    type: 'EDIT_CASHBOX',
    cashbox
  }
}


export function changePaymentForm( value, field ) {
  return {
    type: 'CHANGE_PAYMENT_FORM',
    field,
    value
  }
}


export function editCurrentClient( client ) {
  return {
    type: 'EDIT_CURRENT_CLIENT',
    client
  }
}

export function resetPayments( ) {
  return {
    type: 'RESET_PAYMENTS'
  }
}

export function setPayment( payment ) {
  return {
    type: 'SET_PAYMENT',
    payment
  }
}

export function log_in(login, password) {

  const state = store.getState()

  const request_config = getRequestConfig({
    email: login,
    password
  })

  return async dispatch => {
    const response = await fetch(state.data.url_server + '/login', request_config)
    const data = await response.json()
    if (data.success) {
      sessionStorage.setItem('1xsndt', data.access_token);
      sessionStorage.setItem('user', JSON.stringify(data.user))
      dispatch({
        type: 'ADD_DATA',
        field: 'user',
        data: data.user,
      })
      dispatch({
        type: 'ADD_DATA',
        field: 'login_status',
        data: true,
      })
      dispatch({
        type: 'ADD_DATA',
        field: 'token',
        data: data.access_token,
      })
    } else {
      console.log(data.message)
      // setErrorMessage(data.message)
      if (response.status === 401 || response.status === 422) {
        sessionStorage.clear()
        dispatch({
          type: 'LOGUOT'
        })
      }
    }
  }
}


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
      if (response.status === 401 || response.status === 422) {
        sessionStorage.clear()
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
        if (response.status === 401 || response.status === 422) {
          sessionStorage.clear()
          dispatch({
            type: 'LOGUOT'
          })}}}}

export function addEmployees( filters ) {
  
  const state = store.getState()

  return async dispatch => {
     
      const response = await fetch(state.data.url_server + '/get_employee', getRequestConfig(filters))
      const data = await response.json()
      if (data.success) {
        dispatch({
          type: 'ADD_EMPLOYEES',
          employees: data.data,
        })
      } else {
        console.log(data.massage, response.status)
        if (response.status === 401 || response.status === 422) {
          sessionStorage.clear()
          dispatch({
            type: 'LOGUOT'
          })
        }
      }
  }
}

export function addAdCampaign() {
  
  const state = store.getState()

  return async dispatch => {
     
      const response = await fetch(state.data.url_server + '/get_ad_campaign', getRequestConfig())
      const data = await response.json()
      if (data.success) {
        dispatch({
          type: 'ADD_AD_CAMPAIGN',
          ad_campaign: data.data,
        })
      } else {
        console.log(data.massage, response.status)
        if (response.status === 401 || response.status === 422) {
          sessionStorage.clear()
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

    let response = await fetch(state.data.url_server + '/employee', request_config)
    let data = await response.json()
    if (!data.success) {
      console.log(data.message, response.status)
    }
     
    response = await fetch(state.data.url_server + '/get_employee', getRequestConfig())
    data = await response.json()
    if (data.success) {
      dispatch({
        type: 'ADD_EMPLOYEES',
        employees: data.data,
      })
      dispatch({
        type: 'SET_VISIBLE_FLAG',
        field: 'statusEmployeeEditor',
        value: false
      })
    } else {
      console.log(data.massage, response.status)
      if (response.status === 401 || response.status === 422) {
        sessionStorage.clear()
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
    let response = await fetch(state.data.url_server + '/employee', request_config)
    let data = await response.json()
    if (data.success) {
      request_config.method = 'POST'
      response = await fetch(state.data.url_server + '/get_employee', getRequestConfig())
      data = await response.json()
      if (data.success) {
        dispatch({
          type: 'ADD_EMPLOYEES',
          employees: data.data,
        })
        dispatch({
          type: 'SET_VISIBLE_FLAG',
          field: 'statusEmployeeEditor',
          value: false
        })
    } 
    } else {
      console.log(data.message, response.status)
      if (response.status === 401 || response.status === 422) {
        sessionStorage.clear()
        dispatch({
          type: 'LOGUOT'
        })
      }
      if (data.message === 'there is the same email') {
        dispatch({
          type: 'SET_VISIBLE_FLAG',
          field: 'errorSameMail',
          value: true
        })
      }
      if (data.message === 'there is the same login') {
        dispatch({
          type: 'SET_VISIBLE_FLAG',
          field: 'errorSameLogin',
          value: true
        })
      }
    }
    
  }
}

export function deleteEmployee(flag) {
  
  const state = store.getState()

  return async dispatch => {

    let request_config = getRequestConfig({
      id: state.employee.edit,
      deleted: flag
    })

    request_config.method = 'PUT'
    let response = await fetch(state.data.url_server + '/employee', request_config)
    let data = await response.json()
    if (!data.success) {
      console.log(data.message, response.status)
    }

    request_config.method = 'POST'
    response = await fetch(state.data.url_server + '/get_employee', getRequestConfig())
    data = await response.json()
    if (data.success) {
      dispatch({
        type: 'ADD_EMPLOYEES',
        employees: data.data,
      })
      dispatch({
        type: 'SET_VISIBLE_FLAG',
        field: 'statusEmployeeEditor',
        value: false
      })
    } else {
      console.log(data.massage, response.status)
      if (response.status === 401 || response.status === 422) {
        sessionStorage.clear()
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
        if (response.status === 401 || response.status === 422) {
          sessionStorage.clear()
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
        if (response.status === 401 || response.status === 422) {
          sessionStorage.clear()
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
        if (response.status === 401 || response.status === 422) {
          sessionStorage.clear()
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
        if (response.status === 401 || response.status === 422) {
          sessionStorage.clear()
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
        if (response.status === 401 || response.status === 422) {
          sessionStorage.clear()
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
        if (response.status === 401 || response.status === 422) {
          sessionStorage.clear()
          dispatch({
            type: 'LOGUOT'
          })
        }
      }
    }
  }


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
        if (response.status === 401 || response.status === 422) {
          sessionStorage.clear()
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
        if (response.status === 401 || response.status === 422) {
          sessionStorage.clear()
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
        if (response.status === 401 || response.status === 422) {
          sessionStorage.clear()
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
        if (response.status === 401 || response.status === 422) {
          sessionStorage.clear()
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
        if (response.status === 401 || response.status === 422) {
          sessionStorage.clear()
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
        if (response.status === 401 || response.status === 422) {
          sessionStorage.clear()
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
          type: 'RESET_CLIENT',
        })
      } else {
        console.log(data.massage, response.status)
        if (response.status === 401 || response.status === 422) {
          sessionStorage.clear()
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
        if (response.status === 401 || response.status === 422) {
          sessionStorage.clear()
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
      dispatch({
        type: 'SET_VISIBLE_FLAG',
        field: 'statusCreateNewRole',
        value: false
      })
      } else {
        console.log(data.massage, response.status)
        if (response.status === 401 || response.status === 422) {
          sessionStorage.clear()
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
        if (response.status === 401 || response.status === 422) {
          sessionStorage.clear()
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
  console.log('save')
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
    dispatch({
      type: 'SET_VISIBLE_FLAG',
      field: 'statusCreateNewRole',
      value: false
    })
    } else {
      console.log(data.massage, response.status)
      if (response.status === 401 || response.status === 422) {
        sessionStorage.clear()
        dispatch({
          type: 'LOGUOT'
        })
      }
    }
  }
}

        
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
    dispatch({
      type: 'SET_VISIBLE_FLAG',
      field: 'statusCreateNewRole',
      value: false
    })
    } else {
      console.log(data.massage, response.status)
      if (response.status === 401 || response.status === 422) {
        sessionStorage.clear()
        dispatch({
          type: 'LOGUOT'
        })}}}}

        
export function createNewClient() {

  const state = store.getState()

  const request_config = getRequestConfig({
    juridical: state.client.juridical,
    supplier: state.client.supplier,
    conflicted: state.client.conflicted,
    should_send_email: state.client.should_send_email,
    discount_good_type: state.client.discount_good_type,
    discount_materials_type: state.client.discount_materials_type,
 
    name: state.client.name,
    name_doc: state.client.name_doc,
    email: state.client.email,
    address: state.client.address,
    discount_code: state.client.discount_code,
    notes: state.client.notes,
    ogrn: state.client.ogrn,
    inn: state.client.inn,
    kpp: state.client.kpp,
    juridical_address: state.client.juridical_address,
    director: state.client.director,
    bank_name: state.client.bank_name,
    settlement_account: state.client.settlement_account,
    corr_account: state.client.corr_account,
    bic: state.client.bic,

    discount_goods: state.client.discount_goods,
    discount_materials: state.client.discount_materials,
    discount_services: state.client.discount_services,

    ad_campaign_id: state.client.ad_campaign_id,
    discount_goods_margin_id: state.client.discount_goods_margin_id,
    discount_materials_margin_id: state.client.discount_materials_margin_id,

    tags: state.client.tags,
    phone: state.client.phone,
  })

  return async dispatch => {
   
    const response = await fetch(state.data.url_server + '/clients', request_config)
    const data = await response.json()
    if (data.success) {
      dispatch({
        type: 'SET_CLIENT_ID',
        id: data.data,
      })
      dispatch({
        type: 'SET_VISIBLE_FLAG',
        field: 'statusCreateNewClient',
        value: false
      })
      dispatch({
        type: 'RESET_DATA_CLIENT'
      })
    } else {
      console.log(data.massage, response.status)
      if (response.status === 401 || response.status === 422) {
        sessionStorage.clear()
        dispatch({
          type: 'LOGUOT'
        })
      }
    }
  }
}


export function saveChangeClient() {

  const state = store.getState()

  let request_config = getRequestConfig({
    id: state.client.edit,
    juridical: state.client.juridical,
    supplier: state.client.supplier,
    conflicted: state.client.conflicted,
    should_send_email: state.client.should_send_email,
    discount_good_type: state.client.discount_good_type,
    discount_materials_type: state.client.discount_materials_type,
 
    name: state.client.name,
    name_doc: state.client.name_doc,
    email: state.client.email,
    address: state.client.address,
    discount_code: state.client.discount_code,
    notes: state.client.notes,
    ogrn: state.client.ogrn,
    inn: state.client.inn,
    kpp: state.client.kpp,
    juridical_address: state.client.juridical_address,
    director: state.client.director,
    bank_name: state.client.bank_name,
    settlement_account: state.client.settlement_account,
    corr_account: state.client.corr_account,
    bic: state.client.bic,

    discount_goods: state.client.discount_goods,
    discount_materials: state.client.discount_materials,
    discount_services: state.client.discount_services,

    ad_campaign_id: state.client.ad_campaign_id,
    discount_goods_margin_id: state.client.discount_goods_margin_id,
    discount_materials_margin_id: state.client.discount_materials_margin_id,

    tags: state.client.tags,
    phone: state.client.phone,
  })

  return async dispatch => {
   
    request_config.method = 'PUT'
    const response = await fetch(state.data.url_server + '/clients', request_config)
    const data = await response.json()
    if (data.success) {
      dispatch({
        type: 'SET_CLIENT_ID',
        id: data.data,
      })
      dispatch({
        type: 'SET_VISIBLE_FLAG',
        field: 'statusCreateNewClient',
        value: false
      })
    } else {
      console.log(data.massage, response.status)
      if (response.status === 401 || response.status === 422) {
        sessionStorage.clear()
        dispatch({
          type: 'LOGUOT'
        })
      }
    }
  }
}


export function editClient(id) {

  const state = store.getState()

  return async dispatch => {
      
    const response = await fetch(state.data.url_server + '/get_clients', getRequestConfig({id}))
    const data = await response.json()
    
    if (data.success) {
      dispatch({
        type: 'EDIT_CLIENT',
        client: data.data[0]
      })
    } else {
      console.log(data.massage, response.status)
      if (response.status === 401 || response.status === 422) {
        sessionStorage.clear()
        dispatch({
          type: 'LOGUOT'
        })
      }
    }
  }
}


export function deleteClient(id) {

  const state = store.getState()

  let request_config = getRequestConfig({id})

  return async dispatch => {
   
    request_config.method = 'DELETE'
    const response = await fetch(state.data.url_server + '/clients', request_config)
    const data = await response.json()
    if (data.success) {
      dispatch({
        type: 'RESET_CLIENT',
      })
      dispatch({
        type: 'RESET_DATA_CLIENT'
      })
      dispatch({
        type: 'SET_VISIBLE_FLAG',
        field: 'statusCreateNewClient',
        value: false
      })
    } else {
      console.log(data.massage, response.status)
      if (response.status === 401 || response.status === 422) {
        sessionStorage.clear()
        dispatch({
          type: 'LOGUOT'
        })
      }
    }
  }
}


export function addEquipmentType( title ) {

  const state = store.getState() 

  let request_config = title ? getRequestConfig({ title }) : 
  getRequestConfig({
    title: state.book.title,
    icon: state.book.icon,
    url: state.book.url,
    branches: state.book.branches,
  })

  return async dispatch => {
   
    const response = await fetch(state.data.url_server + '/equipment_type', request_config)
    const data = await response.json()
    if (data.success) {
      const response = await fetch(state.data.url_server + '/get_equipment_type', getRequestConfig())
      const data = await response.json()
      if (data.success) {
        dispatch({
          type: 'ADD_EQUIPMENT',
          equipment: data.data,
        })
        dispatch({
          type: 'SET_VISIBLE_FLAG',
          field: 'statusEquipmentEditor',
          value: false
        })
      } else {
        console.log(data.massage, response.status)
        if (response.status === 401 || response.status === 422) {
          sessionStorage.clear()
          dispatch({
            type: 'LOGUOT'
          })
        }
      }
    }
  }
}


export function addEquipmentBrand( idx, title ) {

  const state = store.getState()

  const request_config = getRequestConfig({
    title,
    equipment_type_id: state.order.equipments[idx].kindof_good.id
  })

  return async dispatch => {
   
    const response = await fetch(state.data.url_server + '/equipment_brand', request_config)
    const data = await response.json()
    if (data.success) {
      const response = await fetch(state.data.url_server + '/get_equipment_type', getRequestConfig())
      const data = await response.json()
      if (data.success) {
        dispatch({
          type: 'ADD_EQUIPMENT',
          equipment: data.data,
        })
      } else {
        console.log(data.massage, response.status)
        if (response.status === 401 || response.status === 422) {
          sessionStorage.clear()
          dispatch({
            type: 'LOGUOT'
          })
        }
      }
    }
  }
}


export function addEquipmentSubtype( idx, title ) {

  const state = store.getState()

  const request_config = getRequestConfig({
    title,
    equipment_brand_id: state.order.equipments[idx].brand.id
  })

  return async dispatch => {
   
    const response = await fetch(state.data.url_server + '/equipment_subtype', request_config)
    const data = await response.json()
    if (data.success) {
      const response = await fetch(state.data.url_server + '/get_equipment_type', getRequestConfig())
      const data = await response.json()
      if (data.success) {
        dispatch({
          type: 'ADD_EQUIPMENT',
          equipment: data.data,
        })
      } else {
        console.log(data.massage, response.status)
        if (response.status === 401 || response.status === 422) {
          sessionStorage.clear()
          dispatch({
            type: 'LOGUOT'
          })
        }
      }
    }
  }
}


export function addEquipmentModel( idx, title ) {

  const state = store.getState()

  const request_config = getRequestConfig({
    title,
    equipment_subtype_id: state.order.equipments[idx].subtype.id
  })

  return async dispatch => {
   
    const response = await fetch(state.data.url_server + '/equipment_model', request_config)
    const data = await response.json()
    if (data.success) {
      const response = await fetch(state.data.url_server + '/get_equipment_type', getRequestConfig())
      const data = await response.json()
      if (data.success) {
        dispatch({
          type: 'ADD_EQUIPMENT',
          equipment: data.data,
        })
      } else {
        console.log(data.massage, response.status)
        if (response.status === 401 || response.status === 422) {
          sessionStorage.clear()
          dispatch({
            type: 'LOGUOT'
          })
        }
      }
    }
  }
}



export function createOrder() {

  const state = store.getState()

  // function CreateOneOrder(request_config) {

    const request_config = getRequestConfig({
          estimated_done_at: state.order.estimated_done_at,
    
          order_type_id: state.order.order_type_id,
          client_id: state.order.client.id,
          ad_campaign_id: state.order.ad_campaign_id,
          manager_id: state.order.manager_id,
          engineer_id: state.order.engineer_id,
    
          kindof_good: state.order.equipments[0].kindof_good.id,
          brand: state.order.equipments[0].brand.id,
          subtype: state.order.equipments[0].subtype.id,
          model: state.order.equipments[0].model.id,
          malfunction: state.order.equipments[0].malfunction,
          packagelist: state.order.equipments[0].packagelist,
          appearance: state.order.equipments[0].appearance,
          urgent: state.order.equipments[0].urgent,
    
          manager_notes: state.order.manager_notes,
          estimated_cost: state.order.estimated_cost
        })
    
    return async dispatch => {
  
      const response = await fetch(state.data.url_server + '/orders', request_config)
      const data = await response.json()
      if (data.success) {
        const response = await fetch(state.data.url_server + '/get_orders', getRequestConfig())
        const data = await response.json()
        if (data.success) {
          // dispatch({
          //   type: 'ADD_EQUIPMENT',
          //   equipment: data.data,
          // })
        } else {
          console.log(data.massage, response.status)
          if (response.status === 401 || response.status === 422) {
            sessionStorage.clear()
            dispatch({
              type: 'LOGUOT'
            })
          }
        }
      }
    }
// }

  // state.order.equipments.forEach(equipment => {

  //   const request_config = getRequestConfig({
  //     estimated_done_at: state.order.estimated_done_at,

  //     order_type_id: state.order.order_type_id,
  //     client_id: state.order.client.id,
  //     ad_campaign_id: state.order.ad_campaign_id,
  //     manager_id: state.order.manager_id,
  //     engineer_id: state.order.engineer_id,

  //     kindof_good: equipment.kindof_good.id,
  //     brand: equipment.kindof_good.id,
  //     subtype: equipment.kindof_good.id,
  //     model: equipment.kindof_good.id,
  //     malfunction: equipment.malfunction,
  //     packagelist: equipment.packagelist,
  //     appearance: equipment.appearance,
  //     urgent: equipment.urgent,

  //     manager_notes: state.order.manager_notes,
  //     estimated_cost: state.order.estimated_cost
  //   })
    
  //   CreateOneOrder(request_config)
  // })

}


export function addMainData() {

  const state = store.getState()

  const request_config = getRequestConfig({})
  
  

  return async dispatch => {
   
    const response = await fetch(state.data.url_server + '/get_main_data', request_config)
    const data = await response.json()
    if (data.success) {
        dispatch({
          type: 'ADD_DATA',
          field: 'generally_info',
          data: data.generally_info,
        })
        dispatch({
          type: 'ADD_GENERALLY_INFO',
          data: data.generally_info,
        })
        dispatch({
          type: 'ADD_DATA',
          field: 'branches',
          data: data.branch,
        })
        dispatch({
          type: 'ADD_DATA',
          field: 'order_type',
          data: data.order_type,
        })
        dispatch({
          type: 'ADD_DATA',
          field: 'counters',
          data: data.counts,
        })
        dispatch({
          type: 'ADD_DATA',
          field: 'ad_campaign',
          data: data.ad_campaign,
        })
      } else {
        console.log(data.massage, response.status)
        if (response.status === 401 || response.status === 422) {
          sessionStorage.clear()
          dispatch({
            type: 'LOGUOT'
          })
        }
      }
    }
  }

  
  export function saveGenerallyInfo() {

    const state = store.getState()
  
      let request_config = getRequestConfig({
        id: 1,
        name: state.maindata.name,
        address: state.maindata.address,
        email: state.maindata.email,
     
        ogrn: state.maindata.ogrn,
        inn: state.maindata.inn,
        kpp: state.maindata.kpp,
        juridical_address: state.maindata.juridical_address,
        director: state.maindata.director,
        bank_name: state.maindata.bank_name,
        settlement_account: state.maindata.settlement_account,
        corr_account: state.maindata.corr_account,
        bic: state.maindata.bic,
     
        description: state.maindata.description,
        phone: state.maindata.phone,
        logo: state.maindata.logo
      })
      
      return async dispatch => {
        
        request_config.method = 'PUT'
        const response = await fetch(state.data.url_server + '/generally_info', request_config)
        const data = await response.json()
        if (data.success) {
          const response = await fetch(state.data.url_server + '/get_generally_info', getRequestConfig())
          const data = await response.json()
          if (data.success) {
            dispatch({
              type: 'ADD_GENERALLY_INFO',
              data: data.data,
            })
          } else {
            console.log(data.massage, response.status)
            if (response.status === 401 || response.status === 422) {
              sessionStorage.clear()
              dispatch({
                type: 'LOGUOT'
              })
            }
          }
        }
      }
  }


export function addCounters() {

  const state = store.getState()

  return async dispatch => {
   
    const response = await fetch(state.data.url_server + '/get_counts', getRequestConfig({}))
    const data = await response.json()
    if (data.success) {
        dispatch({
          type: 'ADD_DATA',
          field: 'counters',
          data: data.data
        })
      } else {
        console.log(data.massage, response.status)
        if (response.status === 401 || response.status === 422) {
          sessionStorage.clear()
          dispatch({
            type: 'LOGUOT'
          })
        }
      }
    }
  }


export function createBranch() {

  const state = store.getState()

  let request_config = getRequestConfig({
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
    schedule: state.branch.schedule
  })

  return async dispatch => {
    let response = await fetch(state.data.url_server + '/branch', request_config)
    let data = await response.json()

    response = await fetch(state.data.url_server + '/get_branch', getRequestConfig())
    data = await response.json()
    if (data.success) {
      dispatch({
        type: 'ADD_DATA',
        field: 'branches',
        data: data.data,
      })
      dispatch({
        type: 'SET_VISIBLE_FLAG',
        field: 'statusBranchEditor',
        value: false
      })
      dispatch({
        type: 'RESET_BRANCH'
      })
    } else {
      console.log(data.massage, response.status)
      if (response.status === 401 || response.status === 422) {
        sessionStorage.clear()
        dispatch({
          type: 'LOGUOT'
        })
      }
    }
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
    schedule: state.branch.schedule
  })

  return async dispatch => {

    request_config.method = 'PUT'

    let response = await fetch(state.data.url_server + '/branch', request_config)
    let data = await response.json()

    response = await fetch(state.data.url_server + '/get_branch', getRequestConfig())
    data = await response.json()
    if (data.success) {
      dispatch({
        type: 'ADD_DATA',
        field: 'branches',
        data: data.data,
      })
      dispatch({
        type: 'SET_VISIBLE_FLAG',
        field: 'statusBranchEditor',
        value: false
      })
      dispatch({
        type: 'RESET_BRANCH'
      })
    } else {
      console.log(data.massage, response.status)
      if (response.status === 401 || response.status === 422) {
        sessionStorage.clear()
        dispatch({
          type: 'LOGUOT'
        })
      }
    }
  }
}


export function deleteBranch(flag) {

  const state = store.getState()

  let request_config = getRequestConfig({
    id: state.branch.edit,
    deleted: flag
  })

  return async dispatch => {

    request_config.method = 'PUT'

    let response = await fetch(state.data.url_server + '/branch', request_config)
    let data = await response.json()

    response = await fetch(state.data.url_server + '/get_branch', getRequestConfig())
    data = await response.json()
    if (data.success) {
      dispatch({
        type: 'ADD_DATA',
        field: 'branches',
        data: data.data,
      })
      dispatch({
        type: 'SET_VISIBLE_FLAG',
        field: 'statusBranchEditor',
        value: false
      })
      dispatch({
        type: 'RESET_BRANCH'
      })
    } else {
      console.log(data.massage, response.status)
      if (response.status === 401 || response.status === 422) {
        sessionStorage.clear()
        dispatch({
          type: 'LOGUOT'
        })
      }
    }
  }
}


export function seveEditEquipment( ) {

  const state = store.getState()
  
  const field_lidt = ['equipment', 'equipment_type_id', 'equipment_brand_id', 'equipment_subtype_id']
  const url_list = ['/equipment_type', '/equipment_brand', '/equipment_subtype', '/equipment_model']

  let request_config = getRequestConfig({
    id: state.book.edit,
    title: state.book.title,
    icon: state.book.icon,
    url: state.book.url,
    [field_lidt[state.book.type]]: state.book.parent_id,
    branches: state.book.branches
  })

  return async dispatch => {
   
    request_config.method = 'PUT'

    const response = await fetch(state.data.url_server + url_list[state.book.type], request_config)
    const data = await response.json()
    if (data.success) {
      const response = await fetch(state.data.url_server + '/get_equipment_type', getRequestConfig())
      const data = await response.json()
      if (data.success) {
        dispatch({
          type: 'ADD_EQUIPMENT',
          equipment: data.data,
        })
        dispatch({
          type: 'SET_VISIBLE_FLAG',
          field: 'statusEquipmentEditor',
          value: false
        })
      } else {
        console.log(data.massage, response.status)
        if (response.status === 401 || response.status === 422) {
          sessionStorage.clear()
          dispatch({
            type: 'LOGUOT'
          })
        }
      }
    }
  }
}


export function deleteEquipment( flag ) {

  const state = store.getState()
  
  const url_list = ['/equipment_type', '/equipment_brand', '/equipment_subtype', '/equipment_model']

  let request_config = getRequestConfig({
    id: state.book.edit,
    deleted: flag
  })

  return async dispatch => {
   
    request_config.method = 'PUT'

    const response = await fetch(state.data.url_server + url_list[state.book.type], request_config)
    const data = await response.json()
    if (data.success) {
      const response = await fetch(state.data.url_server + '/get_equipment_type', getRequestConfig())
      const data = await response.json()
      if (data.success) {
        dispatch({
          type: 'ADD_EQUIPMENT',
          equipment: data.data,
        })
        dispatch({
          type: 'SET_VISIBLE_FLAG',
          field: 'statusEquipmentEditor',
          value: false
        })
      } else {
        console.log(data.massage, response.status)
        if (response.status === 401 || response.status === 422) {
          sessionStorage.clear()
          dispatch({
            type: 'LOGUOT'
          })
        }
      }
    }
  }
}

export function createBookEquipment() {

  const state = store.getState()
  
  const field_lidt = ['equipment', 'equipment_type_id', 'equipment_brand_id', 'equipment_subtype_id']
  const url_list = ['/equipment_type', '/equipment_brand', '/equipment_subtype', '/equipment_model']

  const request_config = getRequestConfig({
    title: state.book.title,
    icon: state.book.icon,
    url: state.book.url,
    [field_lidt[state.book.type]]: state.book.parent_id,
    branches: state.book.branches
  })

  return async dispatch => {

    const response = await fetch(state.data.url_server + url_list[state.book.type], request_config)
    const data = await response.json()
    if (data.success) {
      const response = await fetch(state.data.url_server + '/get_equipment_type', getRequestConfig())
      const data = await response.json()
      if (data.success) {
        dispatch({
          type: 'ADD_EQUIPMENT',
          equipment: data.data,
        })
        dispatch({
          type: 'SET_VISIBLE_FLAG',
          field: 'statusEquipmentEditor',
          value: false
        })
      } else {
        console.log(data.massage, response.status)
        if (response.status === 401 || response.status === 422) {
          sessionStorage.clear()
          dispatch({
            type: 'LOGUOT'
          })
        }
      }
    }
  }
}

 
export function addDictMalfunction() {

  const state = store.getState()

  const request_config = getRequestConfig({
    page: state.book.page_malfunction
  })

  return async dispatch => {
   
    const response = await fetch(state.data.url_server + '/get_malfunction', request_config)
    const data = await response.json()
    if (data.success) {
        dispatch({
          type: 'ADD_DATA',
          field: 'dictMalfunction',
          data: data.data
        })
        dispatch({
          type: 'ADD_DATA',
          field: 'count_malfunction',
          data: data.count
        })
      } else {
        console.log(data.massage, response.status)
        if (response.status === 401 || response.status === 422) {
          sessionStorage.clear()
          dispatch({
            type: 'LOGUOT'
          })
        }
      }
    }
  }



  
  export function createBookElement() {

    const state = store.getState()
    
    const url_list = ['malfunction', 'packagelist', 'item_payments']
    const field_list = ['dictMalfunction', 'dictPackagelist', 'item_payments']
  
    const request_config = getRequestConfig({
      title: state.book.title,
      direction: state.book.direction
    })
  
    return async dispatch => {
  
      const response = await fetch(state.data.url_server + `/${url_list[state.book.type]}`, request_config)
      const data = await response.json()
      if (data.success) {
        const response = await fetch(state.data.url_server + `/get_${url_list[state.book.type]}`, getRequestConfig())
        const data = await response.json()
        if (data.success) {
          dispatch({
            type: 'ADD_DATA',
            field: field_list[state.book.type],
            data: data.data
          })
          dispatch({
            type: 'ADD_DATA',
            field: `count_${url_list[state.book.type]}`,
            data: data.count
          })
        } else {
          console.log(data.massage, response.status)
          if (response.status === 401 || response.status === 422) {
            sessionStorage.clear()
            dispatch({
              type: 'LOGUOT'
            })
          }
        }
      }
    }
  }
  

  
  export function deleteBookElements() {

    const state = store.getState()
    
    const url_list = ['malfunction', 'packagelist', 'item_payments']
    const field_list = ['dictMalfunction', 'dictPackagelist', 'item_payments']
  
    let request_config = getRequestConfig({
      del_ids: state.book[`selected_${url_list[state.book.type]}`]
    })
  
    return async dispatch => {
  
      request_config.method = 'DELETE'
      const response = await fetch(state.data.url_server + `/${url_list[state.book.type]}`, request_config)
      const data = await response.json()
      if (data.success) {
        const response = await fetch(state.data.url_server + `/get_${url_list[state.book.type]}`, getRequestConfig())
        const data = await response.json()
        if (data.success) {
          dispatch({
            type: 'ADD_DATA',
            field: field_list[state.book.type],
            data: data.data
          })
          dispatch({
            type: 'ADD_DATA',
            field: `count_${url_list[state.book.type]}`,
            data: data.count
          })
        } else {
          console.log(data.massage, response.status)
          if (response.status === 401 || response.status === 422) {
            sessionStorage.clear()
            dispatch({
              type: 'LOGUOT'
            })
          }
        }
      }
    }
  }

  
export function addDictPackagelist() {

  const state = store.getState()
  
  const request_config = getRequestConfig({
    page: state.book.page_packagelist
  })
  
  return async dispatch => {
    
    const response = await fetch(state.data.url_server + '/get_packagelist', request_config)
    const data = await response.json()
    if (data.success) {
      dispatch({
        type: 'ADD_DATA',
        field: 'dictPackagelist',
        data: data.data
      })
      dispatch({
        type: 'ADD_DATA',
        field: 'count_packagelist',
        data: data.count
      })
    } else {
      console.log(data.massage, response.status)
      if (response.status === 401 || response.status === 422) {
        sessionStorage.clear()
        dispatch({
          type: 'LOGUOT'
        })
      }
    }
  }
}

export function addItemPayments() {

  const state = store.getState()
  
  const request_config = getRequestConfig({
    page: state.book.page_item_payments
  })
  
  return async dispatch => {
    
    const response = await fetch(state.data.url_server + '/get_item_payments', request_config)
    const data = await response.json()
    if (data.success) {
      dispatch({
        type: 'ADD_DATA',
        field: 'item_payments',
        data: data.data
      })
      dispatch({
        type: 'ADD_DATA',
        field: 'count_item_payments',
        data: data.count
      })
    } else {
      console.log(data.massage, response.status)
      if (response.status === 401 || response.status === 422) {
        sessionStorage.clear()
        dispatch({
          type: 'LOGUOT'
        })
      }
    }
  }
}



export function createCashbox() {

  const state = store.getState()

  let request_config = getRequestConfig({
    title: state.cashbox.title,
    balance: state.cashbox.balance,
    type: state.cashbox.type,
    isGlobal: state.cashbox.isGlobal,
    isVirtual: state.cashbox.isVirtual,
    deleted: state.cashbox.deleted,
    permissions: state.cashbox.permissions,
    employees: state.cashbox.employees,
    branch_id: state.data.current_branch.id
  })

  return async dispatch => {
    let response = await fetch(state.data.url_server + '/cashbox', request_config)
    let data = await response.json()

    response = await fetch(state.data.url_server + '/get_cashbox', getRequestConfig())
    data = await response.json()
    if (data.success) {
      dispatch({
        type: 'ADD_DATA',
        field: 'cashboxes',
        data: data.data,
      })
      dispatch({
        type: 'SET_VISIBLE_FLAG',
        field: 'statusCashboxEditor',
        value: false
      })
      dispatch({
        type: 'RESET_CASHBOX'
      })
    } else {
      console.log(data.massage, response.status)
      if (response.status === 401 || response.status === 422) {
        sessionStorage.clear()
        dispatch({
          type: 'LOGUOT'
        })
      }
    }
  }
}


export function addCashboxes() {

  const state = store.getState()

  return async dispatch => {
    const response = await fetch(state.data.url_server + '/get_cashbox', getRequestConfig({}))
    const data = await response.json()
    if (data.success) {
      dispatch({
        type: 'ADD_DATA',
        field: 'cashboxes',
        data: data.data,
      })
      dispatch({
        type: 'CHANGE_CASHBOX_FORM',
        field: 'current_cashbox',
        value: data.data.filter(cashbox => 
          !cashbox.deleted && 
          cashbox.employees[state.data.user.id].available &&
          (cashbox.branch_id === (state.data.current_branch ? state.data.current_branch.id : false ) || cashbox.isGlobal)
        )[0]
      })
    } else {
      console.log(data.massage, response.status)
      if (response.status === 401 || response.status === 422) {
        sessionStorage.clear()
        dispatch({
          type: 'LOGUOT'
        })
      }
    }
  }
}

export function seveEditCashbox() {

  const state = store.getState()

  let request_config = getRequestConfig({
    id: state.cashbox.edit,
    title: state.cashbox.title,
    balance: state.cashbox.balance,
    type: state.cashbox.type,
    isGlobal: state.cashbox.isGlobal,
    isVirtual: state.cashbox.isVirtual,
    deleted: state.cashbox.deleted,
    permissions: state.cashbox.permissions,
    employees: state.cashbox.employees,
    branch_id: state.data.current_branch.id
  })

  return async dispatch => {
    request_config.method = 'PUT'
    let response = await fetch(state.data.url_server + '/cashbox', request_config)
    let data = await response.json()

    response = await fetch(state.data.url_server + '/get_cashbox', getRequestConfig())
    data = await response.json()
    if (data.success) {
      dispatch({
        type: 'ADD_DATA',
        field: 'cashboxes',
        data: data.data,
      })
      dispatch({
        type: 'SET_VISIBLE_FLAG',
        field: 'statusCashboxEditor',
        value: false
      })
      dispatch({
        type: 'RESET_CASHBOX'
      })
    } else {
      console.log(data.massage, response.status)
      if (response.status === 401 || response.status === 422) {
        sessionStorage.clear()
        dispatch({
          type: 'LOGUOT'
        })
      }
    }
  }
}


export function deleteCashbox(flag) {

  const state = store.getState()

  let request_config = getRequestConfig({
    id: state.cashbox.edit,
    deleted: flag
  })

  return async dispatch => {
    request_config.method = 'PUT'
    let response = await fetch(state.data.url_server + '/cashbox', request_config)
    let data = await response.json()

    response = await fetch(state.data.url_server + '/get_cashbox', getRequestConfig())
    data = await response.json()
    if (data.success) {
      dispatch({
        type: 'ADD_DATA',
        field: 'cashboxes',
        data: data.data,
      })
      dispatch({
        type: 'SET_VISIBLE_FLAG',
        field: 'statusCashboxEditor',
        value: false
      })
      dispatch({
        type: 'RESET_CASHBOX'
      })
    } else {
      console.log(data.massage, response.status)
      if (response.status === 401 || response.status === 422) {
        sessionStorage.clear()
        dispatch({
          type: 'LOGUOT'
        })
      }
    }
  }
}


export function createPayment() {

  const state = store.getState()

  const now = Math.round(Date.now() / 1000)
  const cashbox1 = state.data.cashboxes.find(cashbox => cashbox.id === state.payment.cashbox_id).title
  const cashbox2 = state.payment.target_cashbox_id ? state.data.cashboxes.find(cashbox => cashbox.id === state.payment.target_cashbox_id).title : ''

  const disc = `Перемещение денег из кассы "${cashbox1}" в кассу "${cashbox2}".`

  const request_config = getRequestConfig({
    cashflow_category: state.payment.direction ? state.data.item_payments.find(item => item.id === state.payment.cashflow_category).title : null,
    description: state.payment.direction ? state.payment.description : disc + state.payment.description,
    deposit: state.data.cashboxes.find(cashbox => cashbox.id === state.payment.cashbox_id).balance + state.payment.income - state.payment.outcome,
    income: state.payment.income,
    outcome: -state.payment.outcome,
    direction: state.payment.direction,
    deleted: false,
    can_print_fiscal: state.payment.can_print_fiscal,
    is_fiscal: state.payment.is_fiscal,
    created_at: now,
    custom_created_at: state.payment.custom_created_at ? state.payment.custom_created_at : now,
    tags: state.payment.tags,
    cashbox_id: state.payment.cashbox_id ? state.payment.cashbox_id : null,
    client_id: state.payment.client_id ? state.payment.client_id : null,
    employee_id: state.payment.employee_id,
    order_id: state.payment.order_id ? state.payment.order_id : null,
    target_cashbox_id: state.payment.direction ? null : state.payment.target_cashbox_id
  })
  
  const request_config_2 = getRequestConfig({
    custom_created_at: [state.payment.filter_created_at[0], state.payment.filter_created_at[1] + 86399],
    cashbox_id: state.cashbox.current_cashbox.id,
    tags: state.payment.filter_tags.length ? state.payment.filter_tags : null
  })

  return async dispatch => {
    let response = await fetch(state.data.url_server + '/payments', request_config)
    let data = await response.json()

    response = await fetch(state.data.url_server + '/get_payments', request_config_2)
    data = await response.json()
    if (data.success) {
      dispatch({
        type: 'ADD_DATA',
        field: 'payments',
        data: data.data,
      })
      dispatch({
        type: 'SET_VISIBLE_FLAG',
        field: 'statusPaymentsEditor',
        value: false
      })
      dispatch({
        type: 'RESET_PAYMENTS'
      })
    } else {
      console.log(data.massage, response.status)
      sessionStorage.clear()
      if (response.status === 401 || response.status === 422) {
        sessionStorage.clear()
        dispatch({
          type: 'LOGUOT'
        })
      }
    }
    response = await fetch(state.data.url_server + '/get_cashbox', getRequestConfig())
    data = await response.json()
    if (data.success) {
      dispatch({
        type: 'ADD_DATA',
        field: 'cashboxes',
        data: data.data,
      })
    } else {
      console.log(data.massage, response.status)
      if (response.status === 401 || response.status === 422) {
        sessionStorage.clear()
        dispatch({
          type: 'LOGUOT'
        })
      }
    }
  }
}

export function addPayments() {

  const state = store.getState()

  const request_config = getRequestConfig({
    custom_created_at: [state.payment.filter_created_at[0], state.payment.filter_created_at[1] + 86399],
    cashbox_id: state.cashbox.current_cashbox.id,
    tags: state.payment.filter_tags.length ? state.payment.filter_tags : null
  })

  return async dispatch => {
    const response = await fetch(state.data.url_server + '/get_payments', request_config)
    const data = await response.json()
    if (data.success) {
      dispatch({
        type: 'ADD_DATA',
        field: 'payments',
        data: data.data,
      })
    } else {
      console.log(data.massage, response.status)
      if (response.status === 401 || response.status === 422) {
        sessionStorage.clear()
        dispatch({
          type: 'LOGUOT'
        })
      }
    }
  }
}


export function deletePayment(flag) {

  const state = store.getState()

  let request_config = getRequestConfig({
    id: state.payment.edit,
    relation_id: state.payment.relation_id ? state.payment.relation_id : null,
    deleted: flag
  })

  const request_config2 = getRequestConfig({
    custom_created_at: [state.payment.filter_created_at[0], state.payment.filter_created_at[1] + 86399],
    cashbox_id: state.cashbox.current_cashbox.id,
    tags: state.payment.filter_tags.length ? state.payment.filter_tags : null
  })

  return async dispatch => {
    request_config.method = 'PUT'
    let response = await fetch(state.data.url_server + '/payments', request_config)
    let data = await response.json()

    response = await fetch(state.data.url_server + '/get_payments', request_config2)
    data = await response.json()
    if (data.success) {
      dispatch({
        type: 'ADD_DATA',
        field: 'payments',
        data: data.data,
      })
      dispatch({
        type: 'SET_VISIBLE_FLAG',
        field: 'statusPaymentsCard',
        value: false
      })
      dispatch({
        type: 'RESET_PAYMENTS'
      })

      response = await fetch(state.data.url_server + '/get_cashbox', getRequestConfig())
      data = await response.json()
      if (data.success) {
        dispatch({
          type: 'ADD_DATA',
          field: 'cashboxes',
          data: data.data,
        })
      }
    } else {
      console.log(data.massage, response.status)
      if (response.status === 401 || response.status === 422) {
        sessionStorage.clear()
        dispatch({
          type: 'LOGUOT'
        })
      }
    }
  }
}