
const initialState = {

   edit: 0,
   group_edit: 0,

   group_title: '',
   group_deleted: false,
   
   title: '',
   price: 0,
   cost: 0,
   warranty: 0,
   warranty_value: 30*24*60*60,
   code: '',
   earnings_percent: 0,
   earnings_summ: 0,
   deleted: false,
   category_id: 0,

   seted_categiry: null,

   fields: [
      {
         id: 1,
         title: 'Наименование',
         field: 'title'
      },{
         id: 2,
         title: 'Гаранития',
         field: 'werranty'
      },{
         id: 3,
         title: 'Себестоимость',
         field: 'cost'
      },{
         id: 4,
         title: 'Цена',
         field: 'price'
      },{
         id: 5,
         title: 'Код',
         field: 'code'
      },
   ],
   // По умалчанию сделаем поле 1 и 4 (наименование и цена) видимыми + десять типов цен, которые возможно будут
   chosed_fields: Array(10).fill().map((e, i) => i + 6).concat([1, 4])
}
 
export const dictServiceReducer = (state = initialState, action) => {
   switch (action.type){
 
      case 'CHANGE_DICT_SERVICE_FORM': {
         return {
            ...state, 
            [action.field]: action.value
         }
      }
 
      case 'EDIT_GRUOP_DICT_SERVICE': {
         return {
            ...state, 
            group_edit: action.group.id,
            group_title: action.group.title,
            group_deleted: action.group.deleted,
         }
      }

      case 'EDIT_SERVICE': {
         return {
            ...state, 
            edit: action.service.id,
            title: action.service.title,
            price: action.service.price,
            cost: action.service.cost,
            warranty: action.service.warranty,
            code: action.service.code,
            earnings_percent: action.service.earnings_percent,
            earnings_summ: action.service.earnings_summ,
            deleted: action.service.deleted,
            category_id: action.service.category_id
         }
      }
 
      case 'RESET_GROPE_DICT_SERVICE': {
         return {
            ...state, 
            group_edit: 0,

            group_title: '',
            group_deleted: false
         }
      }

      case 'RESET_SERVICE': {
         return {
            ...state, 
            edit: 0,

            title: '',
            price: 0,
            cost: 0,
            warranty: 0,
            warranty_value: 30*24*60*60,
            code: '',
            earnings_percent: 0,
            earnings_summ: 0,
            deleted: false,
            category_id: 0,
         }
      }

      case 'SELECTED_SERVICE': {
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