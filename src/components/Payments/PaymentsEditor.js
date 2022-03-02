import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import ru from 'date-fns/locale/ru';
import DatePicker, {registerLocale} from 'react-datepicker'

import {
    setVisibleFlag,
    addClients,
    addItemPayments,
    refreshDataOrder,
    changeStatusMenuVisible
} from '../../Redux/actions'
import {changePaymentForm, addPaymentTag, deletePaymentTag} from '../../Redux/actions/paymentAction'
import {createPayment, resetPayments} from '../../Redux/actions/paymentAction'
import {check0_999} from '../general/utils';
import BottomButtons from '../general/BottomButtons'
import ChooseBotton from '../general/ChooseBotton'
import SetClientByName from './SetClientByName'
import ClientCard from '../Clients/ClientCard'
import Receipt from './Receipt'
import ChooseOfList from '../general/ChooseOfList'
import LableArea from '../general/LableArea'
import AddTags from '../general/AddTags'
import {changeStatus} from '../../Redux/actions/orderActions'

registerLocale('ru', ru)

const PaymentsEditor = (props) => {

    const handleClose = () => {
        props.setVisibleFlag('inputPaymentSumChecked', true)
        props.setVisibleFlag('inputPaymentCashboxChecked', true)
        props.setVisibleFlag('inputPaymentDescChecked', true)
        props.setVisibleFlag('inputPaymentCashflowChecked', true)
        props.setVisibleFlag('inputPaymentEmployeeChecked', true)
        props.setVisibleFlag('statusPaymentsEditor', false)
        props.resetPayments()
    }

    const clickHandel = (event) => {

        if (!event.path.map((el) => el.id).includes('paymentsEditorWiondow') &&
            !event.path.map((el) => el.id).includes('createNewOrder')
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

    useEffect(() => {
        props.addClients()
    }, [props.clientFilter])

    useEffect(() => {
        props.addItemPayments()
        props.changePaymentForm(props.user_id, 'employee_id')
        props.changePaymentForm(props.current_cashbox.id, 'cashbox_id')
    }, [])

    const hangleCreate = () => {
        if (
            // Проверим внесена ли сумма
            (props.payment.income || props.payment.outcome) &&
            // Проверим выбрана ли касса при direction (приход или расход) или выбрана ли целевая касса при перемещение дененг в дргую касса
            ((props.payment.cashbox_id && props.payment.direction) || (props.payment.target_cashbox_id && !props.payment.direction)) &&
            // Преовеним введен ли коментарий
            props.payment.description &&
            // Проверим выбрана ли категория если это приход или расход
            (props.payment.cashflow_category || !props.payment.direction) &&
            // Проверим выбран ли сотрудник
            props.payment.employee_id
        ) {
            props.createPayment(props.payment.context)
            // Если есть значение closed_order_status значит окно платежа вызвано закртыием заказа
            // и после платежа нам нужно сменить статус заказа на закрыт
            // if (props.payment.closed_order_status) {
            //     // Отправляем запрос на смену статуса
            //     props.changeStatus(props.payment.closed_order_status, props.payment.order_id)
            //     // Если смена статуса вызавана из редактора заказа
            //     if (props.order_edit) {
            //         // Обновляем заказ после смены статуса
            //         props.refreshDataOrder(props.payment.order_id)
            //     } else {
            //         // Если смена статуса вызвана из таблицы заказов, то закрытваем меню выбора статуса
            //         props.changeStatusMenuVisible(props.payment.order_id)
            //     }
            // }
        } else {
            if (!(props.payment.income || props.payment.outcome))
                props.setVisibleFlag('inputPaymentSumChecked', false)
            if (!(props.payment.cashbox_id && props.payment.direction) || !(props.payment.target_cashbox_id && !props.payment.direction))
                props.setVisibleFlag('inputPaymentCashboxChecked', false)
            if (!props.payment.description)
                props.setVisibleFlag('inputPaymentDescChecked', false)
            if (!props.payment.cashflow_category)
                props.setVisibleFlag('inputPaymentCashflowChecked', false)
            if (!props.payment.employee_id)
                props.setVisibleFlag('inputPaymentEmployeeChecked', false)
        }
    }

    // const hangleSave = () => {
    //     if (
    //         check0_999(props.payment.sum) &&
    //         props.payment.cashbox_id
    //     ) {
    //         console.log('all is good')
    //     } else {
    //         if (check0_999(props.payment.sum)) {
    //             props.setVisibleFlag('inputPaymentSumChecked', false)
    //         }
    //         if (!props.payment.cashbox_id) {
    //             props.setVisibleFlag('inputPaymentCashboxChecked', false)
    //         }
    //     }
    // }

    const [chooseData, setChooseData] = useState(false)
    const [chooseForm, setChooseForm] = useState(props.current_cashbox.type)

    const title = ['Перемещение денег', 'Расход денег', 'Приход денег']

    const cashboxes = props.cashboxes.filter(cashbox =>
        cashbox.type === chooseForm &&
        (props.payment.direction || cashbox.id !== props.payment.cashbox_id) &&
        !cashbox.deleted &&
        (cashbox.isGlobal || cashbox.branch_id === props.current_branch_id)
    )

    return (
        <div className="rightBlock">
            <div className="rightBlockWindow wmn500" id="paymentsEditorWiondow">
                <div className="createNewTitle">
                    {title[props.payment.direction]}
                </div>

                <div className='contentEditor'>

                    <div className='row al-itm-fe'>
                        <ChooseBotton
                            className='mt15 mr-rg-20'
                            title='Дата и время'
                            name={['Текущее', 'Заданное']}
                            func1={() => {
                                setChooseData(false)
                                props.changePaymentForm(0, 'custom_created_at')
                            }}
                            func2={() => setChooseData(true)}
                            checked={true}
                            disabled={!props.permissions.includes('backdating')}
                        />
                        {chooseData ?
                            <DatePicker
                                selected={props.payment.custom_created_at ? new Date(props.payment.custom_created_at * 1000) : Date.now()}
                                onChange={(date) => {
                                    props.changePaymentForm(date / 1000, 'custom_created_at')
                                }}
                                isClearable={true}
                                placeholderText='Выбирите дату'
                                className="optionFilterInputDate"
                                dateFormat='dd.MM.yyyy HH:mm'
                                locale={'ru'}
                                maxDate={Date.now()}
                                // startDate={Date.now()}
                                showTimeSelect
                            /> : null}
                    </div>

                    {props.payment.direction ? (props.payment.client_id ?
                        <ClientCard
                            edit={() => props.setVisibleFlag('statusCreateNewClient', true)}
                            close={() => props.changePaymentForm(0, 'client_id')}
                        /> : <SetClientByName/>) : null}
                    <Receipt/>

                    <div className='row mt15 al-itm-fs'>
                        <ChooseBotton
                            className=''
                            title='Форма оплаты'
                            name={['Нал.', 'Безнал.']}
                            func1={() => {
                                props.changePaymentForm(0, props.payment.direction ? 'cashbox_id' : 'target_cashbox_id')
                                setChooseForm(0)
                            }}
                            func2={() => {
                                props.changePaymentForm(0, props.payment.direction ? 'cashbox_id' : 'target_cashbox_id')
                                setChooseForm(1)
                            }}
                            checked={!props.current_cashbox.type}
                        />
                        <ChooseOfList
                            id={20}
                            title='Касса'
                            className='ml10 h52'
                            list={cashboxes}
                            field={props.payment.direction ? 'cashbox_id' : 'target_cashbox_id'}
                            setElement={props.changePaymentForm}
                            current_id={props.payment.direction ? props.payment.cashbox_id : props.payment.target_cashbox_id}
                            width={'250px'}
                            checkedFlag='inputPaymentCashboxChecked'
                            checked={props.view.inputPaymentCashboxChecked}
                            disabled={props.payment.deleted}
                        />
                    </div>
                    <LableArea
                        className='mt15'
                        title='Коментарий'
                        onChange={event => props.changePaymentForm(event.target.value, 'description')}
                        value={props.payment.description}
                        checkedFlag='inputPaymentDescChecked'
                        checked={props.view.inputPaymentDescChecked}
                        redStar={true}
                        disabled={props.payment.deleted}
                    />
                    <ChooseOfList
                        id={21}
                        title='Статья'
                        className='mt15 h52'
                        list={props.item_payments.filter(item => item.direction === props.payment.direction)}
                        field='cashflow_category'
                        setElement={props.changePaymentForm}
                        current_id={props.payment.cashflow_category}
                        width={'250px'}
                        checkedFlag='inputPaymentCashflowChecked'
                        checked={props.view.inputPaymentCashflowChecked}
                        disabled={props.payment.deleted}
                        unvisible={!props.payment.direction}
                    />
                    <ChooseOfList
                        id={22}
                        title='Кассир'
                        className='mt15 h52'
                        list={props.employees.filter(employee => !employee.deleted)}
                        field='employee_id'
                        setElement={props.changePaymentForm}
                        current_id={props.payment.employee_id}
                        width={'250px'}
                        employee={true}
                        checkedFlag='inputPaymentEmployeeChecked'
                        checked={props.view.inputPaymentEmployeeChecked}
                        disabled={!props.permissions.includes('choose_emploees')}
                    />
                    <AddTags
                        className='mt15'
                        tags={props.payment.tags}
                        addTag={props.addPaymentTag}
                        daleteTag={props.deletePaymentTag}
                    />

                </div>


                <BottomButtons
                    edit={props.payment.edit}
                    create={hangleCreate}
                    // save={hangleSave}
                    delete={props.permissions.includes('edit_cash') ? () => props.deleteCashbox(true) : null}
                    recover={props.permissions.includes('edit_cash') ? () => props.deleteCashbox(false) : null}
                    close={handleClose}
                    deleted={props.payment.deleted}
                />
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    view: state.view,
    payment: state.payment,
    permissions: state.data.user.role.permissions,
    clientFilter: state.filter.clientFilter,
    cashboxes: state.data.cashboxes,
    current_branch_id: state.data.current_branch.id,
    item_payments: state.data.item_payments,
    employees: state.data.employees,
    user_id: state.data.user.id,
    current_cashbox: state.cashbox.current_cashbox,
    order_edit: state.order.edit
})

const mapDispatchToProps = {
    changePaymentForm,
    setVisibleFlag,
    addClients,
    addItemPayments,
    addPaymentTag,
    deletePaymentTag,
    createPayment,
    resetPayments,
    changeStatus,
    refreshDataOrder,
    changeStatusMenuVisible
}

export default connect(mapStateToProps, mapDispatchToProps)(PaymentsEditor)
