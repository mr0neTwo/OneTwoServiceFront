import store from "./store"
import {bad_request, getRequestConfig} from './actions/actionUtils'

export function addUserAction(user) {
    return {
        type: 'ADD_USER',
        user: user
    }
}

export function initStatusMenuVisibleAction(list_id) {
    return {
        type: 'INIT_STATUS_MENU_VISIBLE',
        data: list_id
    }
}

export function changeStatusMenuVisible(id_order) {
    return {
        type: 'CANGE_STATUS_MENU_VISIBLE',
        id_order: id_order
    }
}




export function changeTitleCreateRole(title) {
    return {
        type: 'CHANGE_TITLE_CREATE_ROLE',
        title
    }
}

export function changePermissions(value) {
    return {
        type: 'CHANGE_PERMISSION',
        value
    }
}

export function cahngeEarningsVisibility(bool) {
    return {
        type: 'CHANGE_EARNINGS_VISIBILITY',
        bool
    }
}

export function cahngeLeadsVisibility(bool) {
    return {
        type: 'CHANGE_LEADS_VISIBILITY',
        bool
    }
}

export function cahngeOrdersVisibility(bool) {
    return {
        type: 'CHANGE_ORDERS_VISIBILITY',
        bool
    }
}

export function changeVisibleStatuses(id) {
    return {
        type: 'CHANGE_VISIBLE_STATUSES',
        id
    }
}

export function changeSettableStatuses(id) {
    return {
        type: 'CHANGE_SETTABLE_STATUSES',
        id
    }
}

export function changeSettableMargin(id) {
    return {
        type: 'CHANGE_SETTABLE_MARGIN',
        id
    }
}

export function editRole(role) {
    return {
        type: 'EDIT_ROLE',
        role
    }
}

export function setVisibleFlag(field, value) {
    return {
        type: 'SET_VISIBLE_FLAG',
        field,
        value
    }
}

export function changeVisibleState( data ) {
    return {
        type: 'CHANGE_VISIBLE_STATE',
        data
    }
}

export function setVisibleListFlag(field, idx, value) {
    return {
        type: 'SET_VISIBLE_LIST_FLAG',
        field,
        idx,
        value
    }
}

export function addVisibleFlag(field) {
    return {
        type: 'ADD_FLAG',
        field
    }
}

export function deleteVisibleFlag(field, idx) {
    return {
        type: 'DELETE_FLAG',
        field,
        idx
    }
}



export function changeOrderForm(idx, field, value) {
    return {
        type: 'CHANGE_ORDER_FORM',
        idx,
        field,
        value
    }
}


export function addAnotherEquipment() {
    return {
        type: 'ADD_ANOTHER_EQUIPMENT'
    }
}


export function deleteDevice(idx) {
    return {
        type: 'DELETE_DEVICE',
        idx
    }
}


export function changeOrderFormS(value, field) {
    return {
        type: 'CHANGE_ORDER_FORM_S',
        field,
        value
    }
}


export function changeMaindataForm(field, value) {
    return {
        type: 'CHANGE_MAINDATA_FORM',
        field,
        value
    }
}


export function chooseEquipmentBranches(id) {
    return {
        type: 'CHOOSE_EQUIPMENT_BRANCHES',
        id
    }
}


export function editEquipment(equipment) {
    return {
        type: 'EDIT_EQUIPMENT',
        equipment
    }
}

export function addData(data, field) {
    return {
        type: 'ADD_DATA',
        data,
        field
    }
}

export function editCurrentClient(client) {
    return {
        type: 'EDIT_CURRENT_CLIENT',
        client
    }
}


export function setPayment(payment) {
    return {
        type: 'SET_PAYMENT',
        payment
    }
}





export function changeDictServiceForm(value, field) {
    return {
        type: 'CHANGE_DICT_SERVICE_FORM',
        field,
        value
    }
}

export function resetGruopDictService() {
    return {
        type: 'RESET_GROPE_DICT_SERVICE'
    }
}

export function editGroupDictService(group) {
    return {
        type: 'EDIT_GRUOP_DICT_SERVICE',
        group
    }
}

export function resetService() {
    return {
        type: 'RESET_SERVICE'
    }
}


export function selectedService(value, field, saveToApp=false) {
    return {
        type: 'SELECTED_SERVICE',
        field,
        value,
        saveToApp
    }
}


export function editDictService(service) {
    return {
        type: 'EDIT_SERVICE',
        service
    }
}

