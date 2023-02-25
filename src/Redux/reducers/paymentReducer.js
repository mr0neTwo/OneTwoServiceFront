const now = new Date()
const key = 'payment_'

const initialState = {

    payments: [],

    edit: 0,
    sum: 0,
    title: '',

    cashflow_category: {},
    description: '',

    deposit: 0,
    income: '',
    outcome: '',
    direction: 0,

    can_print_fiscal: false,
    deleted: false,
    is_fiscal: false,

    created_at: 0,
    custom_created_at: null,

    tags: [],

    relation_type: 0,
    relation_id: null,

    target_cashbox: {},
    cashbox: {},
    client: {},
    employee: {},
    order_id: 0,

    filter_created_at: [
        parseInt(now.setHours(0, 0, 0, 0) / 1000),
        parseInt(now.setHours(23, 59, 59, 999) / 1000)
    ],
    filter_tags: [],

    showLoader: false,

    current_type: 0,
    context: {}
}

export const paymentReducer = (state = initialState, action) => {
    switch (action.type) {

        case 'CHANGE_PAYMENT_STATE': {
            const local_save = ['']
            Object.keys(action.data).forEach(field => {
                if (local_save.includes(field)) localStorage.setItem(key + field, JSON.stringify(action.data[field]))
            })
            return {...Object.assign(state, action.data)}
        }

        case 'CHOOSE_PAYMENT_SELECTED': {
            if (action.id.every(id => state[action.field].includes(id))) {
                return {
                    ...state,
                    [action.field]: state[action.field].filter(id => !action.id.includes(id)),
                }
            } else {
                return {
                    ...state,
                    [action.field]: state[action.field].concat(action.id.filter(id => !state[action.field].includes(id))),
                }
            }
        }

        case 'ADD_PAYMENT_TAG': {

            return {
                ...state,
                tags: state.tags.concat([action.tag])
            }
        }

        case 'DELETE_PAYMENT_TAG': {

            let tags_list = state.tags
            tags_list.splice(action.idx, 1)

            return {
                ...state,
                tags: tags_list
            }
        }


        case 'RESET_PAYMENTS': {

            return {
                ...state,
                edit: 0,
                sum: 0,
                title: '',

                cashflow_category: {},
                description: '',

                deposit: 0,
                income: '',
                outcome: '',
                direction: 0,

                can_print_fiscal: true,
                deleted: false,
                is_fiscal: false,

                created_at: 0,
                custom_created_at: 0,

                tags: [],

                relation_type: 0,
                relation_id: null,

                target_cashbox: {},
                cashbox: {},
                client: {},
                employee: {},
                order_id: 0,

                context: {}
            }
        }

        case 'SET_PAYMENT': {

            return {
                ...state,
                edit: action.payment.id,

                cashflow_category: action.payment.cashflow_category,
                description: action.payment.description,

                deposit: action.payment.deposit,
                income: action.payment.income,
                outcome: action.payment.outcome,
                direction: action.payment.direction,

                can_print_fiscal: action.payment.can_print_fiscal,
                deleted: action.payment.deleted,
                is_fiscal: action.payment.is_fiscal,

                created_at: action.payment.created_at,
                custom_created_at: action.payment.custom_created_at,

                tags: action.payment.tags,

                relation_type: action.payment.relation_type,
                relation_id: action.payment.relation_id,

                cashbox: action.payment.cashbox,
                client: action.payment.client,
                employee: action.payment.employee,
                order: action.payment.order,
                target_cashbox: action.payment.target_cashbox,
            }
        }


        default:
            return state
    }

}
