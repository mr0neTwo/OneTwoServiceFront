import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { setVisibleFlag } from '../../../../Redux/actions'
import { createSalaryRule, saveSalaryRule, deleteSalaryRule } from '../../../../Redux/actions/payrulleAction'
import { changeSalaryRuleForm, addSalaryCountCoef, changeSalaryCoefForm } from '../../../../Redux/actions/payrulleAction'
import { deleteSalaryCountCoef, resetPayrule } from '../../../../Redux/actions/payrulleAction'
import ChooseOfList from '../../../general/ChooseOfList'
import WarningOrange from '../../../general/WarningOrange'
import ChooseButton from '../../../general/ChooseButton'
import LableInput from '../../../general/LableInput'
import BottomButtons from '../../../general/BottomButtons'
import Icon from '../../../general/Icon'
import { ICON } from '../../../../data/icons'


const SalaryRuleReducer = (props) => {

   const handleClose = () => {
      props.setVisibleFlag('statusSalaryEditor', false)
      props.resetPayrule()
   }

   const clickHandel = (event) => {
      if (!event.path.map((el) => el.id).includes('salaryEditor')) {
         handleClose()
      }
    }
  
   useEffect(() => {
      window.addEventListener('click', clickHandel)
      return () => {
        window.removeEventListener('click', clickHandel)
      }
   })

   return (
      <div className='centerBlockFix'>
         <div className='blockWindowFix wmx750 wmn750' id='salaryEditor'>
            <div className='createNewTitle'>{props.salaryRule.edit ? 'Редактировать правило' : 'Создать правило' }</div>

            <div className='row h90 al-itm-bl'>
               <ChooseOfList
                  id={21}
                  title='Правило'
                  className='mt15'
                  list={props.salaryRule.list_type_rule}
                  field='type_rule'
                  setElement={props.changeSalaryRuleForm}
                  current_id={props.salaryRule.type_rule}
                  width={'250px'}
               />
               <ChooseOfList
                  id={31}
                  title='Тип заказа'
                  className='mt15 ml10'
                  list={props.order_type}
                  field='order_type'
                  setElement={props.changeSalaryRuleForm}
                  current_id={props.salaryRule.order_type}
                  width={'150px'}
                  invisible={![1, 2, 3, 4, 5].includes(props.salaryRule.type_rule)}
               />
               <ChooseOfList
                  id={26}
                  title='Считать по статусу'
                  className='mt15 ml10'
                  list={props.salaryRule.statuses}
                  field='check_status'
                  setElement={props.changeSalaryRuleForm}
                  current_id={props.salaryRule.check_status}
                  width={'150px'}
                  invisible={![1, 2, 3, 4, 5].includes(props.salaryRule.type_rule)}
               />
               <ChooseButton
                  className='mt15 ml10'
                  title='Метод расчета'
                  name={['%', 'руб']}
                  func1 = {() => props.changeSalaryRuleForm(0, 'method')}
                  func2 = {() => props.changeSalaryRuleForm(1, 'method')}
                  checked = { true }
                  invisible={![1, 2, 3, 4, 5, 6].includes(props.salaryRule.type_rule)}
               />
            </div>

            {[4, 5, 6].includes(props.salaryRule.type_rule) ?
            <div>
               <WarningOrange text='Расчет по выбранному правилу может происходить двумя способами'/>

               <div className='row mt15'>
                  <div className='numruond'>1</div>
                  <div>В случае, если в прейскуранте услуг в карточке услуги указано значение вознаграждения, то в расчете ЗП будет использоваться это значение умноженное на коэффициент</div>
               </div>

               <div className='row mt15 jc-c'>
                  <div className='txtb'>Коэффициент</div>
                  <LableInput
                     className='ml10'
                     width='70px'
                     onChange={event => props.changeSalaryRuleForm(parseFloat(event.target.value.replace(/[^0-9.]/g, '')), 'coefficient')}
                     value={props.salaryRule.coefficient}
                  />
               </div>

               <div className='row mt15'>
                  <div className='numruond'>2</div>
                  <div>Для всех остальных услуг будет использоваться правило расчета:</div>
               </div>
            </div> : null }

            {[1, 2, 3, 4, 5, 6].includes(props.salaryRule.type_rule) ? 
               props.salaryRule.count_coeff.map((count_coef, idx) => (
               <div className='coef_row' key={idx}>
                  <div>Если сумма работы</div>
                  <div className='ml10'>&ge;</div>
                  <LableInput
                     className='ml10'
                     width='50px'
                     onChange={event => props.changeSalaryCoefForm( idx, 'cost', event.target.value.replace(/[^0-9]/g, ''))}
                     unit='руб,'
                     value={count_coef.cost}
                  />
                  <div className='ml10'>Вознаграждение составит</div>
                  <LableInput
                     className='ml10'
                     width='50px'
                     onChange={event => props.changeSalaryCoefForm( idx, 'coef', event.target.value.replace(/[^0-9]/g, ''))}
                     unit={props.salaryRule.method ? 'руб.': '%'}
                     value={count_coef.coef}
                  />
                  {idx ? 
                  <div onClick={() => props.deleteSalaryCountCoef(idx)}>
                     <Icon 
                        className='icon-s2 ml10'
                        icon={ICON.TRASH}
                     /> 
                  </div> : null}
               </div>
            )) : null}
            
            {[1, 2, 3, 4, 5, 6].includes(props.salaryRule.type_rule) ? 
            <div className='row mt15 jc-c'>
               <button
                  className='whiteButton' 
                  onClick={() => props.addSalaryCountCoef()}
               >
                  + Добавить
               </button>
            </div> : null}

            {[7, 8].includes(props.salaryRule.type_rule) ? 
            <div>
               <WarningOrange text='Расчет по выбранному правилу будет расчитвываться исходя из графика рабочих смен'/>
               <LableInput
                  className='mt15'
                  title='Ставка'
                  width='50px'
                  onChange={event => props.changeSalaryRuleForm(parseInt( event.target.value.replace(/[^0-9]/g, '')), 'fix_salary')}
                  unit='руб.'
                  value={props.salaryRule.fix_salary}
               />
            </div> : null } 

            <BottomButtons
               edit={props.salaryRule.edit}
               create={() => props.createSalaryRule()}
               save={() => props.saveSalaryRule()}
               delete={() => props.deleteSalaryRule(true)}
               close={handleClose}
            />
         </div>
      </div>
   )
}

const mapStateToProps = state => ({
   salaryRule: state.salaryRule,
   order_type: state.data.order_type
   })

const mapDispatchToProps = {
   setVisibleFlag,
   changeSalaryRuleForm,
   addSalaryCountCoef,
   changeSalaryCoefForm,
   deleteSalaryCountCoef,
   createSalaryRule,
   resetPayrule,
   saveSalaryRule,
   deleteSalaryRule
}
  
 export default connect(mapStateToProps, mapDispatchToProps)(SalaryRuleReducer)