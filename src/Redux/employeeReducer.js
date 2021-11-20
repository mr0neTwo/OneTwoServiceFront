const initialState = {
  tabs: 1,
  edit: 0,
  showDeleted: false,
  role_title: '',

  first_name: '',
  last_name: '',
  email: '',
  notes: '',
  phone: '',
  login: '',
  password: '',
  role_id: 0,
  permissions: [],
  inn: '',
  doc_name: '',
  deleted: false
}

export const employeeReduscer = (state = initialState, action) => {
   switch (action.type){

      case 'CHANGE_EMPLOYEE_TAB': {
         return {
            ...state, 
            tabs: action.tab,
         }
      }

      case 'CHANGE_EMPLOYEE_EDITOR_FORM': {
         return {
            ...state, 
            [action.field]: action.value
         }
      }
      
      case 'CHOOSE_EMPLOYEE_SELECTED': {
         if (action.value.every(val => state[action.field].includes(val))) {
            return {
               ...state, 
               [action.field]: state[action.field].filter(val => !action.value.includes(val)),
            }
         } else {
            return {
               ...state, 
               [action.field]: state[action.field].concat(action.value.filter(val => !state[action.field].includes(val)))
            }
         }
      }

      case 'SET_ROLE_EMPLOYEE_EDITOR': {
         return {
            ...state, 
            role_id: action.role
         }
      }
      
      case 'CHANGE_SHOW_DELETED': {
         return {
            ...state, 
            showDeleted: !state.showDeleted
         }
      }

      
      case 'EDIT_EMPLOYEE': {
         return {
            ...state, 
            edit: action.employee.id,
            first_name: action.employee.first_name,
            last_name: action.employee.last_name,
            email: action.employee.email,
            notes: action.employee.notes,
            phone: action.employee.phone,
            login: action.employee.login,
            role_id: action.employee.role.id,
            role_title: action.employee.role.title,
            permissions: action.employee.permissions,
            inn: action.employee.inn,
            doc_name: action.employee.doc_name,
            deleted: action.employee.deleted
         }
      }

      case 'RESET_EMPLOYEE': {
         return {
            ...state, 
            edit: 0,
            first_name: '',
            last_name: '',
            email: '',
            notes: '',
            phone: '',
            login: '',
            password: '',
            role_title: '',
            role_id: 0,
            permissions: [],
            inn: '',
            doc_name: '',
            deleted: false
         }
      }

      
      default: return state
   }
   
}
