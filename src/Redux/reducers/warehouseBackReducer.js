import {includesObject} from '../../components/general/utils'
import {Table} from '../../data/tableHeaders'

const now = new Date()
const key = 'back_'

const initialState = {
    warehouse_backs: [],
    count: 0,

    edit: 0,
    label: '',
    created_at: 0, 
    parts: [], 
    description: '',
    price: 0,

    created_by: {},
    warehouse: {},
    client: {}, 
    registration: {},

    filter_created_at: JSON.parse(localStorage.getItem(key + 'filter_created_at')) || [
        parseInt(now.setHours(0, 0, 0, 0) / 1000),
        parseInt(now.setHours(23, 59, 59, 999) / 1000)
    ],
    page: 0,
    flag: false,

    table_headers: JSON.parse(localStorage.getItem(key + 'table_headers')) || Table.Fields.Back,
}

export const warehouseBackReducer = (state = initialState, action) => {
    switch (action.type){

        case 'CHANGE_BACK_STATE': {
            const local_save = ['filter_created_at', 'table_headers']
            Object.keys(action.data).forEach(field => {
                if (local_save.includes(field)) localStorage.setItem(key + field, JSON.stringify(action.data[field]))
            })
            return {...Object.assign(state, action.data)}
        }


        case 'EDIT_BACK': {
            return {
                ...state,
                edit: action.back.id,
                label: action.back.label,
                created_at: action.back.created_at,
                parts: action.back.parts,
                description: action.back.description,
                price: action.back.price,

                created_by: action.back.created_by,
                warehouse: action.back.warehouse,
                client: action.back.client,
                registration: action.back.registration,
            }
        }

        case 'RESET_BACK': {
            return {
                ...state,
                edit: 0,
                label: '',
                created_at: 0,
                parts: [],
                description: '',
                price: 0,

                created_by: {},
                warehouse: {},
                client: {},
                registration: {},
            }
        }

        case 'SELECTED_BACK': {
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