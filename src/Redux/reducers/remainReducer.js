import {includesObject} from '../../components/general/utils'
import { remain_headers} from '../../data/tableHeaders'

const initialState = {

    warehouse_remains: [],

    edit: 0,
    where_to_buy: '',                   // Ссылка на поставщиков
    cell: '',                           // Адрес хранения
    count: 0,                            // Количество
    warranty_period: 0,                 // Гарантийный период
    deleted: false,                     // Удален

    part: {},
    part_id: 0,                         // Деталь
    category_id: 0,                     // Категория
    id_warehouse: {},
    warehouse_id: 0,                     // Склад

    page: 0,
    filter_warehouse: {},
    filter_category: {},
    filter_type:  {id: 0, title: 'Все'},
    showDeleted: false,

    type_option: [
        {id: 0, title: 'Все'},
        {id: 1, title: 'Ниже минимального остатка'},
        {id: 2, title: 'Только в наличии'}
    ],

    table_headers:  JSON.parse(localStorage.getItem('table_headers_remain')) || remain_headers,
    sort_field: 'id',
    sort: 'asc'
}

export const remainReducer = (state = initialState, action) => {
    switch (action.type){

        case 'CHANGE_REMAIN_STATE': {
            return {...Object.assign(state, action.data)}
        }


        case 'EDIT_REMAIN': {
            return {
                ...state,

                edit: action.remain.id,
                where_to_buy: action.remain.where_to_buy,
                cell: action.remain.cell,
                count: action.remain.count,
                warranty_period: action.remain.warranty_period,
                deleted: action.remain.deleted,

                part: action.remain.part,
                category_id: action.remain.category_id,
                warehouse: action.remain.warehouse
            }
        }

        case 'RESET_REMAIN': {
            return {
                ...state,
                edit: 0,
                where_to_buy: '',
                cell: '',
                count: 0,
                warranty_period: 0,
                deleted: false,

                part: {},
                part_id: 0,
                category_id: 0,
                id_warehouse: {},
                warehouse_id: 0
            }
        }

        case 'SELECTED_REMAIN': {
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
            if (action.saveToApp) localStorage.setItem(action.field + '_remain', JSON.stringify(new_data))
            // Вернем изменненый стейт
            return {
                ...state,
                [action.field]: new_data,
            }
        }


        default: return state
    }

}