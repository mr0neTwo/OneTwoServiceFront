import React from 'react'
import { connect } from 'react-redux'

import { icone_sphere, icone_setting } from '../../../data/icons'
import { activeCashbox, editCashbox, setVisibleFlag, changeCashboxForm } from '../../../Redux/actions'
import {changePaymentForm} from '../../../Redux/actions/paymentAction'
import Button from '../../general/Button'
import Icon from '../../general/Icon'



const Cashbox = (props) => {

   const activ = (id) => {
      return id === props.activ_cashbox_id
   }

   const edit = props.user.role.permissions.includes('edit_cash')

   const income = props.user.role.permissions.includes('make_income') &&
                  activ(props.cashbox.id) && 
                  (props.cashbox.employees[props.user.id].like_cashbox ? 
                  props.cashbox.permissions.includes('incoming') :
                  props.cashbox.employees[props.user.id].permissions.includes('incoming'))

   const outcome = props.user.role.permissions.includes('make_expenditure') &&
                   activ(props.cashbox.id) && 
                   (props.cashbox.employees[props.user.id].like_cashbox ? 
                   props.cashbox.permissions.includes('outcoming') :
                   props.cashbox.employees[props.user.id].permissions.includes('outcoming'))

   const move = props.user.role.permissions.includes('move_money') &&
                activ(props.cashbox.id) && 
                (props.cashbox.employees[props.user.id].like_cashbox ? 
                props.cashbox.permissions.includes('outcoming_move') :
                props.cashbox.employees[props.user.id].permissions.includes('outcoming_move'))

   const showBalance = props.user.role.permissions.includes('see_remains') &&
                       (props.cashbox.employees[props.user.id].like_cashbox ? 
                       props.cashbox.permissions.includes('show_cashbox_remains') :
                       props.cashbox.employees[props.user.id].permissions.includes('show_cashbox_remains'))

   function handleEdit () {
      props.editCashbox(props.cashbox)
      props.setVisibleFlag('statusCashboxEditor', true)
   }


   return (
      <div 
         className = {`cashbox ${activ(props.cashbox.id) && !props.cashbox.deleted  ? 'bcg' : 'cgr'}`}
         onClick={() => props.changeCashboxForm(props.cashbox, 'current_cashbox')}
      >
         <div className='icons'>
               <div><Icon className='smalIcon' icon={icone_sphere} color={activ(props.cashbox.id) && props.cashbox.isGlobal ? 'grey' : 'white'}/></div>
               <div
                  onClick={edit ? handleEdit : null}
               >
                  <Icon className='smalIcon curP' icon={icone_setting} color={activ(props.cashbox.id) && edit ? 'grey' : 'white'}/>
               </div>
         </div>
         <div>{props.cashbox.title.toUpperCase()}</div>
         {showBalance ? 
         <div className='cacsboxBalance'>{`${parseFloat(props.cashbox.balance).toFixed(2)} руб.`}</div> : null}
         <div className='row jc-c'>
            <Button
               title='+ Приход'
               className={props.cashbox.deleted ? 'whiteButton m10' : 'greenButton m10'}
               onClick={() => {
                  props.changePaymentForm(2, 'direction')
                  props.changePaymentForm({type: 'payment'}, 'context')
                  props.setVisibleFlag('statusPaymentsEditor', true)
               }}
               disabled={props.cashbox.deleted}
               unvisible={!income}
            />
            <Button
               title='- Расход'
               className={props.cashbox.deleted ? 'whiteButton m10' : 'greenButton bcr m10'}
               onClick={() => {
                  props.changePaymentForm(1, 'direction')
                  props.changePaymentForm({type: 'payment'}, 'context')
                  props.setVisibleFlag('statusPaymentsEditor', true)
               }}
               disabled={props.cashbox.deleted}
               unvisible={!outcome}
            /> 
         </div>
         <Button
            title='Перемещение'
            className='whiteButton'
            onClick={() => {
               props.changePaymentForm(0, 'direction')
               props.changePaymentForm(props.cashbox.id, 'cashbox_id')
               props.changePaymentForm({type: 'payment'}, 'context')
               props.setVisibleFlag('statusPaymentsEditor', true)
            }}
            disabled={props.cashbox.deleted}
            unvisible={!move}
         /> 
      </div>
   )
}

const mapStateToProps = state => ({
   user: state.data.user,
   activ_cashbox_id: state.cashbox.current_cashbox.id
})

const mapDispatchToProps = {
   activeCashbox,
   editCashbox,
   setVisibleFlag,
   changePaymentForm,
   changeCashboxForm
}
  
 export default connect(mapStateToProps, mapDispatchToProps)(Cashbox)