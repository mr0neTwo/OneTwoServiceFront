import {includesObject} from '../../components/general/utils'
import {write_of_headers} from '../../data/tableHeaders'
const now = new Date()

const initialState = {

    write_offs: [],
    count: 0,

    edit: 0,
    label: '',
    created_at: 0,
    description: '',
    created_by: {},
    parts: [],

    engineer: {},
    discount_margin: {},
    write_of_type: {},

    filter_created_at: JSON.parse(localStorage.getItem('write_of_filter_created_at')) || [
        parseInt(now.setHours(0, 0, 0, 0) / 1000),
        parseInt(now.setHours(23, 59, 59, 999) / 1000)
    ],
    page: 0,

    table_headers: JSON.parse(localStorage.getItem('write_of_table_headers')) || write_of_headers,
}

export const writeOfReducer = (state = initialState, action) => {
    switch (action.type){

        case 'CHANGE_WRITE_OF_STATE': {
            const local_save = ['filter_created_at', 'table_headers']
            Object.keys(action.data).forEach(field => {
                if (local_save.includes(field)) localStorage.setItem(`write_of_${field}`, JSON.stringify(action.data[field]))
            })
            return {...Object.assign(state, action.data)}
        }


        case 'EDIT_WRITE_OF': {
            return {
                ...state,
                edit: action.write_of.id,
                label: action.write_of.label,
                created_at: action.write_of.created_at,
                description: action.write_of.description,
                created_by: action.write_of.created_by,
                warehouse: action.write_of.warehouse,
                parts: action.write_of.parts
            }
        }

        case 'RESET_WRITE_OF': {
            return {
                ...state,
                edit: 0,
                label: '',
                created_at: 0,
                description: '',
                created_by: {},
                parts: [],
            }
        }

        case 'SELECTED_WRITE_OF': {
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
            if (action.saveToApp) localStorage.setItem('write_of_' + action.field, JSON.stringify(new_data))
            // Вернем изменненый стейт
            return {
                ...state,
                [action.field]: new_data,
            }
        }

        default: return state
    }

}