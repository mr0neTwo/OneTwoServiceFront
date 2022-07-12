import store from '../store'
import {getRequestConfig, bad_request} from './actionUtils'

export function changeBookForm(value, field) {
    return {
        type: 'CHANGE_BOOK_FORM',
        field,
        value,
    }
}

export function changeBookState(data) {
    return {
        type: 'CHANGE_BOOK_STATE',
        data
    }
}

export function resetBookEquipment() {
    return {
        type: 'RESET_BOOK_EQUIPMENT',
    }
}

export function chooseBookSelected(value, field) {
    return {
        type: 'CHOOSE_BOOK_SELECTED',
        field,
        value,
    }
}

export function createEType() {

    const state = store.getState()

    const request_config = getRequestConfig({
        title: state.book.title,
        icon: state.book.icon,
        url: state.book.url,
        branches: state.book.branches,
        deleted: false,
        filter: {
            title: state.book.filter_type,
            page: state.book.page_type - 1,
            deleted: state.book.showDeleted
        }
    })

    return async dispatch => {

        await fetch(state.data.url_server + '/equipment_type', request_config)
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    dispatch({
                        type: 'CHANGE_BOOK_FORM',
                        field: 'equipment_types',
                        value: data.data,
                    })
                    dispatch({
                        type: 'CHANGE_BOOK_FORM',
                        field: 'equipment_type_count',
                        value: data.count,
                    })
                    dispatch({
                        type: 'SET_VISIBLE_FLAG',
                        field: 'statusEquipmentEditor',
                        value: false,
                    })
                    dispatch({
                        type: 'RESET_BOOK_EQUIPMENT',
                    })
                } else {
                    console.warn(data.message)
                }
            })
            .catch(error => {
                if (error.message === 'Unexpected token < in JSON at position 0') {
                    dispatch({
                        type: 'CHANGE_VISIBLE_STATE',
                        data: {statusRefreshPage: true}
                    })
                }
                bad_request('Запрос типов тихеники не выполнен')
            })
    }
}

export function createEbrand() {

    const state = store.getState()

    const request_config = getRequestConfig({
        title: state.book.title,
        icon: state.book.icon,
        url: state.book.url,
        equipment_type_id: state.book.parent_id,
        branches: state.book.branches,
        deleted: false,
        filter: {
            title: state.book.filter_brand,
            equipment_type_id: state.book.equipment_type.id,
            page: state.book.page_brand - 1,
            deleted: state.book.showDeleted
        }
    })

    return async (dispatch) => {

        await fetch(state.data.url_server + '/equipment_brand', request_config)
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    dispatch({
                        type: 'CHANGE_BOOK_FORM',
                        field: 'equipment_brands',
                        value: data.data,
                    })
                    dispatch({
                        type: 'CHANGE_BOOK_FORM',
                        field: 'equipment_brand_count',
                        value: data.count,
                    })
                    dispatch({
                        type: 'SET_VISIBLE_FLAG',
                        field: 'statusEquipmentEditor',
                        value: false,
                    })
                    dispatch({
                        type: 'RESET_BOOK_EQUIPMENT',
                    })
                } else {
                    console.warn(data.message)
                }
            })
            .catch(error => {
                if (error.message === 'Unexpected token < in JSON at position 0') {
                    dispatch({
                        type: 'CHANGE_VISIBLE_STATE',
                        data: {statusRefreshPage: true}
                    })
                }
                bad_request('Запрос брендов не выполнен')
            })
    }
}

export function createESubtype() {

    const state = store.getState()

    const request_config = getRequestConfig({
        title: state.book.title,
        icon: state.book.icon,
        url: state.book.url,
        equipment_brand_id: state.book.parent_id,
        branches: state.book.branches,
        deleted: false,
        img: state.book.img,
        filter: {
            title: state.book.filter_subtype,
            equipment_brand_id: state.book.equipment_brand.id,
            page: state.book.page_subtype - 1,
            deleted: state.book.showDeleted
        }
    })

    return async (dispatch) => {

        await fetch(state.data.url_server + '/equipment_subtype', request_config)
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    dispatch({
                        type: 'CHANGE_BOOK_FORM',
                        field: 'equipment_subtypes',
                        value: data.data,
                    })
                    dispatch({
                        type: 'CHANGE_BOOK_FORM',
                        field: 'equipment_subtype_count',
                        value: data.count,
                    })
                    dispatch({
                        type: 'SET_VISIBLE_FLAG',
                        field: 'statusEquipmentEditor',
                        value: false,
                    })
                    dispatch({
                        type: 'RESET_BOOK_EQUIPMENT',
                    })
                } else {
                    console.warn(data.message)
                }
            })
            .catch(error => {
                if (error.message === 'Unexpected token < in JSON at position 0') {
                    dispatch({
                        type: 'CHANGE_VISIBLE_STATE',
                        data: {statusRefreshPage: true}
                    })
                }
                bad_request('Запрос модулей не выполнен')
            })
    }
}

