const initialState = {
   title_create: '',
   edit: 0,

   earnings_visibility: false,
   leads_visibility: false,
   orders_visibility:false,

   list_permissions: [],
   visible_statuses: [],
   settable_statuses: [],
   settable_discount_margin: []
}

export const roleReducer = (state = initialState, action) => {
   switch (action.type){

      case 'CHANGE_TITLE_CREATE_ROLE': {
         return {
            ...state, 
            title_create: action.title,
         }
      }

      case 'CHANGE_PERMISSION': {
         if (action.value.every(val => state.list_permissions.includes(val))) {
            return {
               ...state, 
               list_permissions: state.list_permissions.filter(per => !action.value.includes(per)),
            }
         } else {
         return {
            ...state, 
            list_permissions: state.list_permissions.concat(action.value),
         }
      }
   }

   
      case 'CHANGE_EARNINGS_VISIBILITY': {
         return {
            ...state, 
            earnings_visibility: action.bool,
         }
      }
   
      case 'CHANGE_LEADS_VISIBILITY': {
         return {
            ...state, 
            leads_visibility:action.bool,
         }
      }
      
      case 'CHANGE_ORDERS_VISIBILITY': {
         return {
            ...state, 
            orders_visibility: action.bool,
         }
      }

      case 'CHANGE_VISIBLE_STATUSES': {
         if (action.id.every(id => state.visible_statuses.includes(id))) {
            console.log('true')
            return {
               ...state, 
               visible_statuses: state.visible_statuses.filter(id => !action.id.includes(id)),
            }
         } else {
         return {
            ...state, 
            visible_statuses: state.visible_statuses.concat(action.id),
         }
      }
   }

      case 'CHANGE_SETTABLE_STATUSES': {
         if (action.id.every(id => state.settable_statuses.includes(id))) {
            return {
               ...state, 
               settable_statuses: state.settable_statuses.filter(id => !action.id.includes(id)),
            }
         } else {
         return {
            ...state, 
            settable_statuses: state.settable_statuses.concat(action.id),
         }
      }
   }

   case 'CHANGE_SETTABLE_MARGIN': {
      if (action.id.every(id => state.settable_discount_margin.includes(id))) {
         return {
            ...state, 
            settable_discount_margin: state.settable_discount_margin.filter(id => !action.id.includes(id)),
         }
      } else {
      return {
         ...state, 
         settable_discount_margin: state.settable_discount_margin.concat(action.id),
      }
   }
   }

   case 'CHANGE_STATUS_CREATE_NEW_ROLE': {
      return {
         ...state, 
         title_create: '',
         edit: 0,
         earnings_visibility: false,
         leads_visibility: false,
         orders_visibility:false,
         list_permissions: [],
         visible_statuses: [],
         settable_statuses: [],
         settable_discount_margin: []
      }
   }
   
   case 'EDIT_ROLE': {
      return {
         ...state, 
         title_create: action.role.title,
         edit: action.role.id,
         earnings_visibility: action.role.earnings_visibility,
         leads_visibility: action.role.leads_visibility,
         orders_visibility: action.role.orders_visibility,
         list_permissions: action.role.permissions,
         visible_statuses: action.role.visible_statuses,
         settable_statuses: action.role.settable_statuses,
         settable_discount_margin: action.role.settable_discount_margin
      }
   }
      
      default: return state
   }
   
}
