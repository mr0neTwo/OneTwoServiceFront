const initialState = {

   edit: 0,          // id при редактировании

   title: '',        // Описание
   type_rule: 4,     // Тип начисления
   order_type: 1,    // Тип заказа
   method: 0,        // Начисления (0 - проценты, 1 - руб)
   coefficient: 1,   // Коэффициет при начаслении за работы или запчасти
   count_coeff: [{   // Условия начисления
      cost: 0,
      coef: 0
   }],
   fix_salary: 0,    // Оклад
   deleted: false,   // Удален
   employee_id: 0,   // Сотрудник
   check_status: 0,  // 4 - по статусе Готов, 6 - по статусу Закрыт

   // Список правил
   list_type_rule: [
      {
         id: 1,
         title: 'За создание заказа'
      },{
         id: 2,
         title: 'За закрытие заказа'
      },{
         id: 3,
         title: 'Менеджеру за обработку заказа'
      },{
         id: 4,
         title: 'Исполнителю за работы/услуги'
      },{
         id: 5,
         title: 'Исполнителю за материалы'
      },{
         id: 6,
         title: 'За продажи'
      },{
         id: 7,
         title: 'За рабочие дни'
      },{
         id: 8,
         title: 'За рабочие месяцы'
      }
   ],
   // Список статусов с id
   statuses: [
      {
         id: 4,
         title: 'Готов'
      },{
         id: 6,
         title: 'Закрыт'
      }
   ]
}
 
export const salaryRuleReducer = (state = initialState, action) => {
   switch (action.type){
 

 
      case 'CHANGE_SALARY_FORM': {
         return {
            ...state, 
            [action.field]: action.value
         }
      }
       
      //  case 'CHOOSE_EMPLOYEE_SELECTED': {
      //     if (action.value.every(val => state[action.field].includes(val))) {
      //        return {
      //           ...state, 
      //           [action.field]: state[action.field].filter(val => !action.value.includes(val)),
      //        }
      //     } else {
      //        return {
      //           ...state, 
      //           [action.field]: state[action.field].concat(action.value.filter(val => !state[action.field].includes(val)))
      //        }
      //     }
      //  }

      case 'CHANGE_SALARY_COEF_FORM': {

         let list_count_coeff = state.count_coeff
         list_count_coeff[action.idx][action.field] = parseInt(action.value)

         return {
            ...state, 
            count_coeff: list_count_coeff
         }
      }

      
      case 'ADD_SALARY_COUNT_COEF': {

         return {
            ...state, 
            count_coeff: state.count_coeff.concat([{
               cost: 0,
               coef: 0
            }])
         }
      }

      case 'DELETE_SALARY_COUNT_COEF': {

         return {
            ...state, 
            count_coeff: state.count_coeff.filter((coef, idx) => idx !== action.idx)
         }
      }
 

      case 'EDIT_SALARY': {
         return {
            ...state, 
            edit: action.salary_rule.id,

            description: action.salary_rule.description,
            type_rule: action.salary_rule.type_rule,
            order_type: action.salary_rule.order_type,
            method: action.salary_rule.method,
            coefficient: action.salary_rule.coefficient,
            count_coeff: action.salary_rule.count_coeff,
            fix_salary: action.salary_rule.fix_salary,
            deleted: action.salary_rule.deleted,
            employee_id: action.salary_rule.employee_id,
            check_status: action.salary_rule.check_status
         }
      }
 
      case 'RESET_SALARY_RULE': {
         return {
            ...state, 
            edit: 0,

            title: '',
            type_rule: 4,
            order_type: 1,
            method: 0,
            coefficient: 0,
            count_coeff: [{
               cost: 0,
               coef: 0
            }],
            fix_salary: 0,
            deleted: false,
            employee_id: 0,
            check_status: 0
         }
      }
 
       
      default: return state
   }
    
}
 