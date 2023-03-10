import store from '../store'
import {getRequestConfig, bad_request} from './actionUtils'

import {Modal} from '../../data/data'

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

export function resetResidueRule() {
    return {
        type: 'RESET_RESIDUE_RULE',
    }
}

export function editResidueRule(residue_rule) {
    return dispatch => {
        dispatch({
            type: 'EDIT_RESIDUE_RULE',
            residue_rule
        })
        dispatch({
            type: 'CHANGE_VISIBLE_STATE',
            data: {isCentralModalOpen: true, modalCentralType: Modal.Type.RESIDUE_RULE}
        })
    }
}

function getFilter() {
    const state = store.getState()
    return {
        title: state.part.filter_name,
        deleted: state.part.showDeleted,
        warehouse_category_id: state.part.filter_warehouse_category.id,
        page: state.part.page ? state.part.page - 1 : 0
    }
}

export function getPart(part_id) {

    const state = store.getState()
    if (!state.data.user.role.permissions.includes('edit_part')) return {type: 'NOTHING'}

    const request_config = getRequestConfig({id: part_id})

    return async dispatch => {

        await  dispatch({
            type: 'CHANGE_VISIBLE_STATE',
            data: {statusOrderLoader: true}
        })

        await fetch(state.data.url_server + '/get_part', request_config)
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    dispatch({
                        type: 'EDIT_PART',
                        part:  data.part
                    })
                    dispatch({
                        type: 'CHANGE_VISIBLE_STATE',
                        data: {isRightModalOpen: true, modalType: Modal.Type.PART}
                    })
                } else {
                    console.warn(data.message)
                }
            })
            .catch(error => bad_request(dispatch, error, '???????????? ?????????????? ???? ????????????????'))

        await dispatch({
            type: 'CHANGE_VISIBLE_STATE',
            data: {statusOrderLoader: false}
        })
    }
}

export function addParts() {

    const state = store.getState()

    const request_config = getRequestConfig({...getFilter()})

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
            .catch(error => bad_request(dispatch, error, '???????????? ?????????????? ???? ????????????????'))
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
        earnings_percent: state.part.visible_option ? state.part.earnings_percent : 0,
        earnings_sum: state.part.visible_option ? state.part.earnings_sum : 0,
        specifications: state.part.specifications,
        prices: state.part.prices,
        deleted: false,
        warranty_period: state.part.warranty_period,
        warehouse_category_id: state.part.warehouse_category.id,
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
                    // ???????? ?????????????? ?????????????? ?????? ??????????????????????????
                    if(state.part.createForRegistration) {
                        dispatch({
                            type: 'CHANGE_REGISTRATION_STATE',
                            data: {part: data.new_part, prices: data.new_part.prices}
                        })
                        dispatch({
                            type: 'CHANGE_VISIBLE_STATE',
                            data: {
                                isRightModalOpen: true,
                                modalType: Modal.Type.REGISTRATION,
                                isCentralModalOpen: true,
                                modalCentralType: Modal.Type.REGISTRATION_PART
                            }
                        })
                    }
                    // ???????? ?????????????? ?????????????? ?????? ?????????????? ??????????????????
                    if(state.part.createForRequestSparePart) {
                        dispatch({
                            type: 'CHANGE_REQUEST_SPARE_PARTS_STATE',
                            data: {part: data.new_part}
                        })
                        dispatch({
                            type: 'CHANGE_VISIBLE_STATE',
                            data: {isRightModalOpen: true, modalType: Modal.Type.REQUEST_SPARE_PART}
                        })
                    }
                    dispatch({
                        type: 'RESET_PART'
                    })
                } else {
                    console.warn(data.message)
                }
            })
            .catch(error => bad_request(dispatch, error, '???????????? ???? ???????????????? ???????????? ???? ????????????????'))
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
        earnings_percent: state.part.visible_option ? state.part.earnings_percent : 0,
        earnings_sum: state.part.visible_option ? state.part.earnings_sum : 0,
        specifications: state.part.specifications,
        warranty_period: state.part.warranty_period,
        prices: state.part.prices,
        warehouse_category_id: state.part.warehouse_category.id,
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
                        type: 'RESET_PART'
                    })
                    dispatch({
                        type: 'CHANGE_VISIBLE_STATE',
                        data: {statusPartEditor: false}
                    })
                } else {
                    console.warn(data.message)
                }
            })
            .catch(error => bad_request(dispatch, error, '???????????? ???? ???????????????????? ???????????? ???? ????????????????'))
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
                        type: 'RESET_PART'
                    })
                    dispatch({
                        type: 'CHANGE_VISIBLE_STATE',
                        data: {statusPartEditor: false}
                    })
                } else {
                    console.warn(data.message)
                }
            })
            .catch(error => bad_request(dispatch, error, '???????????? ???? ????????????????/???????????????????????????? ???????????? ???? ????????????????'))
    }
}

