import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { addPayrolls, changePayrollState } from '../../../Redux/actions/payrollActions'
import EmployeeSalary from './EmployeeSalary'
import TableSalaryEmployees from './TableSalaryEmployees'


const Salaries = (props) => {

   useEffect(() => {
      props.addPayrolls()
   }, [props.payroll.setted_employee])

   useEffect(() => {
      props.changePayrollState({setted_employee: props.user_id})
   }, [])

   return (
      <div className='box'>

         {/*<p>Поместим график сюда</p>*/}

         <div className='box__payroll'>
            <TableSalaryEmployees/>
            <EmployeeSalary/>
         </div>

      </div>
   )
}

const mapStateToProps = state => ({
   payroll: state.payroll,
   user_id: state.data.user.id
})

const mapDispatchToProps = {
   addPayrolls,
   changePayrollState
}
  
 export default connect(mapStateToProps, mapDispatchToProps)(Salaries)