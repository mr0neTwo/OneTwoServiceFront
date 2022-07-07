import React from 'react'
import { connect } from 'react-redux'

import { setVisibleFlag } from '../../Redux/actions'
import {changePaymentState} from '../../Redux/actions/paymentAction'

const Receipt = (props) => {

   const cashbox = props.payment.cashbox_id ? props.cashboxes.find(cashbox => cashbox.id === props.payment.cashbox_id).title : ''

   const disc = [`Перемещение денег из кассы "${cashbox}"`, 'Выплата денег из кассы', 'Внесение денег в кассу']

   const sum = props.payment.outcome ?  props.payment.outcome : props.payment.income
   
   return (
      <div className='receiptBox'>
               <div className='receipt mt15'>
                  <table>
                     <thead>
                        <tr>
                           <th>Наименование</th>
                           <th className='tae w80'>Сумма, руб.</th>
                        </tr>
                     </thead>
                     <tbody>
                        <tr>
                           <td>{props.payment.edit ? props.payment.description : disc[props.payment.direction]}</td>
                           <td className='eal'>
                              {props.payment.edit ? <div>{ sum }</div> :
                              <input 
                                 className='w70'
                                 style={ props.inputPaymentSumChecked ? null : {borderColor: 'red'} }
                                 onChange={event => props.changePaymentState({
                                    [props.payment.direction === 2 ? 'income' : 'outcome']: event.target.value.replace(/[^0-9.]/g, '')
                                 })}
                                 value={ sum }
                                 onBlur={() => props.setVisibleFlag('inputPaymentSumChecked', props.payment.direction === 2 ? !!props.payment.income : !!props.payment.outcome)}
                                 disabled={props.payment.context.type === 'closed_order'}
                              />}
                           </td>
                        </tr>
                        <tr>
                           <td className='tae'>Итого:</td>
                           <td className='eal'>
                              <div className='sum'>{`${ sum } руб`}</div>
                           </td>
                        </tr>
                     </tbody>
                  </table>
               </div>
           </div>
   )
}

const mapStateToProps = state => ({
   payment: state.payment,
   inputPaymentSumChecked: state.view.inputPaymentSumChecked,
   cashboxes: state.cashbox.cashboxes
})

const mapDispatchToProps = {
   changePaymentState,
   setVisibleFlag
}
  
 export default connect(mapStateToProps, mapDispatchToProps)(Receipt)