export function showAlert(dispatch, type, text) {
    const alert = {
        id: parseInt(Date.now() / 1000),
        type,
        text
    }
    dispatch({
        type: 'SHOW_ALERT',
        alert
    })
    setTimeout(() => {
        dispatch({
            type: 'CLOSE_ALERT',
            id: alert.id
        })
    }, 3000)
}

export function log_in(login, password) {

    const state = store.getState()

    return dispatch => {

        fetch(state.data.url_server + "/flogin", {
            method: "POST",
            headers: {
                // 'Accept': 'application/json, text/javascript, */*; q=0.01',
                "Content-Type": "application/json",
                "X-CSRFToken": state.data.csrfToken
            },
            credentials: state.data.credentials,
            body: JSON.stringify({email: login, password: password}),
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    dispatch({
                        type: 'CHANGE_DATA_STATE',
                        data: {login_status: true}
                    })
                } else {
                    dispatch({
                        type: 'CHANGE_DATA_STATE',
                        data: {error_message: data.message, login_status: false},
                    })
                    console.warn(data.message)
                }
            })
            .catch(error => bad_request(dispatch, error,'Запрос авторизации не выполнен'))
    }
}



export const csrf = () => {

    const state = store.getState()

    if (state.data.credentials === 'include') {
        return dispatch => {

            fetch(state.data.url_server + "/getcsrf", {credentials: state.data.credentials})
                .then((res) => {
                    dispatch({
                        type: 'CHANGE_DATA_STATE',
                        data: {csrfToken: res.headers.get(["X-CSRFToken"])}
                    })
                })
                .catch((err) => {
                    console.log(err);
                })
        }
    } else {
        return dispatch => {
            dispatch({
                type: 'CHANGE_DATA_STATE',
                data: {csrfToken: document.getElementsByName("csrf-token")[0].content}
            })
        }
    }
}

//===========================================================================================================================


export function addAdCampaign() {

    const state = store.getState()

    return dispatch => {

        fetch(state.data.url_server + '/get_ad_campaign', getRequestConfig())
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    dispatch({
                        type: 'ADD_AD_CAMPAIGN',
                        ad_campaign: data.data,
                    })
                } else {
                    console.warn(data.message)
                }
            })
            .catch(error => bad_request(dispatch, error,'Запрос рекламных компаний не выполнен'))
    }
}



export function addStatus() {

    const state = store.getState()

    return dispatch => {

        fetch(state.data.url_server + '/get_status', getRequestConfig())
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    dispatch({
                        type: 'ADD_STATUS',
                        status: data.data,
                    })
                } else {
                    console.warn(data.message)
                }
            })
            .catch(error => bad_request(dispatch, error, 'Запрос статусов не выполнен'))
    }
}

export function refreshDataOrder(order_id) {

    const state = store.getState()

    let request_config = getRequestConfig({
        id: order_id
    })

    return async dispatch => {

        await fetch(state.data.url_server + '/get_orders', request_config)
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    dispatch({
                        type: 'EDIT_ORDER',
                        order: data.data[0],
                    })
                } else {
                    console.warn(data.message)
                }
            })
            .catch(error => bad_request(dispatch, error, 'Запрос на обновление заказа не выполнен'))
    }
}

export function addStatusGroupAction() {

    const state = store.getState()

    return dispatch => {

        fetch(state.data.url_server + '/get_status_group', getRequestConfig())
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    dispatch({
                        type: 'ADD_STATUS_GROUP',
                        status_group: data.data,
                    })
                } else {
                    console.warn(data.message)
                }
            })
            .catch(error => bad_request(dispatch, error, 'Запрос групп статусов не выполнен'))
    }
}

export function addEquipment() {

    const state = store.getState()

    return dispatch => {

        fetch(state.data.url_server + '/get_equipment_type', getRequestConfig())
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    dispatch({
                        type: 'ADD_EQUIPMENT',
                        equipment: data.data,
                    })
                } else {
                    console.warn(data.message)
                }
            })
            .catch(error => bad_request(dispatch, error, 'Запрос типов изделий не выполнен'))
    }
}














