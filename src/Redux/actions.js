export function addOrders(ordersArray) {
  return {
    type: 'ADD_ORDERS',
    ordersArray,
  }
}

export function addEmployees(employeesArray) {
  return {
    type: 'ADD_EMPLOYEES',
    employeesArray,
  }
}

export function addMainFilters(mainFiltersArray) {
  return {
    type: 'ADD_MAIN_FILTERS',
    mainFiltersArray,
  }
}

export function addSidebarRows(sidebarRowsArray) {
  return {
    type: 'ADD_SIDEBAR_ROWS',
    sidebarRowsArray,
  }
}

export function addStatus(statusArray) {
  return {
    type: 'ADD_STATUS',
    statusArray,
  }
}

export function changeOderStatus(orderId, statusId) {
  return {
    type: 'CHANGE_STATUS',
    orderId,
    statusId,
  }
}

export function addOrdersFiltered(ordersFilteredArray) {
  return {
    type: 'ADD_ORDERS_FILTERED',
    ordersFilteredArray,
  }
}

export function changeOderShow() {
  return {
    type: 'CHANGE_ORDERS_SHOW'
  }
}

export function ordersSort(sortField) {
   return {
     type: 'ORDERS_SORTERED',
     sortField
   }
 }

 export function changePageOrderTable(page) {
   return {
     type: 'CHANGE_PAGE_ORDER_TABLE',
     page
   }
 }

 export function creatMenuStatusVisible() {
   return {
     type: 'MENU_STATUS_VISIBLE'
   }
 }

 export function changeMenuStatusVisible(id) {
   return {
     type: 'CHANGE_MENU_STATUS_VISIBLE',
     id
   }
 }

 export function addTableHeaders(tableHeaders) {
   return {
     type: 'ADD_TABLE_ORDERS_HEADERS',
     tableHeaders
   }
 }

 export function addOrderSearch(search) {
   return {
     type: 'ADD_ORDER_SEARCH',
     search
   }
 }

 export function filterToSearch() {
   return {
     type: 'FILTERED_ORDERS_TO_SEARCH',
   }
 }

 export function resizeOrderHeader(field, width) {
   return {
     type: 'RESIZE_ORDER_HEADER',
     field,
     width
   }
 }

 export function changeCurrentInput(id, value) {
  return {
    type: 'CHANGE_CURRENT_INPUT',
    id,
    value
  }
}