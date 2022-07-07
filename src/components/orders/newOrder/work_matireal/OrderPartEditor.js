import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { setVisibleFlag } from '../../../../Redux/actions'
import {changeOrderPartForm, createCustomOrderPart, deleteOrderPart} from '../../../../Redux/actions/orderPartAction'
import {resetOrderPart, saveOrderPart} from '../../../../Redux/actions/orderPartAction'


import LableInput from '../../../general/LableInput'
import LableArea from '../../../general/LableArea'
import BottomButtons from '../../../general/BottomButtons'
import ChooseOfList from '../../../general/ChooseOfList'
import ChooseBotton from '../../../general/ChooseBotton'

const OrderPartEditor = (props) => {

    const handleClose = () => {
        props.setVisibleFlag('inputOrderPartEngineerChecked', true)
        props.setVisibleFlag('inputOrderPartTitleChacked', true)
        props.setVisibleFlag('statusOrderPartEditor', false)
        props.resetOrderPart()
    }

    const clickHandel = (event) => {
        if (!event.path.map((el) => el.id).includes('orderPartEditorWindow')) {
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
        props.changeOrderPartForm(discount, 'discount_value')
        // Перечисляем зависимости
    }, [props.orderPart.discount, props.orderPart.percent, props.orderPart.amount])

    // В зависимости от стоимости товара price, суммы скидки discount_value и количества amount
    // расчитываем конечную стоимоть total
    useEffect(() => {
        // Умнажаем стомость товар price на количество amount и отнимаем общуу скидку discount_value
        const total = props.orderPart.price * props.orderPart.amount - props.orderPart.discount_value
        // Заносим данные в state
        props.changeOrderPartForm(total , 'total')
        // Перечисляем зависимости
    }, [props.orderPart.price, props.orderPart.discount_value, props.orderPart.amount])


    const handleCreate = () => {
        if (props.orderPart.title && props.orderPart.engineer_id) {
            props.createCustomOrderPart()
            handleClose()
        } else {
            if (!props.orderPart.title) props.setVisibleFlag('inputOrderPartTitleChacked', false)
            if (!props.orderPart.engineer_id) props.setVisibleFlag('inputOrderPartEngineerChecked', false)
        }
    }

    const handleSave = () => {
        if (props.orderPart.title && props.orderPart.engineer_id) {
            props.saveOrderPart()
            handleClose()
        } else {
            if (!props.orderPart.title) props.setVisibleFlag('inputOrderPartTitleChacked', false)
            if (!props.orderPart.engineer_id) props.setVisibleFlag('inputOrderPartEngineerChecked', false)
        }
    }

    return (
        <div className='rightBlock'>
            <div className='rightBlockWindow mwp' id='orderPartEditorWindow'>
                <div className='createNewTitle fsz20'>{props.orderPart.edit ? props.orderPart.title : 'Добавить материал'}</div>

                <div className='contentEditor'>
                    <LableInput
                        className='mt15'
                        title='Наименование'
                        onChange={event => props.changeOrderPartForm(event.target.value, 'title')}
                        value={props.orderPart.title}
                        checkedFlag='inputOrderPartTitleChacked'
                        checked={props.view.inputOrderPartTitleChacked}
                        disabled={props.orderPart.deleted}
                        invisible={props.orderPart.edit}
                        redStar={true}
                    />
                    <LableInput
                        className='w70 mt15'
                        title='Цена'
                        onChange={event => props.changeOrderPartForm(event.target.value.replace(/[^0-9.]/g, ''), 'price')}
                        value={props.orderPart.price}
                        unit='руб.'
                        disabled={props.orderPart.deleted}
                    />
                    <LableInput
                        className='w70 mt15'
                        title='Количество'
                        onChange={event => props.changeOrderPartForm(parseInt(event.target.value.replace(/[^0-9.]/g, '')), 'amount')}
                        value={props.orderPart.amount}
                        unit=' '
                        disabled={props.orderPart.deleted}
                    />
                    <LableInput
                        className='w70 mt15'
                        title='Себестоимость'
                        onChange={event => props.changeOrderPartForm(event.target.value.replace(/[^0-9.]/g, ''), 'cost')}
                        value={props.orderPart.cost}
                        unit='руб.'
                        disabled={props.orderPart.deleted}
                    />
                    <div className='row al-itm-fe'>
                        <LableInput
                            className='w70 mt15'
                            title='Скидка'
                            onChange={event => props.changeOrderPartForm(event.target.value.replace(/[^0-9]/g, ''), 'discount')}
                            value={props.orderPart.discount}
                            unit=' '
                            disabled={props.orderPart.deleted}
                        />
                        <ChooseBotton
                            className='ml30'
                            name={['руб.', '%']}
                            func1 = {() => props.changeOrderPartForm(false, 'percent')}
                            func2 = {() => props.changeOrderPartForm(true, 'percent')}
                            disabled={props.orderPart.deleted}
                        />
                    </div>
                    <div className='row al-itm-fe'>
                        <LableInput
                            className='w70 mt15'
                            title='Гарантия'
                            onChange={event => props.changeOrderPartForm(event.target.value.replace(/[^0-9]/g, '') * props.orderPart.warranty_value, 'warranty_period')}
                            value={parseInt(props.orderPart.warranty_period / props.orderPart.warranty_value)}
                            unit=' '
                            disabled={props.orderPart.deleted}
                        />
                        <ChooseBotton
                            className='ml30'
                            name={['Дни', 'Мес']}
                            func1 = {() => props.changeOrderPartForm(1*24*60*60, 'warranty_value')}
                            func2 = {() => props.changeOrderPartForm(30*24*60*60, 'warranty_value')}
                            disabled={props.orderPart.deleted}
                        />
                    </div>
                    <ChooseOfList
                        id={24}
                        title='Исполнитель'
                        className='mt15'
                        list={props.employees.filter(employee => employee.role.permissions.includes('in_list_engineers'))}
                        field='engineer_id'
                        setElement={props.changeOrderPartForm}
                        current_id={props.orderPart.engineer_id}
                        employee={true}
                        width={'250px'}
                        checkedFlag='inputOrderPartEngineerChecked'
                        checked={props.view.inputOrderPartEngineerChecked}
                        disabled={props.orderPart.deleted}
                    />
                    <LableArea
                        className='w250 mt15'
                        title='Коментарий'
                        onChange={event => props.changeOrderPartForm(event.target.value, 'comment')}
                        value={props.orderPart.comment}
                        disabled={props.orderPart.deleted}
                    />
                    <div className='mt15'>Сумма скидки: {props.orderPart.discount_value}</div>
                    <div>Итого: {props.orderPart.total}</div>


                </div>


                <BottomButtons
                    edit={props.orderPart.edit}
                    deleted={props.orderPart.deleted}
                    create={handleCreate}
                    save={handleSave}
                    delete={props.permissions.includes('setting_delete_service') ? () => props.deleteOrderPart(true) : null}
                    recover={props.permissions.includes('setting_recover_service') ? () => props.deleteOrderPart(false) : null}
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
    setVisibleFlag,
    resetOrderPart,
    changeOrderPartForm,
    createCustomOrderPart,
    saveOrderPart,
    deleteOrderPart
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderPartEditor)