export function createRole() {

    const state = store.getState()

    const request_config = getRequestConfig({
        title: state.role.title_create,
        earnings_visibility: state.role.earnings_visibility,
        leads_visibility: state.role.leads_visibility,
        orders_visibility: state.role.orders_visibility,
        permissions: state.role.list_permissions,
        settable_statuses: state.role.settable_statuses,
        visible_statuses: state.role.visible_statuses,
        settable_discount_margin: state.role.settable_discount_margin
    })

    return async dispatch => {

        await fetch(state.data.url_server + '/roles', request_config)
            .catch(error => bad_request(dispatch, error, 'Запрос на создание роли не выполнен'))

        await fetch(state.data.url_server + '/get_roles', getRequestConfig())
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    dispatch({
                        type: 'ADD_ROLES',
                        roles: data.data,
                    })
                    dispatch({
                        type: 'SET_VISIBLE_FLAG',
                        field: 'statusCreateNewRole',
                        value: false
                    })
                } else {
                    console.warn(data.message)
                }
            })
            .catch(error => bad_request(dispatch, error, 'Запрос ролей не выполнен'))
    }
}


export function addRoles() {

    const state = store.getState()

    return dispatch => {
        fetch(state.data.url_server + '/get_roles', getRequestConfig())
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    dispatch({
                        type: 'ADD_ROLES',
                        roles: data.data,
                    })
                } else {
                    console.warn(data.message)
                }
            })
            .catch(error => bad_request(dispatch, error, 'Запрос ролей не выполнен'))
    }
}


export function seveEditRole() {

    const state = store.getState()

    let request_config = getRequestConfig({
        id: state.role.edit,
        title: state.role.title_create,
        earnings_visibility: state.role.earnings_visibility,
        leads_visibility: state.role.leads_visibility,
        orders_visibility: state.role.orders_visibility,
        permissions: state.role.list_permissions,
        settable_statuses: state.role.settable_statuses,
        visible_statuses: state.role.visible_statuses,
        settable_discount_margin: state.role.settable_discount_margin
    })
    request_config.method = 'PUT'

    return async dispatch => {

        await fetch(state.data.url_server + '/roles', request_config)
            .catch(error => bad_request(dispatch, error, 'Запрос на изменение роли не выполнен'))

        await fetch(state.data.url_server + '/get_roles', getRequestConfig())
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    dispatch({
                        type: 'ADD_ROLES',
                        roles: data.data,
                    })
                    dispatch({
                        type: 'SET_VISIBLE_FLAG',
                        field: 'statusCreateNewRole',
                        value: false
                    })
                } else {
                    console.warn(data.message)
                }
            })
            .catch(error => bad_request(dispatch, error, 'Запрос ролей не выполнен'))
    }
}


export function deleteRole() {

    const state = store.getState()

    let request_config = getRequestConfig({id: state.role.edit})
    request_config.method = 'DELETE'

    return async dispatch => {

        await fetch(state.data.url_server + '/roles', request_config)
            .catch(error => bad_request(dispatch, error, 'Запрос на удаление роли не выполнен'))


        await fetch(state.data.url_server + '/get_roles', getRequestConfig())
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    dispatch({
                        type: 'ADD_ROLES',
                        roles: data.data,
                    })
                    dispatch({
                        type: 'SET_VISIBLE_FLAG',
                        field: 'statusCreateNewRole',
                        value: false
                    })
                } else {
                    console.warn(data.message)
                }
            })
            .catch(error => bad_request(dispatch, error, 'Запрос ролей не выполнен'))
    }
}


export function addMainData() {

    const state = store.getState()

    const request_config = getRequestConfig({})

    return dispatch => {

        fetch(state.data.url_server + '/get_main_data', request_config)
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    dispatch({
                        type: 'CHANGE_DATA_STATE',
                        data: {
                            generally_info: data.generally_info,
                            user: data.user,
                            order_type: data.order_type,
                            counters: data.counts,
                            ad_campaign: data.ad_campaign,
                            item_payments: data.item_payments,
                            status_group: data.status_group
                        }
                    })
                    dispatch({
                        type: 'CHANGE_PRICE_STATE',
                        data: {
                            service_prices: data.service_prices,
                            discount_margin: data.discount_margin
                        }
                    })
                    dispatch({
                        type: 'CHANGE_BRANCH_STATE',
                        data: {branches: data.branch},
                    })
                    dispatch({
                        type: 'CHANGE_CASHBOX_STATE',
                        data: {cashboxes: data.cashboxes}
                    })
                    dispatch({
                        type: 'CHANGE_EMPLOYEE_STATE',
                        data: {employees: data.employees}
                    })
                    // dispatch({
                    //     type: 'CHANGE_WAREHOUSE_STATE',
                    //     data: {employees: data.employees}
                    // })
                } else {
                    console.warn(data.message)
                }
            })
            .catch(error => bad_request(dispatch, error, 'Запрос основных данных не выполнен'))
    }
}


