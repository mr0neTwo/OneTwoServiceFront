import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { changeStatusCteateNewRole, addDiscountMargin, addRoles, changeStatusEmployeeEditor, changeShowDeleted } from '../../../../Redux/actions'
import EmploeeyEditor from './EmploeeyEditor'
import RoleEditor from './RoleEditor'
import TableEmployees from './TableEmployees'
import TableRoles from './TableRoles'

const SettingEmployees = (props) => {

  useEffect(() => {
    props.addDiscountMargin()
    props.addRoles()
  }, [])

  return (
    <div className='settingContent'>
      <div className='Header'>
        <span className='headerTitle'>Сотрудники</span>
      </div>
        <div className='settingPageBody'>

        {props.permission.includes('setting_roles') ?
          <>
          <h3>Роли</h3>
        <p>Роль — это список прав и возможностей сотрудника.</p>

        <div 
        className='greenButton'
        onClick={() => props.changeStatusCteateNewRole()}
        > 
          + Роль
        </div>
        {props.statusCreateNewRole ? <RoleEditor/> : null}

        <TableRoles/>
        </> : null}

        <h3>Сотрудники</h3>
        <p>Каждый сотрудник имеет свой логин и пароль для входа в OneTwoService</p>

        <div className='buttons'>
            <div 
            className='greenButton'
            onClick={() => props.changeStatusEmployeeEditor()}
            >
              + Сотрудник
            </div>
            <div className='checkbox'>
              <input
                type='checkbox'
                onChange={() => props.changeShowDeleted()}
                checked={props.showDeleted}
              />
              <label>Показать удаленных</label>
            </div>
        </div>

        {props.statusEmployeeEditor ? <EmploeeyEditor/> : null}

        <TableEmployees/>

       

      </div>
    </div>
    
  )
}

const mapStateToProps = state => ({
  statusCreateNewRole: state.view.statusCreateNewRole,
  statusEmployeeEditor: state.view.statusEmployeeEditor,
  showDeleted: state.employee.showDeleted,
  permission: state.data.user.role.permissions
})

const mapDispatchToProps = {
  changeStatusCteateNewRole,
  addDiscountMargin,
  addRoles,
  changeStatusEmployeeEditor,
  changeShowDeleted
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingEmployees)