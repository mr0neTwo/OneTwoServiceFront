import React from 'react'
import { connect } from 'react-redux'

import { editEmoloyee } from '../../../../Redux/actions'

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
            <tr onDoubleClick={() => props.editEmoloyee(employee)} key={employee.id}>
              <td>{`${employee.last_name} ${employee.first_name}`}</td>
              <td>{employee.login}</td>
              <td>{employee.email}</td>
              <td>{employee.phone ? `+${employee.phone.slice(0, 1)}(${employee.phone.slice(1, 4)}) ${employee.phone.slice(4, 7)}-${employee.phone.slice(7, 10)}-${employee.phone.slice(9, 12)}`: null}</td>
              <td>{employee.role.title}</td>
            </tr>
          )
        })}
      </tbody>
    </table>
   )
}

const mapStateToProps = state => ({
   employees: state.data.employees,
   showDeleted: state.employee.showDeleted
 })

const mapDispatchToProps = {
   editEmoloyee
}


export default connect (mapStateToProps, mapDispatchToProps) (TableEmployees)