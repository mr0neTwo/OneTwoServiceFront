import React from 'react'
import { connect } from 'react-redux'

import { showDate, showName } from '../../general/utils'
import Money from '../../general/cell/Money'
import Balance from '../../general/cell/Balance'

const PayrollReceipt = (props) => {
   return (
      <div className='box__forms'>
        <div>
           <span>Дата: </span>
           <span>{showDate(props.payroll.created_at)}</span>
        </div>
        <div>
           <span>Сумма: </span>
           <Balance
               balance={props.payroll.income || props.payroll.outcome}
               isDifferentColors={true}
               inline={true}
           />
        </div>
        <div>
           <span>Сотрудник: </span>
           <span>{props.payroll.employee.name}</span>
        </div>
        <div>
           <span>Комментарий: </span>
           <span>{props.payroll.description}</span>
        </div>
      </div>
   )
}

const mapStateToProps = state => ({
   payroll: state.payroll
})

const mapDispatchToProps = {

}
  
 export default connect(mapStateToProps, mapDispatchToProps)(PayrollReceipt)