export function createEModel() {

    const state = store.getState()

    const request_config = getRequestConfig({
        title: state.book.title,
        icon: state.book.icon,
        url: state.book.url,
        equipment_subtype_id: state.book.parent_id,
        branches: state.book.branches,
        deleted: false,
        filter: {
            title: state.book.filter_model,
            equipment_subtype_id: state.book.equipment_subtype.id,
            page: state.book.page_model - 1,
            deleted: state.book.showDeleted
        }
    })

    return async dispatch => {

        await fetch(state.data.url_server + '/equipment_model', request_config)
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    dispatch({
                        type: 'CHANGE_BOOK_FORM',
                        field: 'equipment_models',
                        value: data.data,
                    })
                    dispatch({
                        type: 'CHANGE_BOOK_FORM',
                        field: 'equipment_models_count',
                        value: data.count,
                    })
                    dispatch({
                        type: 'SET_VISIBLE_FLAG',
                        field: 'statusEquipmentEditor',
                        value: false,
                    })
                    dispatch({
                        type: 'RESET_BOOK_EQUIPMENT',
                    })
                } else {
                    console.warn(data.message)
                }
            })
            .catch(error => {
                if (error.message === 'Unexpected token < in JSON at position 0') {
                    dispatch({
                        type: 'CHANGE_VISIBLE_STATE',
                        data: {statusRefreshPage: true}
                    })
                }
                bad_request('Запрос моделей не выполнен')
            })
    }
}

export function createEquipmentType(title) {
    
    const state = store.getState()

    const request_config = getRequestConfig({
            title,
            icon: state.book.icon,
            url: state.book.url,
            branches: state.branch.branches.map(branch => branch.id),
            deleted: false,
            filter: {
                title,
                deleted: state.book.showDeleted
            }
        })

    return async (dispatch) => {

        await fetch(state.data.url_server + '/equipment_type', request_config)
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    dispatch({
                        type: 'CHANGE_BOOK_FORM',
                        field: 'equipment_types',
                        value: data.data,
                    })
                    dispatch({
                        type: 'CHANGE_BOOK_FORM',
                        field: 'equipment_type_count',
                        value: data.count,
                    })
                } else {
                    console.warn(data.message)
                }
            })
            .catch(error => {
                if (error.message === 'Unexpected token < in JSON at position 0') {
                    dispatch({
                        type: 'CHANGE_VISIBLE_STATE',
                        data: {statusRefreshPage: true}
                    })
                }
                bad_request('Запрос типов тихеники не выполнен')
            })
    }
}

export function addEquipmentType() {
    
    const state = store.getState()

    const request_config = getRequestConfig({
        title: state.book.filter_type,
        page: state.book.page_type - 1,
        deleted: state.book.showDeleted
    })

    return (dispatch) => {
        fetch(state.data.url_server + '/get_equipment_type', request_config)
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    dispatch({
                        type: 'CHANGE_BOOK_FORM',
                        field: 'equipment_types',
                        value: data.data,
                    })
                    dispatch({
                        type: 'CHANGE_BOOK_FORM',
                        field: 'equipment_type_count',
                        value: data.count,
                    })
                } else {
                    console.warn(data.message)
                }
            })
            .catch(error => {
                if (error.message === 'Unexpected token < in JSON at position 0') {
                    dispatch({
                        type: 'CHANGE_VISIBLE_STATE',
                        data: {statusRefreshPage: true}
                    })
                }
                bad_request('Запрос типов тихеники не выполнен')
            })
    }
}

