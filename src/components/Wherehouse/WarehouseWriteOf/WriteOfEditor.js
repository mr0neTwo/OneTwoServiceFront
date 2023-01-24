import React, {useEffect, useState} from 'react'
import { connect } from 'react-redux'

import {changeWriteOfState, createWriteOf, getWriteOf} from '../../../Redux/actions/writeOfAction'
import {resetWriteOf, saveWriteOf} from '../../../Redux/actions/writeOfAction'
import {changeRemainState} from '../../../Redux/actions/remainAction'
import {addWarehouse, addWarehouseCategories} from '../../../Redux/actions/warehouseAction'
import {changeVisibleState} from '../../../Redux/actions'

import BottomButtons from '../../general/BottomButtons'
import SelectFromList from '../../general/SelectFromList'
import ChooseCategory from '../WarehouseParts/ChooseCategory'
import AddWriteOf from './AddWriteOf'
import WriteOfPartTable from './WriteOfPartTable'
import LableArea from '../../general/LableArea'


const WriteOfEditor = (props) => {

    const [showMessage, setShowMessage] = useState(false)

    const id = 'WriteOfEditor'
    const check_parts = !!props.writeof.parts.length

    useEffect(() => {
        props.changeRemainState({filter_type:  {id: 2, title: 'Только в наличии'}})
        if (props.writeof.write_of_type.new_write_of) {
                props.addWarehouseCategories()
                props.addWarehouse()
            }}, [props.writeof.write_of_type])

    const handleClose = () => {
        props.resetWriteOf()
        props.changeVisibleState({statusWriteOfEditor: false})
    }

    const clickHandel = event => {
        if (
            !event.composedPath().map((el) => el.id).includes('addWriteOf') &&
            !event.composedPath().map((el) => el.id).includes('newOrderPart') &&
            !event.composedPath().map((el) => el.id).includes(id)
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
        if (props.writeof.parts.length) {
            props.createWriteOf()
        }
    }

    const showTip = () => {
        if (!props.writeof.edit) setShowMessage(true)
        setTimeout(() => {
            setShowMessage(false)
        }, 3000)
    }

    return (
        <div className='modal modal_z20'>
            <div className='modal__box modal__box_editor' id={id}>
                <h4>{props.writeof.edit ? `Списание ${props.writeof.label}` : 'Новое списание'}</h4>

                <div className='modal__body modal__body-editor'>
                    <SelectFromList
                        className='w220'
                        title='Инженер'
                        list={props.employees}
                        setElement={employee => props.changeWriteOfState({engineer: employee})}
                        current_object={props.writeof.engineer}
                        employee={true}
                        noChoosed='Выберете инженера'
                        invisible={!(props.writeof.write_of_type.type === 'ORDER')}
                    />
                    <div className='two-buttons'>

                    <div
                        className='warehouse-select'
                        onClick={check_parts ? () => showTip() : null}
                    >
                        <SelectFromList
                            title='Склад'
                            list={props.warehouses}
                            setElement={warehouse => props.changeRemainState({filter_warehouse: warehouse})}
                            current_object={props.writeof.edit ? props.writeof.warehouse : props.remain.filter_warehouse}
                            noChoosed='Выберете склад'
                            disabled={check_parts || !!props.writeof.edit || !!props.writeof.inventory_id}
                        />
                        {showMessage ?
                            <div className='warehouse-select__tip'>
                                Чтобы изменить склад, нужно удалить добавленные товары или запчасти
                            </div> : null}
                    </div>
                    <ChooseCategory
                        className='ml10'
                        width={'210px'}
                        setCategory={category => props.changeRemainState({filter_category: category})}
                        current_category={props.remain.filter_category}
                        disabled={!!props.writeof.edit|| !!props.writeof.inventory_id}
                    />
                    <SelectFromList
                        title='Цена'
                        list={props.discount_margin}
                        setElement={warehouse => props.changeWriteOfState({discount_margin: warehouse})}
                        current_object={props.writeof.discount_margin}
                        noChoosed='Выберете цену'
                        invisible={!(props.writeof.write_of_type.type === 'ORDER')}
                    />
                    </div>
                    <AddWriteOf/>
                    <WriteOfPartTable/>
                    <LableArea
                        title='Комментарий'
                        onChange={event => props.changeWriteOfState({description: event.target.value})}
                        value={props.writeof.description}
                    />
                </div>

                <BottomButtons
                    edit={props.writeof.edit}
                    create={handleCreate}
                    save={() => props.saveWriteOf()}
                    close={handleClose}
                />
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    writeof: state.writeof,
    remain: state.remain,
    employees: state.employee.employees.filter(employee => employee.id !== 0 && !employee.deleted),
    warehouses: state.warehouse.warehouses,
    discount_margin: state.price.discount_margin.filter(margin => margin.margin_type === 2)
})

const mapDispatchToProps = {
    getWriteOf,
    resetWriteOf,
    changeWriteOfState,
    changeRemainState,
    createWriteOf,
    addWarehouse,
    addWarehouseCategories,
    changeVisibleState,
    saveWriteOf
}

export default connect(mapStateToProps, mapDispatchToProps)(WriteOfEditor)