import { data_setting_menu } from '../../data/dataSettingRows'
import { data_menu_rows } from '../../data/dataSidebarRows'

const initialState = {
    ordersShow: [],
    count: 0,
    clientShow: [],
    count_clients: 0,
    menuRows: data_menu_rows,
    settingMenu: data_setting_menu,
    payments: [],

    employees: [],
    user: JSON.parse(sessionStorage.getItem('user')) || {},
    status: [],
    status_group: [],
    badges: [],
    order_type: [],
    equipment: [],
    discount_margin: [],
    roles: [],
    ad_campaign: [],
    generally_info: {},
    branches: [],
    cashboxes: [],
    payrules: [],
    payrolls: [],
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

 

    current_branch: {},

    token: sessionStorage.getItem('1xsndt') || '',
    login_status: false,
    error_message: '',
    url_server: process.env.PUBLIC_URL
    // url_server: 'http://192.168.1.48:80' // Домашний
    // url_server: 'http://192.168.43.224:5005' // Мобильный
    // url_server: 'http://172.16.6.218:5005' // КЕХУ
    // url_server: 'http://192.168.1.49:5005' // рабочий WiFI
    // url_server: 'http://5.53.124.252:80'
    // url_server: 'http://onetwonline.ru'
  
}

export const dataReducer = (state = initialState, action) => {


  switch (action.type) {

    case 'LOGIN': {
      return {
         ...state, 
         token: action.token
        }}

    case 'LOGUOT': {
      return {
         ...state, 
         token: '',
         login_status: false 
        }}

    case 'ADD_MENU_ROWS': {
      return {
         ...state, 
         menuRows: action.rows,
        }}

    case 'ADD_STATUS': {
      return {
         ...state, 
         status: action.status,
        }}

    case 'ADD_STATUS_GROUP': {
      return {
          ...state, 
          status_group: action.status_group,
        }}
    
    case 'ADD_ORDERS_SHOW': {
      return {
         ...state, 
         ordersShow: action.ordersShow,
         count: action.count
        }}

    case 'ADD_CLIENTS_SHOW': {
      return {
          ...state, 
          clientShow: action.clientShow,
          count_clients: action.count
        }}
    
    case 'ADD_EMPLOYEES': {
      return {
         ...state, 
         employees: action.employees,
        }}

    case 'ADD_USER': {
      return {
         ...state, 
         user: action.user,
         login_status: true 
        }}

    case 'ADD_BADGES': {
      return {
          ...state, 
          badges: action.badges
      }}


    case 'ADD_EQUIPMENT': {
      return {
        ...state,
        equipment: action.equipment
      }}

    case 'CHANGE_STATUS_MENU_ROW': {
      return {
      ...state,
      menuRows: state.menuRows.map(row => {
        return {
          ...row,
          active: row.id === action.id
        }})}} 

    
    case 'ADD_SETTING_MENU': {
    return {
        ...state, 
        settingMenu: action.rows.sort((a, b) => a.id - b.id),
      }}
      
    case 'CHANGE_STATUS_SETTING_ROW': {
      return {
        ...state,
        settingMenu: state.settingMenu.map(row => {
          return {
            ...row,
            active: row.id === action.id
          }})}} 



    case 'ADD_ROLES': {
      return {
          ...state, 
          roles: action.roles,
        }}

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

        case 'ACTIVE_CASHBOX': {
          return {
              ...state, 
              cashboxes: state.cashboxes.map(cashbox => {
                cashbox.active = cashbox.id === action.id
                return cashbox
              }),
            }
          }

    default:
      return state
  }
}