export function createEquipmentBrand(title) {

    const state = store.getState()

    const request_config = getRequestConfig({
        title,
        equipment_type_id: state.order.kindof_good.id,
        branches: state.branch.branches.map(branch => branch.id),
        deleted: false,
        filter: {
            title,
            equipment_type_id: state.book.equipment_type.id,
            deleted: state.book.showDeleted
        }
    })

    return async (dispatch) => {

        await fetch(state.data.url_server + '/equipment_brand', request_config)
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    dispatch({
                        type: 'CHANGE_BOOK_FORM',
                        field: 'equipment_brands',
                        value: data.data,
                    })
                    dispatch({
                        type: 'CHANGE_BOOK_FORM',
                        field: 'equipment_brand_count',
                        value: data.count,
                    })
                } else {
                    console.warn(data.message)
                }
            })
            .catch(error => {
                if (error.message === 'Unexpected token < in JSON at position 0') {
                    dispatch({
                        type: 'CHANGE_VISIBLE_STATE',
                        data: {statusRefreshPage: true}
                    })
                }
                bad_request('Запрос брендов не выполнен')
            })
    }
}

export function addEquipmentBrand() {
    const state = store.getState()

    const request_config = getRequestConfig({
        title: state.book.filter_brand,
        equipment_type_id: state.book.equipment_type.id,
        page: state.book.page_brand - 1,
        deleted: state.book.showDeleted
    })

    return async (dispatch) => {
        await fetch(state.data.url_server + '/get_equipment_brand', request_config)
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    dispatch({
                        type: 'CHANGE_BOOK_FORM',
                        field: 'equipment_brands',
                        value: data.data,
                    })
                    dispatch({
                        type: 'CHANGE_BOOK_FORM',
                        field: 'equipment_brand_count',
                        value: data.count,
                    })
                } else {
                    console.warn(data.message)
                }
            })
            .catch(error => {
                if (error.message === 'Unexpected token < in JSON at position 0') {
                    dispatch({
                        type: 'CHANGE_VISIBLE_STATE',
                        data: {statusRefreshPage: true}
                    })
                }
                bad_request('Запрос брендов не выполнен')
            })
    }
}

export function cteateEquipmentSubtype(title) {
    const state = store.getState()

    const request_config = getRequestConfig({
        title,
        equipment_brand_id: state.order.brand.id,
        branches: state.branch.branches.map(branch => branch.id),
        deleted: false,
        filter: {
            title,
            equipment_brand_id: state.book.equipment_brand.id,
            deleted: state.book.showDeleted
        }
    })

    return async (dispatch) => {

        await fetch(state.data.url_server + '/equipment_subtype', request_config)
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    dispatch({
                        type: 'CHANGE_BOOK_FORM',
                        field: 'equipment_subtypes',
                        value: data.data,
                    })
                    dispatch({
                        type: 'CHANGE_BOOK_FORM',
                        field: 'equipment_subtype_count',
                        value: data.count,
                    })
                } else {
                    console.warn(data.message)
                }
            })
            .catch(error => {
                if (error.message === 'Unexpected token < in JSON at position 0') {
                    dispatch({
                        type: 'CHANGE_VISIBLE_STATE',
                        data: {statusRefreshPage: true}
                    })
                }
                bad_request('Запрос модулей не выполнен')
            })
    }
}

export function addEquipmentSubtype() {
    const state = store.getState()

    const request_config = getRequestConfig({
        title: state.book.filter_subtype,
        equipment_brand_id: state.book.equipment_brand.id,
        page: state.book.page_subtype - 1,
        deleted: state.book.showDeleted
    })

    return async (dispatch) => {
        await fetch(state.data.url_server + '/get_equipment_subtype', request_config)
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    dispatch({
                        type: 'CHANGE_BOOK_FORM',
                        field: 'equipment_subtypes',
                        value: data.data,
                    })
                    dispatch({
                        type: 'CHANGE_BOOK_FORM',
                        field: 'equipment_subtype_count',
                        value: data.count,
                    })
                } else {
                    console.warn(data.message)
                }
            })
            .catch(error => {
                if (error.message === 'Unexpected token < in JSON at position 0') {
                    dispatch({
                        type: 'CHANGE_VISIBLE_STATE',
                        data: {statusRefreshPage: true}
                    })
                }
                bad_request('Запрос модулей не выполнен')
            })
    }
}

