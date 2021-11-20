
import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { setVisibleFlag, editEmoloyee, changeCashboxForm, changeCashboxPermissions } from '../../../Redux/actions'
import Checkbox from '../../general/Checkbox'
import CashboxEmployeeEditor from './CashboxEmployeeEditor'


const CashboxAccess = (props) => {

   return (
      <div className = 'contentEditor'>
         <table className='mt15'>
            <thead>
               <tr>
                  <th className='w15'>
                  </th>
                  <th>Сотрудник</th>
                  <th>Права</th>
               </tr>
            </thead>
            <tbody>
               {props.employees.filter(employee => !employee.deleted).map(employee => (
                  <tr 
                     key={employee.id}
                     onDoubleClick={() => {
                        props.changeCashboxForm(employee.id, 'permissions_employee')
                        props.editEmoloyee(employee)
                        props.setVisibleFlag('statusCashboxEmployeeEditor', true)
                     }}
                  >
                     <td>
                        <Checkbox
                           onChange={event => {
                              props.changeCashboxForm(employee.id, 'permissions_employee')
                              props.changeCashboxPermissions(event.target.checked, 'available')
                           }}
                           checked={props.cashbox.employees[employee.id].available}
                           disabled={props.cashbox.deleted}
                        />
                     </td>
                     <td>{`${employee.first_name} ${employee.last_name}`}</td>
                     <td>
                        {props.cashbox.employees[employee.id].available ? 
                     ( props.cashbox.employees[employee.id].like_cashbox  ? 'Доступные для кассы' : 'Персональные') : 
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
   employees: state.data.employees,
   cashbox: state.cashbox,
   statusCashboxEmployeeEditor: state.view.statusCashboxEmployeeEditor
   })

const mapDispatchToProps = {
   setVisibleFlag,
   editEmoloyee,
   changeCashboxForm,
   changeCashboxPermissions
}
  
 export default connect(mapStateToProps, mapDispatchToProps)(CashboxAccess)