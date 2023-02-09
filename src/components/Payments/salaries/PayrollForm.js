import React, {useState} from 'react'
import {connect} from 'react-redux'

import {changePayrollState} from '../../../Redux/actions/payrollActions'

import ChooseButton from '../../general/ChooseButton'
import ChooseOfList from '../../general/ChooseOfList'
import LableArea from '../../general/LableArea'
import LableInput from '../../general/LableInput'
import ChooseDate from '../../general/calandar/ChooseDate'
import SelectFromList from '../../general/SelectFromList'

const PayrollForm = (props) => {

    const [chooseData, setChooseData] = useState(false)

    const cashboxes = props.cashboxes.filter(cashbox => cashbox.type === props.payroll.payment_cashbox_type)

    return (
        <div className='box__forms w400'>
            <div className='two-buttons'>
                <ChooseButton
                    title='Дата и время'
                    name={['Текущее', 'Заданное']}
                    func1={() => {
                        setChooseData(false)
                        props.changePayrollState({custom_created_at: null})
                    }}
                    func2={() => {
                        setChooseData(true)
                        props.changePayrollState({custom_created_at: parseInt(new Date() / 1000)})
                    }}
                    checked={true}
                />
                <ChooseDate
                    title='Выбрать дату'
                    func={date => props.changePayrollState({custom_created_at: parseInt(date / 1000)})}
                    current_date={props.payroll.custom_created_at * 1000}
                    invisible={!chooseData}
                />
            </div>
            <LableInput
                className='w130'
                title='Сумма'
                onChange={event => props.changePayrollState({[props.payroll.direction === 2 ? 'income' : 'outcome']: parseFloat(event.target.value.replace(/[^0-9.]/g, ''))})}
                value={props.payroll.outcome ? props.payroll.outcome : props.payroll.income}
                unit='руб.'
                checkedFlag='inputPayrollSumChecked'
                disabled={props.payroll.deleted}
                redStar={true}
            />
            <SelectFromList
                title='Сотрудник'
                className='w220'
                list={props.employees}
                setElement={employee => props.changePayrollState({employee})}
                current_object={props.payroll.employee}
                checkedFlag='inputPayrollEmployeeChecked'
                noChoosed='Выберете сотрудника'
                disabled={props.payroll.deleted}
            />


            {props.payroll.relation_type === 12 ?
                <div className='box__forms'>
                    <h5>Данные платежа</h5>
                    <div className='two-buttons'>
                        <ChooseButton
                            title='Форма оплаты'
                            name={['Нал.', 'Безнал.']}
                            func1={() => {props.changePayrollState({payment_cashbox_type: 0})}}
                            func2={() => {props.changePayrollState({payment_cashbox_type: 1})}}
                            checked={!props.payroll.payment_cashbox_type}
                        />
                        <SelectFromList
                            title='Касса'
                            className='w220'
                            list={cashboxes}
                            setElement={cashbox => props.changePayrollState({payment_cashbox : cashbox})}
                            current_object={props.payroll.payment_cashbox}
                            checkedFlag='inputPaymentCashboxChecked'
                            noChoosed='Выберете кассу'
                            disabled={props.payroll.deleted}
                        />
                    </div>
                    <SelectFromList
                        title='Статья'
                        className='w220'
                        list={props.item_payments.filter(item => item.direction === 1)}
                        setElement={category => props.changePayrollState({payment_cashflow_category: category})}
                        current_object={props.payroll.payment_cashflow_category}
                        checkedFlag='inputPaymentCashflowChecked'
                        noChoosed='Выберете статью'
                        disabled={props.payroll.deleted}
                    />
                </div>
                : null
            }
            <LableArea
                title='Коментарий'
                onChange={event => props.changePayrollState({description: event.target.value})}
                value={props.payroll.description}
                checkedFlag='inputPayrollDescChecked'
                redStar={true}
                disabled={props.payroll.deleted}
            />
        </div>
    )
}

const mapStateToProps = state => ({
    view: state.view,
    payroll: state.payroll,
    permissions: state.data.user.role.permissions,
    employees: state.employee.employees.filter(employee => !employee.deleted),
    cashboxes: state.cashbox.cashboxes,
    item_payments: state.data.item_payments
})

const mapDispatchToProps = {
    changePayrollState
}

export default connect(mapStateToProps, mapDispatchToProps)(PayrollForm)