export function createResidueRule() {

    const state = store.getState()

    const request_config = getRequestConfig({
        part_id: state.part.edit,
        warehouse_id: state.part.warehouse.id,
        min_residue: parseInt(state.part.min_residue),
        necessary_amount: parseInt(state.part.necessary_amount)
    })


    return async dispatch => {

        await fetch(state.data.url_server + '/residue_rule', request_config)
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    dispatch({
                        type: 'CHANGE_PART_STATE',
                        data: {residue_rules: data.residue_rules}
                    })
                    dispatch({
                        type: 'CHANGE_VISIBLE_STATE',
                        data: {isCentralModalOpen: false, modalCentralType: ''}
                    })
                    dispatch({
                        type: 'RESET_RESIDUE_RULE'
                    })
                } else {
                    console.warn(data.message)
                }
            })
            .catch(error => bad_request(dispatch, error, '???????????? ???? ???????????????? ???????????? ???? ????????????????'))
    }
}

export function saveResidueRule() {

    const state = store.getState()

    const request_config = getRequestConfig({
        id: state.part.edit_residue_rules,
        part_id: state.part.edit,
        warehouse_id: state.part.warehouse.id,
        min_residue: parseInt(state.part.min_residue),
        necessary_amount: parseInt(state.part.necessary_amount)
    })
    request_config.method = 'PUT'


    return async dispatch => {

        await fetch(state.data.url_server + '/residue_rule', request_config)
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    dispatch({
                        type: 'CHANGE_PART_STATE',
                        data: {residue_rules: data.residue_rules}
                    })
                    dispatch({
                        type: 'CHANGE_VISIBLE_STATE',
                        data: {isCentralModalOpen: false, modalCentralType: ''}
                    })
                    dispatch({
                        type: 'RESET_RESIDUE_RULE'
                    })
                } else {
                    console.warn(data.message)
                }
            })
            .catch(error => bad_request(dispatch, error, '???????????? ???? ???????????????? ???????????? ???? ????????????????'))
    }
}

export function deleteResidueRule() {

    const state = store.getState()

    const request_config = getRequestConfig({
        id: state.part.edit_residue_rules,
        part_id: state.part.edit
    })
    request_config.method = 'DELETE'


    return async dispatch => {

        await fetch(state.data.url_server + '/residue_rule', request_config)
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    dispatch({
                        type: 'CHANGE_PART_STATE',
                        data: {residue_rules: data.residue_rules}
                    })
                    dispatch({
                        type: 'CHANGE_VISIBLE_STATE',
                        data: {isCentralModalOpen: false, modalCentralType: ''}
                    })
                    dispatch({
                        type: 'RESET_RESIDUE_RULE'
                    })
                } else {
                    console.warn(data.message)
                }
            })
            .catch(error => bad_request(dispatch, error, '???????????? ???? ???????????????? ???????????? ???? ????????????????'))
    }
}
