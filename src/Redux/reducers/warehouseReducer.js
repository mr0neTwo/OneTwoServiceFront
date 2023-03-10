import {permission_warehouse} from "../../data/permissions";

const initialState = {

    warehouses: [],
    warehouse_categories: [],

    tabs: JSON.parse(localStorage.getItem('warehouse_tabs')) || 0,

    edit: 0,
    title: '',
    description: '',
    deleted: false,
    isGlobal: false,
    img_url: '',
    permissions: permission_warehouse,
    employees: {},
    branch: {},
    categories: [],
    img: '',

    branch_id: 0,
    permissions_employee: 0,

    title_category: '',
    parent_category_id: 0,
    category_deleted: false,

    current_category: {},
    current_parent_category: {},

    showDeleted: false
}


export const warehouseReducer = (state = initialState, action) => {
    switch (action.type){

        case 'CHANGE_WAREHOUSE_STATE': {
            const local_save = ['tabs']
            Object.keys(action.data).forEach(field => {
                if (local_save.includes(field)) localStorage.setItem(`warehouse_${field}`, JSON.stringify(action.data[field]))
            })
            return {...Object.assign(state, action.data)}
        }

        case 'CHANGE_WAREHOUSE_FORM': {
            return {
                ...state,
                [action.field]: action.value
            }
        }

        case 'EDIT_WAREHOUSE': {
            return {
                ...state,
                edit: action.warehouse.id,
                title: action.warehouse.title,
                description: action.warehouse.description,
                deleted: action.warehouse.deleted,
                isGlobal: action.warehouse.isGlobal,
                permissions: action.warehouse.permissions,
                employees: action.warehouse.employees,
                branch: action.warehouse.branch,
                categories: action.warehouse.categories,
                branch_id: action.warehouse.branch.id
            }
        }

        case 'EDIT_WAREHOUSE_CATEGORY': {
            return {
                ...state,
                edit: action.warehouse_category.id,
                title_category: action.warehouse_category.title,
                parent_category_id: action.warehouse_category.parent_category_id,
                category_deleted: action.warehouse_category.deleted,
            }
        }

        case 'RESET_WAREHOUSE': {
            return {
                ...state,
                edit: 0,
                title: '',
                description: '',
                deleted: false,
                isGlobal: false,
                permissions: permission_warehouse,
                employees: {},
                branch: {},
                categories: [],
                branch_id: 0,
                permissions_employee: 0,

                title_category: '',
                parent_category_id: 0,
                warehouse_id: 0,
                category_deleted: false

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

        case 'CHANGE_WAREHOUSE_PERMISSION': {

            // Вытаскиваем данные о разрешениях сотрудников из state
            let employees = state.employees
            // Данные имеют следующий json формат
            // const employees = {
            //    employee_id1: {
            //       available: true, // разрешен ли вообще доступ к кассе этого стортудника
            //       like_cashbox: true, // разрения которые есть у самой кассы ( if available is true )
            //       permissions: [permission_cahsbox] // список специальных разершений ( if available is true and like_cashbox is false )
            //    },
            //    emoloyee_id2: {...}
            // }
            // Если запись данных идет в поле permissions (список персональных разрешений)
            if (action.field === 'permissions') {
                // Если заначение value уже пресутствует в списке специальных разрешений текущего сотрудника (permissions_employee)
                if (employees[state.permissions_employee].permissions.includes(action.value)) {
                    // Удаляем значение value из списка специальных разрешений текущего сотрудника
                    employees[state.permissions_employee].permissions = employees[state.permissions_employee].permissions.filter(val => val !== action.value)
                    // Если значение value отсутсвует в списке персональных разрешений текущего сотрудника
                } else {
                    // Добавляем значение value в список персональных разрешений текущего сотрудника
                    employees[state.permissions_employee].permissions = employees[state.permissions_employee].permissions.concat([action.value])
                }
                // Если запись идет не в поле permissions текущего сотрудника
            } else {
                // Меняем значение этого поля на значение в value
                employees[state.permissions_employee][[action.field]] = action.value
            }
            // Возвращаем изменненый state
            return {
                ...state,
                employees: employees
            }

        }


        default: return state
    }

}