import {data_setting_menu} from '../../data/dataSettingRows'
import {data_menu_rows} from '../../data/dataSidebarRows'

const initialState = {

    menuRows: data_menu_rows,
    current_menu_row: '',
    settingMenu: data_setting_menu,
    current_setting_menu_row: '',

    user: JSON.parse(sessionStorage.getItem('user')) || {},
    status: [],
    status_group: [],
    order_type: [],
    equipment: [],
    discount_margin: [],
    roles: [],
    ad_campaign: [],
    generally_info: {},
    payrules: [],
    group_dict_service: [],
    dict_service: [],
    service_prices: [],

    counters: [],
    dictMalfunction: [],
    count_malfunction: 0,
    dictPackagelist: [],
    count_packagelist: 0,
    item_payments: [],
    count_item_payments: 0,

    csrfToken: '',
    credentials: process.env.REACT_APP_CREDENTIALS,
    login_status: JSON.parse(sessionStorage.getItem('login_status')) || false,
    error_message: '',
    url_server: process.env.REACT_APP_URL_SERVER
    // url_server: process.env.PUBLIC_URL
    // url_server: 'http://192.168.1.48:80' // Домашний
    // url_server: 'http://192.168.43.224:80' // Мобильный
    // url_server: 'http://10.6.1.26:80/' // VPN

    // url_server: 'http://172.16.6.218:5005' // КЕХУ
    // url_server: 'http://192.168.1.49:80' // рабочий WiFI
    // url_server: 'http://5.53.124.252:80'
    // url_server: 'http://onetwonline.ru'

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

        case 'LOGIN': {
            return {
                ...state,
                token: action.token
            }
        }

        case 'LOGUOT': {
            return {
                ...state,
                token: '',
                login_status: false
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
