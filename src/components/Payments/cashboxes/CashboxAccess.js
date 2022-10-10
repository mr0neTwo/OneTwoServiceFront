import React from 'react'
import { connect } from 'react-redux'

import { setVisibleFlag } from '../../../Redux/actions'
import {editEmployee} from '../../../Redux/actions/employeeAction'

import {changeCashboxPermissions, changeCashboxState} from '../../../Redux/actions/cashboxAction'
import Checkbox from '../../general/Checkbox'
import CashboxEmployeeEditor from './CashboxEmployeeEditor'


const CashboxAccess = (props) => {

   const handleEdit = employee => {
      props.changeCashboxState({permissions_employee: employee.id})
      props.editEmployee(employee)
      props.setVisibleFlag('statusCashboxEmployeeEditor', true)
   }

   const handleCheck = (employee_id, value) => {
      props.changeCashboxState({permissions_employee: employee_id})
      props.changeCashboxPermissions(value, 'available')
   }

   return (
      <div className = 'contentEditor'>
         <table className='mt15'>
            <thead>
               <tr>
                  <th className='w15'></th>
                  <th>Сотрудник</th>
                  <th>Права</th>
               </tr>
            </thead>
            <tbody>
               {props.employees.map(employee => (
                  <tr 
                     key={employee.id}
                     onDoubleClick={() => handleEdit(employee)}
                  >
                     <td>
                        <Checkbox
                           onChange={event => handleCheck(employee.id, event.target.checked)}
                           checked={props.cashbox.employees[employee.id].available}
                           disabled={props.cashbox.deleted}
                        />
                     </td>
                     <td>{`${employee.first_name} ${employee.last_name}`}</td>
                     <td>
                        {props.cashbox.employees[employee.id].available ? 
                     (props.cashbox.employees[employee.id].like_cashbox  ? 'Доступные для кассы' : 'Персональные') :
                     'Нет доступа'}
                     </td>
                  </tr>
               ))}
            </tbody>
         </table>
         {props.statusCashboxEmployeeEditor ? <CashboxEmployeeEditor/> : null}
      </div>
   )
}

const mapStateToProps = state => ({
   employees: state.employee.employees.filter(employee => !employee.deleted && employee.id !== 0),
   cashbox: state.cashbox,
   statusCashboxEmployeeEditor: state.view.statusCashboxEmployeeEditor
})

const mapDispatchToProps = {
   setVisibleFlag,
   editEmployee,
   changeCashboxState,
   changeCashboxPermissions
}
  
 export default connect(mapStateToProps, mapDispatchToProps)(CashboxAccess)