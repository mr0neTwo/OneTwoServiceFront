const initialState = {

    alerts: [],

    // menuRows: data_menu_rows,
    // current_menu_row: '',

    user: JSON.parse(sessionStorage.getItem('user')) || {},
    status: [],
    status_group: [],
    order_type: [],
    equipment: [],
    roles: [],
    ad_campaign: [],
    generally_info: {},
    payrules: [],
    group_dict_service: [],
    dict_service: [],

    counters: [],
    dictMalfunction: [],
    count_malfunction: 0,
    dictPackagelist: [],
    count_packagelist: 0,
    item_payments: [],
    count_item_payments: 0,

    // для изменения размера столбцов колонок
    position_cursor: 0,
    position_over: null,

    csrfToken: '',
    credentials: process.env.REACT_APP_CREDENTIALS,
    login_status: JSON.parse(sessionStorage.getItem('login_status')) || false,
    error_message: '',
    url_server: process.env.REACT_APP_URL_SERVER
}

export const dataReducer = (state = initialState, action) => {


    switch (action.type) {

        case 'CHANGE_DATA_STATE': {
            const session_save = ['login_status', 'user']
            Object.keys(action.data).forEach(field => {
                if (session_save.includes(field)) sessionStorage.setItem(field, JSON.stringify(action.data[field]))
            })
            return {...Object.assign(state, action.data)}
        }

        case 'SHOW_ALERT': {
            let alerts = state.alerts
            if (alerts.length >= 3) alerts.shift()
            return {
                ...state,
                alerts: alerts.concat([action.alert])
            }
        }
        case 'CLOSE_ALERT': {
            return {
                ...state,
                alerts: state.alerts.filter(alert => alert.id !== action.id)
            }

        }

        case 'ADD_MENU_ROWS': {
            return {
                ...state,
                menuRows: action.rows,
            }
        }

        case 'ADD_STATUS': {
            return {
                ...state,
                status: action.status,
            }
        }

        case 'ADD_STATUS_GROUP': {
            return {
                ...state,
                status_group: action.status_group,
            }
        }

        case 'ADD_EMPLOYEES': {
            return {
                ...state,
                employees: action.employees,
            }
        }

        case 'ADD_USER': {
            return {
                ...state,
                user: action.user,
                login_status: true
            }
        }

        case 'ADD_BADGES': {
            return {
                ...state,
                badges: action.badges
            }
        }


        case 'ADD_EQUIPMENT': {
            return {
                ...state,
                equipment: action.equipment
            }
        }



        case 'ADD_SETTING_MENU': {
            return {
                ...state,
                settingMenu: action.rows.sort((a, b) => a.id - b.id),
            }
        }


        case 'ADD_ROLES': {
            return {
                ...state,
                roles: action.roles,
            }
        }

        case 'ADD_AD_CAMPAIGN': {
            return {
                ...state,
                ad_campaign: action.ad_campaign,
            }
        }


        case 'ADD_DATA': {
            return {
                ...state,
                [action.field]: action.data,
            }
        }


        default:
            return state
    }
}
