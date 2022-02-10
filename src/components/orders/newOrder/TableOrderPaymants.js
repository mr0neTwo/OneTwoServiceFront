
import React from 'react'
import { connect } from 'react-redux'

import { showDate } from '../../general/utils'
import { icon_warning } from '../../../data/icons'
import Icon from '../../general/Icon'

const TableOrderPaymants = (props) => {

   let sum = 0
   props.order.payments.filter(payment => !payment.deleted).forEach(payment => {
      sum += payment.income
      sum += payment.outcome
   })


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
                     {payment.direction == 2 ?
                     <td className='greenFont tac'>{payment.income}</td> :
                     <td className='redFont tac'>{payment.outcome}</td>}
                  </tr>
                  
               ))}
                <tr className='ss'>
                  <td></td>
                  <td className='tae'>Итого платежей:</td>
                  <td className='tae'>{sum} руб.</td>
               </tr>
               <tr className='ss'>
                  <td></td>
                  <td className='tae'>Заказ на сумму:</td>
                  <td className='tae'>{props.order.price} руб.</td>
               </tr>
               <tr className='ss'>
                  <td></td>
                  <td className='tae'>Клиент должен нам:</td>
                  <td className='tae'>{props.order.price - sum} руб.</td>
               </tr>
            </tbody>
         </table>
      </div>
   )
}

const mapStateToProps = state => ({
   order: state.order
})

const mapDispatchToProps = {

}
  
 export default connect(mapStateToProps, mapDispatchToProps)(TableOrderPaymants)