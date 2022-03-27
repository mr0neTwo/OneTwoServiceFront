const now = new Date()

const initialState = {

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
   employee_id: 0,               // Сотрудник
   order_id: null,               // Заказ

   setted_employee: 0,           // Выбранный сотрудник

   filter_created_at: [
      parseInt(now.setHours(0, 0, 0, 0) / 1000),
      parseInt(now.setHours(23, 59, 59, 999) / 1000)
   ],

   month_balance: 0
}
 
export const payrollReducer = (state = initialState, action) => {
   switch (action.type){
 
      case 'CHANGE_PAYROLL_FORM': {
         return {
            ...state, 
            [action.field]: action.value
         }
      }

      case 'CHANGE_PAYROLL_STATE': {
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
            employee_id: action.payroll.employee_id,
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
            employee_id: 0,         
            order_id: null            
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