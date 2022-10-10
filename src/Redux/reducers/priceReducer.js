const initialState = {

   service_prices: [],

   edit: 0,

   margin: 0,
   title: '',
   margin_type: 1,
   deleted: false,

   list_type_margin: [
      {
         id: 2,
         title: 'Наценка на товары'
      },{
         id: 1,
         title: 'Скидка на работы'
      }
   ]
}
 
export const priceReducer = (state = initialState, action) => {
   switch (action.type){

      case 'CHANGE_PRICE_STATE': {
         return {...Object.assign(state, action.data)}
      }
 

      case 'EDIT_PRICE': {
         return {
            ...state, 
            edit: action.price.id,

            margin: action.price.margin,
            title: action.price.title,
            margin_type: action.price.margin_type,
            deleted: action.price.deleted,
         }
      }
 
      case 'RESET_PRICE': {
         return {
            ...state, 
            edit: 0,

            margin: 0,
            title: '',
            margin_type: 0,
            deleted: false
         }
      }
 
       
      default: return state
   }
    
}
 