export function saveGenerallyInfo() {

    const state = store.getState()

    let request_config = getRequestConfig({
        id: 1,
        name: state.maindata.name,
        address: state.maindata.address,
        email: state.maindata.email,

        ogrn: state.maindata.ogrn,
        inn: state.maindata.inn,
        kpp: state.maindata.kpp,
        juridical_address: state.maindata.juridical_address,
        director: state.maindata.director,
        bank_name: state.maindata.bank_name,
        settlement_account: state.maindata.settlement_account,
        corr_account: state.maindata.corr_account,
        bic: state.maindata.bic,

        description: state.maindata.description,
        phone: state.maindata.phone,
        logo: state.maindata.logo
    })
    request_config.method = 'PUT'

    return async dispatch => {


        await fetch(state.data.url_server + '/generally_info', request_config)
            .catch(error => bad_request(dispatch, error, 'Запрос изменение основных данных компании не выполнен'))

        await fetch(state.data.url_server + '/get_generally_info', getRequestConfig())
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    dispatch({
                        type: 'ADD_GENERALLY_INFO',
                        data: data.data,
                    })
                } else {
                    console.warn(data.message)
                }
            })
            .catch(error => bad_request(dispatch, error, 'Запрос основных данных компании не выполнен'))
    }
}


export function addCounters() {

    const state = store.getState()

    return dispatch => {

        fetch(state.data.url_server + '/get_counts', getRequestConfig({}))
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    dispatch({
                        type: 'ADD_DATA',
                        field: 'counters',
                        data: data.data
                    })
                } else {
                    console.warn(data.message)
                }
            })
            .catch(error => bad_request(dispatch, error, 'Запрос счетчиков не выполнен'))
    }
}




export function addDictMalfunction() {

    const state = store.getState()

    const request_config = getRequestConfig({
        page: state.book.page_malfunction
    })

    return dispatch => {

        fetch(state.data.url_server + '/get_malfunction', request_config)
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    dispatch({
                        type: 'ADD_DATA',
                        field: 'dictMalfunction',
                        data: data.data
                    })
                    dispatch({
                        type: 'ADD_DATA',
                        field: 'count_malfunction',
                        data: data.count
                    })
                } else {
                    console.warn(data.message)
                }
            })
            .catch(error => bad_request(dispatch, error, 'Запрос словарая неисправностей не выполнен'))
    }
}

export function createBookElement() {

    const state = store.getState()

    const url_list = ['malfunction', 'packagelist', 'item_payments']
    const field_list = ['dictMalfunction', 'dictPackagelist', 'item_payments']

    const request_config = getRequestConfig({
        title: state.book.title,
        direction: state.book.direction
    })

    return async dispatch => {

        await fetch(state.data.url_server + `/${url_list[state.book.type]}`, request_config)
            .catch(error => bad_request(dispatch, error, 'Запрос на создание записи в словарь не выполнен'))

        await fetch(state.data.url_server + `/get_${url_list[state.book.type]}`, getRequestConfig())
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    dispatch({
                        type: 'ADD_DATA',
                        field: field_list[state.book.type],
                        data: data.data
                    })
                    dispatch({
                        type: 'ADD_DATA',
                        field: `count_${url_list[state.book.type]}`,
                        data: data.count
                    })
                } else {
                    console.warn(data.message)
                }
            })
            .catch(error => bad_request(dispatch, error, 'Запрос данных словаря не выполнен'))
    }
}

export function deleteBookElements() {

    const state = store.getState()

    const url_list = ['malfunction', 'packagelist', 'item_payments']
    const field_list = ['dictMalfunction', 'dictPackagelist', 'item_payments']

    let request_config = getRequestConfig({
        del_ids: state.book[`selected_${url_list[state.book.type]}`]
    })
    request_config.method = 'DELETE'

    return async dispatch => {

        await fetch(state.data.url_server + `/${url_list[state.book.type]}`, request_config)
            .catch(error => bad_request(dispatch, error, 'Запрос на удаление записи соваря не выполнен'))

        await fetch(state.data.url_server + `/get_${url_list[state.book.type]}`, getRequestConfig())
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    dispatch({
                        type: 'ADD_DATA',
                        field: field_list[state.book.type],
                        data: data.data
                    })
                    dispatch({
                        type: 'ADD_DATA',
                        field: `count_${url_list[state.book.type]}`,
                        data: data.count
                    })
                } else {
                    console.warn(data.message)
                }
            })
            .catch(error => bad_request(dispatch, error, 'Запрос данных словаря не выполнен'))
    }
}

