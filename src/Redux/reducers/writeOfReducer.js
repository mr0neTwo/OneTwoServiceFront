import {includesObject} from '../../components/general/utils'
import {Table} from '../../data/tableHeaders'
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
    inventory_id: 0,

    filter_created_at: JSON.parse(localStorage.getItem('write_of_filter_created_at')) || [
        parseInt(now.setHours(0, 0, 0, 0) / 1000),
        parseInt(now.setHours(23, 59, 59, 999) / 1000)
    ],
    page: 0,

    table_headers: JSON.parse(localStorage.getItem('write_of_table_headers')) || Table.Fields.WriteOf,
}

/*
part = {
    barcode: "",
    cell: "BOX1-A1",
    code: "",
    count: 43,
    description: "Микроконтроллер NXP",
    doc_url: "data/Datasheets/datasheet_MC9S08GB60A_10.pdf",
    image_url: "data/Parts/part_MC9S08GB60A_10.jpeg",
    marking: "",
    min_residue: null,
    part_id: 10,
    price_2: 500,
    price_3: 600,
    title: "MC9S08GB60A",
    target_count: 1
}
 */

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
                parts: action.write_of.parts,
                inventory_id: action.write_of.inventory_id
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
                inventory_id: 0,
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