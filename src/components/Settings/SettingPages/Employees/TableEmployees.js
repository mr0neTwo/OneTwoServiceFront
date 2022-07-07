import React from 'react'
import { connect } from 'react-redux'

import { setVisibleFlag } from '../../../../Redux/actions'
import { showPhone } from '../../../general/utils'
import {editEmployee} from '../../../../Redux/actions/employeeAction'

function TableEmployees (props) {
   return (
      <table>
      <thead>
        <tr>
          <th>Сотрудник</th>
          <th>Логин</th>
          <th>email</th>
          <th>Телефон</th>
          <th>Роль</th>
        </tr>
      </thead>
      <tbody>
        {props.employees.filter(employee => props.showDeleted || !employee.deleted).map(employee =>{
          return (
            <tr 
              key={employee.id}
              className={employee.deleted ? 'rowDeleted' : null}
              onDoubleClick={() => {
                props.editEmployee(employee)
                props.setVisibleFlag('statusEmployeeEditor', true)
              }} 
            >
              <td>{`${employee.last_name} ${employee.first_name}`}</td>
              <td>{employee.login}</td>
              <td>{employee.email}</td>
              <td>{employee.phone ? showPhone(employee.phone) : null}</td>
              <td>{employee.role.title}</td>
            </tr>
          )
        })}
      </tbody>
    </table>
   )
}

const mapStateToProps = state => ({
   employees: state.employee.employees,
   showDeleted: state.employee.showDeleted
 })

const mapDispatchToProps = {
    editEmployee,
   setVisibleFlag
}


export default connect (mapStateToProps, mapDispatchToProps) (TableEmployees)