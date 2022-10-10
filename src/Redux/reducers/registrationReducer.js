const now = new Date()

const initialState = {

    registrations: [],

    edit: 0,

    label: '',
    created_at: 0,
    custom_created_at: now / 1000,
    deleted: false,
    description: '',
    parts: [],
    client: {},
    warehouse: {},
    warehouse_id: 0,
    employee_id: 0,

    part: {},
    count: 1,
    buy_cost: 0,
    cell: '',
    warranty_period: 0,
    seller: '',
    where_to_buy: '',
    min_residue: '',
    necessary_amount: 0,

    warranty_value: 30*24*60*60,

    showDeleted: false,
    filter_created_at: [
        parseInt(now.setHours(0, 0, 0, 0) / 1000),
        parseInt(now.setHours(23, 59, 59, 999) / 1000)
    ],
    page: 0

}

export const registrationReducer = (state=initialState, action) => {
    switch (action.type){

        case 'CHANGE_REGISTRATION_STATE': {
            return {...Object.assign(state, action.data)}
        }


        case 'EDIT_REGISTRATION': {
            return {
                ...state,
                edit: action.registration.id,
                label: action.registration.label,
                created_at: action.registration.created_at,
                custom_created_at: action.registration.custom_created_at,
                deleted: action.registration.deleted,
                description: action.registration.description,
                parts: action.registration.parts,
                client: action.registration.client,
                warehouse: action.registration.warehouse,
                employee_id: action.registration.employee_id,
            }
        }


        case 'RESET_REGISTRATION': {
            return {
                ...state,
                edit: 0,

                label: '',
                created_at: 0,
                custom_created_at: 0,
                deleted: false,
                description: '',
                parts: [],
                client: {},
                warehouse: {},
                employee_id: 0,
            }
        }

        case 'RESET_REGISTRATION_PART': {
            return {
                ...state,
                part: {},
                where_to_buy: '',
                cell: '',
                count: 1,
                min_residue: '',
                warranty_period: '',
                necessary_amount: 0,
                part_deleted: false,
                buy_cost: 0,
                seller: '',
            }
        }

        case 'SELECTED_REGISTRATION': {
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
        case 'ADD_REGISTRATION_PART': {
            return {
                ...state,
                parts: state.parts.concat([action.value])
            }
        }

        case 'REMOVE_REGISTRATION_PART': {
            return {
                ...state,
                parts: state.parts.filter(part => part.part_id !== action.id)
            }
        }

        // case 'SELECTED_OBJECT_REGISTRATION': {
        //     // Обявим переменную для изменных данных
        //     let new_data
        //     // Проверим если значения value в списке уже существующих
        //     if (action.value.map(val => val.id).every(val => state[action.field].map(val => val.id).includes(val))) {
        //         // Если есть удалим эти значения
        //         new_data = state[action.field].filter(val => !action.value.map(val => val.id).includes(val.id))
        //     } else {
        //         // Если нет добавим эти значения
        //         new_data = state[action.field].concat(action.value.filter(val => !state[action.field].map(val => val.id).includes(val.id)))
        //     }
        //     // Если флаг saveToApp установлен сохраним данные на локальном хранилище
        //     if (action.saveToApp) localStorage.setItem(action.field, JSON.stringify(new_data))
        //     // Вернем изменненый стейт
        //     return {
        //         ...state,
        //         [action.field]: new_data,
        //     }
        // }

        default: return state
    }

}