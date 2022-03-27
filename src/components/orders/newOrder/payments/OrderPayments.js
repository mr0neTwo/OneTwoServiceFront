import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import {editCurrentClient, changeVisibleState} from '../../../../Redux/actions'
import { changePaymentState} from '../../../../Redux/actions/paymentAction'

import Button from '../../../general/Button'
import TableOrderPayments from './TableOrderPayments'

const OrderPayments = (props) => {

   const handleIncome = () => {
      props.changePaymentState({
         direction: 2,
         client_id: props.order.client.id,
         description: `Оплата по заказу № ${props.order.id_label}`,
         cashflow_category: 2,
         employee_id: props.current_user_id,
         order_id: props.order.edit,
         context: {type: 'order'}
      })
      props.editCurrentClient(props.order.client)
      props.changeVisibleState({'statusPaymentsEditor': true})
   }

   const handleOutcome = () => {
      props.changePaymentState({
         direction: 1,
         client_id: props.order.client.id,
         description: `Выплата по заказу № ${props.order.id_label}`,
         cashflow_category: 8,
         employee_id: props.current_user_id,
         order_id: props.order.edit,
         context: {type: 'order'}
      })
      props.editCurrentClient(props.order.client)
      props.changeVisibleState({'statusPaymentsEditor': true})
   }

   return (
      <div className = 'contentTab'>
         <div className='row mt15' id='btorderpay'>
            <Button
               className='greenButton'
               title='Предоплата'
               onClick={ handleIncome }
               invisible={false}
               disabled={false}
            />
            <Button
               className='greenButton bcr ml10'
               title='Выплата'
               onClick={ handleOutcome }
               invisible={false}
               disabled={false}
            />
         </div>
         <TableOrderPayments/>
      </div>
   )
}

const mapStateToProps = state => ({
   employees: state.data.employees,
   order: state.order,
   view: state.view,
   current_user_id: state.data.user.id
})

const mapDispatchToProps = {
   changeVisibleState,
   changePaymentState,
   editCurrentClient,
}
  
 export default connect(mapStateToProps, mapDispatchToProps)(OrderPayments)