import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { addPayrolls, changePayrollForm } from '../../../Redux/actions/payrollActions'
import EmployeeSalary from './EmployeeSalary'
import TableSalaryEmployees from './TableSalaryEmployees'


const Salaries = (props) => {

   useEffect(() => {
      props.addPayrolls()
   }, [props.payroll.setted_employee])

   useEffect(() => {
      props.changePayrollForm(props.user_id, 'setted_employee')
   }, [])

   return (
      <div className = 'contentTab'>
         <p>Поместим график сюда</p>

         {props.permissions.includes('see_all_payrolls') ? 
         <div className='row al-itm-fs'>
            <div className='w250'>
               <TableSalaryEmployees/>
            </div>
            <div className='ml30'>
               {props.payroll.setted_employee ? <EmployeeSalary/> : null}
            </div>         
         </div> : (props.payroll.setted_employee ? <EmployeeSalary/> : null) }
      </div>
   )
}

const mapStateToProps = state => ({
   payroll: state.payroll,
   permissions: state.data.user.role.permissions,
   user_id: state.data.user.id
})

const mapDispatchToProps = {
   addPayrolls,
   changePayrollForm
}
  
 export default connect(mapStateToProps, mapDispatchToProps)(Salaries)