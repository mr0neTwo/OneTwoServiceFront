
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import ru from 'date-fns/locale/ru';
import DatePicker, { registerLocale } from 'react-datepicker'

import { addPayments } from '../../Redux/actions/paymentAction'
import {changePaymentForm} from '../../Redux/actions/paymentAction'
import { icon_stats_docs } from '../../data/icons'
import Icon from '../general/Icon'
import TablePayments from './TablePayments';
import Checkbox from '../general/Checkbox';

registerLocale('ru', ru)

const ManeyMovement = (props) => {

   useEffect(() => {
      if (props.current_cashbox) { props.addPayments() }
   }, [props.current_cashbox])

   const [showDeleted, setShowDeleted] = useState(false)
   
   return (
      <div className = 'ml30 w100'>

         <div className='row'>
            <Icon icon={icon_stats_docs}/>
            <h3 className='ml5'>{`Движение денег по кассе "${props.current_cashbox ? props.current_cashbox.title : ''}"`}</h3>
         </div>

         <div className='row'>
            {props.permissions.includes('see_moving_money_all_time') ? <>
            <div className='w250'>
               <DatePicker 
                  selectsRange={true}
                  startDate={props.filter_created_at[0] ? new Date(props.filter_created_at[0] * 1000) : null}
                  endDate={props.filter_created_at[1] ? new Date(props.filter_created_at[1] * 1000) : null}
                  onChange={(update) => {
                     props.changePaymentForm(update.map(day =>  day ? day.getTime()/ 1000 : null), 'filter_created_at')
                  }}
                  isClearable={true}
                  placeholderText='Выбирите дату'
                  className="optionFilterInputDate"
                  dateFormat="dd.MM.yyyy"
                  locale={'ru'}
                  maxDate={ Date.now() + 84600000 }
               />
            </div>

            <button 
               className='blueButton'
               onClick={() => props.addPayments()}
            >
               Применить
            </button>
            </> : null}

            {props.permissions.includes('see_delete_payments') ? 
            <Checkbox
               label='Показать удаленные'
               onChange={event => setShowDeleted(event.target.checked)}
               value={showDeleted}
            /> : null}
         </div>

         <TablePayments showDeleted = { showDeleted }/>

      </div>
   )
}

const mapStateToProps = state => ({
   current_cashbox: state.cashbox.current_cashbox,
   filter_created_at: state.payment.filter_created_at,
   permissions: state.data.user.role.permissions
   })

const mapDispatchToProps = {
   changePaymentForm,
   addPayments
}
  
 export default connect(mapStateToProps, mapDispatchToProps)(ManeyMovement)