export function createEquipmentModel(title) {
    const state = store.getState()

    const request_config = getRequestConfig({
        title,
        equipment_subtype_id: state.order.subtype.id,
        branches: state.branch.branches.map(branch => branch.id),
        deleted: false,
        filter: {
            title,
            equipment_subtype_id: state.book.equipment_subtype.id,
            deleted: state.book.showDeleted
        }
    })

    return async dispatch => {

        await fetch(state.data.url_server + '/equipment_model', request_config)
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    dispatch({
                        type: 'CHANGE_BOOK_FORM',
                        field: 'equipment_models',
                        value: data.data,
                    })
                    dispatch({
                        type: 'CHANGE_BOOK_FORM',
                        field: 'equipment_models_count',
                        value: data.count,
                    })
                } else {
                    console.warn(data.message)
                }
            })
            .catch(error => {
                if (error.message === 'Unexpected token < in JSON at position 0') {
                    dispatch({
                        type: 'CHANGE_VISIBLE_STATE',
                        data: {statusRefreshPage: true}
                    })
                }
                bad_request('Запрос моделей не выполнен')
            })
    }
}

export function addEquipmentModel() {
    const state = store.getState()

    const request_config = getRequestConfig({
        title: state.book.filter_model,
        equipment_subtype_id: state.book.equipment_subtype.id,
        page: state.book.page_model - 1,
        deleted: state.book.showDeleted
    })

    return async (dispatch) => {
        await fetch(state.data.url_server + '/get_equipment_model', request_config)
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    dispatch({
                        type: 'CHANGE_BOOK_FORM',
                        field: 'equipment_models',
                        value: data.data,
                    })
                    dispatch({
                        type: 'CHANGE_BOOK_FORM',
                        field: 'equipment_models_count',
                        value: data.count,
                    })
                } else {
                    console.warn(data.message)
                }
            })
            .catch(error => {
                if (error.message === 'Unexpected token < in JSON at position 0') {
                    dispatch({
                        type: 'CHANGE_VISIBLE_STATE',
                        data: {statusRefreshPage: true}
                    })
                }
                bad_request('Запрос моделей не выполнен')
            })
    }
}

export function seveEquipmentType() {
    const state = store.getState()

    let request_config = getRequestConfig({
        id: state.book.edit,
        title: state.book.title,
        icon: state.book.icon,
        url: state.book.url,
        branches: state.book.branches,
        list_for_join: state.book.list_for_join.map((equipment) => equipment.id),
        filter: {
            title: state.book.filter_type,
            page: state.book.page_type - 1,
            deleted: state.book.showDeleted
        }
    })
    request_config.method = 'PUT'

    return async (dispatch) => {

        await fetch(state.data.url_server + '/equipment_type', request_config)
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    dispatch({
                        type: 'CHANGE_BOOK_FORM',
                        field: 'equipment_types',
                        value: data.data,
                    })
                    dispatch({
                        type: 'CHANGE_BOOK_FORM',
                        field: 'equipment_type_count',
                        value: data.count,
                    })
                    dispatch({
                        type: 'SET_VISIBLE_FLAG',
                        field: 'statusEquipmentEditor',
                        value: false,
                    })
                    dispatch({
                        type: 'RESET_BOOK_EQUIPMENT',
                    })
                } else {
                    console.warn(data.message)
                }
            })
            .catch(error => {
                if (error.message === 'Unexpected token < in JSON at position 0') {
                    dispatch({
                        type: 'CHANGE_VISIBLE_STATE',
                        data: {statusRefreshPage: true}
                    })
                }
                bad_request('Запрос типов тихеники не выполнен')
            })
    }
}

export function seveEquipmentBrand() {
    const state = store.getState()

    let request_config = getRequestConfig({
        id: state.book.edit,
        title: state.book.title,
        icon: state.book.icon,
        url: state.book.url,
        equipment_type_id: state.book.parent_id,
        branches: state.book.branches,
        list_for_join: state.book.list_for_join.map((equipment) => equipment.id),
        filter: {
            title: state.book.filter_brand,
            equipment_type_id: state.book.equipment_type.id,
            page: state.book.page_brand - 1,
            deleted: state.book.showDeleted
        }
    })
    request_config.method = 'PUT'
    
    return async dispatch => {

        await fetch(state.data.url_server + '/equipment_brand', request_config)
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    dispatch({
                        type: 'CHANGE_BOOK_FORM',
                        field: 'equipment_brands',
                        value: data.data,
                    })
                    dispatch({
                        type: 'CHANGE_BOOK_FORM',
                        field: 'equipment_brand_count',
                        value: data.count,
                    })
                    dispatch({
                        type: 'SET_VISIBLE_FLAG',
                        field: 'statusEquipmentEditor',
                        value: false,
                    })
                    dispatch({
                        type: 'RESET_BOOK_EQUIPMENT',
                    })
                } else {
                    console.warn(data.message)
                }
            })
            .catch(error => {
                if (error.message === 'Unexpected token < in JSON at position 0') {
                    dispatch({
                        type: 'CHANGE_VISIBLE_STATE',
                        data: {statusRefreshPage: true}
                    })
                }
                bad_request('Запрос типов тихеники не выполнен')
            })
    }
}

