import React from 'react'
import { connect } from 'react-redux'

import {editCurrentClient, changeVisibleState} from '../../../../Redux/actions'
import { changePaymentState} from '../../../../Redux/actions/paymentAction'

import Button from '../../../general/Button'
import TableOrderPayments from './TableOrderPayments'

const OrderPayments = (props) => {

   const handleIncome = () => {
      props.changePaymentState({
         direction: 2,
         client: props.order.client,
         description: `Оплата по заказу № ${props.order.id_label}`,
         cashflow_category: props.item_payments.find(item => item.id === 2),
         employee: props.current_user,
         order_id: props.order.edit,
         context: {type: 'order'}
      })
      props.editCurrentClient(props.order.client)
      props.changeVisibleState({'statusPaymentsEditor': true})
   }

   const handleOutcome = () => {
      props.changePaymentState({
         direction: 1,
         client: props.order.client,
         description: `Выплата по заказу № ${props.order.id_label}`,
         cashflow_category: props.item_payments.find(item => item.id === 8),
         employee: props.current_user,
         order_id: props.order.edit,
         context: {type: 'order'}
      })
      props.editCurrentClient(props.order.client)
      props.changeVisibleState({'statusPaymentsEditor': true})
   }

   return (
      <div className = 'form-order-editor'>
         <div className='form-order-editor__payment-buttons'>
            <Button
                size='med'
                type='create'
                title='Предоплата'
                onClick={ handleIncome }
            />
            <Button
                size='med'
                type='destructive'
                title='Выплата'
                onClick={ handleOutcome }
            />
         </div>
         <TableOrderPayments/>
      </div>
   )
}

const mapStateToProps = state => ({
   employees: state.employee.employees,
   order: state.order,
   view: state.view,
   current_user: state.data.user,
   item_payments: state.data.item_payments
})

const mapDispatchToProps = {
   changeVisibleState,
   changePaymentState,
   editCurrentClient,
}
  
 export default connect(mapStateToProps, mapDispatchToProps)(OrderPayments)