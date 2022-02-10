const initialState = {

   edit: 0,
   tabs: 1,

   created_at: 0,
   done_at: 0,
   closed_at: 0,
   assigned_at: 0,
   duration: 0,
   estimated_done_at: parseInt(Date.now() / 1000) + 4 * 24 * 3600,
   scheduled_for: 0,
   warranty_date: 0, 
   status_deadline: 0,

   ad_campaign_id: 1,
   branch_id: 0,
   status: {},
   client: {},
   order_type_id: 1,
   closed_by_id: 0,
   created_by_id: 0,
   manager_id: 0,
   engineer_id: 0,
   kindof_good: {},
   brand: {},
   subtype: {},
   model: {},

   operations: [],
   parts: [], 
   attachments: [], 
   payments: [],

   id_label: '',
   prefix: '',
   serial: '',
   malfunction: '',
   packagelist: '',
   appearance: '',
   engineer_notes: '',
   manager_notes: '',
   resume: '',
   cell: '', 

   estimated_cost: 0,
   missed_payments: 0,
   discount_sum: 0,
   payed: 0,
   price: 0,
   remaining: 0, 
   remaining_status: 0, 
   remaining_warranty: 0, 

   overdue: false,
   status_overdue: false,
   urgent: false,
   warranty_measures: false,

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
  
}

export const orderReducer = (state = initialState, action) => {
   switch (action.type){

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

      case 'RESET_ORDER': {

         return {
            ...state, 
            edit: 0,
            tabs: 1,

            created_at: 0,
            done_at: 0,
            closed_at: 0,
            assigned_at: 0,
            duration: 0,
            estimated_done_at: parseInt(Date.now() / 1000) + 4 * 24 * 3600,
            // estimated_done_at: 0,
            scheduled_for: 0,
            warranty_date: 0, 
            status_deadline: 0,

            ad_campaign_id: 1,
            branch_id: 0,
            status_id: 0,
            client: {},
            order_type_id: 1,
            closed_by_id: 0,
            created_by_id: 0,
            manager_id: 0,
            engineer_id: 0,
            kindof_good:{},
            brand: {},
            subtype: {},
            model: {},

            operations: [],
            parts: [],
            attachments: [],
            payments: [],

            id_label: '',
            prefix: '',
            serial: '',
            malfunction: '',
            packagelist: '',
            appearance: '',
            engineer_notes: '',
            manager_notes: '',
            resume: '',
            cell: '',

            estimated_cost: 0,
            missed_payments: 0,
            discount_sum: 0,
            payed: 0,
            price: 0,
            remaining: 0, 
            remaining_status: 0, 
            remaining_warranty: 0, 

            overdue: false,
            status_overdue: false,
            urgent: false,
            warranty_measures: false,


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
         }
      }

      
      case 'EDIT_ORDER': {

         return {
            ...state, 
            edit: action.order.id,
            created_at: action.order.created_at,
            done_at: action.order.done_at,
            closed_at: action.order.closed_at,
            assigned_at: action.order.assigned_at,
            duration: action.order.duration,
            estimated_done_at: action.order.estimated_done_at,
            scheduled_for: action.order.scheduled_for,
            warranty_date: action.order.warranty_date, 
            status_deadline: action.order.status_deadline,

            ad_campaign_id: action.order.ad_campaign.id,
            branch_id: action.order.branch.id,
            status: action.order.status,
            client: action.order.client,
            order_type_id: action.order.order_type.id,
            closed_by_id: action.order.closed_by_id,
            created_by_id: action.order.created_by_id,
            manager_id: action.order.manager_id,
            engineer_id: action.order.engineer_id,
            kindof_good: action.order.kindof_good,
            brand: action.order.brand,
            subtype: action.order.subtype,
            model: action.order.model,

            operations: action.order.operations,
            parts: action.order.parts,
            attachments: action.order.attachments,
            payments: action.order.payments,

            id_label: action.order.id_label,
            prefix: action.order.prefix,
            serial: action.order.serial,
            malfunction: action.order.malfunction,
            packagelist: action.order.packagelist,
            appearance: action.order.appearance,
            engineer_notes: action.order.engineer_notes,
            manager_notes: action.order.manager_notes,
            resume: action.order.resume,
            cell: action.order.cell,

            estimated_cost: action.order.estimated_cost,
            missed_payments: action.order.missed_payments,
            discount_sum: action.order.discount_sum,
            payed: action.order.payed,
            price: action.order.price,
            remaining: action.order.remaining,
            remaining_status: action.order.remaining_status,
            remaining_warranty: action.order.remaining_warranty,

            overdue: action.order.overdue,
            status_overdue: action.order.status_overdue,
            urgent: action.order.urgent,
            warranty_measures: action.order.warranty_measures
         }
      }

      
      default: return state
   }
   
}
