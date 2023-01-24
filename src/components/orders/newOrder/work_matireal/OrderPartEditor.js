import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import {changeVisibleState} from '../../../../Redux/actions'
import {changeOrderPartState, createCustomOrderPart, deleteOrderPart} from '../../../../Redux/actions/orderPartAction'
import {resetOrderPart, saveOrderPart} from '../../../../Redux/actions/orderPartAction'


import LableInput from '../../../general/LableInput'
import LableArea from '../../../general/LableArea'
import BottomButtons from '../../../general/BottomButtons'
import ChooseButton from '../../../general/ChooseButton'
import SelectFromList from '../../../general/SelectFromList'
import {checkObject} from '../../../general/utils'

const OrderPartEditor = (props) => {

    const id = 'OrderPartEditor'

    const handleClose = () => {
        props.changeVisibleState({
            inputOrderPartEngineerChecked: true,
            inputOrderPartTitleChecked: true,
            statusOrderPartEditor: false
        })
        props.resetOrderPart()
    }

    const clickHandel = (event) => {
        if (!event.composedPath().map((el) => el.id).includes(id)) {
            handleClose()
        }
    }

    useEffect(() => {
        window.addEventListener('click', clickHandel)
        return () => {
            window.removeEventListener('click', clickHandel)
        }
    })

    // В зависимости от суммы скидки discount, способа расчета percent (процент или сумма), и количества amount
    // расчитываем сумму скидки discount_value
    useEffect(() => {
        // Если считаем процент то, умножаем стоимость товара price на количество amount и на процент discount/100, если нет отставляем просто сумму скидки discount
        const discount = props.orderPart.percent ?  props.orderPart.price * props.orderPart.amount * props.orderPart.discount / 100 : props.orderPart.discount
        // Заносим получивешееся значение в state
        props.changeOrderPartState({discount_value: discount})
        // Перечисляем зависимости
    }, [props.orderPart.discount, props.orderPart.percent, props.orderPart.amount])

    // В зависимости от стоимости товара price, суммы скидки discount_value и количества amount
    // расчитываем конечную стоимоть total
    useEffect(() => {
        // Умнажаем стомость товар price на количество amount и отнимаем общуу скидку discount_value
        const total = props.orderPart.price * props.orderPart.amount - props.orderPart.discount_value
        // Заносим данные в state
        props.changeOrderPartState({total})
        // Перечисляем зависимости
    }, [props.orderPart.price, props.orderPart.discount_value, props.orderPart.amount])


    const handleCreate = () => {
        if (props.orderPart.title && checkObject(props.orderPart.engineer)) {
            props.createCustomOrderPart()
            handleClose()
        } else {
            if (!props.orderPart.title) props.changeVisibleState({inputOrderPartTitleChecked: false})
            if (!checkObject(props.orderPart.engineer)) props.changeVisibleState({inputOrderPartEngineerChecked: false})
        }
    }

    const handleSave = () => {
        if (props.orderPart.title && checkObject(props.orderPart.engineer)) {
            props.saveOrderPart()
            handleClose()
        } else {
            if (!props.orderPart.title) props.changeVisibleState({inputOrderPartTitleChecked: false})
            if (!checkObject(props.orderPart.engineer)) props.changeVisibleState({inputOrderPartEngineerChecked: false})
        }
    }

    const handleDelete = props.permissions.includes('setting_delete_service') ? () => {
        if(props.orderPart.warehouse_parts_id) {
            props.changeVisibleState({statusReturnPart: true})
        } else {
            props.deleteOrderPart(true)
        }
    } : null

    return (
        <div className='modal'>
            <div className='modal__box modal__box_editor' id={id}>
                <h4>{props.orderPart.edit ? props.orderPart.title : 'Добавить материал'}</h4>

                <div className='modal__body modal__body-editor'>
                    <div className='modal__forms'>
                    <LableInput
                        title='Наименование'
                        onChange={event => props.changeOrderPartState({title: event.target.value})}
                        value={props.orderPart.title}
                        checkedFlag='inputOrderPartTitleChecked'
                        disabled={props.orderPart.deleted}
                        redStar={true}
                    />
                    <LableInput
                        title='Количество'
                        onChange={event => props.changeOrderPartState(parseInt({amount: event.target.value.replace(/[^0-9.]/g, '')}))}
                        value={props.orderPart.amount}
                        disabled={props.orderPart.deleted}
                    />
                    <LableInput
                        title='Цена'
                        onChange={event => props.changeOrderPartState({price: event.target.value.replace(/[^0-9.]/g, '')})}
                        value={props.orderPart.price}
                        unit='руб'
                        disabled={props.orderPart.deleted}
                    />
                    <LableInput
                        title='Себестоимость'
                        onChange={event => props.changeOrderPartState({cost: event.target.value.replace(/[^0-9.]/g, '')})}
                        value={props.orderPart.cost}
                        unit='руб'
                        disabled={props.orderPart.deleted || !props.permissions.includes('edit_buy_cost')}
                        invisible={!props.permissions.includes('see_buy_cost')}
                    />
                    <div className='two-buttons'>
                        <LableInput
                            title='Скидка'
                            onChange={event => props.changeOrderPartState({discount: event.target.value.replace(/[^0-9]/g, '')})}
                            value={props.orderPart.discount}
                            disabled={props.orderPart.deleted}
                        />
                        <ChooseButton
                            name={['руб', '%']}
                            func1 = {() => props.changeOrderPartState({percent: false})}
                            func2 = {() => props.changeOrderPartState({percent: true})}
                            disabled={props.orderPart.deleted}
                        />
                    </div>
                    <div className='two-buttons'>
                        <LableInput
                            title='Гарантия'
                            onChange={event => props.changeOrderPartState({
                                warranty_period: event.target.value.replace(/[^0-9]/g, '') * props.orderPart.warranty_value
                            })}
                            value={Math.round(props.orderPart.warranty_period / props.orderPart.warranty_value)}
                            disabled={props.orderPart.deleted}
                        />
                        <ChooseButton
                            name={['Дни', 'Мес']}
                            func1 = {() => props.changeOrderPartState({warranty_value: 24*60*60})}
                            func2 = {() => props.changeOrderPartState({warranty_value: 30*24*60*60})}
                            disabled={props.orderPart.deleted}
                        />
                    </div>
                    </div>
                    <SelectFromList
                        className='w220'
                        title='Исполнитель'
                        list={props.employees.filter(employee => employee.role.permissions.includes('in_list_engineers'))}
                        setElement={engineer => props.changeOrderPartState({engineer})}
                        current_object={props.orderPart.engineer}
                        checkedFlag='inputOrderPartEngineerChecked'
                        noChoosed='Выберете сотрудника'
                        disabled={props.orderPart.deleted}
                    />
                    <LableArea
                        title='Коментарий'
                        onChange={event => props.changeOrderPartState({comment: event.target.value})}
                        value={props.orderPart.comment}
                        disabled={props.orderPart.deleted}
                    />
                    <div>Сумма скидки: {props.orderPart.discount_value}</div>
                    <div>Итого: {props.orderPart.total}</div>


                </div>


                <BottomButtons
                    edit={props.orderPart.edit}
                    create={handleCreate}
                    save={handleSave}
                    delete={handleDelete}
                    close={handleClose}
                />
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    orderPart: state.orderPart,
    view: state.view,
    employees: state.employee.employees.filter(employee => !employee.deleted),
    permissions: state.data.user.role.permissions
})

const mapDispatchToProps = {
    resetOrderPart,
    changeOrderPartState,
    createCustomOrderPart,
    saveOrderPart,
    deleteOrderPart,
    changeVisibleState
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderPartEditor)
