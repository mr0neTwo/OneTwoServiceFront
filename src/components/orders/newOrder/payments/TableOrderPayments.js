import React, {useEffect} from 'react'
import { connect } from 'react-redux'

import { showDate } from '../../../general/utils'
import { icon_warning } from '../../../../data/icons'
import Icon from '../../../general/Icon'
import {setPayment, setVisibleFlag} from '../../../../Redux/actions'
import PaymentCard from '../../../Payments/PaymentCard'

const TableOrderPayments = (props) => {

   return (
      <div className = 'mt15'>
         <table>
            <thead>
               <tr>
                  <th className='w160'>Дата и время</th>
                  <th>Описание</th>
                  <th className='w91 tac'>Сумма</th>
               </tr>
            </thead>
            <tbody>
               {props.order.payments.filter(payment => !payment.deleted).map(payment => (
                  <tr
                     key={payment.id}
                     className={payment.deleted ? 'rowDeleted redBorder' : null}
                     onDoubleClick={() => {
                         props.setPayment(payment)
                         props.setVisibleFlag('statusPaymentsCard', true)
                     }}
                  >
                     <td>
                        <div>{payment.employee.name}</div>
                        <div className='row'>
                           <div className='cgr'>{showDate(payment.custom_created_at)}</div>
                           {payment.created_at !== payment.custom_created_at ?
                              <div title={`Платеж добавлен задним числом\n${showDate(payment.created_at)}` }>
                              <Icon 
                                 className='icon-s2 ml5'
                                 icon={icon_warning} 
                                 color='red' 
                              /> 
                           </div> : null}
                        </div>
                     </td>
                     <td>{payment.description}</td>
                     {payment.direction === 2 ?
                     <td className='greenFont tac'>{payment.income}</td> :
                     <td className='redFont tac'>{payment.outcome}</td>}
                  </tr>
                  
               ))}
                <tr className='ss'>
                  <td></td>
                  <td className='tae'>Итого платежей:</td>
                  <td className='tae'>{props.order.payed} руб.</td>
               </tr>
               <tr className='ss'>
                  <td></td>
                  <td className='tae'>Заказ на сумму:</td>
                  <td className='tae'>{props.order.price} руб.</td>
               </tr>
               <tr className='ss'>
                  <td></td>
                  <td className='tae'>
                     {props.order.missed_payments > 0 ? 'Клиент должен нам:' : 'Мы должны клиенту'}
                  </td>
                  <td
                      className='tae'
                      style={{color: props.order.missed_payments > 0 ? '#5cb85c' : '#f74e4d'}}
                  >
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