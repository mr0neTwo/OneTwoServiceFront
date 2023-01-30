const initialState = {
    employees: [],

    tabs: 0,
    edit: 0,
    showDeleted: false,
    role_title: '',

    first_name: '',
    last_name: '',
    name: '',
    email: '',
    notes: '',
    phone: '',
    avatar: '',
    img: '',
    login: '',
    password: '',
    role_id: 0,
    permissions: [],
    inn: '',
    doc_name: '',
    post: '',
    deleted: false,

    cashbox_permission: [],

    avaStartPosition: [0, 0],
    scale_img: 100
}

export const employeeReduscer = (state = initialState, action) => {
    switch (action.type) {

        case 'CHANGE_EMPLOYEE_STATE': {
            return {...Object.assign(state, action.data)}
        }


        case 'SET_ROLE_EMPLOYEE_EDITOR': {
            return {
                ...state,
                role_id: action.role
            }
        }

        case 'CHANGE_SHOW_DELETED': {
            return {
                ...state,
                showDeleted: !state.showDeleted
            }
        }

        case 'EDIT_EMPLOYEE': {
            return {
                ...state,
                edit: action.employee.id,
                first_name: action.employee.first_name || '',
                last_name: action.employee.last_name || '',
                name: action.employee.name || '',
                email: action.employee.email || '',
                notes: action.employee.notes || '',
                phone: action.employee.phone || '',
                login: action.employee.login || '',
                role_id: action.employee.role.id,
                role_title: action.employee.role.title || '',
                permissions: action.employee.permissions || [],
                inn: action.employee.inn || '',
                doc_name: action.employee.doc_name || '',
                post: action.employee.post || '',
                deleted: action.employee.deleted,
                avatar: action.employee.avatar
            }
        }

        case 'RESET_EMPLOYEE': {
            return {
                ...state,
                edit: 0,
                first_name: '',
                last_name: '',
                name: '',
                email: '',
                notes: '',
                phone: '',
                login: '',
                password: '',
                role_title: '',
                role_id: 0,
                permissions: [],
                inn: '',
                doc_name: '',
                post: '',
                deleted: false,
                avatar: '',
                img: ''
            }
        }


        default:
            return state
    }

}
