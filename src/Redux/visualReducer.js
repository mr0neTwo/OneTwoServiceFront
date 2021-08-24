const initialState = {
   statusMenuVisible : {},
   statusSetCustomFilter: false,
   stausListFilter: false,
   typeListFilter: false,
   managerListFilter: false,
   engineerListFilter: false,
   groupListFilter: false,
   brandListFilter: false,
   subtypeListFilter: false,
   clientListFilter: false,
   statusCreateNewFilter: false
}

export const visualReducer = (state = initialState, action) => {
   switch (action.type){

      case 'INIT_STATUS_MENU_VISIBLE': {
         return {
            ...state, 
            statusMenuVisible: action.data,
         }
      }

      case 'CANGE_STATUS_MENU_VISIBLE': {
      return {
         ...state, 
         statusMenuVisible: {...state.statusMenuVisible, [action.id_order]: !state.statusMenuVisible[action.id_order]},
         }
      }
      
      case 'CHANGE_STATUS_SET_STATUS_FILTER': {
         return {
            ...state, 
            statusSetCustomFilter: !state.statusSetCustomFilter,
         }
      }

      case 'CHANGE_STATUS_LIST_FILTER': {
         return {
            ...state, 
            stausListFilter: !state.stausListFilter,
         }
      }
      
      case 'CHANGE_TYPE_LIST_FILTER': {
         return {
            ...state, 
            typeListFilter: !state.typeListFilter,
         }
      }

      case 'CHANGE_MANAGER_LIST_FILTER': {
         return {
            ...state, 
            managerListFilter: !state.managerListFilter,
         }
      }

      case 'CHANGE_ENGINEER_LIST_FILTER': {
         return {
            ...state, 
            engineerListFilter: !state.engineerListFilter,
         }
      }

      case 'CHANGE_GROUP_LIST_FILTER': {
         return {
            ...state, 
            groupListFilter: !state.groupListFilter,
         }
      }

      case 'CHANGE_BRAND_LIST_FILTER': {
         return {
            ...state, 
            brandListFilter: !state.brandListFilter,
         }
      }

      case 'CHANGE_SUBTYPE_LIST_FILTER': {
         return {
            ...state, 
            subtypeListFilter: !state.subtypeListFilter,
         }
      }

      case 'CHANGE_CLIENT_LIST_FILTER': {
         return {
            ...state, 
            clientListFilter: !state.clientListFilter,
         }
      }

      case 'CHANGE_STATUS_CREATE_NEW_FILTER': {
         return {
            ...state, 
            statusCreateNewFilter: !state.statusCreateNewFilter,
         }
      }

      
      default: return state
   }
   
}
