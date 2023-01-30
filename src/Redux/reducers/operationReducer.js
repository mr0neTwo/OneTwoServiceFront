const initialState = {

   edit: 0,

   amount: 1,
   cost: 0,
   discount_value: 0,
   engineer: {},
   price: 0,
   total: 0,
   title: '',
   comment: '',
   percent: true,
   discount: 0,
   warranty: false,
   warranty_period: 0,
   created_at: 0,
   order_id: 0,
   dict_id: 0,

   warranty_value: 30*24*60*60

}
 
export const operationReducer = (state = initialState, action) => {
   switch (action.type){

      case 'CHANGE_OPERATION_STATE': {
         // const session_save = ['table_headers']
         // Object.keys(action.data).forEach(field => {
         //    if (session_save.includes(field)) localStorage.setItem(key + field, JSON.stringify(action.data[field]))
         // })
         return {...Object.assign(state, action.data)}
      }
 
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
            engineer: action.operation.engineer,
            price: action.operation.price,
            total: action.operation.total,
            title: action.operation.title,
            comment: action.operation.comment,
            percent: action.operation.percent,
            discount: action.operation.discount || 0,
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
            // engineer_id: 0,
            price: 0,
            total: 0,
            title: '',
            comment: '',
            percent: true,
            discount: 0,
            warranty: false,
            warranty_period: 0,
            created_at: 0,
            order_id: 0,
            dict_id: 0 
         }
      }

      case 'SELECTED_OPERATION': {
         // Обявим переменную для изменных данных
         let new_data
         // Проверим если значения value в списке уже существующих
         if (action.value.every(val => state[action.field].includes(val))) {
            // Если есть удалим эти значения
            new_data = state[action.field].filter(val => !action.value.includes(val))
         } else {
            // Если нет добавим эти значения
            new_data = state[action.field].concat(action.value.filter(val => !state[action.field].includes(val)))
         }
         // Если флаг saveToApp установлен сохраним данные на локальном хранилище
         if (action.saveToApp) localStorage.setItem(action.field, JSON.stringify(new_data))
         // Вернем изменненый стейт
         return {
            ...state,
            [action.field]: new_data,
         }
      }
 
       
      default: return state
   }
    
}