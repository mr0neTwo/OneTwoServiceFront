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
            !event.composedPath().map((el) => el.id).includes('writeOfEditor')
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
        }, 2000)
    }

    return (
        <div className='rightBlock z9999'>
            <div className='rightBlockWindow wmn700' id='writeOfEditor'>
                <div className='createNewTitle'>{props.writeof.edit ? `Списание ${props.writeof.label}` : 'Новое списание'}</div>

                <div className='contentEditor'>
                    <SelectFromList
                        id='idSelectPartEngineer'
                        title='Инженер'
                        className='mt15'
                        list={props.employees}
                        setElement={employee => props.changeWriteOfState({engineer: employee})}
                        current_object={props.writeof.engineer}
                        width={'210px'}
                        employee={true}
                        noChoosed='Выберете инженера'
                        invisible={!(props.writeof.write_of_type.type === 'ORDER')}
                    />
                    <div className='row mt15'>
                        {showMessage ?
                            <div className='tipWriteOfMessage'>
                                Чтобы изменить склад, нужно удалить добавленные товары или запчасти
                            </div> : null}
                        <div onClick={check_parts ? () => showTip() : null}>
                            <SelectFromList
                                id='idSelectPartWarehouse'
                                title='Склад'
                                list={props.warehouses}
                                setElement={warehouse => props.changeRemainState({filter_warehouse: warehouse})}
                                current_object={props.writeof.edit ? props.writeof.warehouse : props.remain.filter_warehouse}
                                width={'210px'}
                                noChoosed='Выберете склад'
                                disabled={check_parts || !!props.writeof.edit || !!props.writeof.inventory_id}
                            />
                        </div>
                        <ChooseCategory
                            className='ml10'
                            width={'210px'}
                            setCategory={category => props.changeRemainState({filter_category: category})}
                            current_category={props.remain.filter_category}
                            disabled={!!props.writeof.edit|| !!props.writeof.inventory_id}
                        />
                        <SelectFromList
                            id='idSelectPartWarehouse'
                            title='Цена'
                            className='ml15'
                            list={props.discount_margin}
                            setElement={warehouse => props.changeWriteOfState({discount_margin: warehouse})}
                            current_object={props.writeof.discount_margin}
                            width={'210px'}
                            noChoosed='Выберете цену'
                            invisible={!(props.writeof.write_of_type.type === 'ORDER')}
                        />
                    </div>
                    <AddWriteOf/>
                    {props.writeof.parts.length ? <WriteOfPartTable/> : 'Добавьте хотябы онду запчасть'}
                    <LableArea
                        className='mt15'
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