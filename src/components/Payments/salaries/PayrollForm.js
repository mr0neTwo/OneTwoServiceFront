import React, {useState} from 'react'
import {connect} from 'react-redux'

import {changePayrollState} from '../../../Redux/actions/payrollActions'

import ChooseBotton from '../../general/ChooseBotton'
import ChooseOfList from '../../general/ChooseOfList'
import LableArea from '../../general/LableArea'
import LableInput from '../../general/LableInput'
import ChooseDate from '../../general/calandar/ChooseDate'

const PayrollForm = (props) => {

    const [chooseData, setChooseData] = useState(false)

    const cashboxes = props.cashboxes.filter(cashbox => cashbox.type === props.payroll.payment_cashbox_type)

    return (
        <div className=''>
            <div className='row al-itm-fe'>
                <ChooseBotton
                    className='mt15 mr-rg-20'
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
                    // disabled={!props.permissions.includes('backdating')}
                />
                <ChooseDate
                    className='h31'
                    width='250px'
                    func={date => props.changePayrollState({custom_created_at: parseInt(date / 1000)})}
                    current_date={props.payroll.custom_created_at * 1000}
                    invisible={!chooseData}
                />
            </div>
            <LableInput
                className='mt15'
                width='70px'
                title='Сумма'
                onChange={event => props.changePayrollState({[props.payroll.direction === 2 ? 'income' : 'outcome']: parseFloat(event.target.value.replace(/[^0-9.]/g, ''))})}
                value={props.payroll.outcome ? props.payroll.outcome : props.payroll.income}
                unit='руб.'
                checkedFlag='inputPayrollSumChecked'
                checked={props.view.inputPayrollSumChecked}
                disabled={props.payroll.deleted}
                redStar={true}
            />
            <ChooseOfList
                id='employeePayroll'
                title='Сотрудник'
                className='mt15'
                list={props.employees}
                setElement={id => props.changePayrollState({employee_id: id})}
                current_id={props.payroll.employee_id}
                width={'250px'}
                employee={true}
                checkedFlag='inputPayrollEmployeeChecked'
                checked={props.view.inputPayrollEmployeeChecked}
                disabled={props.payroll.deleted}
            />
            <LableArea
                className='mt15'
                title='Коментарий'
                onChange={event => props.changePayrollState({description: event.target.value})}
                value={props.payroll.description}
                checkedFlag='inputPayrollDescChecked'
                checked={props.view.inputPayrollDescChecked}
                redStar={true}
                disabled={props.payroll.deleted}
            />
            {props.payroll.relation_type === 12 ?
                <div>
                    <div className='orderFormTitle mt15'>Данные платежа</div>
                    <div className='row mt15 al-itm-fs'>
                        <ChooseBotton
                            className=''
                            title='Форма оплаты'
                            name={['Нал.', 'Безнал.']}
                            func1={() => {props.changePayrollState({payment_cashbox_type: 0})}}
                            func2={() => {props.changePayrollState({payment_cashbox_type: 1})}}
                            checked={!props.payroll.payment_cashbox_type}
                        />
                        <ChooseOfList
                            id={20}
                            title='Касса'
                            className='ml10 h52'
                            list={cashboxes}
                            setElement={cashbox_id => props.changePayrollState({payment_cashbox_id : cashbox_id})}
                            current_id={props.payroll.payment_cashbox_id }
                            width={'250px'}
                            checkedFlag='inputPaymentCashboxChecked'
                            checked={props.view.inputPaymentCashboxChecked}
                            disabled={props.payroll.deleted}
                        />
                    </div>
                    <ChooseOfList
                        id={41}
                        title='Статья'
                        className='mt15 h52'
                        list={props.item_payments.filter(item => item.direction === 1)}
                        setElement={category => props.changePayrollState({payment_cashflow_category: category})}
                        current_id={props.payroll.payment_cashflow_category}
                        width={'250px'}
                        checkedFlag='inputPaymentCashflowChecked'
                        checked={props.view.inputPaymentCashflowChecked}
                        disabled={props.payroll.deleted}
                    />
                </div>
                : null}
        </div>
    )
}

const mapStateToProps = state => ({
    view: state.view,
    payroll: state.payroll,
    permissions: state.data.user.role.permissions,
    employees: state.data.employees.filter(employee => !employee.deleted),
    cashboxes: state.cashbox.cashboxes,
    item_payments: state.data.item_payments
})

const mapDispatchToProps = {
    changePayrollState
}

export default connect(mapStateToProps, mapDispatchToProps)(PayrollForm)