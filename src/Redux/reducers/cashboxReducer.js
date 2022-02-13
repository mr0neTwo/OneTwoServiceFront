

const initialState = {
   tabs: 0,
   edit: 0,
   tabs_editor: 0,

   title: '',
   balance: 0,
   type: 0,
   isGlobal: false,
   isVirtual: false,
   deleted: false,
   permissions: ['show_cashbox_remains', 'show_cash_flow', 'incoming', 'incoming_move', 'outcoming', 'outcoming_move'],
   employees: {},
   branch_id: 0,

   permissions_employee: 0,
   current_cashbox: {}
}

export const cashboxReducer = (state = initialState, action) => {
   switch (action.type){

      case 'CHANGE_CASHBOX_FORM': {
         return {
            ...state, 
            [action.field]: action.value,
         }
      }

      case 'CHOOSE_CASHBOX_SELECTED': {
         if (action.id.every(id => state[action.field].includes(id))) {
            return {
               ...state, 
               [action.field]: state[action.field].filter(id => !action.id.includes(id)),
            }
         } else {
            return {
               ...state, 
               [action.field]: state[action.field].concat(action.id.filter(id => !state[action.field].includes(id))),
            }
         }
      }
      
      case 'RESET_CASHBOX': {
         return {
            ...state, 
            title: '',
            balance: 0,
            type: 0,
            isGlobal: false,
            isVirtual: false,
            deleted: false,
            permissions: ['show_cashbox_remains', 'show_cash_flow', 'incoming', 'incoming_move', 'outcoming', 'outcoming_move'],
            employees: [],
            branch_id: 0,
            permissions_employee: 0
         }
      }

      
      case 'CHANGE_CASHBOX_PERMISSION': {

         let employees = state.employees
         if (action.field === 'permissions') {
            if (employees[state.permissions_employee].permissions.includes(action.value)) {
               employees[state.permissions_employee].permissions = employees[state.permissions_employee].permissions.filter(val => val !== action.value)
            } else {
               employees[state.permissions_employee].permissions = employees[state.permissions_employee].permissions.concat([action.value])
            }
         } else {
            employees[state.permissions_employee][[action.field]] = action.value
         } 
         return {
            ...state, 
            employees: employees
         }
         
      }
      
      case 'EDIT_CASHBOX': {
         return {
            ...state, 
            edit: action.cashbox.id,
            title: action.cashbox.title,
            balance: action.cashbox.balance,
            type: action.cashbox.type,
            isGlobal: action.cashbox.isGlobal,
            isVirtual: action.cashbox.isVirtual,
            deleted: action.cashbox.deleted,
            permissions: action.cashbox.permissions,
            employees: action.cashbox.employees,
            branch_id: action.cashbox.branch_id,
            permissions_employee: action.cashbox.permissions_employee
         }
      }

      default: return state
   }
   
}
