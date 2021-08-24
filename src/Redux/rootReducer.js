import { combineReducers } from 'redux'
import { dataReducer } from './dataReducer'
import { visualReducer } from './visualReducer'
import { filterReducer } from './filterReduser'



export const rootReducer = combineReducers({
   data: dataReducer,
   view: visualReducer,
   filter: filterReducer
})
