const initialState = {

   edit: 0,
   ability1: 0,
   ability2: 0
}
 
export const templeReducer = (state = initialState, action) => {
   switch (action.type){
 
      case 'CHANGE_TEMPLE_FORM': {
         return {
            ...state, 
            [action.field]: action.value
         }
      }
 
      case 'EDIT_TEMPLE_SERVICE': {
         return {
            ...state, 
            ability1: action.temple.ability1,
            ability2: action.temple.ability2,
         }
      }
 
      case 'RESET_TEMPLE_SERVICE': {
         return {
            ...state, 
            edit: 0,
            ability1: 0,
            ability2: 0
         }
      }

      case 'SELECTED_TEMPLE': {
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
 
       
      default: return state
   }
    
}