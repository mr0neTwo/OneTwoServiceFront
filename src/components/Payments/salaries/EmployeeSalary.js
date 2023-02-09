import React, {useEffect, useState, useMemo} from 'react'
import {connect} from 'react-redux'

import {changeVisibleState} from '../../../Redux/actions';
import {addPayrolls, addMonthBalance, changePayrollState} from '../../../Redux/actions/payrollActions'
import {addEmployees} from '../../../Redux/actions/employeeAction'

import TablePayrolls from './TablePayrolls'
import Checkbox from '../../general/Checkbox'
import Button from '../../general/Button'
import ChooseDate from '../../general/calandar/ChooseDate'
import Balance from '../../general/cell/Balance'


const EmployeeSalary = (props) => {

    useEffect(() => {
        props.addMonthBalance()
        props.addEmployees()
    }, [props.payroll.setted_employee])

    const handleIncome = () => {
        props.changePayrollState({
            direction: 2,
            relation_type: 9,
            employee: props.payroll.setted_employee
        })
        props.changeVisibleState({statusPayrollEditor: true})
    }

    const handleOutcome = () => {
        props.changePayrollState({
            direction: 1,
            relation_type: 10,
            employee: props.payroll.setted_employee
        })
        props.changeVisibleState({statusPayrollEditor: true})
    }

    const handlePaySalary = () => {
        props.changePayrollState({
            direction: 1,
            relation_type: 12,
            description: 'Выплата заработной платы',
            employee: props.payroll.setted_employee
        })
        props.changeVisibleState({statusPayrollEditor: true})
    }

    const month_balance = props.payroll.month_balance

    if (!props.payroll.setted_employee) return null

    return (
        <div className='box__content'>
            <h4>{props.payroll.setted_employee.name}</h4>
            <div>
                <span>Начисленно в текущем месяце: </span>
                <Balance
                    balance={month_balance}
                    isDifferentColors={true}
                    inline={true}
                />
            </div>
            <div>
                <span>Баланс: </span>
                <Balance
                    balance={props.payroll.setted_employee.balance}
                    isDifferentColors={true}
                    inline={true}
                />
            </div>
            <Button
                id='PayrollEditor'
                size='med'
                type='destructive'
                title='Выплатить'
                onClick={handlePaySalary}
            />

            <div className='row jc-sb ai-fe'>
                <div className='two-buttons'>
                    <ChooseDate
                        title='Дата'
                        range={true}
                        func={date => props.changePayrollState({filter_created_at: date.map(date => parseInt(date / 1000))})}
                        current_date={props.payroll.filter_created_at}
                    />
                    <Button
                        size='med'
                        type='primary'
                        title='Применить'
                        onClick={() => props.addPayrolls()}
                    />
                    <Checkbox
                        id='ShowDeletedPayrolls'
                        type='slide-three'
                        label='Показать удаленные'
                        onChange={event => props.changePayrollState({showDeleted: event.target.checked})}
                        checked={props.payroll.showDeleted}
                        invisible={!props.permissions.includes('see_seleted_payrolls')}
                    />
                </div>
                <div className='row g10'>
                    <Button
                        id='PayrollEditor'
                        size='med'
                        type='create'
                        title='Премия'
                        onClick={handleIncome}
                        invisible={!props.permissions.includes('create_payrolls')}
                    />
                    <Button
                        id='PayrollEditor'
                        size='med'
                        type='destructive'
                        title='Взыскание'
                        onClick={handleOutcome}
                        invisible={!props.permissions.includes('create_payrolls')}
                    />
                </div>
            </div>
            <TablePayrolls/>
        </div>
    )
}

const mapStateToProps = state => ({
    employees: state.employee.employees,
    payroll: state.payroll,
    permissions: state.data.user.role.permissions,
    statusPayrollEditor: state.view.statusPayrollEditor
})

const mapDispatchToProps = {
    changePayrollState,
    addPayrolls,
    addMonthBalance,
    addEmployees,
    changeVisibleState
}

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeSalary)