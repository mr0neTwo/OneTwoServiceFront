import {permission_cahsbox} from "../../data/permissions";

const key = 'cashbox_'

const initialState = {

   cashboxes: [],

   tabs: JSON.parse(localStorage.getItem(key + 'tabs')) || 0,
   edit: 0,
   tabs_editor: 0,

   title: '',
   balance: 0,
   type: 0,
   isGlobal: false,
   isVirtual: false,
   deleted: false,
   permissions: permission_cahsbox,
   employees: {},
   branch_id: 0,

   showDeleted: false,

   permissions_employee: 0, // id сотрудника, права которого редактируются в данный момент
   current_cashbox: {} // активная касса
}

export const cashboxReducer = (state = initialState, action) => {
   switch (action.type){

      case 'CHANGE_CASHBOX_FORM': {
         return {
            ...state, 
            [action.field]: action.value,
         }
      }

      case 'CHANGE_CASHBOX_STATE': {
         const local_save = ['tabs']
         Object.keys(action.data).forEach(field => {
            if (local_save.includes(field)) localStorage.setItem(key + field, JSON.stringify(action.data[field]))
         })
         return {...Object.assign(state, action.data)}
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
            permissions: permission_cahsbox,
            employees: [],
            branch_id: 0,
            permissions_employee: 0 // id сотрудника, права которого редактируются в данный момент
         }
      }

      
      case 'CHANGE_CASHBOX_PERMISSION': {

         // Вытаскиваем данные о разрешениях сотрудников из state
         let employees = state.employees
         // Данные имеют следующий json формат
         // const employees = {
         //    employee_id1: {
         //       available: true, // разрешен ли вообще доступ к кассе этого стортудника
         //       like_cashbox: true, // разрения которые есть у самой кассы ( if available is true )
         //       permissions: [permission_cahsbox] // список специальных разершений ( if available is true and like_cashbox is false )
         //    },
         //    emoloyee_id2: {...}
         // }
         // Если запись данных идет в поле permissions (список персональных разрешений)
         if (action.field === 'permissions') {
            // Если заначение value уже пресутствует в списке специальных разрешений текущего сотрудника (permissions_employee)
            if (employees[state.permissions_employee].permissions.includes(action.value)) {
               // Удаляем значение value из списка специальных разрешений текущего сотрудника
               employees[state.permissions_employee].permissions = employees[state.permissions_employee].permissions.filter(val => val !== action.value)
            // Если значение value отсутсвует в списке персональных разрешений текущего сотрудника
            } else {
               // Добавляем значение value в список персональных разрешений текущего сотрудника
               employees[state.permissions_employee].permissions = employees[state.permissions_employee].permissions.concat([action.value])
            }
         // Если запись идет не в поле permissions текущего сотрудника
         } else {
            // Меняем значение этого поля на значение в value
            employees[state.permissions_employee][[action.field]] = action.value
         }
         // Возвращаем изменненый state
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