export function addDictPackagelist() {

    const state = store.getState()

    const request_config = getRequestConfig({
        page: state.book.page_packagelist
    })

    return dispatch => {

        fetch(state.data.url_server + '/get_packagelist', request_config)
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    dispatch({
                        type: 'ADD_DATA',
                        field: 'dictPackagelist',
                        data: data.data
                    })
                    dispatch({
                        type: 'ADD_DATA',
                        field: 'count_packagelist',
                        data: data.count
                    })
                } else {
                    console.warn(data.message)
                }
            })
            .catch(error => bad_request(dispatch, error, 'Запрос списка комплектаций не выполнен'))
    }
}

export function addItemPayments() {

    const state = store.getState()

    const request_config = getRequestConfig({
        page: state.book.page_item_payments
    })

    return dispatch => {

        fetch(state.data.url_server + '/get_item_payments', request_config)
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    dispatch({
                        type: 'ADD_DATA',
                        field: 'item_payments',
                        data: data.data
                    })
                    dispatch({
                        type: 'ADD_DATA',
                        field: 'count_item_payments',
                        data: data.count
                    })
                } else {
                    console.warn(data.message)
                }
            })
            .catch(error => bad_request(dispatch, error, 'Запрос статей плтатежей не выполнен'))
    }
}



export function addGroupeService() {

    const state = store.getState()

    return async dispatch => {

        await fetch(state.data.url_server + '/get_group_dict_service', getRequestConfig({}))
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    dispatch({
                        type: 'ADD_DATA',
                        field: 'group_dict_service',
                        data: data.data,
                    })
                } else {
                    console.warn(data.message)
                }
            })
            .catch(error => bad_request(dispatch, error, 'Запрос категорий не выполнен'))
    }
}

export function createGroupDictService() {

    const state = store.getState()

    const request_config = getRequestConfig({
        title: state.dictService.group_title,
        deleted: false
    })

    return async dispatch => {

        await fetch(state.data.url_server + '/group_dict_service', request_config)
            .catch(error => bad_request(dispatch, error, 'Запрос на создание категории не выполнен'))

        await fetch(state.data.url_server + '/get_group_dict_service', getRequestConfig({}))
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    dispatch({
                        type: 'ADD_DATA',
                        field: 'group_dict_service',
                        data: data.data,
                    })
                    dispatch({
                        type: 'SET_VISIBLE_FLAG',
                        field: 'statusGroupServiceEditor',
                        value: false
                    })
                    dispatch({
                        type: 'RESET_GROPE_DICT_SERVICE'
                    })
                } else {
                    console.warn(data.message)
                }
            })
            .catch(error => bad_request(dispatch, error, 'Запрос категорий не выполнен'))
    }
}

export function saveGroupDictService() {

    const state = store.getState()

    let request_config = getRequestConfig({
        id: state.dictService.group_edit,
        title: state.dictService.group_title
    })
    request_config.method = 'PUT'

    return async dispatch => {

        await fetch(state.data.url_server + '/group_dict_service', request_config)
            .catch(error => bad_request(dispatch, error, 'Запрос на создание категории не выполнен'))

        await fetch(state.data.url_server + '/get_group_dict_service', getRequestConfig({}))
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    dispatch({
                        type: 'ADD_DATA',
                        field: 'group_dict_service',
                        data: data.data,
                    })
                    dispatch({
                        type: 'SET_VISIBLE_FLAG',
                        field: 'statusGroupServiceEditor',
                        value: false
                    })
                    dispatch({
                        type: 'RESET_GROPE_DICT_SERVICE'
                    })
                } else {
                    console.warn(data.message)
                }
            })
            .catch(error => bad_request(dispatch, error, 'Запрос категорий не выполнен'))
    }
}

export function deleteGroupDictService(flag) {

    const state = store.getState()

    let request_config = getRequestConfig({
        id: state.dictService.group_edit,
        deleted: flag
    })
    request_config.method = 'PUT'

    return async dispatch => {

        await fetch(state.data.url_server + '/group_dict_service', request_config)
            .catch(error => bad_request(dispatch, error, 'Запрос на создание категории не выполнен'))

        await fetch(state.data.url_server + '/get_group_dict_service', getRequestConfig({}))
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    dispatch({
                        type: 'ADD_DATA',
                        field: 'group_dict_service',
                        data: data.data,
                    })
                    dispatch({
                        type: 'SET_VISIBLE_FLAG',
                        field: 'statusGroupServiceEditor',
                        value: false
                    })
                    dispatch({
                        type: 'RESET_GROPE_DICT_SERVICE'
                    })
                } else {
                    console.warn(data.message)
                }
            })
            .catch(error => bad_request(dispatch, error, 'Запрос категорий не выполнен'))
    }
}

