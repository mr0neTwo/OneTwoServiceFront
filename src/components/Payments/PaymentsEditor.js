import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'

import {addItemPayments, refreshDataOrder, changeStatusMenuVisible, changeVisibleState} from '../../Redux/actions'
import { addPaymentTag, deletePaymentTag, changePaymentState} from '../../Redux/actions/paymentAction'
import {createPayment, resetPayments} from '../../Redux/actions/paymentAction'
import {changeStatus} from '../../Redux/actions/orderActions'
import {addClients} from '../../Redux/actions/clientAction'

import BottomButtons from '../general/BottomButtons'
import ChooseButton from '../general/ChooseButton'
import Receipt from './Receipt'
import LableArea from '../general/LableArea'
import AddTags from '../general/AddTags'
import ChooseDate from '../general/calandar/ChooseDate'
import SetClient from '../general/SetClient'
import SelectFromList from '../general/SelectFromList'
import {checkObject} from '../general/utils'
import Loader from "../Loader/Loader";


const PaymentsEditor = (props) => {

    const id = 'PaymentsEditor'

    const handleClose = () => {
        props.changeVisibleState({
            'inputPaymentSumChecked': true,
            'inputPaymentCashboxChecked': true,
            'inputPaymentDescChecked': true,
            'inputPaymentCashflowChecked': true,
            'inputPaymentEmployeeChecked': true,
            'statusPaymentsEditor': false,
        })
        props.resetPayments()
    }

    const clickHandel = (event) => {

        if (!event.composedPath().map((el) => el.id).includes(id) &&
            !event.composedPath().map((el) => el.id).includes('OrderEditor') &&
            !event.composedPath().map((el) => el.id).some(element_id => element_id?.includes('status'))
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
    }, [props.client.filter_name, props.client.filter_phone])


    const handleCreate = () => {
        const isSum = Boolean(props.payment.income || props.payment.outcome)
        const isDescription = Boolean(props.payment.description)
        const isCashflowCatecory = Boolean(checkObject(props.payment.cashflow_category) || !props.payment.direction)
        const isEmployee = Boolean(checkObject(props.payment.employee))

        // Проверим выбрана ли касса при direction (приход или расход) или выбрана ли целевая касса при перемещение дененг в дргую касса
        const isCheckbox = Boolean((checkObject(props.payment.cashbox) && props.payment.direction) ||
            (checkObject(props.payment.target_cashbox) && !props.payment.direction))

        if (
            isSum &&
            isCheckbox &&
            isDescription &&
            isCashflowCatecory &&
            isEmployee
        ) {
            props.createPayment(props.payment.context)
        } else {
            if (!isSum)
                props.changeVisibleState({'inputPaymentSumChecked': false})
            if (!isCheckbox)
                props.changeVisibleState({'inputPaymentCashboxChecked': false})
            if (!isDescription)
                props.changeVisibleState({'inputPaymentDescChecked': false})
            if (!isCashflowCatecory)
                props.changeVisibleState({'inputPaymentCashflowChecked': false})
            if (!isEmployee)
                props.changeVisibleState({'inputPaymentEmployeeChecked': false})
        }
    }


    const [chooseData, setChooseData] = useState(false)

    const title = ['Перемещение денег', 'Расход денег', 'Приход денег']

    const cashboxes = props.cashboxes.filter(cashbox =>
        cashbox.type === props.payment.current_type &&
        (props.payment.direction || cashbox.id !== props.payment.cashbox.id)
    )

    if (props.payment.showLoader) return <Loader/>

    return (
        <div className="modal modal_z20">
            <div className="modal__box modal__box_editor" id={id}>
                <h4>{title[props.payment.direction]}</h4>

                <div className='modal__body modal__body-payment'>

                    <div className='two-buttons'>
                        <ChooseButton
                            title='Дата и время'
                            name={['Текущее', 'Заданное']}
                            func1={() => {
                                setChooseData(false)
                                props.changePaymentState({custom_created_at: null})
                            }}
                            func2={() => {
                                setChooseData(true)
                                props.changePaymentState({custom_created_at: parseInt(new Date() / 1000)})
                            }}
                            checked={true}
                            disabled={!props.permissions.includes('backdating')}
                        />
                        <ChooseDate
                            func={date => props.changePaymentState({custom_created_at: parseInt(date / 1000)})}
                            current_date={props.payment.custom_created_at * 1000}
                            time={true}
                            invisible={!chooseData}
                        />
                    </div>
                    <SetClient
                        id='paymentEditorClient'
                        title='Имя клиента'
                        setClient={client => props.changePaymentState({client})}
                        client={props.payment.client}
                        disabled={!!props.order_edit}
                        invisible={!props.payment.direction}
                    />
                    <Receipt/>

                    <div className='two-buttons'>
                        <ChooseButton
                            title='Форма оплаты'
                            name={['Нал.', 'Безнал.']}
                            func1={() => {
                                props.changePaymentState({
                                    [props.payment.direction ? 'cashbox' : 'target_cashbox']: {},
                                    current_type: 0
                                })
                            }}
                            func2={() => {
                                props.changePaymentState({
                                    [props.payment.direction ? 'cashbox' : 'target_cashbox']: {},
                                    current_type: 1
                                })
                            }}
                            checked={!props.current_cashbox.type}
                        />
                        <SelectFromList
                            title='Касса'
                            list={cashboxes}
                            setElement={cashbox => props.changePaymentState({[props.payment.direction ? 'cashbox' : 'target_cashbox'] : cashbox})}
                            current_object={props.payment.direction ? props.payment.cashbox : props.payment.target_cashbox}
                            checkedFlag='inputPaymentCashboxChecked'
                            noChoosed='Выберете кассу'
                            disabled={props.payment.deleted}
                        />
                    </div>
                    <SelectFromList
                        title='Статья'
                        className='w220'
                        list={props.item_payments.filter(item => item.direction === props.payment.direction)}
                        setElement={cashflow_category => props.changePaymentState({cashflow_category})}
                        current_object={props.payment.cashflow_category}
                        checkedFlag='inputPaymentCashflowChecked'
                        noChoosed='Выберете статью'
                        disabled={props.payment.deleted}
                        invisible={!props.payment.direction}
                    />
                    <SelectFromList
                        title='Кассир'
                        className='w220'
                        list={props.employees.filter(employee => !employee.deleted)}
                        setElement={employee => props.changePaymentState({employee})}
                        current_object={props.payment.employee}
                        checkedFlag='inputPaymentEmployeeChecked'
                        noChoosed='Выберете сотрудника'
                        disabled={!props.permissions.includes('choose_emploees')}
                    />
                    <LableArea
                        title='Коментарий'
                        onChange={event => props.changePaymentState({description: event.target.value})}
                        value={props.payment.description}
                        checkedFlag='inputPaymentDescChecked'
                        checked={props.view.inputPaymentDescChecked}
                        redStar={true}
                        disabled={props.payment.deleted}
                    />
                    <AddTags
                        tags={props.payment.tags}
                        addTag={props.addPaymentTag}
                        daleteTag={props.deletePaymentTag}
                    />
                </div>

                <BottomButtons
                    edit={props.payment.edit}
                    create={handleCreate}
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
    filter: state.filter,
    client: state.client,
    cashboxes: state.cashbox.cashboxes,
    current_branch_id: state.branch.current_branch.id,
    item_payments: state.data.item_payments,
    employees: state.employee.employees,
    user_id: state.data.user.id,
    current_cashbox: state.cashbox.current_cashbox,
    order_edit: state.order.edit
})

const mapDispatchToProps = {
    changePaymentState,
    changeVisibleState,
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
