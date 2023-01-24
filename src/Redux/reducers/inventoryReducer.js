import {includesObject} from '../../components/general/utils'
import {inventory_headers} from '../../data/tableHeaders'

const now = new Date()
const key = 'inventory_'

const initialState = {

    warehouse_inventories: [],
    count: 0,

    edit: 0,
    label: '',
    created_at: 0,
    parts: [],
    description: '',

    created_by: {},
    warehouse: {},
    warehouse_category: {},
    related_docs: [],

    isZero:  true,
    filterOption: 0,
    hideGood: true,

    filter_created_at: JSON.parse(localStorage.getItem(key + 'filter_created_at')) || [
        parseInt(now.setHours(0, 0, 0, 0) / 1000),
        parseInt(now.setHours(23, 59, 59, 999) / 1000)
    ],
    page: 0,

    table_headers: JSON.parse(localStorage.getItem(key + 'table_headers')) || inventory_headers,
}

/*
part = {
    actual_count: 42,
    barcode: "",
    cell:"BOX-3 H2",
    code: "",
    count: 21,
    description: "",
    doc_url: null,
    image_url: null,
    is_fixed: false,
    marking: "",
    min_residue: null,
    part_id: 167,
    shortage: 0,
    surplus: 21,
    title: "KBU8M",
}
 */

export const inventoryReducer = (state = initialState, action) => {
    switch (action.type){

        case 'CHANGE_INVENTORY_STATE': {
            const local_save = ['filter_created_at', 'table_headers']
            Object.keys(action.data).forEach(field => {
                if (local_save.includes(field)) localStorage.setItem(key + field, JSON.stringify(action.data[field]))
            })
            return {...Object.assign(state, action.data)}
        }


        case 'EDIT_INVENTORY': {
            return {
                ...state,
                edit: action.inventory.id,
                label: action.inventory.label,
                created_at: action.inventory.created_at,
                parts: action.inventory.parts,
                description: action.inventory.description,
                created_by: action.inventory.created_by,
                warehouse: action.inventory.warehouse,
                warehouse_category: action.inventory.warehouse_category,
                related_docs: action.inventory.related_docs
            }
        }

        case 'RESET_INVENTORY': {
            return {
                ...state,
                edit: 0,
                label: '',
                created_at: 0,
                parts: [],
                description: '',

                created_by: {},
                warehouse: {},
                warehouse_category: {},
                related_docs: []
            }
        }

        case 'SELECTED_INVENTORY': {
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