export function seveEquipmentSubtype() {
    
    const state = store.getState()

    let request_config = getRequestConfig({
        id: state.book.edit,
        title: state.book.title,
        icon: state.book.icon,
        url: state.book.url,
        img: state.book.img,
        equipment_brand_id: state.book.parent_id,
        branches: state.book.branches,
        list_for_join: state.book.list_for_join.map((equipment) => equipment.id),
        filter: {
            title: state.book.filter_subtype,
            equipment_brand_id: state.book.equipment_brand.id,
            page: state.book.page_subtype - 1,
            deleted: state.book.showDeleted
        }
    })
    request_config.method = 'PUT'
    
    return async (dispatch) => {

        await fetch(state.data.url_server + '/equipment_subtype', request_config)
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    dispatch({
                        type: 'CHANGE_BOOK_FORM',
                        field: 'equipment_subtypes',
                        value: data.data,
                    })
                    dispatch({
                        type: 'CHANGE_BOOK_FORM',
                        field: 'equipment_subtype_count',
                        value: data.count,
                    })
                    dispatch({
                        type: 'SET_VISIBLE_FLAG',
                        field: 'statusEquipmentEditor',
                        value: false,
                    })
                    dispatch({
                        type: 'RESET_BOOK_EQUIPMENT',
                    })
                } else {
                    console.warn(data.message)
                }
            })
            .catch(error => {
                if (error.message === 'Unexpected token < in JSON at position 0') {
                    dispatch({
                        type: 'CHANGE_VISIBLE_STATE',
                        data: {statusRefreshPage: true}
                    })
                }
                bad_request('Запрос типов тихеники не выполнен')
            })
    }
}

export function seveEquipmentModel() {
    const state = store.getState()

    let request_config = getRequestConfig({
        id: state.book.edit,
        title: state.book.title,
        icon: state.book.icon,
        url: state.book.url,
        equipment_model_id: state.book.parent_id,
        branches: state.book.branches,
        list_for_join: state.book.list_for_join.map((equipment) => equipment.id),
        filter: {
            title: state.book.filter_model,
            equipment_subtype_id: state.book.equipment_subtype.id,
            page: state.book.page_model - 1,
            deleted: state.book.showDeleted
        }
    })
    request_config.method = 'PUT'
    

    return async (dispatch) => {

        await fetch(state.data.url_server + '/equipment_model', request_config)
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    dispatch({
                        type: 'CHANGE_BOOK_FORM',
                        field: 'equipment_models',
                        value: data.data,
                    })
                    dispatch({
                        type: 'CHANGE_BOOK_FORM',
                        field: 'equipment_model_count',
                        value: data.count,
                    })
                    dispatch({
                        type: 'SET_VISIBLE_FLAG',
                        field: 'statusEquipmentEditor',
                        value: false,
                    })
                    dispatch({
                        type: 'RESET_BOOK_EQUIPMENT',
                    })
                } else {
                    console.warn(data.message)
                }
            })
            .catch(error => {
                if (error.message === 'Unexpected token < in JSON at position 0') {
                    dispatch({
                        type: 'CHANGE_VISIBLE_STATE',
                        data: {statusRefreshPage: true}
                    })
                }
                bad_request('Запрос типов тихеники не выполнен')
            })
    }
}

export function deleteEquipmentType(flag) {
    
    const state = store.getState()

    let request_config = getRequestConfig({
        id: state.book.edit,
        deleted: flag,
        filter: {
            title: state.book.filter_type,
            deleted: state.book.showDeleted
        }
    })
    request_config.method = 'PUT'
    
    return async (dispatch) => {

        await fetch(state.data.url_server + '/equipment_type', request_config)
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    dispatch({
                        type: 'CHANGE_BOOK_FORM',
                        field: 'equipment_types',
                        value: data.data,
                    })
                    dispatch({
                        type: 'CHANGE_BOOK_FORM',
                        field: 'equipment_type_count',
                        value: data.count,
                    })
                    dispatch({
                        type: 'SET_VISIBLE_FLAG',
                        field: 'statusEquipmentEditor',
                        value: false,
                    })
                    dispatch({
                        type: 'RESET_BOOK_EQUIPMENT',
                    })
                } else {
                    console.warn(data.message)
                }
            })
            .catch(error => {
                if (error.message === 'Unexpected token < in JSON at position 0') {
                    dispatch({
                        type: 'CHANGE_VISIBLE_STATE',
                        data: {statusRefreshPage: true}
                    })
                }
                bad_request('Запрос типов тихеники не выполнен')
            })
    }
}

