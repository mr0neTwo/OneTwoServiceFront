
import React, { useState } from 'react'
import { connect } from 'react-redux'
import ru from 'date-fns/locale/ru';
import DatePicker, { registerLocale } from 'react-datepicker'

import { changePayrollForm } from '../../../Redux/actions/payrollActions'

import ChooseBotton from '../../general/ChooseBotton'
import ChooseOfList from '../../general/ChooseOfList'
import LableArea from '../../general/LableArea'
import LableInput from '../../general/LableInput'

registerLocale('ru', ru)

const PayrollForm = (props) => {

   const [chooseData, setChooseData] = useState(false)

   return (
      <div className=''>
         <div className='row al-itm-fe'>
               <ChooseBotton
                  className='mt15 mr-rg-20'
                  title='Дата и время'
                  name={['Текущее', 'Заданное']}
                  func1 = {() => {
                    setChooseData(false)
                    props.changePayrollForm( null, 'custom_created_at')
                  }}
                  func2 = {() => setChooseData(true)}
                  checked = { true }
                  // disabled={!props.permissions.includes('backdating')}
               />
               {chooseData ? 
               <DatePicker 
                  selected={props.payroll.custom_created_at ? new Date(props.payroll.custom_created_at * 1000) : Date.now()}
                  onChange={(date) => {
                     props.changePayrollForm( date / 1000, 'custom_created_at')
                  }}
                  isClearable={true}
                  placeholderText='Выбирите дату'
                  className="optionFilterInputDate"
                  dateFormat='dd.MM.yyyy HH:mm'
                  locale={'ru'}
                  maxDate={ Date.now() }
                  // startDate={Date.now()}
                  showTimeSelect
               /> : null }
            </div> 
            <LableInput
               className='mt15'
               width='70px'
               title='Сумма'
               onChange={event => props.changePayrollForm(parseFloat(event.target.value.replace(/[^0-9.]/g, '')), props.payroll.direction === 2 ? 'income' : 'outcome')}
               value={props.payroll.outcome ?  props.payroll.outcome : props.payroll.income}
               unit='руб.'
               checkedFlag='inputPayrollSumChecked'
               checked={props.view.inputPayrollSumChecked}
               disabled={props.payroll.deleted}
               redStar={ true }
            />
            <ChooseOfList
               id='employeePayroll'
               title='Сотрудник'
               className='mt15'
               list={props.employees}
               field='employee_id'
               setElement={props.changePayrollForm}
               current_id={props.payroll.employee_id}
               width={'250px'}
               employee={true}
               checkedFlag='inputPayrollEmployeeChecked'
               checked={props.view.inputPayrollEmployeeChecked}
               disabled={props.payroll.deleted}
               // unvisible={false}
            />
            <LableArea
               className='mt15'
               title='Коментарий'
               onChange={event => props.changePayrollForm(event.target.value, 'description')}
               value={props.payroll.description}
               checkedFlag='inputPayrollDescChecked'
               checked={props.view.inputPayrollDescChecked}
               redStar={ true }
               disabled={props.payroll.deleted}
            />      
      </div>
   )
}

const mapStateToProps = state => ({
   view: state.view, 
   payroll: state.payroll,
   permissions: state.data.user.role.permissions,
   employees: state.data.employees.filter(employee => !employee.deleted)
})

const mapDispatchToProps = {
   changePayrollForm
}
  
 export default connect(mapStateToProps, mapDispatchToProps)(PayrollForm)