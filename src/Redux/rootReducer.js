import { combineReducers } from 'redux'
import { dataReducer } from './dataReducer'
import { visualReducer } from './visualReducer'



export const rootReducer = combineReducers({
   data: dataReducer,
   style: visualReducer
})
