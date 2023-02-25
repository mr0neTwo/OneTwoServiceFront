import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { addPayrolls, changePayrollState } from '../../../Redux/actions/payrollActions'
import EmployeeSalary from './EmployeeSalary'
import TableSalaryEmployees from './TableSalaryEmployees'
import {checkObject} from "../../general/utils";


const Salaries = (props) => {

   useEffect(() => {
      if(checkObject(props.payroll.setted_employee)) props.addPayrolls()
   }, [props.payroll.setted_employee])

   useEffect(() => {
      props.changePayrollState({setted_employee: props.user})
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
   user: state.data.user
})

const mapDispatchToProps = {
   addPayrolls,
   changePayrollState
}
  
 export default connect(mapStateToProps, mapDispatchToProps)(Salaries)