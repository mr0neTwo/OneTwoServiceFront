const initialState = {

    warehouses: [],
    tabs: 0,

    edit: 0,
    title: '',
    description: '',
    deleted: false,
    isGlobal: false,
    permissions: ['show_warehouse_remains', 'warehouse_registration', 'move_in', 'return_from_client', 'write_off',
                    'move_out', 'add_to_order', 'add_to_sale', 'return_to_supplier'],
    branch: {},
    categories: [],

    branch_id: 0,
    permissions_employee: 0
}


export const warehouseReducer = (state = initialState, action) => {
    switch (action.type){

        case 'CHANGE_WAREHOUSE_FORM': {
            return {
                ...state,
                [action.field]: action.value
            }
        }

        case 'EDIT_WAREHOUSE': {
            return {
                ...state,
                title: action.warehouse.title,
                description: action.warehouse.description,
                deleted: action.warehouse.deleted,
                isGlobal: action.warehouse.isGlobal,
                permissions: action.warehouse.permissions,
                branch: action.warehouse.branch,
                categories: action.warehouse.categories,
                branch_id: action.warehouse.branch.id
            }
        }

        case 'RESET_WAREHOUSE': {
            return {
                ...state,
                tabs: 0,
                edit: 0,
                title: '',
                description: '',
                deleted: false,
                isGlobal: false,
                permissions: ['show_warehouse_remains', 'warehouse_registration', 'move_in', 'return_from_client',
                    'write_off', 'move_out', 'add_to_order', 'add_to_sale', 'return_to_supplier'],
                branch: {},
                categories: [],
                branch_id: 0,
                permissions_employee: 0
            }
        }

        case 'SELECTED_WAREHOUSE': {
            if (action.value.every(val => state[action.field].includes(val))) {
                return {
                    ...state,
                    [action.field]: state[action.field].filter(val => !action.value.includes(val)),
                }
            } else {
                return {
                    ...state,
                    [action.field]: state[action.field].concat(action.value.filter(val => !state[action.field].includes(val)))
                }
            }
        }


        default: return state
    }

}