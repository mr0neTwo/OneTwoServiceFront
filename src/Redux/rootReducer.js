import { combineReducers } from 'redux'
import { dataReducer } from './dataReducer'
import { visualReducer } from './visualReducer'
import { filterReducer } from './filterReduser'
import { roleReducer } from './roleReducer'
import { employeeReduscer } from './employeeReducer'
import { orderReducer } from './orderReducer'



export const rootReducer = combineReducers({
   data: dataReducer,
   view: visualReducer,
   filter: filterReducer,
   role: roleReducer,
   employee: employeeReduscer,
   order: orderReducer
})
