const initialState = {
   estimated_done_at: 0,

   order_type_id: 1,
   client: {},
   ad_campaign_id: 1,
   manager_id: 0,
   engineer_id: 0,

   equipments: [{
      kindof_good: {},
      brand: {},
      subtype: {},
      model: {},
      malfunction: '',
      packagelist: '',
      appearance: '',
      urgent: false
   }],
   manager_notes: '',
   estimated_cost: '',

}

export const orderReducer = (state = initialState, action) => {
   switch (action.type){

      case 'SET_ORDER_TYPE': {
         return {
            ...state, 
            order_type_id: action.id,
         }
      }

      case 'SET_CLIENT_ID': {
         return {
            ...state, 
            client: action.id,
         }
      }
      
      case 'RESET_CLIENT': {
         return {
            ...state, 
            client: {},
         }
      }

      
      case 'SET_ORDER_AD_CAMPAING': {
         return {
            ...state, 
            ad_campaign_id: action.id,
         }
      }

      
      case 'RESET_EQUIPMENT': {

         let equipments_list = state.equipments
         equipments_list[action.idx][action.field] = {}

         return {
            ...state, 
            equipments: equipments_list
         }
      }
      
      case 'SET_ORDER_EQUIPMENT': {

         let equipments_list = state.equipments
         equipments_list[action.idx][action.field] = {
            id: action.data.id,
            icon: action.data.icon,
            title: action.data.title,
            url: action.data.url
         }

         return {
            ...state, 
            equipments: equipments_list
         }
      }

      
      case 'CHANGE_ORDER_FORM': {

         let equipments_list = state.equipments
         equipments_list[action.idx][action.field] = action.value

         return {
            ...state, 
            equipments: equipments_list
         }
      }

      
      case 'ADD_ANOTHER_EQUIPMENT': {

        
         return {
            ...state, 
            equipments: state.equipments.concat([{
               kindof_good: {},
               brand: {},
               subtype: {},
               model: {},
               malfunction: '',
               packagelist: '',
               appearance: '',
               urgent: false
            }])
         }
      }

      
      case 'DELETE_DEVICE': {

         let equipments_list = state.equipments
         equipments_list.splice(action.idx, 1)

         return {
            ...state, 
            equipments: equipments_list
         }
      }

      
      case 'CHANGE_ORDER_FORM_S': {

         return {
            ...state, 
            [action.field]: action.value
         }
      }

      
      default: return state
   }
   
}
