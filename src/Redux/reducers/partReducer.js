import {part_table_headers} from '../../data/tableHeaders'
import {includesObject} from '../../components/general/utils'

const initialState = {

    parts: [],
    count_parts: 0,

    tabs: 0,

    edit: 0,
    title: '',
    description: '',
    marking: '',
    article: '',
    barcode: '',
    code: '',
    image_url: '',
    doc_url: '',
    earnings_percent: 0,
    earnings_sum: 0,
    specifications: [],
    deleted: false,
    warehouse_category_id: 0,
    warehouse_category: {},
    img: '',
    doc: '',
    warranty_period: 0,
    prices: [],
    residue_rules: [],
    remains: [],
    part_movements: [],
    warehouse_remains: [],

    edit_residue_rules: 0,
    warehouse: {},
    min_residue: 0,
    necessary_amount: 0,

    visible_option: false,
    warranty_value: 30*24*60*60,

    page: 0,
    showDeleted: false,
    filter_name: '',
    filter_warehouse_category_id: null,

    choosed_headers: JSON.parse(localStorage.getItem('choosed_headers')) || part_table_headers
}

export const partReducer = (state = initialState, action) => {
    switch (action.type){

        case 'CHANGE_PART_STATE': {

            return {...Object.assign(state, action.data)}
        }

        case 'EDIT_PART': {
            return {
                ...state,
                edit: action.part.id,
                title: action.part.title,
                description: action.part.description,
                marking: action.part.marking,
                article: action.part.article,
                barcode: action.part.barcode,
                code: action.part.code,
                earnings_percent: action.part.earnings_percent,
                earnings_sum: action.part.earnings_sum,
                image_url: action.part.image_url,
                doc_url: action.part.doc_url,
                specifications: action.part.specifications,
                deleted: action.part.deleted,
                warranty_period: action.part.warranty_period,
                warehouse_category: action.part.warehouse_category,
                prices: action.part.prices,
                residue_rules: action.part.residue_rules,
                remains: action.part.remains,
                part_movements: action.part.part_movements,
                warehouse_remains: action.part.warehouse_remains,
                visible_option: !!(action.part.earnings_percent || action.part.earnings_sum)
            }
        }

        case 'RESET_PART': {
            return {
                ...state,
                edit: 0,
                title: '',
                description: '',
                marking: '',
                article: '',
                barcode: '',
                code: '',
                earnings_percent: 0,
                earnings_sum: 0,
                image_url: '',
                doc_url: '',
                specifications: [],
                deleted: false,
                img: '',
                doc: '',
                warranty_period: 0,
                prices: [],
                residue_rules: [],
                remains: [],
                part_movements: [],
                warehouse_remains: [],
                visible_option: false,
                warranty_value: 30*24*60*60,
            }
        }

        case 'SELECTED_PART': {
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

        case 'CHANGE_PART_PROPERTY': {

            let specifications = state.specifications
            specifications[action.idx][action.field] = action.value

            return {
                ...state,
                specifications: specifications
            }
        }

        case 'ADD_PART_PROPERTY': {

            return {
                ...state,
                specifications: state.specifications.concat([{title: '', value: ''}])
            }
        }

        case 'DELETE_PART_PROPERTY': {

            let specifications = state.specifications
            specifications.splice(action.idx, 1)

            return {
                ...state,
                specifications: state.specifications
            }
        }

        case 'RESET_RESIDUE_RULE': {
            return {
                ...state,
                edit_residue_rules: 0,
                warehouse: {},
                min_residue: 0,
                necessary_amount: 0
            }
        }

        case 'EDIT_RESIDUE_RULE': {
            return {
                ...state,
                edit_residue_rules: action.residue_rule.id,
                warehouse: action.residue_rule.warehouse,
                min_residue: action.residue_rule.min_residue,
                necessary_amount: action.residue_rule.necessary_amount
            }
        }

        default: return state
    }

}