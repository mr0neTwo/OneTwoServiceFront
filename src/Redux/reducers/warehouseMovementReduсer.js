import {includesObject} from '../../components/general/utils'
import {Table} from '../../data/tableHeaders'

const current_key = 'movement_'
const now = new Date()

const initialState = {

    warehouse_movements: [],
    count: 0,

    edit: 0,
    label: '',
    created_at: 0,
    parts: [],
    description: '',

    created_by: {},
    warehouse: {},
    target_warehouse: {},

    filter_created_at: JSON.parse(localStorage.getItem(current_key + 'filter_created_at')) || [
        parseInt(now.setHours(0, 0, 0, 0) / 1000),
        parseInt(now.setHours(23, 59, 59, 999) / 1000)
    ],
    page: 0,

    table_headers: JSON.parse(localStorage.getItem(current_key + 'table_headers')) || Table.Fields.Movement,

}

export const warehouseMovementReducer = (state = initialState, action) => {
    switch (action.type){

        case 'CHANGE_MOVEMENT_STATE': {
            const local_save = ['filter_created_at', 'table_headers']
            Object.keys(action.data).forEach(field => {
                if (local_save.includes(field)) localStorage.setItem(current_key + field, JSON.stringify(action.data[field]))
            })
            return {...Object.assign(state, action.data)}
        }

        case 'EDIT_MOVEMENT': {
            return {
                ...state,
                edit: action.movement.id,
                label: action.movement.label,
                created_at: action.movement.created_at,
                parts: action.movement.parts,
                description: action.movement.description,

                created_by: action.movement.created_by,
                warehouse: action.movement.warehouse,
                target_warehouse: action.movement.target_warehouse
            }
        }

        case 'RESET_MOVEMENT': {
            return {
                ...state,
                edit: 0,
                label: '',
                created_at: 0,
                parts: [],
                description: '',

                created_by: {},
                warehouse: {},
                target_warehouse: {},
            }
        }

        case 'SELECTED_MOVEMENT': {
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
            if (action.saveToApp) localStorage.setItem(action.field, JSON.stringify(new_data))
            // Вернем изменненый стейт
            return {
                ...state,
                [action.field]: new_data,
            }
        }


        default: return state
    }

}