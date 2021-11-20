
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'


import { setVisibleFlag, addCashboxes, changeCashboxForm, addPayments } from '../../../Redux/actions'
import Checkbox from '../../general/Checkbox'
import Cashbox from './Cashbox'
import CashboxEditor from './CashboxEditor'
import PaymentsEditor from '../PaymentsEditor'
import ManeyMovement from '../ManeyMovement'
import PaymentCard from '../PaymentCard'


const Cashboxes = (props) => {

   const [showDeleted, setShowDeleted] = useState(false)

   useEffect(() => {
      props.addCashboxes()
   },[])

   const cashboxes = props.cashboxes.filter(cashbox => 
      (!cashbox.deleted || showDeleted) && 
      cashbox.employees[props.user.id].available &&
      (cashbox.branch_id === (props.current_branch ? props.current_branch.id : false )|| cashbox.isGlobal)
      )
   
   
   // useEffect(() => {
   //    props.changeCashboxForm(cashboxes[0], 'current_cashbox')
   // },[])

   return (
      <div className = 'contentTab'>

         <div className = 'row al-itm-bl'>
            <div className='cashboxes'>
               <Checkbox
                  label='Показать удаленные'
                  onChange={event => setShowDeleted(event.target.checked)}
                  checked={showDeleted}
               />
               {cashboxes.map(cashbox => {
               return (
                  <Cashbox
                     key={cashbox.id}
                     cashbox={cashbox}
                     active={cashbox.active}
                  />
               )})}
               
               {props.user.role.permissions.includes('edit_cash') ?
               <div 
                  className='whiteButton'
                  onClick={() => props.setVisibleFlag('statusCashboxEditor', true)}
               >
                     + Добавить кассу
               </div> : null}

            </div>
            {props.permissions.includes('see_moving_money') ? <ManeyMovement/> : null }
           
         </div>
         {props.view.statusPaymentsCard ? <PaymentCard/> : null}
         {props.view.statusPaymentsEditor ? <PaymentsEditor/> : null}
         {props.view.statusCashboxEditor ? <CashboxEditor/> : null}
      </div>
   )
}

const mapStateToProps = state => ({
   view: state.view,
   cashboxes: state.data.cashboxes,
   user: state.data.user,
   current_branch: state.data.current_branch,
   permissions: state.data.user.role.permissions
   })

const mapDispatchToProps = {
   setVisibleFlag,
   addCashboxes,
   changeCashboxForm,
   addPayments
}
  
 export default connect(mapStateToProps, mapDispatchToProps)(Cashboxes)