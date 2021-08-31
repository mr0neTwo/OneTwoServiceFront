const initialState = {
   order_type_id: 1
}

export const orderReducer = (state = initialState, action) => {
   switch (action.type){

      case 'SET_ORDER_TYPE': {
         return {
            ...state, 
            order_type_id: action.id,
         }
      }

      
      default: return state
   }
   
}
