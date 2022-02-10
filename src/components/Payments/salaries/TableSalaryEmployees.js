
import React from 'react'
import { connect } from 'react-redux'

import { showName } from '../../general/utils'
import { changePayrollForm } from '../../../Redux/actions/payrollActions'


const TableSalaryEmployees = (props) => {
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
                  style={employee.id === props.payroll.setted_employee ? { backgroundColor: '#cae1f5'} : null}
               >
                  <td>{showName(employee)}</td>
                  <td>{employee.balance}</td>
               </tr>
            ))}
         </tbody>
      </table>
   )
}

const mapStateToProps = state => ({
   employees: state.data.employees.filter(employee => !employee.deleted),
   payroll: state.payroll
   })

const mapDispatchToProps = {
   changePayrollForm
}
  
 export default connect(mapStateToProps, mapDispatchToProps)(TableSalaryEmployees)