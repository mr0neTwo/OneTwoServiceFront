const now = new Date()
const key = 'payroll_'

const initialState = {

   payrolls: [],

   edit: 0,                   // id при редактировании

   description: '',              // Описание
   income: 0,                    // Входящяя сумма
   outcome: 0,                   // Иcходящая сумму
   direction: 0,                 // Направление платежа
   deleted: false,               // Платеж удален
   reimburse: false,             // Совершен возврат
   created_at: null,             // Дата создания
   custom_created_at: null,      // Дата установленая пользователем
   relation_type: 0,             // Тип начисления
   relation_id: 0,               // id связанного события
   employee: {},                 // Сотрудник
   order_id: null,               // Заказ

   setted_employee: {},  // Выбранный сотрудник
   showDeleted: false,           // Показать удаленные

   filter_created_at: [
      parseInt(now.setHours(0, 0, 0, 0) / 1000),
      parseInt(now.setHours(23, 59, 59, 999) / 1000)
   ],
   payment_cashbox_type: 0,      // Тип платежа (для создания платежа при выплате ЗП)
   payment_cashbox: {},          // кассa (для создания платежа при выплате ЗП)
   payment_cashflow_category: {},// категория расходов (для создания платежа при выплате ЗП)

   month_balance: 0
}
 
export const payrollReducer = (state = initialState, action) => {
   switch (action.type){

      case 'CHANGE_PAYROLL_STATE': {
         const local_save = ['']
         Object.keys(action.data).forEach(field => {
            if (local_save.includes(field)) localStorage.setItem(key + field, JSON.stringify(action.data[field]))
         })
         return {...Object.assign(state, action.data)}
      }
 
      case 'EDIT_PAYROLL': {
         return {
            ...state, 
            edit: action.payroll.id,        
            description: action.payroll.description,  
            income: action.payroll.income,  
            outcome: action.payroll.outcome,  
            direction: action.payroll.direction,  
            deleted: action.payroll.deleted,  
            reimburse: action.payroll.reimburse,  
            created_at: action.payroll.created_at,  
            custom_created_at: action.payroll.custom_created_at, 
            relation_type: action.payroll.relation_type, 
            relation_id: action.payroll.relation_id,  
            employee: action.payroll.employee,
            order_id: action.payroll.order_id
         }
      }
 
      case 'RESET_PAYROLL': {
         return {
            ...state, 
            edit: 0,                
            description: '',       
            income: 0,             
            outcome: 0,           
            direction: 0,           
            deleted: false,         
            reimburse: false,      
            created_at: null,          
            custom_created_at: null,
            relation_type: 0,       
            relation_id: 0,         
            employee: {},
            order_id: null,

            payment_cashbox_type: 0,
            payment_cashbox_id: {},
            payment_cashflow_category: {}
         }
      }

      case 'SELECTED_PAYROLL': {
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