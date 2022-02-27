import {part_table_headers} from '../../data/tableHeaders'

const initialState = {

    parts: [],
    count_parts: 0,

    edit: 0,
    title: '',
    description: '',
    marking: '',
    article: '',
    barcode: '',
    code: '',
    image_url: '',
    doc_url: '',
    specifications: [],
    deleted: false,
    warehouse_category_id: 0,
    warehouse_category: {},
    img: '',
    doc: '',

    page: 0,
    showDeleted: false,

    choosed_headers: JSON.parse(localStorage.getItem('choosed_headers')) || part_table_headers.map(header => header.id)
}

export const partReducer = (state = initialState, action) => {
    switch (action.type){

        case 'CHANGE_PART_FORM': {
            return {
                ...state,
                [action.field]: action.value
            }
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
                image_url: action.part.image_url,
                doc_url: action.part.doc_url,
                specifications: action.part.specifications,
                deleted: action.part.deleted,
                warehouse_category: action.part.warehouse_category
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
                image_url: '',
                doc_url: '',
                specifications: [],
                deleted: false,
                img: '',
                doc: ''
            }
        }

        case 'SELECTED_PART': {
            // Обявим переменную для изменных данных
            let new_data
            // Проверим если значения value в списке уже существующих
            if (action.value.every(val => state[action.field].includes(val))) {
                // Если есть удалим эти значения
                new_data = state[action.field].filter(val => !action.value.includes(val))
            } else {
                // Если нет добавим эти значения
                new_data = state[action.field].concat(action.value.filter(val => !state[action.field].includes(val)))
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



        default: return state
    }

}