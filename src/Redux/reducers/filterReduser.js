
const initialState = {

   status: [],
   order_type_id: [],
   employees: [],
   customFilters: [],

   mainFilter: {
    sort: 'asc',
    field_sort: 'id',
    page: 0
  },

  tempFilter: {
   status_id: [],
   order_type_id: [],
   engineer_id: [],
   manager_id: [],
   kindof_good: '',
   brand: '',
   subtype: '',
   model: '',
   client_name: '',
   created_at: [null, null]
 },

  clientFilter: {
    page: 0,
    name: '',
    phone: ''
  },

  search_word: '',

  title_create: '',
  generale_create: false
}

export const filterReducer = (state = initialState, action) => {
   switch (action.type){

      case 'ADD_STATUS': {
         return {
            ...state, 
            status: action.status.map(status => status.id),
           }}

      case 'ADD_DATA': {
         if (action.field === 'order_type') {
            return {
                  ...state, 
                  order_type_id: action.data.map(type => type.id)
            }
         } else {
            return state
         }
      }

      case 'ADD_EMPLOYEES': {
         return {
            ...state, 
            employees: action.employees.map(employee => employee.id),
           }}
      

      case 'ADD_ORDERS_SHOW': {
         return {
            ...state, 
            count: action.count
         }}

      case 'CHANGE_PAGE': {
         return {
            ...state, 
            mainFilter: {
              ...state.mainFilter, 
              page: action.page
             }}}
      
      case 'CHANGE_SORT': {
         return {
            ...state, 
            mainFilter: {
               ...state.mainFilter, 
               sort: action.field === state.mainFilter.field_sort ? (state.mainFilter.sort === 'asc' ? 'desc' : 'asc') : state.mainFilter.sort,
               field_sort: action.field,
               page: 0
               }}}
         
      case 'ACTIVE_BADGE': {
         return {
               ...state, 
               search_word: '',
               mainFilter: {
                  ...action.filters,
                  page: 0,
                  sort: 'asc',
                  field_sort: 'id'
               },
               customFilters: state.customFilters.map(filter => {
                  return {
                     ...filter,
                     active: false
                  }}),
            }}


      case 'CANGE_FILTER': {

         const word = action.word.toString()

            return {
               ...state, 
               search_word: word, 
               mainFilter: {
               ...state.mainFilter,
               page: 0,
               sort: 'asc',
               field_sort: 'id',
               search: word,
               }}}

         
      case 'CHANGE_CHECK_STATUS': {

         if (state.tempFilter.status_id.includes(action.field)) {
         return {
               ...state, 
               tempFilter: {
               ...state.tempFilter, 
               status_id: state.tempFilter.status_id.filter(status => status !== action.field)
            }
            }
         } else {
            return {
               ...state, 
               tempFilter: {
               ...state.tempFilter, 
               status_id: state.tempFilter.status_id.concat([ action.field ])
            }
            }}}


      case 'SET_ALL_STATUS_TRUE': {
      return {
         ...state,
         tempFilter: {
            ...state.tempFilter,
            status_id: state.status
         }}}

      case 'SET_ALL_STATUS_FALSE': {
      return {
         ...state,
         tempFilter: {
            ...state.tempFilter,
            status_id: []
         }}}

         
      case 'CHANGE_CHECK_TYPE': {

      if (state.tempFilter.order_type_id.includes(Number(action.field))) {

      return {
            ...state, 
            tempFilter: {
            ...state.tempFilter, 
            order_type_id: state.tempFilter.order_type_id.filter(order_type => order_type !== Number(action.field))}
         }
      } else {
         return {
            ...state, 
            tempFilter: {
            ...state.tempFilter, 
            order_type_id: state.tempFilter.order_type_id.concat([Number(action.field)])}
         }}}

      case 'SET_ALL_TYPE_TRUE': {
         
      return {
         ...state,
         tempFilter: {
            ...state.tempFilter,
            order_type_id: state.order_type_id
         }}}

      case 'SET_ALL_TYPE_FALSE': {
      return {
         ...state,
         tempFilter: {
            ...state.tempFilter,
            order_type_id: []
         }}}

            
      case 'CHANGE_CHECK_MANAGER': {

      if (state.tempFilter.manager_id.includes(action.field)) {

      return {
            ...state, 
            tempFilter: {
            ...state.tempFilter, 
            manager_id: state.tempFilter.manager_id.filter(manager => manager !== action.field)}
         }
      } else {
         return {
            ...state, 
            tempFilter: {
            ...state.tempFilter, 
            manager_id: state.tempFilter.manager_id.concat([action.field])}
         }}}

      case 'SET_ALL_MANAGER_TRUE': {
      return {
         ...state,
         tempFilter: {
            ...state.tempFilter,
            manager_id: state.employees
         }}}

      case 'SET_ALL_MANAGER_FALSE': {
      return {
         ...state,
         tempFilter: {
            ...state.tempFilter,
            manager_id: []
         }}}

      case 'CHANGE_CHECK_ENGINEER': {

      if (state.tempFilter.engineer_id.includes(action.field)) {

      return {
            ...state, 
            tempFilter: {
            ...state.tempFilter, 
            engineer_id: state.tempFilter.engineer_id.filter(engineer => engineer !== action.field)}
         }
      } else {
         return {
            ...state, 
            tempFilter: {
            ...state.tempFilter, 
            engineer_id: state.tempFilter.engineer_id.concat([action.field])}
         }}}

      case 'SET_ALL_ENGINEER_TRUE': {
      return {
         ...state,
         tempFilter: {
            ...state.tempFilter,
            engineer_id: state.employees
         }}}

      case 'SET_ALL_ENGINEER_FALSE': {
      return {
         ...state,
         tempFilter: {
            ...state.tempFilter,
            engineer_id: []
         }}}

      case 'CHANGE_GROUP_MAINFILTER': {
         return {
            ...state,
            tempFilter: {
               ...state.tempFilter,
               kindof_good: action.word
            }}}

      case 'CHANGE_BRAND_MAINFILTER': {
      return {
         ...state,
         tempFilter: {
            ...state.tempFilter,
            brand: action.word
         }}}

      case 'CHANGE_SUBTYPE_MAINFILTER': {
      return {
         ...state,
         tempFilter: {
            ...state.tempFilter,
            subtype: action.word
         }}}


      case 'CHANGE_CLIENT_MAINFILTER': {
      return {
         ...state,
         tempFilter: {
            ...state.tempFilter,
            client_name: action.word
         }}}

      case 'CHANGE_NAME_CLIENTFILTER': {
      return {
         ...state,
         clientFilter: {
            ...state.clientFilter,
            name: action.word,
            phone: ''
         }}}

         
      case 'CHANGE_PHONE_CLIENTFILTER': {
         return {
            ...state,
            clientFilter: {
               ...state.clientFilter,
               phone: action.word.replace(/[^0-9]/g, ''),
               name: ''
            }}}

      case 'CHANGE_CREATE_AT_MAINFILTER': {
         return {
            ...state,
            tempFilter: {
               ...state.tempFilter,
               created_at: action.range
            }}}


            
      case 'APPLY_FILTER': {

         let filter = {}

         if (state.tempFilter.status_id) {
            Object.assign(filter, {status_id: state.tempFilter.status_id})
         }

         if (state.tempFilter.order_type_id) {
            Object.assign(filter, {order_type_id: state.tempFilter.order_type_id})
         }

         if (state.tempFilter.engineer_id) {
            Object.assign(filter, {engineer_id: state.tempFilter.engineer_id})
         }

         if (state.tempFilter.manager_id) {
            Object.assign(filter, {manager_id: state.tempFilter.manager_id})
         }

         if (state.tempFilter.kindof_good) {
            Object.assign(filter, {kindof_good: state.tempFilter.kindof_good})
         }

         if (state.tempFilter.brand) {
            Object.assign(filter, {brand: state.tempFilter.brand})
         }

         if (state.tempFilter.subtype) {
            Object.assign(filter, {subtype: state.tempFilter.subtype})
         }

         if (state.tempFilter.client_name) {
            Object.assign(filter, {client_name: state.tempFilter.client_name})
         }

         if (state.tempFilter.created_at[0] || state.tempFilter.created_at[1]) {
            Object.assign(filter, {created_at: state.tempFilter.created_at.map(date => date / 1000)})
         }


         return {
            ...state,
            mainFilter: {
               ...filter,
               sort: 'asc',
               field_sort: 'id',
               page: 0
         }}
      }

      case 'RESET_FILTER':
         return {
            ...state,
            tempFilter: {
               status_id: [],
               order_type_id: [],
               engineer_id: [],
               manager_id: [],
               kindof_good: '',
               brand: '',
               subtype: '',
               model: '',
               client_name: '',
               created_at: [null, null]
            }
         }

      case 'CHANGE_TITLE_CREATE':
         return {
            ...state,
            title_create: action.title
         }

         
      case 'CHANGE_GENERALE_CREATE':
         return {
            ...state,
            generale_create: !state.generale_create
         }

      case 'ADD_CUSTOM_FILTERS': {
         return {
            ...state,
            customFilters: action.filters.sort((a, b) => a.id - b.id),
            title_create: '',
            generale_create: false
         }}
      
      
      case 'APPLY_CUSTOM_FILTER': {

         if (!state.customFilters.find(filter => filter.id === action.id).active) {

            let filter_new = {}

            if (action.filter.status_id) {
               Object.assign(filter_new, {status_id: action.filter.status_id})
            }

            if (action.filter.order_type_id) {
               Object.assign(filter_new, {order_type_id: action.filter.order_type_id})
            }

            if (action.filter.engineer_id) {
               Object.assign(filter_new, {engineer_id: action.filter.engineer_id})
            }

            if (action.filter.manager_id) {
               Object.assign(filter_new, {manager_id: action.filter.manager_id})
            }

            if (action.filter.kindof_good) {
               Object.assign(filter_new, {kindof_good: action.filter.kindof_good})
            }

            if (action.filter.brand) {
               Object.assign(filter_new, {brand: action.filter.brand})
            }

            if (action.filter.subtype) {
               Object.assign(filter_new, {subtype: action.filter.subtype})
            }

            if (action.filter.client_name) {
               Object.assign(filter_new, {client_name: action.filter.client_name})
            }

            if (action.filter.created_at[0] || action.filter.created_at[1]) {
               Object.assign(filter_new, {created_at: action.filter.created_at.map(date => date / 1000)})
            }

            return {
               ...state,
               tempFilter: action.filter,
               customFilters: state.customFilters.map(filter => {
                  return {
                     ...filter,
                     active: filter.id === action.id ? true : false
                  }}),
               mainFilter: {
                  ...filter_new,
                  sort: 'asc',
                  field_sort: 'id',
                  page: 0
            }}
      } else {
         return {
            ...state,
            tempFilter: {
               status_id: [],
               order_type_id: [],
               engineer_id: [],
               manager_id: [],
               kindof_good: '',
               brand: '',
               subtype: '',
               model: '',
               client_name: '',
               created_at: [null, null]
            },
            customFilters: state.customFilters.map(filter => {
               return {
                  ...filter,
                  active: false
               }}),
            mainFilter: {
               sort: 'asc',
               field_sort: 'id',
               page: 0
         }}}}
      
      default: return state
   }
   
}
