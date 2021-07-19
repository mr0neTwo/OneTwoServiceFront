import _ from 'lodash'

import orders1 from '../data/dataOrders1'
import orders2 from '../data/dataOrders2'
import orders3 from '../data/dataOrders3'
import orders4 from '../data/dataOrders4'
import orders5 from '../data/dataOrders5'
import orders6 from '../data/dataOrders6'
import dataEmpoyees from '../data/dataEmployees'
import dataStatus from '../data/dataStatus'
import dataMainFilters from '../data/dataMainFilters'
import dataMenuRowsExp from '../data/dataSidebarRows'
import { dataTableHeader } from '../data/dataTableHeader'









const dataOrders = orders1.concat(orders2, orders3, orders4, orders5, orders6)



const initialState = {
  
  employees: dataEmpoyees,
  status: dataStatus,
  currentLogin: '',
  currentPassword: '',

  mainFilters: dataMainFilters,
  sidebarRows: dataMenuRowsExp,
  tableOrdersHeaders: dataTableHeader,
  

  orders: dataOrders,
//   orders: orders1,
  ordersFiltered: dataOrders,
  ordersShow: _.chunk(dataOrders, 50)[0],
  
  sortOrderTable: 'asc',
  sortFieldOrderTable: 'id_lable',
  countOrdersInPage: 50,
  currentPageOrderTable: 0,
  pageCountOrderTable: Math.ceil( dataOrders.length / 50 ),

  menuStatusVisible: {},

  orderSearch: ''
}

export const dataReducer = (state = initialState, action) => {

   const ordersShow = () => {
      return (
         _.chunk(state.ordersFiltered, state.countOrdersInPage)[state.currentPageOrderTable]
      )
   }

  switch (action.type) {

    // Подгрузка данных =============================================================

    case 'ADD_ORDERS': {
      return { ...state, orders: state.orders.concat(action.ordersArray) }
    }

    case 'ADD_EMPLOYEES': {
      return {
        ...state,
        employees: state.employees.concat(action.employeesArray),
      }
    }

    case 'ADD_MAIN_FILTERS': {
      return {
        ...state,
        mainFilters: state.mainFilters.concat(action.mainFiltersArray),
      }
    }

    case 'ADD_SIDEBAR_ROWS': {
      return {
        ...state,
        sidebarRows: state.sidebarRows.concat(action.sidebarRowsArray),
      }
    }

    case 'ADD_STATUS': {
      return { ...state, status: state.status.concat(action.statusArray) }
    }

    case 'ADD_TABLE_ORDERS_HEADERS': {
      return { ...state, tableOrdersHeaders: state.tableOrdersHeaders.concat(action.tableHeaders) }
    }

    //  =======================================================================

    case 'CHANGE_STATUS': {
      return {
        ...state,
        orders: state.orders.map((order) => {
          if (order.id === action.orderId) {
            order.status = state.status.find(
              (status) => status.id === action.statusId
            )
            return order
          }
          return order
        }),
      }
    }

    case 'ADD_ORDERS_FILTERED': {
      return {
        ...state,
        ordersFiltered: state.ordersFiltered.concat(state.orders),
      }
    }

    case 'CHANGE_ORDERS_SHOW': {
      return { 
         ...state, 
         pageCountOrderTable: Math.ceil( state.ordersFiltered.length / state.countOrdersInPage ),
         ordersShow: ordersShow() }
    }

    case 'ORDERS_SORTERED': {
       let sorted = _.orderBy(state.ordersFiltered, action.sortField, state.sortOrderTable)
       return {
         ...state, 
         ordersFiltered: sorted,
         sortFieldOrderTable: action.sortField,
         sortOrderTable: state.sortOrderTable === 'asc' ? 'desc' : 'asc',
         pageCountOrderTable: Math.ceil( state.ordersFiltered.length / state.countOrdersInPage ),
         ordersShow: ordersShow(),
         
      }
    }
    case 'CHANGE_PAGE_ORDER_TABLE': {
       return {
          ...state, currentPageOrderTable: action.page,
          ordersShow: ordersShow(),
      }
    }

    case 'MENU_STATUS_VISIBLE': {
      let statusVis = {}
      state.ordersShow.forEach((order) => {
         statusVis[order.id] = false
       })
       return {
          ...state, 
          menuStatusVisible: statusVis}
    }

    case 'CHANGE_MENU_STATUS_VISIBLE': {
       let menuStatusVisibleClone = Object.assign(state.menuStatusVisible)
       menuStatusVisibleClone[action.id] = !state.menuStatusVisible[action.id]
       return {
          ...state, 
          menuStatusVisible: menuStatusVisibleClone }
    }

    case 'ADD_ORDER_SEARCH': {
       return {
          ...state,
          orderSearch: action.search
       }
    }

    case 'FILTERED_ORDERS_TO_SEARCH': {


         if (state.orderSearch) {
            return {
               ...state,
               ordersFiltered: state.orders.filter(order => 
                  (order.brand ? order.brand.toLowerCase().includes(state.orderSearch.toLowerCase()) : false)
                  || (order.client.name ? order.client.name.toLowerCase().includes(state.orderSearch.toLowerCase()) : false)
                  || (order.client.phone ? order.client.phone.toString().toLowerCase().includes(state.orderSearch.toLowerCase()) : false)
                  || (order.custom_fields.f718506 ? order.custom_fields.f718506.toLowerCase().includes(state.orderSearch.toLowerCase()) : false)
                  || (order.custom_fields.f718512 ? order.custom_fields.f718512.toLowerCase().includes(state.orderSearch.toLowerCase()) : false)
                  || (order.custom_fields.f718514 ? order.custom_fields.f718514.toLowerCase().includes(state.orderSearch.toLowerCase()) : false)
                  || (order.id_label ? order.id_label.toLowerCase().includes(state.orderSearch.toLowerCase()) : false)
                  || (order.kindof_good ? order.kindof_good.toLowerCase().includes(state.orderSearch.toLowerCase()) : false)
                  || (order.malfunction ? order.malfunction.toLowerCase().includes(state.orderSearch.toLowerCase()) : false)
                  || (order.model ? order.model.toLowerCase().includes(state.orderSearch.toLowerCase()) : false)
               ),
               currentPageOrderTable: 0
            }
         } else {
            return {
               ...state,
               ordersFiltered: state.orders,
               currentPageOrderTable: 0
            }
         }
    }

    case 'RESIZE_ORDER_HEADER': {

      return {
         ...state,
         tableOrdersHeaders: state.tableOrdersHeaders.map(header => {
            if (header.field === action.field) {
               header.width = action.width
               return header
            }
            return header
         })
      }
   }

   case 'CHANGE_CURRENT_INPUT': {
    return {
       ...state,
       [action.id]: action.value
    }
 }

    default:
      return state
  }
}
