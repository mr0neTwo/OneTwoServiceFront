

import React from 'react'
import { connect } from 'react-redux'

import { showDate, showName } from '../../general/utils'

const PayrollReceipt = (props) => {
   return (
      <div className = ''>
        <div className='mt15'>
           <span className='txtb'>Дата:</span>
           <span className='ml5'>{showDate(props.payroll.created_at)}</span>
        </div>
        <div className='mt15'>
           <span className='txtb'>Сумма:</span>
           <span className='ml5'>{props.payroll.direction == 2 ? props.payroll.income : props.payroll.outcome} руб.</span>
        </div>
        <div className='mt15'>
           <span className='txtb'>Сотрудник:</span>
           <span className='ml5'>{showName(props.employees.find(employee => employee.id === props.payroll.employee_id))}</span>
        </div>
        <div className='mt15'>
           <span className='txtb'>Комментарий:</span>
           <span className='ml5'>{props.payroll.description}</span>
        </div>
      </div>
   )
}

const mapStateToProps = state => ({
   payroll: state.payroll,
   employees: state.data.employees
})

const mapDispatchToProps = {

}
  
 export default connect(mapStateToProps, mapDispatchToProps)(PayrollReceipt)