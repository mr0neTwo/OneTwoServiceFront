import {Table} from '../../data/tableHeaders'
import {includesObject} from '../../components/general/utils'

const now = new Date()

const initialState = {

    registrations: [],
    registrations_count: 0,

    edit: 0,

    label: '',
    number: '',
    created_at: 0,
    custom_created_at: now / 1000,
    deleted: false,
    description: '',
    price: 0,
    parts: [],
    client: {},
    warehouse: {},
    employee: {},
    employee_id: 0,
    inventory_id: 0,

    edit_part: 0,
    part: {},
    count: 1,
    buy_cost: 0,
    cell: '',
    seller: '',
    where_to_buy: '',
    prices: [],

    table_headers: JSON.parse(localStorage.getItem('registration_table_headers')) || Table.Fields.Registration,

    showDeleted: false,
    filter_created_at: JSON.parse(localStorage.getItem('registration_filter_created_at')) ||  [
        parseInt(now.setHours(0, 0, 0, 0) / 1000),
        parseInt(now.setHours(23, 59, 59, 999) / 1000)
    ],
    page: 0

}

/*
part = {
    buy_cost: 0,
    cell: "BOX-6 A5",
    count: 49,
    prices: [],
    seller: "",
    where_to_buy: "",
    part: {
        article: "",
        barcode: "",
        code: "",
        deleted: false,
        description: "",
        doc_url: null,
        earnings_percent: 0,
        earnings_sum: 0,
        id: 283,
        image_url: null,
        marking: "",
        prices: [],
        specifications: {},
        title: "IR6004-12",
        warehouse_category: {},
        warranty_period: 0
    }
}
 */

export const registrationReducer = (state=initialState, action) => {
    switch (action.type){

        case 'CHANGE_REGISTRATION_STATE': {
            const local_save = ['filter_created_at', 'table_headers']
            Object.keys(action.data).forEach(field => {
                if (local_save.includes(field)) localStorage.setItem(`registration_${field}`, JSON.stringify(action.data[field]))
            })
            return {...Object.assign(state, action.data)}
        }


        case 'EDIT_REGISTRATION': {
            return {
                ...state,
                edit: action.registration.id,
                label: action.registration.label,
                number: action.registration.number,
                created_at: action.registration.created_at,
                custom_created_at: action.registration.custom_created_at,
                deleted: action.registration.deleted,
                description: action.registration.description,
                parts: action.registration.parts,
                client: action.registration.client,
                warehouse: action.registration.warehouse,
                employee_id: action.registration.employee_id,
                inventory_id: action.registration.inventory_id
            }
        }


        case 'RESET_REGISTRATION': {
            return {
                ...state,
                edit: 0,

                label: '',
                number: '',
                created_at: 0,
                custom_created_at: now / 1000,
                deleted: false,
                description: '',
                price: 0,
                parts: [],
                client: {},
                warehouse: {},
                employee: {},
                employee_id: 0,
                inventory_id: 0
            }
        }

        case 'RESET_REGISTRATION_PART': {
            return {
                ...state,
                edit_part: 0,
                part: {},
                count: 1,
                buy_cost: 0,
                cell: '',
                seller: '',
                where_to_buy: '',

                prices: []
            }
        }

        case 'SELECTED_REGISTRATION': {
            // ???????????? ???????????????????? ?????? ???????????????? ????????????
            let new_data
            // ???????????????? ???????? ???????????????? value ?? ???????????? ?????? ????????????????????????
            if (action.value.every(val => includesObject(val, state[action.field]))) {
                // ???????? ???????? ???????????? ?????? ????????????????
                new_data = state[action.field].filter(val => !includesObject(val, action.value))
            } else {
                // ???????? ?????? ?????????????? ?????? ????????????????
                new_data = state[action.field].concat(action.value.filter(val => !includesObject(val, state[action.field])))
            }
            console.log(action.saveToApp)
            // ???????? ???????? saveToApp ???????????????????? ???????????????? ???????????? ???? ?????????????????? ??????????????????
            if (action.saveToApp) localStorage.setItem('registration_' + action.field, JSON.stringify(new_data))
            // ???????????? ???????????????????? ??????????
            return {
                ...state,
                [action.field]: new_data,
            }
        }

        case 'ADD_REGISTRATION_PART': {
            return {
                ...state,
                parts: state.parts.concat([{
                    part: state.part,
                    count: state.count,
                    buy_cost: state.buy_cost,
                    seller: state.seller,
                    where_to_buy: state.where_to_buy,
                    cell: state.cell,
                    prices: state.prices
                }])
            }
        }

        case 'EDIT_REGISTRATION_PART': {

            return {
                ...state,
                edit_part: action.idx,
                part: action.part.part,
                count: action.part.count,
                buy_cost: action.part.buy_cost,
                cell: action.part.cell,
                seller: action.part.seller,
                where_to_buy: action.part.where_to_buy,

                prices: action.part.part.prices
            }
        }


        case 'DELETE_REGISTRATION_PART': {

            let new_parts = state.parts
            new_parts.splice(action.idx, 1)

            return {
                ...state,
                parts: new_parts
            }
        }

        case 'SAVE_REGISTRATION_PART': {
            return {
                ...state,
                parts: state.parts.map((part, idx) => {
                    if (idx + 1 === action.idx) {
                        part.part = state.part
                        part.count = state.count
                        part.buy_cost = state.buy_cost
                        part.cell = state.cell
                        part.seller = state.seller
                        part.where_to_buy = state.where_to_buy
                        part.prices = state.prices
                        return part
                    } else {
                        return part
                    }
                })
            }
        }


        // case 'SELECTED_OBJECT_REGISTRATION': {
        //     // ???????????? ???????????????????? ?????? ???????????????? ????????????
        //     let new_data
        //     // ???????????????? ???????? ???????????????? value ?? ???????????? ?????? ????????????????????????
        //     if (action.value.map(val => val.id).every(val => state[action.field].map(val => val.id).includes(val))) {
        //         // ???????? ???????? ???????????? ?????? ????????????????
        //         new_data = state[action.field].filter(val => !action.value.map(val => val.id).includes(val.id))
        //     } else {
        //         // ???????? ?????? ?????????????? ?????? ????????????????
        //         new_data = state[action.field].concat(action.value.filter(val => !state[action.field].map(val => val.id).includes(val.id)))
        //     }
        //     // ???????? ???????? saveToApp ???????????????????? ???????????????? ???????????? ???? ?????????????????? ??????????????????
        //     if (action.saveToApp) localStorage.setItem(action.field, JSON.stringify(new_data))
        //     // ???????????? ???????????????????? ??????????
        //     return {
        //         ...state,
        //         [action.field]: new_data,
        //     }
        // }

        default: return state
    }

}