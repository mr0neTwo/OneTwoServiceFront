import {Table} from '../../data/tableHeaders'
import {includesObject} from '../../components/general/utils'

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


   chosed_fields: JSON.parse(localStorage.getItem('chosed_fields')) || Table.Fields.Service
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
         if (action.value.every(val => includesObject(val, state[action.field]))) {
            // Если есть удалим эти значения
            new_data = state[action.field].filter(val => !includesObject(val, action.value))
         } else {
            // Если нет добавим эти значения
            new_data = state[action.field].concat(action.value.filter(val => !includesObject(val, state[action.field])))
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