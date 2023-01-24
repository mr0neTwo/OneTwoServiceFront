import {order_event_types} from '../../data/data'
import {Table} from '../../data/tableHeaders'
import {includesObject} from '../../components/general/utils'

const key = 'order_'

const initialState = {

    ordersShow: [],
    count: 0,

    events: [],

    edit: 0,
    tabs: 1,

    created_at: 0,
    done_at: 0,
    closed_at: 0,
    assigned_at: 0,
    duration: 0,
    estimated_done_at: Math.round(Date.now() / 1000) + 4 * 24 * 3600,
    scheduled_for: 0,
    warranty_date: 0,
    status_deadline: 0,

    ad_campaign: {},
    branch_id: 0,
    status: {},
    client: {},
    order_type: {},
    closed_by_id: 0,
    created_by_id: 0,
    manager: {},
    engineer: {},
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

    engineer_work_materials: {},

    event_filter: JSON.parse(localStorage.getItem(key + 'event_filter')) || order_event_types.map(event => event.id),
    event_comment: '',

    table_headers: JSON.parse(localStorage.getItem(key + 'table_headers')) || Table.Fields.Order,

    position_cursor: 0,
    position_over: null,

    sort: JSON.parse(localStorage.getItem(key + 'sort')) || 'desc',
    field_sort:  JSON.parse(localStorage.getItem(key + 'field_sort')) || 'id',
    page: JSON.parse(localStorage.getItem(key + 'page')) || 0,

    spinner: false
}

export const orderReducer = (state = initialState, action) => {
    switch (action.type) {

        case 'CHANGE_ORDER_STATE': {
            const session_save = ['table_headers', 'event_filter', 'sort', 'field_sort', 'page']
            Object.keys(action.data).forEach(field => {
                if (session_save.includes(field)) localStorage.setItem(key + field, JSON.stringify(action.data[field]))
            })
            return {...Object.assign(state, action.data)}
        }

        case 'SELECTED_ORDER': {
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
            if (action.saveToApp) localStorage.setItem(key + action.field, JSON.stringify(new_data))
            // Вернем изменненый стейт
            return {
                ...state,
                [action.field]: new_data,
            }
        }

        case 'CHANGE_ORDER_FORM': {

            let equipments_list = state.equipments
            equipments_list[action.idx][action.field] = action.value

            return {...Object.assign(state, {equipments: equipments_list})}

        }

        case 'CHANGE_ORDER_FIELD': {

            let tableFields = state.tableFields
            const idx = tableFields.findIndex(field => field.id === action.id)
            tableFields[idx][action.field] = action.value
            localStorage.setItem('tableFields', JSON.stringify(tableFields))

            return {...state, tableFields}
        }

        case 'REORDER_ORDER_FIELD': {

            let tableFields = state.tableFields
            const idx = tableFields.findIndex(field => field.id === action.id)
            tableFields[idx].order = action.order + 0.5
            tableFields = tableFields.sort( (a, b) => a.order - b.order)
            tableFields = tableFields.map((field, idx) => {
                field.order = idx
                return field
            })


            localStorage.setItem('tableFields', JSON.stringify(tableFields))

            return {...state, tableFields}

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
                events: [],
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

                ad_campaign: {},
                branch_id: 0,
                status_id: 0,
                client: {},
                order_type: {},
                closed_by_id: 0,
                created_by_id: 0,
                manager: {},
                engineer: {},
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

                engineer_work_materials: {},

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

                ad_campaign: action.order.ad_campaign,
                branch_id: action.order.branch.id,
                status: action.order.status,
                client: action.order.client,
                order_type: action.order.order_type,
                closed_by_id: action.order.closed_by_id,
                created_by_id: action.order.created_by_id,
                manager: action.order.manager,
                engineer: action.order.engineer,
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
                engineer_notes: action.order.engineer_notes || '',
                manager_notes: action.order.manager_notes || '',
                resume: action.order.resume || '',
                cell: action.order.cell || '',

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


        default:
            return state
    }

}
