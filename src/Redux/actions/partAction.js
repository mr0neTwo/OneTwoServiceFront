import store from '../store'
import {getRequestConfig, bad_request} from './actionUtils'

export function changePartForm(value, field) {
    return {
        type: 'CHANGE_PART_FORM',
        field,
        value,
    }
}

export function editPart(part) {
    return {
        type: 'EDIT_PART',
        part
    }
}

export function resetPart() {
    return {
        type: 'RESET_PART',
    }
}

export function choosePartSelected(value, field, saveToApp=false) {
    return {
        type: 'SELECTED_PART',
        field,
        value,
        saveToApp
    }
}

export function changePartProperty(value, idx, field) {
    return {
        type: 'CHANGE_PART_PROPERTY',
        value,
        idx,
        field
    }
}

export function addPartProperty() {
    return {
        type: 'ADD_PART_PROPERTY'
    }
}

export function deletePartProperty(idx) {
    return {
        type: 'DELETE_PART_PROPERTY',
        idx
    }
}

export function addParts() {

    const state = store.getState()

    const request_config = getRequestConfig({
        page: state.part.page,
        deleted: state.part.showDeleted,
        warehouse_category_id: state.warehouse.current_category.id
    })

    return dispatch => {

        fetch(state.data.url_server + '/get_parts', request_config)
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    dispatch({
                        type: 'CHANGE_PART_FORM',
                        field: 'parts',
                        value: data.data
                    })
                    dispatch({
                        type: 'SET_VISIBLE_FLAG',
                        field: 'statusPartEditor',
                        value: false
                    })
                    dispatch({
                        type: 'RESET_PART'
                    })
                } else {
                    console.warn(data.message)
                }
            })
            .catch(() => bad_request('Запрос товаров не выполнен'))
    }
}

export function createPart() {

    const state = store.getState()

    const request_config1 = getRequestConfig({
        title: state.part.title,
        description: state.part.description,
        marking: state.part.marking,
        article: state.part.article,
        barcode: state.part.barcode,
        code: state.part.code,
        specifications: state.part.specifications,
        deleted: false,
        warehouse_category_id: state.warehouse.current_parent_category.id,
        img: state.part.img,
        doc: state.part.doc
    })

    const request_config2 = getRequestConfig({
        page: state.part.page,
        deleted: state.part.showDeleted,
        warehouse_category_id: state.warehouse.current_category.id
    })

    return async dispatch => {

        await fetch(state.data.url_server + '/parts', request_config1)
            .catch(() => bad_request('Запрос на создание товара не выполнен'))

        await fetch(state.data.url_server + '/get_parts', request_config2)
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    dispatch({
                        type: 'CHANGE_PART_FORM',
                        field: 'parts',
                        value: data.data
                    })
                    dispatch({
                        type: 'SET_VISIBLE_FLAG',
                        field: 'statusPartEditor',
                        value: false
                    })
                    dispatch({
                        type: 'RESET_PART'
                    })
                } else {
                    console.warn(data.message)
                }
            })
            .catch(() => bad_request('Запрос товаров не выполнен'))
    }
}

export function savePart() {

    const state = store.getState()

    let request_config1 = getRequestConfig({
        id: state.part.edit,
        title: state.part.title,
        description: state.part.description,
        marking: state.part.marking,
        article: state.part.article,
        barcode: state.part.barcode,
        code: state.part.code,
        specifications: state.part.specifications,
        warehouse_category_id: state.warehouse.current_parent_category.id,
        img: state.part.img,
        doc: state.part.doc
    })
    request_config1.method = 'PUT'

    const request_config2 = getRequestConfig({
        page: state.part.page,
        deleted: state.part.showDeleted,
        warehouse_category_id: state.warehouse.current_category.id
    })

    return async dispatch => {

        await fetch(state.data.url_server + '/parts', request_config1)
            .catch(() => bad_request('Запрос на иземенение товара не выполнен'))

        await fetch(state.data.url_server + '/get_parts', request_config2)
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    dispatch({
                        type: 'CHANGE_PART_FORM',
                        field: 'parts',
                        value: data.data
                    })
                    dispatch({
                        type: 'SET_VISIBLE_FLAG',
                        field: 'statusPartEditor',
                        value: false
                    })
                    dispatch({
                        type: 'RESET_PART'
                    })
                } else {
                    console.warn(data.message)
                }
            })
            .catch(() => bad_request('Запрос товаров не выполнен'))
    }
}

export function deletePart( flag ) {

    const state = store.getState()

    let request_config1 = getRequestConfig({
        id: state.part.edit,
        deleted: flag
    })
    request_config1.method = 'PUT'

    const request_config2 = getRequestConfig({
        page: state.part.page,
        deleted: state.part.showDeleted,
        warehouse_category_id: state.warehouse.current_category.id
    })

    return async dispatch => {

        await fetch(state.data.url_server + '/parts', request_config1)
            .catch(() => bad_request('Запрос на удаление/восстановление товара не выполнен'))

        await fetch(state.data.url_server + '/get_parts', request_config2)
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    dispatch({
                        type: 'CHANGE_PART_FORM',
                        field: 'parts',
                        value: data.data
                    })
                    dispatch({
                        type: 'SET_VISIBLE_FLAG',
                        field: 'statusPartEditor',
                        value: false
                    })
                    dispatch({
                        type: 'RESET_PART'
                    })
                } else {
                    console.warn(data.message)
                }
            })
            .catch(() => bad_request('Запрос товаров не выполнен'))
    }
}