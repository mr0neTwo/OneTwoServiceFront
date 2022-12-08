import { combineReducers } from 'redux'

import { dataReducer } from './reducers/dataReducer'
import { visualReducer } from './reducers/visualReducer'
import { filterReducer } from './reducers/filterReduser'
import { roleReducer } from './reducers/roleReducer'
import { employeeReduscer } from './reducers/employeeReducer'
import { orderReducer } from './reducers/orderReducer'
import { clientReducer } from './reducers/clientReducer'
import { maindataReducer } from './reducers/maindataReducer'
import { branchReducer } from './reducers/branchReducer'
import { bookReducer } from './reducers/bookReducer'
import { cashboxReducer } from './reducers/cashboxReducer'
import { paymentReducer } from './reducers/paymentReducer'
import { salaryRuleReducer } from './reducers/salaryRuleReducer'
import { priceReducer } from './reducers/priceReducer'
import { dictServiceReducer } from './reducers/dictServiceReducer'
import { operationReducer } from './reducers/operationReducer'
import { payrollReducer } from './reducers/payrollReducer'
import {warehouseReducer} from "./reducers/warehouseReducer";
import {partReducer} from './reducers/partReducer';
import {orderPartReducer} from './reducers/orderPartReducer'
import {notTemplateReducer} from './reducers/notTemplateReducer'
import {notEventReducer} from './reducers/notEventReducer'
import {registrationReducer} from './reducers/registrationReducer'
import {remainReducer} from './reducers/remainReducer'
import {writeOfReducer} from './reducers/writeOfReducer'
import {warehouseMovementReducer} from './reducers/warehouseMovementReduсer'
import {warehouseBackReducer} from './reducers/warehouseBackReducer'
import {inventoryReducer} from './reducers/inventoryReducer'



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
   payment: paymentReducer,
   salaryRule: salaryRuleReducer,
   price: priceReducer,
   dictService: dictServiceReducer,
   operation: operationReducer,
   payroll: payrollReducer,
   warehouse: warehouseReducer,
   part: partReducer,
   orderPart: orderPartReducer,
   notTemplate: notTemplateReducer,
   notEvent: notEventReducer,
   registration: registrationReducer,
   remain: remainReducer,
   writeof: writeOfReducer,
   movement: warehouseMovementReducer,
   back: warehouseBackReducer,
   inventory: inventoryReducer
})
