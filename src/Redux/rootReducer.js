import { combineReducers } from 'redux'
import { dataReducer } from './dataReducer'
import { visualReducer } from './visualReducer'
import { filterReducer } from './filterReduser'
import { roleReducer } from './roleReducer'
import { employeeReduscer } from './employeeReducer'
import { orderReducer } from './orderReducer'
import { clientReducer } from './clientReducer'
import { maindataReducer } from './maindataReducer'
import { branchReducer } from './branchReducer'
import { bookReducer } from './bookReducer'
import { cashboxReducer } from './cashboxReducer'
import { paymentReducer } from './paymentReducer'



export const rootReducer = combineReducers({
   data: dataReducer,
   view: visualReducer,
   filter: filterReducer,
   role: roleReducer,
   employee: employeeReduscer,
   order: orderReducer,
   client: clientReducer,
   maindata: maindataReducer,
   branch: branchReducer,
   book: bookReducer,
   cashbox: cashboxReducer,
   payment: paymentReducer
})
