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

const InventoryEditor = (props) => {


    const handleClose = () => {
        props.resetInventory()
        props.changeVisibleState({statusInventoryEditor: false})
    }

    const clickHandel = event => {
        if (
            !event.composedPath().map((el) => el.id).includes('addInventory') &&
            !event.composedPath().map((el) => el.id).includes('writeOfEditor') &&
            !event.composedPath().map((el) => el.id).includes('registrationEditor') &&
            !event.composedPath().map((el) => el.id).includes('inventoryEditor')
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
        props.changeVisibleState({statusWriteOfEditor: true})
        props.changeWriteOfState({
            parts,
            inventory_id: props.inventory.edit,
            write_of_type: {new_write_of: true, type: 'WAREHOUSE'},
            description: `Не досдача при инвентаризации ${props.inventory.label}`
        })
    }

    const handleRegistration = () => {
        const parts = surplus.filter(part => !part.is_fixed).map(part => ({
                buy_cost: 0,
                cell: part.cell,
                count: part.surplus,
                seller: `Добавлена после инвентаризации ${props.inventory.label}`,
                checked: true,
                part: {id: part.part_id, title: part.title}
            })
        )
        props.changeVisibleState({statusRegistrationEditor: true})
        props.changeRegistrationState({
            parts,
            inventory_id: props.inventory.edit,
            description: `Избыток при инвентаризации ${props.inventory.label}`,
            warehouse: props.inventory.warehouse
        })
    }

    const handleOpenDoc = (doc) => {
        if (doc.type === 'Оприходование') {
            props.getRegistration(doc.id)
        }
        if (doc.type === 'Списание') {
            props.getWriteOf(doc.id)
        }
    }

    return (
        <div className='rightBlock'>
            <div className='rightBlockWindow wmn900' id='inventoryEditor'>
                <div className='createNewTitle'>{props.inventory.edit ? `Инвентаризация ${props.inventory.label}` : 'Новая инвентаризация'}</div>
                <div className='contentEditor'>
                    <div className='row mt15'>
                        <span className='txtb'>Склад: </span>
                        <span className='ml5'>{props.remain.filter_warehouse.title}</span>
                    </div>
                    <div className='row mt15'>
                        <span className='txtb'>Склад: </span>
                        <span className='ml5'>{props.remain.filter_category.title}</span>
                    </div>
                    {props.inventory.edit ?
                        <div>
                            <div className='row mt15'>
                                <span className='txtb'>Инвентаризованно: </span>
                                <span className='ml5'>{`${props.inventory.parts.length} шт.`}</span>
                            </div>
                            <div className='row mt15'>
                                <span className='txtb'>Соответствует учету: </span>
                                <span className='ml5'>{`${props.inventory.parts.filter(part => part.count === part.actual_count).length} шт.`}</span>
                            </div>
                            <div className='row mt15'>
                                <span className='txtb'>Недостача: </span>
                                <span className='ml5'>{`${shortage.length} шт.`}</span>
                            </div>
                            <div className='row mt15'>
                                <span className='txtb'>Излишек: </span>
                                <span className='ml5'>{`${surplus.length} шт.`}</span>
                            </div>
                            <div className='row mt15'>
                                <span className='txtb'>Не решенных позиций: </span>
                                <span className='ml5'>{`${props.inventory.parts.filter(part => part.is_fixed === false).length} шт.`}</span>
                            </div>
                            {props.inventory.related_docs ?
                                <div className='row mt15'>
                                    <span className='txtb'>Связанные докуметы: </span>
                                    {props.inventory.related_docs.map((doc, idx) => (
                                        <span key={doc.label}>
                                            <span className='ml5'>{doc.type}</span>
                                            <span
                                                className='ml5 orderLink curP'
                                                onClick={() => handleOpenDoc(doc)}
                                            >
                                                {doc.label}
                                            </span>
                                            {props.inventory.related_docs.length !== idx + 1 ? <span>,</span> : null}
                                        </span>
                                    ))}
                                </div>
                            : null}
                        </div> : null}
                    <ChooseButton
                        className='mt15'
                        title= 'Фактическое количество невнесенных товаров равно'
                        name={['Нулю', 'Учету']}
                        func1 = {() => props.changeInventoryState({isZero: true})}
                        func2 = {() => props.changeInventoryState({isZero: false})}
                        checked = { true }
                        invisible={props.inventory.edit}
                    />
                    <MultyButton
                        className='mt15'
                        name={['Все', 'Недосдача', 'Излишек']}
                        func1 = {() => props.changeInventoryState({filterOption: 0})}
                        func2 = {() => props.changeInventoryState({filterOption: 1})}
                        func3 = {() => props.changeInventoryState({filterOption: 2})}
                        checked = { 0 }
                        invisible={!props.inventory.edit}
                    />
                    <div className='row jc-sb mt15'>
                        <Checkbox
                            label='Скрыть позиции, которые сошлись'
                            onChange={event => props.changeInventoryState({hideGood: event.target.checked})}
                            checked={props.inventory.hideGood}
                            invisible={!props.inventory.edit}
                        />
                        <div className='row'>
                            <Button
                                id='addWriteOf'
                                className='greenButton h31'
                                title='Списать недосдачу'
                                onClick={handleWriteOf}
                                invisible={!props.inventory.edit || !shortage.filter(part => !part.is_fixed).length}
                            />
                            <Button
                                id='newRegistration'
                                className='greenButton ml5 h31'
                                title='Оприходовать излишек'
                                onClick={handleRegistration}
                                invisible={!props.inventory.edit || !surplus.filter(part => !part.is_fixed).length}
                            />
                        </div>
                    </div>
                    <AddInventoryPart/>
                    <InventoryPartTable/>
                    <LableArea
                        className='mt15'
                        title='Комментарий'
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