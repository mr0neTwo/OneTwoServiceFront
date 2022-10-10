import store from '../store'
import {getRequestConfig, bad_request} from './actionUtils'

export function changePartState( data ) {
    return {
        type: 'CHANGE_PART_STATE',
        data
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

function getFilter() {
    const state = store.getState()
    return {
        title: state.part.filter_name,
        deleted: state.part.showDeleted,
        warehouse_category_id: state.part.filter_warehouse_category_id,
        page: state.part.page
    }
}

export function addParts() {

    const state = store.getState()

    const request_config = getRequestConfig({
        page: state.part.page,
        deleted: state.part.showDeleted,
        title: state.part.filter_name,
        warehouse_category_id: state.warehouse.current_category.id
    })

    return dispatch => {

        fetch(state.data.url_server + '/get_parts', request_config)
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    dispatch({
                        type: 'CHANGE_PART_STATE',
                        data: {parts: data.parts, count_parts: data.count}
                    })
                } else {
                    console.warn(data.message)
                }
            })
            .catch(error => bad_request(dispatch, error, 'Запрос товаров не выполнен'))
    }
}

export function createPart() {

    const state = store.getState()

    const request_config = getRequestConfig({
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
        doc: state.part.doc,
        filter: getFilter()
    })


    return async dispatch => {

        await fetch(state.data.url_server + '/parts', request_config)
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    dispatch({
                        type: 'CHANGE_PART_STATE',
                        data: {parts: data.parts, count_parts: data.count}
                    })
                    dispatch({
                        type: 'CHANGE_VISIBLE_STATE',
                        data: {statusPartEditor: false}
                    })
                    dispatch({
                        type: 'RESET_PART'
                    })
                } else {
                    console.warn(data.message)
                }
            })
            .catch(error => bad_request(dispatch, error, 'Запрос на создание товара не выполнен'))
    }
}

export function savePart() {

    const state = store.getState()

    let request_config = getRequestConfig({
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
        doc: state.part.doc,
        filter: getFilter()
    })
    request_config.method = 'PUT'

    return async dispatch => {

        await fetch(state.data.url_server + '/parts', request_config)
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    dispatch({
                        type: 'CHANGE_PART_STATE',
                        data: {parts: data.parts, count_parts: data.count}
                    })
                    dispatch({
                        type: 'CHANGE_VISIBLE_STATE',
                        data: {statusPartEditor: false}
                    })
                    dispatch({
                        type: 'RESET_PART'
                    })
                } else {
                    console.warn(data.message)
                }
            })
            .catch(error => bad_request(dispatch, error, 'Запрос на иземенение товара не выполнен'))
    }
}

export function deletePart( flag ) {

    const state = store.getState()

    let request_config = getRequestConfig({
        id: state.part.edit,
        deleted: flag,
        filter: getFilter()
    })
    request_config.method = 'PUT'

    return async dispatch => {

        await fetch(state.data.url_server + '/parts', request_config)
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    dispatch({
                        type: 'CHANGE_PART_STATE',
                        data: {parts: data.parts, count_parts: data.count}
                    })
                    dispatch({
                        type: 'CHANGE_VISIBLE_STATE',
                        data: {statusPartEditor: false}
                    })
                    dispatch({
                        type: 'RESET_PART'
                    })
                } else {
                    console.warn(data.message)
                }
            })
            .catch(error => bad_request(dispatch, error, 'Запрос на удаление/восстановление товара не выполнен'))
    }
}