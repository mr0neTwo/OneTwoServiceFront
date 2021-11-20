

import React from 'react'
import { connect } from 'react-redux'

import LableInput from '../../general/LableInput'

import { changeCashboxForm, chooseCashboxSelected } from '../../../Redux/actions'
import ChooseBotton from '../../general/ChooseBotton'
import Checkbox from '../../general/Checkbox'

const DataCashbox = (props) => {
   return (
      <div className = 'contentEditor'>

         <LableInput
            className="w250 mt15"
            title='Наименование'
            onChange={(event) => props.changeCashboxForm(event.target.value, 'title')}
            value={props.cashbox.title}
            checkedFlag="inputCashboxTitleChecked"
            checked={props.view.inputCashboxTitleChecked}
            redStar={ true }
            disabled={props.cashbox.deleted}
          />
          <ChooseBotton
            className='mt15'
            title='Тип'
            name={['Касса компании', 'Касса локации']}
            func1 = {() => props.changeCashboxForm(true, 'isGlobal')}
            func2 = {() => props.changeCashboxForm(false, 'isGlobal')}
            disabled={props.cashbox.deleted}
          />
          <Checkbox
            className='mt15'
            label='Виртуальная касса'
            onChange={event => props.changeCashboxForm(event.target.checked, 'isVirtual')} 
            checked={props.cashbox.isVirtual}
            disabled={props.cashbox.deleted}
          />
          <ChooseBotton
            className='mt15'
            title='Способ расчета'
            name={['Наличный', 'Безналичный']}
            func1={() => props.changeCashboxForm(0, 'type')}
            func2={() => props.changeCashboxForm(1, 'type')}
            checked={true}
            disabled={props.cashbox.deleted}
         />
         <div className='lableImput mt15'>Допустимые действия с кассой</div>
         <Checkbox
            className='mt15'
            label='Видеть остаток денег в кассе'
            onChange={() => props.chooseCashboxSelected(['show_cashbox_remains'], 'permissions')} 
            checked={props.cashbox.permissions.includes('show_cashbox_remains')}
            disabled={props.cashbox.deleted}
          />
          <Checkbox
            className='mt15'
            label='Видеть денежный поток'
            onChange={() => props.chooseCashboxSelected(['show_cash_flow'], 'permissions')} 
            checked={props.cashbox.permissions.includes('show_cash_flow')}
            disabled={props.cashbox.deleted}
          />
          <div className='row'>
            <div>
               <div className='lableImput mt15'>Входящие операции:</div>
               <Checkbox
                  className='mt15'
                  label='Приход'
                  onChange={() => props.chooseCashboxSelected(['incoming'], 'permissions')} 
                  checked={props.cashbox.permissions.includes('incoming')}
                  disabled={props.cashbox.deleted}
               />
               <Checkbox
                  className='mt15'
                  label='Перемещение'
                  onChange={() => props.chooseCashboxSelected(['incoming_move'], 'permissions')} 
                  checked={props.cashbox.permissions.includes('incoming_move')}
                  disabled={props.cashbox.deleted}
               />
            </div>
            <div className='ml30'>
               <div className='lableImput mt15'>Исходящие операции:</div>
               <Checkbox
                  className='mt15'
                  label='Приход'
                  onChange={() => props.chooseCashboxSelected(['outcoming'], 'permissions')} 
                  checked={props.cashbox.permissions.includes('outcoming')}
                  disabled={props.cashbox.deleted}
               />
               <Checkbox
                  className='mt15'
                  label='Перемещение'
                  onChange={() => props.chooseCashboxSelected(['outcoming_move'], 'permissions')} 
                  checked={props.cashbox.permissions.includes('outcoming_move')}
                  disabled={props.cashbox.deleted}
               />
            </div>
          </div>

      </div>
   )
}

const mapStateToProps = state => ({
   cashbox: state.cashbox,
   view: state.view

   })

const mapDispatchToProps = {
   changeCashboxForm,
   chooseCashboxSelected
}
  
 export default connect(mapStateToProps, mapDispatchToProps)(DataCashbox)