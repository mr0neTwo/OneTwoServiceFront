
import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { changeOrderFormS } from '../../../Redux/actions'

import ChooseOfList from '../../general/ChooseOfList'

const AssingEmployee = (props) => {

  // текущий список менеджеров
  let list_managers = props.employees.filter(employee => !employee.deleted && employee.role.permissions.includes('in_list_managers'))
  // проверим есть ли текущий сотрудник в списке менеджеров, если нет, то добавим, если да, оставим как есть
  list_managers = list_managers.some(employee => employee.id === props.manager_id) || !props.manager_id ? list_managers :
  list_managers.concat([props.employees.find(employee => employee.id === props.manager_id)])

  // текущий список инженеров
  let list_ingineers = props.employees.filter(employee => !employee.deleted && employee.role.permissions.includes('in_list_engineers'))
  // проверим есть ли текущий сотрудник в списке менеджеров, если нет, то добавим, если да, оставим как есть
  list_ingineers = list_ingineers.some(employee => employee.id === props.engineer_id) || !props.engineer_id ? list_ingineers :
  list_ingineers.concat([props.employees.find(employee => employee.id === props.engineer_id)]) 


   return (
      <div className = 'boxAssingEmployee'>

         <div className = 'formRow'>
          <div className='optionsTitle'>Менеджер</div> 
          <div className='blockImput'>
            <ChooseOfList
              id={17}
              list={ list_managers }
              setElement={props.changeOrderFormS}
              current_id={props.manager_id ? props.manager_id : 0}
              width={'250px'}
              className='pd-lf-5'
              field='manager_id'
              employee={true}
              disabled={!props.user.role.permissions.includes('assing_emploees') || props.status_group > 3}
            /> 
          </div>
        </div>

        <div className = 'formRow'>
          <div className='optionsTitle'>Исполнитель</div> 
          <div className='blockImput'>
            <ChooseOfList
              id={18}
              list={ list_ingineers }
              setElement={props.changeOrderFormS}
              current_id={ props.engineer_id ? props.engineer_id: 0}
              width={'250px'}
              className='pd-lf-5'
              field='engineer_id'
              employee={true}
              disabled={!props.user.role.permissions.includes('assing_emploees') || props.status_group > 3}
            /> 
          </div>
        </div>
         
      </div>
   )
}

const mapStateToProps = state => ({
   employees: state.data.employees,
   manager_id: state.order.manager_id,
   engineer_id: state.order.engineer_id,
   user: state.data.user,
   status_group: state.order.status.group
   })

const mapDispatchToProps = {
   changeOrderFormS
}
  
 export default connect(mapStateToProps, mapDispatchToProps)(AssingEmployee)