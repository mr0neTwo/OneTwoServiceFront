const initialState = {
  tabs: 1,
  edit: 0,
  showDeleted: false,

  first_name: '',
  last_name: '',
  email: '',
  notes: '',
  phone: '',
  login: '',
  password: '',
  role_id: 0,
  inn: '',
  doc_name: ''
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
      
      case 'CHANGE_STATUS_EMPLOYEE_EDITOR': {
         return {
            ...state, 
            edit: 0,
            first_name: '',
            last_name: '',
            email: '',
            notes: '',
            phone: '',
            login: '',
            role_id: 0,
            inn: '',
            doc_name: ''
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
            inn: action.employee.inn,
            doc_name: action.employee.doc_name
         }
      }

      
      default: return state
   }
   
}
