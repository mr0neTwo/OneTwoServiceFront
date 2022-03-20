import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'

import {showName} from '../../general/utils'
import {changePayrollForm} from '../../../Redux/actions/payrollActions'

const TableSalaryEmployees = (props) => {

    const [total, setTotal] = useState(0)

    useEffect(() => {
        let sum = 0
        props.employees.filter(employee => employee.id != 1).forEach(employee => {
            sum += employee.balance
        })
        setTotal(sum)
    }, [props.employees])

    return (
        <table>
            <thead>
            <tr>
                <th>Сотрудник</th>
                <th>Баланс</th>
            </tr>
            </thead>
            <tbody>
            {props.employees.map(employee => (
                <tr
                    key={employee.id}
                    onClick={() => props.changePayrollForm(employee.id, 'setted_employee')}
                    style={employee.id === props.payroll.setted_employee ? {backgroundColor: '#cae1f5'} : null}
                >
                    <td>{showName(employee)}</td>
                    <td>{employee.balance ? employee.balance.toFixed(2) : 0}</td>
                </tr>
            ))}
            <tr>
                <td>Итог:</td>
                <td>{total}</td>
            </tr>
            </tbody>
        </table>
    )
}

const mapStateToProps = state => ({
    employees: state.data.employees.filter(employee => !employee.deleted && employee.id !== 0),
    payroll: state.payroll
})

const mapDispatchToProps = {
    changePayrollForm
}

export default connect(mapStateToProps, mapDispatchToProps)(TableSalaryEmployees)