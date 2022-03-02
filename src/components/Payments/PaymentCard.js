
import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { setVisibleFlag } from '../../Redux/actions'
import {deletePayment, resetPayments} from '../../Redux/actions/paymentAction'
import Receipt from './Receipt'
import BottomButtons from '../general/BottomButtons'
import Clause from './cashboxes/Clause'

const PaymentCard = (props) => {

   const clickHandel = (event) => {
      if (!event.path.map((el) => el.id).includes('paymentsCardWiondow')) {
        props.setVisibleFlag('statusPaymentsCard', false)
      }
    }
  
    useEffect(() => {
      window.addEventListener('click', clickHandel)
      return () => {
        window.removeEventListener('click', clickHandel)
      }
    })
  
    const title = ['Перемещение денег', 'Расход денег', 'Приход денег']
  
  
    return (
         <div className="rightBlock">
            <div className="rightBlockWindow wsp" id="paymentsCardWiondow">

            <div className="createNewTitle">
              {title[props.payment.direction]}
            </div>
  
            <div className='contentEditor'>
              
               <Receipt/>

               <Clause
                  className='mt15'
                  title='Форма оплаты:'
                  text={ props.payment.cashbox.type ? 'Безналичная' : 'Наличная'}
               />
               <Clause
                  className='mt5'
                  title='Касса:'
                  text={ props.payment.cashbox.title }
               />
               {props.payment.cashflow_category ?
               <Clause
                  className='mt5'
                  title='Статья:'
                  text={ props.payment.cashflow_category }
               /> : null}
                {Object.values(props.payment.client).length ? 
                <Clause
                  className='mt5'
                  title='Клиет:'
                  text={ props.payment.client.name }
               /> : null}
                <Clause
                  className='mt5'
                  title='Кассир:'
                  text={ props.payment.employee.name }
               />
            
  
            </div>
         
  
          <BottomButtons
            edit={props.payment.edit}
            delete={ props.permissions.includes('delete_payments') ? () => props.deletePayment( true ) : null }
            recover={ props.permissions.includes('recover_payments') ? () => props.deletePayment( false ) : null }
            close={() => {
              props.setVisibleFlag('statusPaymentsCard', false)
              props.resetPayments()
            }}
            deleted={props.payment.deleted}
          />
        </div>
      </div>
    )
  }


const mapStateToProps = state => ({
   payment: state.payment,
   cashboxes: state.data.cashboxes,
   permissions: state.data.user.role.permissions
   })

const mapDispatchToProps = {
   setVisibleFlag,
   resetPayments,
   deletePayment
}
  
 export default connect(mapStateToProps, mapDispatchToProps)(PaymentCard)