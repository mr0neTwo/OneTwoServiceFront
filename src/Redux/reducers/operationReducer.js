const initialState = {

   edit: 0,

   amount: 1,
   cost: 0,
   discount_value: 0,
   engineer_id: 0,
   price: 0,
   total: 0,
   title: '',
   comment: '',
   warranty: false,
   warranty_period: 0,
   created_at: 0,
   order_id: 0,
   dict_id: 0,

   warranty_value: 30*24*60*60,
   percent: true,
   discount: 0
}
 
export const operationReducer = (state = initialState, action) => {
   switch (action.type){
 
      case 'CHANGE_OPERATION_FORM': {
         return {
            ...state, 
            [action.field]: action.value
         }
      }
 
      case 'EDIT_OPERATION': {
         return {
            ...state, 
            edit: action.operation.id,
            amount: action.operation.amount,
            cost: action.operation.cost,
            discount_value: action.operation.discount_value,
            engineer_id: action.operation.engineer_id,
            price: action.operation.price,
            total: action.operation.total,
            title: action.operation.title,
            comment: action.operation.comment,
            warranty: action.operation.warranty,
            warranty_period: action.operation.warranty_period,
            created_at: action.operation.created_at,
            order_id: action.operation.order_id,
            dict_id: action.operation.dict_id
         }
      }
 
      case 'RESET_OPERATION': {
         return {
            ...state, 
            edit: 0,
            amount: 1,
            cost: 0,
            discount_value: 0,
            engineer_id: 0,
            price: 0,
            total: 0,
            title: '',
            comment: '',
            warranty: false,
            warranty_period: 0,
            created_at: 0,
            order_id: 0,
            dict_id: 0 
         }
      }

      case 'SELECTED_OPERATION': {
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