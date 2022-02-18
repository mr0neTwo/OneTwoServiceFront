
const initialState = {
   tabs: 0,

   equipment_type: {},
   equipment_brand: {},
   equipment_subtype: {},
   equipment_model: {},

   title: '',
   icon: '',
   url: '',
   parent_id: 0,
   branches: [],
   deleted: false,
   img: '',

   direction: 0,

   
   type: 0,
   edit: 0,
   choose_list: [],
   
   page_malfunction: 0,
   selected_malfunction: [],
   page_packagelist: 0,
   selected_packagelist: [],
   page_item_payments: 0,
   selected_item_payments: [],

   filter_type: '',
   filter_brand: '',
   filter_subtype: '',
   filter_model: '',

   page_type: 1,
   page_brand: 1,
   page_subtype: 1,
   page_model: 1,

   list_for_join: []
}

export const bookReducer = (state = initialState, action) => {
   switch (action.type){

      case 'CHANGE_BOOK_FORM': {
         return {
            ...state, 
            [action.field]: action.value,
         }
      }


      case 'CHOOSE_EQUIPMENT_BRANCHES': {
         if (action.id.every(id => state.branches.includes(id))) {
            return {
               ...state, 
               branches: state.branches.filter(id => !action.id.includes(id)),
            }
         } else {
            return {
               ...state, 
               branches: state.branches.concat(action.id.filter(id => !state.branches.includes(id))),
            }
         }
      }

      
      case 'EDIT_EQUIPMENT': {
         return {
            ...state, 
            title: action.equipment.title,
            icon: action.equipment.icon,
            url: action.equipment.url,
            parent_id: action.equipment.parent_id,
            branches: action.equipment.branches ? action.equipment.branches : [],
            edit: action.equipment.id,
            deleted: action.equipment.deleted
         }
      }

      case 'RESET_BOOK_EQUIPMENT': {
         return {
            ...state, 
            title: '',
            icon: '',
            url: '',
            parent_id: 0,
            branches: [],
            deleted: false,
            img: '',
            edit: 0,
            page_malfunction: 0,
            selected_malfunction: [],
            page_packagelist: 0,
            selected_packagelist: [],
            page_item_payments: 0,
            selected_item_payments: [],
            list_for_join: []
         }
      }

      case 'CHOOSE_BOOK_SELECTED': {
         if (action.value.every(value => state[action.field].includes(value))) {
            return {
               ...state, 
               [action.field]: state[action.field].filter(value => !action.value.includes(value)),
            }
         } else {
            return {
               ...state, 
               [action.field]: state[action.field].concat(action.value.filter(value => !state[action.field].includes(value))),
            }
         }
      }

      
      
      default: return state
   }
   
}
