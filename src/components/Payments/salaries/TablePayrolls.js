
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'

import { setVisibleFlag } from '../../../Redux/actions'
import { editPayroll } from '../../../Redux/actions/payrollActions'

import { showDate } from '../../general/utils'

const TablePayrolls = (props) => {

   const [incomeSum, setIncomeSum] = useState(0)
   const [outcomeSum, setOutcomeSum] = useState(0)

   const type_payrolls = ['', 'Cоздания заказа', 'Закрытие заказа', 'Ведение заказа', 'Работа', 'Работа', 'Продажа', 'Оклад', '', 'Премия', 'Взыскания', 'Возврат']

   const editPayroll = (payroll) => {
      props.editPayroll(payroll)
      props.setVisibleFlag('statusPayrollEditor', true)
   }

   const payrolls = props.payrolls.filter(payroll => props.showDeleted || !payroll.deleted)

   
   useEffect(() => {
      let income_sum = 0
      let outcome_sum = 0
      props.payrolls.filter(payroll => !payroll.deleted).forEach(payroll => {
         income_sum += payroll.income
         outcome_sum += payroll.outcome
      })
      setIncomeSum(income_sum)
      setOutcomeSum(outcome_sum)
   }, [props.payrolls])
   

   return (
      <table>
         <thead>
            <tr>
               <th className='w135'>Дата</th>
               <th>Описание</th>
               <th className='w91'>Приход, руб.</th>
               <th className='w91'>Расход, руб.</th>
               <th className='w91'>Баланс, руб.</th>
            </tr>
         </thead>
         <tbody>
            {payrolls.map(payroll => (
               <tr 
                  key={payroll.id}
                  className={payroll.deleted ? 'rowDeleted redBorder' : null}
                  onDoubleClick={() => editPayroll(payroll)}
               >
                  <td className='pd-lr-5'>
                     <div>
                        <div>{type_payrolls[payroll.relation_type]}</div>
                        <div className='cgr'>{showDate(payroll.created_at)}</div>
                     </div>
                  </td>
                  <td className='pd-lr-5'>{payroll.description}</td>
                  <td className={payroll.income ? 'greenFont tac': 'tac'}>{payroll.income}</td>
                  <td className={payroll.outcome ? 'redFont tac': 'tac'}>{payroll.outcome}</td>
                  <td className='tac'>{payroll.deposit}</td>
               </tr>
            ))}
            <tr>
               <td colSpan='2'>Всего - {payrolls.length}</td>
               <td className='txtb tac'>{incomeSum} руб.</td>
               <td className='txtb tac'>{outcomeSum} руб.</td>
               <td></td>
            </tr>
         </tbody>
      </table>

   )
}

const mapStateToProps = state => ({
   payrolls: state.data.payrolls
   })

const mapDispatchToProps = {
   editPayroll,
   setVisibleFlag
}
  
 export default connect(mapStateToProps, mapDispatchToProps)(TablePayrolls)