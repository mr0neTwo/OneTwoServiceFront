import React from 'react'
import { connect } from 'react-redux'

import { showDate } from '../../../general/utils'
import { ICON } from '../../../../data/icons'
import Icon from '../../../general/Icon'

import {setPayment, setVisibleFlag} from '../../../../Redux/actions'
import PaymentCard from '../../../Payments/PaymentCard'

const TableOrderPayments = (props) => {

    const getColor = (amount) => {
        if (amount > 0) return 'td_green'
        else if (amount < 0) return 'td_red'
        else return 'td_number'
    }

   return (
      <div>
         <table>
            <thead>
               <tr>
                  <th className='th th_w160'>Дата и время</th>
                  <th className='th'>Описание</th>
                  <th className='th th_w90'>Сумма</th>
               </tr>
            </thead>
            <tbody>
               {props.order.payments.filter(payment => !payment.deleted).map(payment => (
                  <tr
                     key={payment.id}
                     className={payment.deleted ? 'rowDeleted redBorder' : 'tr'}
                     onDoubleClick={() => {
                         props.setPayment(payment)
                         props.setVisibleFlag('statusPaymentsCard', true)
                     }}
                  >
                     <td className='td'>
                        <div>{payment.employee.name}</div>
                        <div className='cell_text'>
                           <div className='cell_date-payment'>{showDate(payment.custom_created_at)}</div>
                           {payment.created_at !== payment.custom_created_at ?
                              <div title={`Платеж добавлен задним числом\n${showDate(payment.created_at)}` }>
                              <Icon 
                                 className='icon icon_10'
                                 icon={ICON.WARNING}
                              /> 
                           </div> : null}
                        </div>
                     </td>
                     <td className='td'>{payment.description}</td>
                     {payment.direction === 2 ?
                     <td className='td td_green'>{payment.income}</td> :
                     <td className='td td_red'>{payment.outcome}</td>}
                  </tr>
                  
               ))}
                <tr className='tr_no-underline'>
                  <td/>
                  <td className='td td_total'>Итого платежей:</td>
                  <td className='td td_number'>{props.order.payed} руб.</td>
               </tr>
               <tr className='tr_no-underline'>
                  <td/>
                  <td className='td td_total'>Заказ на сумму:</td>
                  <td className='td td_number'>{props.order.price} руб.</td>
               </tr>
               <tr className='tr_no-underline'>
                  <td/>
                  <td className='td td_total'>
                     {props.order.missed_payments > 0 ? 'Клиент должен нам:' : 'Мы должны клиенту'}
                  </td>
                  <td className={`td ${getColor(props.order.missed_payments)}`}>
                     {Math.abs(props.order.missed_payments)} руб.
                  </td>
               </tr>
            </tbody>
         </table>
        {props.statusPaymentsCard ? <PaymentCard/> : null}
      </div>
   )
}

const mapStateToProps = state => ({
   order: state.order,
    statusPaymentsCard: state.view.statusPaymentsCard
})

const mapDispatchToProps = {
    setPayment,
    setVisibleFlag
}
  
 export default connect(mapStateToProps, mapDispatchToProps)(TableOrderPayments)