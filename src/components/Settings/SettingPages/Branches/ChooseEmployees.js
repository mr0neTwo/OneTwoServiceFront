
import React, { useRef, useEffect} from 'react'
import { connect } from 'react-redux'

import {setBranchEmployee} from '../../../../Redux/actions/branchAction'

import Checkbox from '../../../general/Checkbox'

const ChooseEmployees = (props) => {

   const employeeChackbox = useRef()
  
   useEffect(() => {
      const values = props.employees.filter(employee => props.branch.employees.includes(employee.id))
      if (values.length === props.employees.length) {
         employeeChackbox.current.indeterminate = false
         employeeChackbox.current.checked = true
      } else if (!values.length) {
         employeeChackbox.current.indeterminate = false
         employeeChackbox.current.checked = false
      } else {
         employeeChackbox.current.indeterminate = true
      }
   }, [props.branch.employees])

   return (
      <table>
         <thead>
            <tr>
               <th className='w30'>
                  <div className='checkbox'>
                     <input 
                        type='checkbox'
                        ref={employeeChackbox}
                        onChange={props.branch.deleted ? null : 
                           () => props.setBranchEmployee(props.employees.map(employee => employee.id))}
                     />
                     <label>{props.label}</label>
                  </div>
               </th>
               <th>Сотрудник</th>
            </tr>
         </thead>
         <tbody>
         {props.employees.map(employee =>{
            return (
               <tr  key={employee.id}>
                  <td>
                     <Checkbox
                        onChange={() => props.setBranchEmployee([employee.id])}
                        checked={props.branch.employees.includes(employee.id)}
                        disabled={props.branch.deleted}
                     />
                  </td>
                  <td>{`${employee.last_name} ${employee.first_name}`}</td>
               </tr>
            )
         })}
      </tbody>
    </table>
   )
}

const mapStateToProps = state => ({
   employees: state.employee.employees.filter(employee => !employee.deleted && employee.id !== 0),
   branch: state.branch
   })

const mapDispatchToProps = {
   setBranchEmployee
}
  
 export default connect(mapStateToProps, mapDispatchToProps)(ChooseEmployees)