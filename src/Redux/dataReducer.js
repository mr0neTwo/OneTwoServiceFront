import { data_setting_menu } from '../data/dataSettingRows'
import { data_menu_rows } from '../data/dataSidebarRows'

const initialState = {
  ordersShow: [],
  count: 0,
  clientShow: [],
  count_clients: 0,
  menuRows: data_menu_rows,
  settingMenu: data_setting_menu,

  employees: [],
  user: {},
  status: [],
  status_group: [],
  badges: [],
  order_type: [],
  equipment: [],
  discount_margin: [],
  roles: [],

  token: '',
  login_status: false,
  url_server: 'http://192.168.1.48:5005'
  // url_server: 'http://192.168.43.224:5005'
  
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
    
    case 'ADD_EMPLOOYS': {
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

    case 'ADD_ORDER_TYPE': {
      return {
          ...state, 
          order_type: action.order_type
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
          active: row.id === action.id ? true : false
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
            active: row.id === action.id ? true : false
          }})}} 

    case 'ADD_DISCOUNT_MARGIN': {
      return {
          ...state, 
          discount_margin: action.margin,
        }}

    case 'ADD_ROLES': {
      return {
          ...state, 
          roles: action.roles,
        }}

    default:
      return state
  }
}
