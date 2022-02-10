
import React, { useEffect, useState, useMemo } from 'react'
import { connect } from 'react-redux'
import ru from 'date-fns/locale/ru';
import DatePicker, { registerLocale } from 'react-datepicker'

import { addEmployees, setVisibleFlag } from '../../../Redux/actions';
import { changePayrollForm, addPayrolls, addMonthBalance } from '../../../Redux/actions/payrollActions'
import { showName } from '../../general/utils'
import TablePayrolls from './TablePayrolls'
import Checkbox from '../../general/Checkbox'
import Button from '../../general/Button'
import PaypolleEditor from './PaypolleEditor';

registerLocale('ru', ru)


const EmployeeSalary = (props) => {

   const [showDeleted, setShowDeleted] = useState(false)

   useEffect(() => {
      props.addMonthBalance()
      props.addEmployees()
   }, [props.payroll.setted_employee])

   const current_employee = useMemo(() => props.employees.find(employee => employee.id === props.payroll.setted_employee), [props.payroll.setted_employee])

   const handleIncome = () => {
      props.changePayrollForm(2, 'direction')
      props.changePayrollForm(9, 'relation_type')
      props.setVisibleFlag('statusPayrollEditor', true )
   }

   const handleOutcome = () => {
      props.changePayrollForm(1, 'direction')
      props.changePayrollForm(10, 'relation_type')
      props.setVisibleFlag('statusPayrollEditor', true )
   }
   

   return (
      <div className = ''>
         <div className='createNewTitle fsz20 mt0'>
            {showName(current_employee)}
         </div>
         <div className='txtb'>
            <span>Начисленно в текущем месяце: </span>
            <span className={props.payroll.month_balance > 0 ? 'greenFont ml5' : 'redFont ml5'}>{props.payroll.month_balance}</span> руб.
            </div>
         <div className='txtb'>
            <span>Баланс:</span> 
            <span className={props.payroll.month_balance > 0 ? 'greenFont ml5' : 'redFont ml5'}>{current_employee.balance}</span> руб.
            </div>

         <div className='row mt15 jc-sb'>
           <div className='row'>
               <div className='w250'>
                  <DatePicker 
                     selectsRange={true}
                     startDate={props.payroll.filter_created_at[0] ? new Date(props.payroll.filter_created_at[0] * 1000) : null}
                     endDate={props.payroll.filter_created_at[1] ? new Date(props.payroll.filter_created_at[1] * 1000) : null}
                     onChange={(update) => {
                        props.changePayrollForm(update.map(day =>  day ? day.getTime()/ 1000 : null), 'filter_created_at')
                     }}
                     isClearable={true}
                     placeholderText='Выбирите дату'
                     className="optionFilterInputDate"
                     dateFormat="dd.MM.yyyy"
                     locale={'ru'}
                     maxDate={ Date.now() + 84600000 }
                  />
               </div>
               <Button
                  className='blueButton'
                  title='Применить'
                  onClick={() => props.addPayrolls()}
               />
               <Checkbox
                  label='Показать удаленные'
                  onChange={event => setShowDeleted(event.target.checked)}
                  value={showDeleted}
                  unvisible={!props.permissions.includes('see_seleted_payrolls')}
               />
            </div>
            <div className='row'>
               <Button
                  className='greenButton'
                  title='+ Премия'
                  onClick={ handleIncome }
                  unvisible={!props.permissions.includes('create_payrolls')}
               />
               <Button
                  className='greenButton bcr m10'
                  title='- Взыскание'
                  onClick={ handleOutcome }
                  unvisible={!props.permissions.includes('create_payrolls')}
               />
            </div>
         </div>
         {props.statusPayrollEditor ? <PaypolleEditor/> : null}
         <TablePayrolls showDeleted={showDeleted}/>
      </div>
   )
}

const mapStateToProps = state => ({
   employees: state.data.employees,
   payroll: state.payroll,
   permissions: state.data.user.role.permissions,
   statusPayrollEditor: state.view.statusPayrollEditor
   })

const mapDispatchToProps = {
   changePayrollForm,
   addPayrolls,
   addMonthBalance,
   addEmployees,
   setVisibleFlag
}
  
 export default connect(mapStateToProps, mapDispatchToProps)(EmployeeSalary)