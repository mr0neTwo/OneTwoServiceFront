import {includesObject} from '../../components/general/utils'
import {Table} from '../../data/tableHeaders'
import {request_event_types} from '../../data/data'

const now = new Date()
const key = 'req_'

const initialState = {

    request_spare_parts: [],
    events: [],
    count: 0,

    edit: 0,
    label: '',
    created_at: 0,
    estimated_come_at: null,
    amount: 0,
    cost: 0,
    delivery_cost: 0,
    description: '',
    deleted: false,
    part: {},
    created_by: {},
    executor: {},
    client: {},
    supplier: {},
    order: {},
    status: {},

    event_comment: '',

    show_deleted: JSON.parse(localStorage.getItem(key + 'show_deleted')) || false,
    filter_status: JSON.parse(localStorage.getItem(key + 'filter_status')) || [],
    filter_created_by: JSON.parse(localStorage.getItem(key + 'filter_created_by')) || [],
    filter_executor: JSON.parse(localStorage.getItem(key + 'filter_executor')) || [],
    filter_supplier: JSON.parse(localStorage.getItem(key + 'filter_supplier')) || {},
    filter_created_at: JSON.parse(localStorage.getItem(key + 'filter_created_at')) || [0, 0],
    page: 0,

    event_filter: JSON.parse(localStorage.getItem(key + 'event_filter')) || request_event_types,
    table_headers: JSON.parse(localStorage.getItem(key + 'table_headers')) || Table.Fields.RequestSparePart,
}

export const requestSparePartsReducer = (state = initialState, action) => {
    switch (action.type){

        case 'CHANGE_REQUEST_SPARE_PARTS_STATE': {
            const local_save = ['filter_created_at', 'table_headers', 'event_filter', 'show_deleted', 'filter_status',
                'filter_created_by', 'filter_executor', 'filter_supplier']
            Object.keys(action.data).forEach(field => {
                if (local_save.includes(field)) localStorage.setItem(key + field, JSON.stringify(action.data[field]))
            })
            return {...Object.assign(state, action.data)}
        }


        case 'EDIT_REQUEST_SPARE_PARTS': {
            return {
                ...state,
                edit: action.reqsp.id,
                label: action.reqsp.label,
                created_at: action.reqsp.created_at,
                estimated_come_at: action.reqsp.estimated_come_at,
                amount: action.reqsp.amount,
                cost: action.reqsp.cost,
                delivery_cost: action.reqsp.delivery_cost,
                description: action.reqsp.description,
                deleted: action.reqsp.deleted,
                part: action.reqsp.part,
                created_by: action.reqsp.created_by,
                executor: action.reqsp.executor,
                client: action.reqsp.client,
                supplier: action.reqsp.supplier,
                order: action.reqsp.order,
                status: action.reqsp.status
            }
        }

        case 'RESET_REQUEST_SPARE_PARTS': {
            return {
                ...state,
                edit: 0,
                label: '',
                created_at: 0,
                estimated_come_at: 0,
                amount: 0,
                cost: 0,
                delivery_cost: 0,
                description: '',
                deleted: false,
                part: {},
                created_by: {},
                executor: {},
                client: {},
                supplier: {},
                order: {},
                status: {}
            }
        }

        case 'SELECTED_REQUEST_SPARE_PARTS': {
            // Если пришел пустой массив очистем список
            if (!action.value.length) return {...state, [action.field]: []}

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


        default: return state
    }

}