export function deleteEquipmentBrand(flag) {
    
    const state = store.getState()

    let request_config = getRequestConfig({
        id: state.book.edit,
        deleted: flag,
        filter: {
            title: state.book.filter_brand,
            equipment_type_id: state.book.equipment_type.id,
            deleted: state.book.showDeleted
        }
    })
    request_config.method = 'PUT'

    return async (dispatch) => {

        await fetch(state.data.url_server + '/get_equipment_brand', request_config)
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    dispatch({
                        type: 'CHANGE_BOOK_FORM',
                        field: 'equipment_brands',
                        value: data.data,
                    })
                    dispatch({
                        type: 'CHANGE_BOOK_FORM',
                        field: 'equipment_brand_count',
                        value: data.count,
                    })
                    dispatch({
                        type: 'SET_VISIBLE_FLAG',
                        field: 'statusEquipmentEditor',
                        value: false,
                    })
                    dispatch({
                        type: 'RESET_BOOK_EQUIPMENT',
                    })
                } else {
                    console.warn(data.message)
                }
            })
            .catch(error => {
                if (error.message === 'Unexpected token < in JSON at position 0') {
                    dispatch({
                        type: 'CHANGE_VISIBLE_STATE',
                        data: {statusRefreshPage: true}
                    })
                }
                bad_request('Запрос типов тихеники не выполнен')
            })
    }
}

export function deleteEquipmentSubtype(flag) {
    
    const state = store.getState()

    let request_config = getRequestConfig({
        id: state.book.edit,
        deleted: flag,
        filter: {
            title: state.book.filter_subtype,
            equipment_brand_id: state.book.equipment_brand.id,
            deleted: state.book.showDeleted
        }
    })
    request_config.method = 'PUT'

    return async (dispatch) => {

        await fetch(state.data.url_server + '/equipment_subtype', request_config)
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    dispatch({
                        type: 'CHANGE_BOOK_FORM',
                        field: 'equipment_subtypes',
                        value: data.data,
                    })
                    dispatch({
                        type: 'CHANGE_BOOK_FORM',
                        field: 'equipment_subtype_count',
                        value: data.count,
                    })
                    dispatch({
                        type: 'SET_VISIBLE_FLAG',
                        field: 'statusEquipmentEditor',
                        value: false,
                    })
                    dispatch({
                        type: 'RESET_BOOK_EQUIPMENT',
                    })
                } else {
                    console.warn(data.message)
                }
            })
            .catch(error => {
                if (error.message === 'Unexpected token < in JSON at position 0') {
                    dispatch({
                        type: 'CHANGE_VISIBLE_STATE',
                        data: {statusRefreshPage: true}
                    })
                }
                bad_request('Запрос типов тихеники не выполнен')
            })
    }
}

export function deleteEquipmentModel(flag) {
    
    const state = store.getState()

    let request_config = getRequestConfig({
        id: state.book.edit,
        deleted: flag,
        filter: {
            title: state.book.filter_model,
            equipment_subtype_id: state.book.equipment_subtype.id,
            deleted: state.book.showDeleted
        }
    })
    request_config.method = 'PUT'
    

    return async (dispatch) => {

        await fetch(state.data.url_server + '/equipment_model', request_config)
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    dispatch({
                        type: 'CHANGE_BOOK_FORM',
                        field: 'equipment_models',
                        value: data.data,
                    })
                    dispatch({
                        type: 'CHANGE_BOOK_FORM',
                        field: 'equipment_model_count',
                        value: data.count,
                    })
                    dispatch({
                        type: 'SET_VISIBLE_FLAG',
                        field: 'statusEquipmentEditor',
                        value: false,
                    })
                    dispatch({
                        type: 'RESET_BOOK_EQUIPMENT',
                    })
                } else {
                    console.warn(data.message)
                }
            })
            .catch(error => {
                if (error.message === 'Unexpected token < in JSON at position 0') {
                    dispatch({
                        type: 'CHANGE_VISIBLE_STATE',
                        data: {statusRefreshPage: true}
                    })
                }
                bad_request('Запрос типов тихеники не выполнен')
            })
    }
}
