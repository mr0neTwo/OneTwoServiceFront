import React, {useEffect} from 'react'
import { connect } from 'react-redux'
import {changeInventoryState, createInventory, resetInventory, saveInventory} from '../../../Redux/actions/actionInventory'
import ChooseButton from '../../general/ChooseButton'
import {changeVisibleState} from '../../../Redux/actions'
import BottomButtons from '../../general/BottomButtons'
import LableArea from '../../general/LableArea'
import AddInventoryPart from './AddInventoryPart'
import InventoryPartTable from './InventoryPartTable'
import MultyButton from '../../general/MultyButton'
import Checkbox from '../../general/Checkbox'
import Button from '../../general/Button'
import {changeWriteOfState, getWriteOf} from '../../../Redux/actions/writeOfAction'
import {changeRegistrationState, getRegistration} from '../../../Redux/actions/registrationAction'
import {Modal} from "../../../data/data";

const componentId = 'InventoryEditor'

const InventoryEditor = (props) => {

    const handleClose = () => {
        props.resetInventory()
        props.changeVisibleState({isRightModalOpen: false, modalType: ''})
    }

    const clickHandel = event => {
        if (
            !event.composedPath().map((el) => el.id).includes(componentId) &&
            !event.composedPath().map((el) => el.id).includes('WriteOfEditor') &&
            !event.composedPath().map((el) => el.id).includes('RegistrationEditor')
        ) {
            handleClose()
        }
    }

    useEffect(() => {
        window.addEventListener('click', clickHandel)
        return () => {
            window.removeEventListener('click', clickHandel)
        }
    })

    const handleCreate = () => {
        if (props.inventory.parts.length) {
            props.createInventory()
        }
    }

    const shortage = props.inventory.parts.filter(part => part.shortage)
    const surplus = props.inventory.parts.filter(part => part.surplus)

    const handleWriteOf = () => {
        const parts = shortage.filter(part => !part.is_fixed).map(part => {
            part.target_count = Math.abs(part.shortage)
            part.checked = true
            return part
        })
        props.changeVisibleState({isCentralModalOpen: true, modalCentralType: Modal.Type.WRITE_OFF})
        props.changeWriteOfState({
            parts,
            inventory_id: props.inventory.edit,
            write_of_type: {new_write_of: true, type: 'WAREHOUSE'},
            description: `???? ?????????????? ?????? ???????????????????????????? ${props.inventory.label}`
        })
    }

    const handleRegistration = () => {
        const parts = surplus.filter(part => !part.is_fixed).map(part => ({
                buy_cost: 0,
                cell: part.cell,
                count: part.surplus,
                seller: `?????????????????? ?????????? ???????????????????????????? ${props.inventory.label}`,
                checked: true,
                part: {id: part.part_id, title: part.title}
            })
        )
        props.changeVisibleState({isRightModalOpen: true, modalType: Modal.Type.REGISTRATION})
        props.changeRegistrationState({
            parts,
            inventory_id: props.inventory.edit,
            description: `?????????????? ?????? ???????????????????????????? ${props.inventory.label}`,
            warehouse: props.inventory.warehouse
        })
    }

    const handleOpenDoc = (doc) => {
        if (doc.type === '??????????????????????????') {
            props.getRegistration(doc.id)
        }
        if (doc.type === '????????????????') {
            props.getWriteOf(doc.id)
        }
    }

    return (
            <div className='modal__box-right modal__box-right_w800' id={componentId}>
                <h4>{props.inventory.edit ? `???????????????????????????? ${props.inventory.label}` : '?????????? ????????????????????????????'}</h4>
                <div className='modal__body-right'>
                    <Clause
                        title='??????????:'
                        text={props.remain.filter_warehouse.title}
                    />
                    <Clause
                        title='??????????????????:'
                        text={props.remain.filter_category.title}
                    />
                    {props.inventory.edit ?
                        <div>
                            <Clause
                                title='????????????????????????????????:'
                                text={`${props.inventory.parts.length} ????.`}
                            />
                            <Clause
                                title='?????????????????????????? ??????????:'
                                text={`${props.inventory.parts.filter(part => part.count === part.actual_count).length} ????.`}
                            />
                            <Clause
                                title='??????????????????:'
                                text={`${shortage.length} ????.`}
                            />
                            <Clause
                                title='??????????????:'
                                text={`${surplus.length} ????.`}
                            />
                            <Clause
                                title='???? ???????????????? ??????????????:'
                                text={`${props.inventory.parts.filter(part => part.is_fixed === false).length} ????.`}
                            />
                            {props.inventory.related_docs ?
                                <div className='row g6'>
                                    <span>?????????????????? ????????????????: </span>
                                    {props.inventory.related_docs.map((doc, idx) => (
                                        <span key={doc.label}>
                                            <span>{doc.type}</span>
                                            <span
                                                className='cell_label'
                                                onClick={() => handleOpenDoc(doc)}
                                            >
                                                {doc.label}
                                            </span>
                                            {props.inventory.related_docs.length !== idx + 1 ? <span>,</span> : null}
                                        </span>
                                    ))}
                                </div>
                            : null}
                        </div>
                        : null
                    }
                    <ChooseButton
                        title= '?????????????????????? ???????????????????? ?????????????????????? ?????????????? ??????????'
                        name={['????????', '??????????']}
                        func1 = {() => props.changeInventoryState({isZero: true})}
                        func2 = {() => props.changeInventoryState({isZero: false})}
                        checked = { true }
                        invisible={props.inventory.edit}
                    />
                    <MultyButton
                        name={['??????', '??????????????????', '??????????????']}
                        func1 = {() => props.changeInventoryState({filterOption: 0})}
                        func2 = {() => props.changeInventoryState({filterOption: 1})}
                        func3 = {() => props.changeInventoryState({filterOption: 2})}
                        checked = { 0 }
                        invisible={!props.inventory.edit}
                    />
                    <div className='page-buttons'>
                        <Checkbox
                            id='id'
                            type='slide-three'
                            label='???????????? ??????????????, ?????????????? ??????????????'
                            onChange={event => props.changeInventoryState({hideGood: event.target.checked})}
                            checked={props.inventory.hideGood}
                            invisible={!props.inventory.edit}
                        />
                        <div className='row g6'>
                            <Button
                                id='WriteOfEditor'
                                size='med'
                                type='destructive'
                                title='?????????????? ??????????????????'
                                onClick={handleWriteOf}
                                invisible={!props.inventory.edit || !shortage.filter(part => !part.is_fixed).length}
                            />
                            <Button
                                id='RegistrationEditor'
                                size='med'
                                type='create'
                                title='???????????????????????? ??????????????'
                                onClick={handleRegistration}
                                invisible={!props.inventory.edit || !surplus.filter(part => !part.is_fixed).length}
                            />
                        </div>
                    </div>
                    <AddInventoryPart/>
                    <InventoryPartTable/>
                    <LableArea
                        title='??????????????????????'
                        onChange={event => props.changeInventoryState({description: event.target.value})}
                        value={props.inventory.description}
                    />
                </div>
                <BottomButtons
                    edit={props.inventory.edit}
                    create={handleCreate}
                    save={() => props.saveInventory()}
                    close={handleClose}
                />
            </div>
    )
}

const Clause = (props) => {
    return (
        <div className='row g6'>
            <span>{props.title}</span>
            <span>{props.text}</span>
        </div>
    )
}

const mapStateToProps = state => ({
    inventory: state.inventory,
    remain: state.remain
})

const mapDispatchToProps = {
    resetInventory,
    changeInventoryState,
    changeVisibleState,
    changeWriteOfState,
    saveInventory,
    createInventory,
    changeRegistrationState,
    getRegistration,
    getWriteOf
}

export default connect(mapStateToProps, mapDispatchToProps)(InventoryEditor)