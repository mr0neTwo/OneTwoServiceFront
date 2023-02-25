import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'

import {changePayrollState} from '../../../Redux/actions/payrollActions'
import Balance from '../../general/cell/Balance'

const TableSalaryEmployees = (props) => {

    const [total, setTotal] = useState(0)

    useEffect(() => {
        let sum = 0
        props.employees.filter(employee => employee.id !== 1).forEach(employee => {
            sum += employee.balance
        })
        setTotal(sum)
    }, [props.employees])

    if (!props.permissions.includes('see_all_payrolls')) return null

    return (
        <div className='table w300'>
            <table>
                <thead>
                <tr>
                    <th className='th'>Сотрудник</th>
                    <th className='th th_w70'>Баланс</th>
                </tr>
                </thead>
                <tbody>
                {props.employees.map(employee => (
                    <tr
                        key={employee.id}
                        className={`tr ${employee.id === props.payroll.setted_employee.id ? 'tr_selected' : ''}`}
                        onClick={() => props.changePayrollState({setted_employee: employee})}
                    >
                        <td className='td'>{employee.name}</td>
                        <Balance
                            balance={employee.balance}
                            isDifferentColors={true}
                        />
                    </tr>
                ))}
                <tr className='tr_no-underline'>
                    <td className='td td_total'>Итог:</td>
                    <Balance
                        balance={total}
                        isDifferentColors={true}
                    />
                </tr>
                </tbody>
            </table>
        </div>
    )
}

const mapStateToProps = state => ({
    employees: state.employee.employees.filter(employee => !employee.deleted && employee.id !== 0),
    payroll: state.payroll,
    permissions: state.data.user.role.permissions,
})

const mapDispatchToProps = {
    changePayrollState
}

export default connect(mapStateToProps, mapDispatchToProps)(TableSalaryEmployees)