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









const dataOrders = orders1.concat(orders2, orders3, orders4, orders5, orders6)



const initialState = {
  

}

export const dataReducer = (state = initialState, action) => {


  switch (action.type) {

    

    // case 'ADD_ORDERS': {
    //   return { ...state, orders: state.orders.concat(action.ordersArray) }
    // }

    

    default:
      return state
  }
}
