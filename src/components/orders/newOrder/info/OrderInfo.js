import React from 'react'
import { connect } from 'react-redux'


import SelectFromList from '../../../general/SelectFromList'
import {changeOrderState} from '../../../../Redux/actions/orderActions'
import SetClient from '../../../general/SetClient'
import SetOrderGroup from './SetOrderGroup'
import SetOrderBrand from './SetOrderBrand'
import SetOrderSubtype from './SetOrderSubtype'
import SetOrderModel from './SetOrderModel'
import LableInput from '../../../general/LableInput'
import ChooseDate from '../../../general/calandar/ChooseDate'
import LableArea from '../../../general/LableArea'
import Checkbox from '../../../general/Checkbox'

const OrderInfo = (props) => {

    // текущий список менеджеров
    let list_managers = props.employees.filter(employee => !employee.deleted && employee.role.permissions.includes('in_list_managers'))
    // проверим есть ли текущий сотрудник в списке менеджеров, если нет, то добавим, если да, оставим как есть
    list_managers = list_managers.some(employee => employee.id === props.manager_id) || !props.manager_id ? list_managers :
        list_managers.concat([props.employees.find(employee => employee.id === props.manager_id)])

    // текущий список инженеров
    let list_engineers = props.employees.filter(employee => !employee.deleted && employee.role.permissions.includes('in_list_engineers'))
    // проверим есть ли текущий сотрудник в списке менеджеров, если нет, то добавим, если да, оставим как есть
    list_engineers = list_engineers.some(employee => employee.id === props.engineer_id) || !props.engineer_id ? list_engineers :
        list_engineers.concat([props.employees.find(employee => employee.id === props.engineer_id)])

   return (
      <div className='form-order-editor'>

          <div className='form-order-editor__set-forms'>
              <SelectFromList
                  id='OrderEditorOrderType'
                  title='Тип заказа'
                  list={props.order_type}
                  setElement={order_type => props.changeOrderState({order_type})}
                  current_object={props.order.order_type}
                  noChoosed='Выберете тип'
                  disabled={!props.permissions.includes('edit_info_orders') || props.order.status_group > 3}
              />
              <SelectFromList
                  id='OrderEditorAdCampaign'
                  title='Рекламная компания'
                  list={props.ad_campaign}
                  setElement={ad_campaign => props.changeOrderState({ad_campaign})}
                  current_object={props.order.ad_campaign}
                  noChoosed='Выберете тип'
                  disabled={!props.permissions.includes('edit_info_orders')}
              />
          </div>

          <SetClient
              id='OrderEditorClient'
              title='Клиент'
              setClient={client => props.changeOrderState({client})}
              client={props.order.client}
              checkedFlag='checkedOrderClient'
              filter_phone={props.filter_phone}
              redStar={true}
              disabled={!props.permissions.includes('edit_info_orders')}
          />

          <div className='form-order-editor__set-forms'>
              <div className='form-order-editor__block-forms'>
                  <h5>Изделие и неисправность</h5>
                  <SetOrderGroup/>
                  <SetOrderBrand/>
                  <SetOrderSubtype/>
                  <SetOrderModel/>
                  <LableInput
                      title='Неисправность'
                      onChange={event => props.changeOrderState({malfunction: event.target.value})}
                      value={props.order.malfunction}
                      checkedFlag='inputMalfunctionChecked'
                      redStar={true}
                  />
                  <LableInput
                      title='Комплектация'
                      onChange={event => props.changeOrderState({packagelist: event.target.value})}
                      value={props.order.packagelist}
                  />
                  <LableInput
                      title='Внешний вид'
                      onChange={event => props.changeOrderState({appearance: event.target.value})}
                      value={props.order.appearance}
                  />
              </div>
              <div className='form-order-editor__block-forms'>
                  <h5>Сотрудники</h5>
                  <SelectFromList
                      id='orderEditorManager'
                      title='Менеджер'
                      list={list_managers}
                      setElement={manager => props.changeOrderState({manager})}
                      current_object={props.order.manager}
                      noChoosed='Выберете сотрудника'
                      disabled={!props.user.role.permissions.includes('assing_emploees') || props.order.status_group > 3}
                  />
                  <SelectFromList
                      id='orderEditorEngineer'
                      title='Инженер'
                      list={list_engineers}
                      setElement={engineer => props.changeOrderState({engineer})}
                      current_object={props.order.engineer}
                      noChoosed='Выберете сотрудника'
                      disabled={!props.user.role.permissions.includes('assing_emploees') || props.order.status_group > 3}
                  />
                  <h5>Доп. информация</h5>
                  <ChooseDate
                      title='Дата готовности'
                      time={true}
                      func={date => props.changeOrderState({estimated_done_at: Math.round(date / 1000)})}
                      current_date={props.order.estimated_done_at * 1000}
                      disabled={props.order.status.group > 3 || !props.permissions.includes('edit_info_orders')}
                  />
                  <LableInput
                      title='Ориентировочная стоимость'
                      onChange={event => props.changeOrderState({estimated_cost: event.target.value})}
                      value={props.order.estimated_cost}
                      unit='руб'
                  />
                  <LableArea
                      className='h92'
                      title='Заметки менеджера'
                      onChange={event => props.changeOrderState({manager_notes: event.target.value})}
                      value={props.value}
                  />
                  <Checkbox
                      id='orderEditorUrgent'
                      type='slide-three'
                      label='Срочно'
                      onChange={event => props.changeOrderState({urgent: event.target.checked})}
                      checked={props.order.urgent}
                  />
              </div>
          </div>

      </div>
   )
}

const mapStateToProps = state => ({
    order: state.order,
    view: state.view,
    order_type: state.data.order_type,
    ad_campaign: state.data.ad_campaign,
    filter_phone: state.client.filter_phone,
    employees: state.employee.employees,
    user: state.data.user,
    permissions: state.data.user.role.permissions
})

const mapDispatchToProps = {
    changeOrderState
}
  
 export default connect(mapStateToProps, mapDispatchToProps)(OrderInfo)