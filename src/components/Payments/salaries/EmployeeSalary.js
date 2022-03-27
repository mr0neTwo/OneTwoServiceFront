import React, {useEffect, useState, useMemo} from 'react'
import {connect} from 'react-redux'

import {addEmployees, setVisibleFlag} from '../../../Redux/actions';
import {addPayrolls, addMonthBalance, changePayrollState} from '../../../Redux/actions/payrollActions'

import {showName} from '../../general/utils'

import TablePayrolls from './TablePayrolls'
import Checkbox from '../../general/Checkbox'
import Button from '../../general/Button'
import PaypolleEditor from './PaypolleEditor';
import ChooseDate from '../../general/calandar/ChooseDate'



const EmployeeSalary = (props) => {

    const [showDeleted, setShowDeleted] = useState(false)

    useEffect(() => {
        props.addMonthBalance()
        props.addEmployees()
    }, [props.payroll.setted_employee])

    const current_employee = useMemo(() => props.employees.find(employee => employee.id === props.payroll.setted_employee), [props.payroll.setted_employee])

    const handleIncome = () => {
        props.changePayrollState({direction: 2, relation_type: 9})
        props.setVisibleFlag('statusPayrollEditor', true)
    }

    const handleOutcome = () => {
        props.changePayrollState({direction: 1, relation_type: 10})
        props.setVisibleFlag('statusPayrollEditor', true)
    }


    return (
        <div className=''>
            <div className='createNewTitle fsz20 mt0'>
                {showName(current_employee)}
            </div>
            <div className='txtb'>
                <span>Начисленно в текущем месяце: </span>
                <span
                    className={props.payroll.month_balance > 0 ? 'greenFont ml5' : 'redFont ml5'}>{props.payroll.month_balance.toFixed(2)}</span> руб.
            </div>
            <div className='txtb'>
                <span>Баланс:</span>
                <span
                    className={props.payroll.month_balance > 0 ? 'greenFont ml5' : 'redFont ml5'}>{current_employee.balance.toFixed(2)}</span> руб.
            </div>

            <div className='row mt15 jc-sb'>
                <div className='row'>
                    <ChooseDate
                        className='h27'
                        width='250px'
                        range={true}
                        func={date => props.changePayrollState({filter_created_at: date.map(date => parseInt(date / 1000))})}
                        current_date={props.payroll.filter_created_at}
                    />
                    <Button
                        className='blueButton'
                        title='Применить'
                        onClick={() => props.addPayrolls()}
                    />
                    <Checkbox
                        label='Показать удаленные'
                        onChange={event => setShowDeleted(event.target.checked)}
                        value={showDeleted}
                        invisible={!props.permissions.includes('see_seleted_payrolls')}
                    />
                </div>
                <div className='row'>
                    <Button
                        className='greenButton'
                        title='+ Премия'
                        onClick={handleIncome}
                        invisible={!props.permissions.includes('create_payrolls')}
                    />
                    <Button
                        className='greenButton bcr m10'
                        title='- Взыскание'
                        onClick={handleOutcome}
                        invisible={!props.permissions.includes('create_payrolls')}
                    />
                </div>
            </div>
            {props.statusPayrollEditor ? <PaypolleEditor/> : null}
            <TablePayrolls showDeleted={showDeleted}/>
        </div>
    )
}

const mapStateToProps = state => ({
    employees: state.data.employees,
    payroll: state.payroll,
    permissions: state.data.user.role.permissions,
    statusPayrollEditor: state.view.statusPayrollEditor
})

const mapDispatchToProps = {
    changePayrollState,
    addPayrolls,
    addMonthBalance,
    addEmployees,
    setVisibleFlag
}

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeSalary)