import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { setVisibleFlag, changePaymentForm, addItemPayments, editCurrentClient, addCashboxes } from '../../../../Redux/actions'
import { changeOrderFormS } from '../../../../Redux/actions'
import Button from '../../../general/Button'
import TableOrderPaymants from './TableOrderPaymants'
import PaymentsEditor from '../../../Payments/PaymentsEditor'

const OrderPayments = (props) => {

   useEffect(() => {
      props.addItemPayments()
      props.addCashboxes()
   }, [])

   const handelIncome = () => {
      props.changePaymentForm(2, 'direction')
      props.changePaymentForm(props.order.client.id, 'client_id')
      // props.changePaymentForm(props.order.client, 'client')
      props.editCurrentClient(props.order.client)
      props.changePaymentForm(`Оплата по заказу № ${props.order.id_label}`, 'description')
      props.changePaymentForm(2, 'cashflow_category')
      props.changePaymentForm(props.current_user_id, 'employee_id')
      props.changePaymentForm(props.order.edit, 'order_id')
      props.setVisibleFlag('statusPaymentsEditor', true)
   }

   const handelOutcome = () => {
      props.changePaymentForm(1, 'direction')
      props.changePaymentForm(props.order.client.id, 'client_id')
      // props.changePaymentForm(props.order.client, 'client')
      props.editCurrentClient(props.order.client)
      props.changePaymentForm(`Выплата по заказу № ${props.order.id_label}`, 'description')
      props.changePaymentForm(8, 'cashflow_category')
      props.changePaymentForm(props.current_user_id, 'employee_id')
      props.changePaymentForm(props.order.edit, 'order_id')
      props.setVisibleFlag('statusPaymentsEditor', true)
   }

   return (
      <div className = 'contentTab'>
         <div className='row mt15'>
            <Button
               className='greenButton'
               title='Предоплата'
               onClick={ handelIncome }
               unvisible={false}
               disabled={false}
            />
            <Button
               className='greenButton bcr ml10'
               title='Выплата'
               onClick={ handelOutcome }
               unvisible={false}
               disabled={false}
            />
         </div>
         <TableOrderPaymants/>
          {props.view.statusPaymentsEditor ? <PaymentsEditor/> : null}
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
   changeOrderFormS,
   setVisibleFlag,
   changePaymentForm,
   addItemPayments,
   editCurrentClient,
   addCashboxes
}
  
 export default connect(mapStateToProps, mapDispatchToProps)(OrderPayments)