export function addDictService() {

    const state = store.getState()

    const request_config = getRequestConfig({
        category_id: state.dictService.seted_categiry
    })

    return async dispatch => {

        await fetch(state.data.url_server + '/get_dict_service', request_config)
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    dispatch({
                        type: 'ADD_DATA',
                        field: 'dict_service',
                        data: data.data,
                    })
                } else {
                    console.warn(data.message)
                }
            })
            .catch(error => bad_request(dispatch, error, 'Запрос услуг не выполнен'))
    }
}

export function createDictService() {

    const state = store.getState()

    const request_config = getRequestConfig({
        title: state.dictService.title,
        price: state.dictService.price,
        cost: state.dictService.cost,
        warranty: state.dictService.warranty,
        code: state.dictService.code,
        earnings_percent: state.dictService.earnings_percent,
        earnings_summ: state.dictService.earnings_summ,
        deleted: false,
        category_id: state.dictService.category_id
    })

    return async dispatch => {

        await fetch(state.data.url_server + '/dict_service', request_config)
            .catch(error => bad_request(dispatch, error, 'Запрос на создание услуги не выполнен'))

        await fetch(state.data.url_server + '/get_dict_service', getRequestConfig({}))
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    dispatch({
                        type: 'ADD_DATA',
                        field: 'dict_service',
                        data: data.data,
                    })
                    dispatch({
                        type: 'SET_VISIBLE_FLAG',
                        field: 'statusServiceEditor',
                        value: false
                    })
                    dispatch({
                        type: 'RESET_SERVICE'
                    })
                } else {
                    console.warn(data.message)
                }
            })
            .catch(error => bad_request(dispatch, error, 'Запрос услуг не выполнен'))
    }
}

export function saveDictService() {

    const state = store.getState()

    let request_config = getRequestConfig({
        id: state.dictService.edit,
        title: state.dictService.title,
        price: state.dictService.price,
        cost: state.dictService.cost,
        warranty: state.dictService.warranty,
        code: state.dictService.code,
        earnings_percent: state.dictService.earnings_percent,
        earnings_summ: state.dictService.earnings_summ,
        deleted: state.dictService.deleted,
        category_id: state.dictService.category_id
    })
    request_config.method = 'PUT'

    return async dispatch => {

        await fetch(state.data.url_server + '/dict_service', request_config)
            .catch(error => bad_request(dispatch, error, 'Запрос на изменение услуги не выполнен'))

        await fetch(state.data.url_server + '/get_dict_service', getRequestConfig({}))
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    dispatch({
                        type: 'ADD_DATA',
                        field: 'dict_service',
                        data: data.data,
                    })
                    dispatch({
                        type: 'SET_VISIBLE_FLAG',
                        field: 'statusServiceEditor',
                        value: false
                    })
                    dispatch({
                        type: 'RESET_SERVICE'
                    })
                } else {
                    console.warn(data.message)
                }
            })
            .catch(error => bad_request(dispatch, error, 'Запрос услуг не выполнен'))
    }
}

export function deleteDictService(flag) {

    const state = store.getState()

    let request_config = getRequestConfig({
        id: state.dictService.edit,
        deleted: flag
    })
    request_config.method = 'PUT'

    return async dispatch => {

        await fetch(state.data.url_server + '/dict_service', request_config)
            .catch(error => bad_request(dispatch, error, 'Запрос на удалене/восстановление услуги не выполнен'))

        await fetch(state.data.url_server + '/get_dict_service', getRequestConfig({}))
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    dispatch({
                        type: 'ADD_DATA',
                        field: 'dict_service',
                        data: data.data,
                    })
                    dispatch({
                        type: 'SET_VISIBLE_FLAG',
                        field: 'statusServiceEditor',
                        value: false
                    })
                    dispatch({
                        type: 'RESET_SERVICE'
                    })
                } else {
                    console.warn(data.message)
                }
            })
            .catch(error => bad_request(dispatch, error, 'Запрос услуг не выполнен'))
    }
}



