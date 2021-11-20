import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import { setVisibleFlag, changeEmployeeSelected, changeCashboxPermissions } from '../../../Redux/actions'
import ChooseBotton from '../../general/ChooseBotton'
import WarningOrange from '../../general/WarningOrange'
import Checkbox from '../../general/Checkbox'

const CashboxEmployeeEditor = (props) => {

   const [perm, setPerm] = useState( props.cashbox.employees[props.cashbox.permissions_employee].like_cashbox )

   const clickHandel = (event) => {
      if (!event.path.map((el) => el.id).includes('cashboxEmployeeEditor')) {
        props.setVisibleFlag('statusCashboxEmployeeEditor', false)
      }
    }
  
    useEffect(() => {
      window.addEventListener('click', clickHandel)
      return () => {
        window.removeEventListener('click', clickHandel)
      }
    })
   
  return (
    <div className="centerBlock">
      <div className="blockWindow" id='cashboxEmployeeEditor'>
        <div className="createNewTitle">{`${props.employee.last_name} ${props.employee.first_name}`}</div>
        <div className="createNewTitle mt0">
          {props.employee.role_title}
        </div>
        <WarningOrange
          text="Сотрудник сможет выполнять только те действия, которые разрешены в настройках его роли"
          width="500px"
        />
        <ChooseBotton
          className='mt15'
          title='Выберите права'
          name={['Доступные для кассы', 'Персональные']}
          func1={() => {
             setPerm(true)
             props.changeCashboxPermissions(true, 'like_cashbox')
          }}
          func2={() => {
             setPerm(false)
             props.changeCashboxPermissions(false, 'like_cashbox')
            }}
          checked={props.cashbox.employees[props.cashbox.permissions_employee].like_cashbox}
          disabled={props.cashbox.deleted}
        />
        <Checkbox
            className='mt15'
            label='Видеть остаток денег в кассе'
            onChange={() => props.changeCashboxPermissions('show_cashbox_remains', 'permissions')} 
            checked={
               perm ? 
               props.cashbox.permissions.includes('show_cashbox_remains') : 
               props.cashbox.employees[props.cashbox.permissions_employee].permissions.includes('show_cashbox_remains')
            }
            disabled={props.cashbox.deleted && perm}
          />
          <Checkbox
            className='mt15'
            label='Видеть денежный поток'
            onChange={() => props.changeCashboxPermissions('show_cash_flow', 'permissions')} 
            checked={ 
               perm ? 
               props.cashbox.permissions.includes('show_cash_flow') :
               props.cashbox.employees[props.cashbox.permissions_employee].permissions.includes('show_cash_flow')
            }
            disabled={props.cashbox.deleted && perm}
          />
          <div className='row'>
            <div>
               <div className='lableImput mt15'>Входящие операции:</div>
               <Checkbox
                  className='mt15'
                  label='Приход'
                  onChange={() => props.changeCashboxPermissions('incoming', 'permissions')} 
                  checked={ 
                     perm ? 
                     props.cashbox.permissions.includes('incoming') :
                     props.cashbox.employees[props.cashbox.permissions_employee].permissions.includes('incoming')
                  }
                  disabled={props.cashbox.deleted && perm}
               />
               <Checkbox
                  className='mt15'
                  label='Перемещение'
                  onChange={() => props.changeCashboxPermissions('incoming_move', 'permissions')} 
                  checked={ 
                     perm ? 
                     props.cashbox.permissions.includes('incoming_move') :
                     props.cashbox.employees[props.cashbox.permissions_employee].permissions.includes('incoming_move')
                  }
                  disabled={props.cashbox.deleted && perm}
               />
            </div>
            <div className='ml30'>
               <div className='lableImput mt15'>Исходящие операции:</div>
               <Checkbox
                  className='mt15'
                  label='Приход'
                  onChange={() => props.changeCashboxPermissions('outcoming', 'permissions')} 
                  checked={ 
                     perm ? 
                     props.cashbox.permissions.includes('outcoming') :
                     props.cashbox.employees[props.cashbox.permissions_employee].permissions.includes('outcoming')
                  }
                  disabled={props.cashbox.deleted && perm}
               />
               <Checkbox
                  className='mt15'
                  label='Перемещение'
                  onChange={() => props.changeCashboxPermissions('outcoming_move', 'permissions')} 
                  checked={ 
                     perm ? 
                     props.cashbox.permissions.includes('outcoming_move') :
                     props.cashbox.employees[props.cashbox.permissions_employee].permissions.includes('outcoming_move')
                  }
                  disabled={props.cashbox.deleted && perm}
               />
            </div>
          </div>

        <div className="row">
          <div
            className="blueButton mr-lf-0"
            onClick={() => props.setVisibleFlag('statusCashboxEmployeeEditor', false)}
          >
            Сохранить
          </div>
          <div
            className="whiteBlueBotton"
            onClick={() => props.setVisibleFlag('statusCashboxEmployeeEditor', false)}
          >
            Закрыть
          </div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  employee: state.employee,
  roles: state.data.roles,
  cashbox: state.cashbox
})

const mapDispatchToProps = {
  setVisibleFlag,
  changeEmployeeSelected,
  changeCashboxPermissions
}

export default connect(mapStateToProps, mapDispatchToProps)(CashboxEmployeeEditor)
