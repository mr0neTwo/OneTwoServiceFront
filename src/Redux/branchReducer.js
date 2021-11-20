import { icon_location } from "../data/icons"

const initialState = {
   name: '',
   address: '',
   phone: '',
   color: 'grey',
   icon: icon_location,
   orders_type_id: 1,
   orders_type_strategy: 'last',
   orders_prefix: 'OTS',
   documents_prefix: 'A',
   employees: [],
   deleted: false,
   schedule: [
      {
         start_time: '9:00',
         end_time: '18:00',
         work_day: true,
         week_day: 1
      }, {
         start_time: '9:00',
         end_time: '18:00',
         work_day: true,
         week_day: 2
      }, {
         start_time: '9:00',
         end_time: '18:00',
         work_day: true,
         week_day: 3
      }, {
         start_time: '9:00',
         end_time: '18:00',
         work_day: true,
         week_day: 4
      }, {
         start_time: '9:00',
         end_time: '18:00',
         work_day: true,
         week_day: 5
      }, {
         start_time: '9:00',
         end_time: '18:00',
         work_day: false,
         week_day: 6
      }, {
         start_time: '9:00',
         end_time: '18:00',
         work_day: false,
         week_day: 7
      },
   ],

   edit: 0,
   showDeleted: false
}

export const branchReducer = (state = initialState, action) => {
   switch (action.type){

      case 'CHANGE_BRANCH_FORM': {
         return {
            ...state, 
            [action.field]: action.value,
         }
      }

      case 'CHANGE_SCHEDULE': {

         let list_schedule = state.schedule
         list_schedule[action.idx][action.field] = action.value

         return {
            ...state, 
            schedule: list_schedule
         }
      }
      
      case 'SET_BRANCH_EMPLOYEE': {
         if (action.id.every(id => state.employees.includes(id))) {
            return {
               ...state, 
               employees: state.employees.filter(id => !action.id.includes(id)),
            }
         } else {
            return {
               ...state, 
               employees: state.employees.concat(action.id.filter(id => !state.employees.includes(id))),
            }
         }
      }

      case 'RESET_BRANCH': {

         return {
            ...state, 
            name: '',
            address: '',
            phone: '',
            color: 'grey',
            icon: icon_location,
            orders_type_id: 1,
            orders_type_strategy: 'last',
            orders_prefix: 'OTS',
            documents_prefix: 'A',
            employees: [],
            deleted: false,
            schedule: [
               {
                  start_time: '9:00',
                  end_time: '18:00',
                  work_day: true,
                  week_day: 1
               }, {
                  start_time: '9:00',
                  end_time: '18:00',
                  work_day: true,
                  week_day: 2
               }, {
                  start_time: '9:00',
                  end_time: '18:00',
                  work_day: true,
                  week_day: 3
               }, {
                  start_time: '9:00',
                  end_time: '18:00',
                  work_day: true,
                  week_day: 4
               }, {
                  start_time: '9:00',
                  end_time: '18:00',
                  work_day: true,
                  week_day: 5
               }, {
                  start_time: '9:00',
                  end_time: '18:00',
                  work_day: false,
                  week_day: 6
               }, {
                  start_time: '9:00',
                  end_time: '18:00',
                  work_day: false,
                  week_day: 7
               },
            ],

            edit: 0
         }
      }

      
      case 'EDIT_BRANCH': {

         return {
            ...state, 
            name: action.branch.name,
            address: action.branch.address,
            phone: action.branch.phone,
            color: action.branch.color,
            icon: action.branch.icon,
            orders_type_id: action.branch.orders_type_id,
            orders_type_strategy: action.branch.orders_type_strategy,
            orders_prefix: action.branch.orders_prefix,
            documents_prefix: action.branch.documents_prefix,
            employees: action.branch.employees,
            deleted: action.branch.deleted,
            schedule: action.branch.schedule,

            edit: action.branch.id
         }
      }
      
      
      default: return state
   }
   
}
