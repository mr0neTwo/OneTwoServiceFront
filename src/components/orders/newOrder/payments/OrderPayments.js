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
         client: props.order.client,
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
   current_user_id: state.data.user.id
})

const mapDispatchToProps = {
   changeVisibleState,
   changePaymentState,
   editCurrentClient,
}
  
 export default connect(mapStateToProps, mapDispatchToProps)(OrderPayments)