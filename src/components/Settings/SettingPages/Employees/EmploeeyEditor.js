import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import {
  changeEmployeeTabs,
  setVisibleFlag,
  createEmployee,
  seveEditEmployee,
  deleteEmployee,
} from '../../../../Redux/actions'
import EditEmployeeGenerally from './EditEmployeeGenerally'
import EditEmployeePermission from './EditEmployeePermission'
import BottomButtons from '../../../general/BottomButtons'

const EmploeeyEditor = (props) => {
  const clickHandel = (event) => {
    if (!event.path.map((el) => el.id).includes('createNewRoleWiondow')) {
      props.setVisibleFlag('statusEmployeeEditor', false)
    }
  }

  useEffect(() => {
    window.addEventListener('click', clickHandel)
    return () => {
      window.removeEventListener('click', clickHandel)
    }
  })

  const hangleCreate = () => {
    if (
      props.employee.first_name &&
      props.employee.email &&
      props.employee.login &&
      props.employee.password &&
      props.employee.role_id !== 0
    ) {
      props.createEmployee()
    } else {
      if (!props.employee.first_name) {
        props.setVisibleFlag('inputEmployeeNameChecked', false)
      }
      if (!props.employee.email) {
        props.setVisibleFlag('inputEmployeeEmailChecked', false)
      }
      if (!props.employee.login) {
        props.setVisibleFlag('inputEmployeeLoginChecked', false)
      }
      if (!props.employee.password) {
        props.setVisibleFlag('inputEmployeePasswordChecked', false)
      }
      if (props.employee.role_id === 0) {
        props.setVisibleFlag('inputEmployeeRoleChecked', false)
      }
    }
  }

  const hangleSave = () => {
    if (
      props.employee.first_name &&
      props.employee.email &&
      props.employee.login
    ) {
      props.seveEditEmployee()
    } else {
      if (!props.employee.first_name) {
        props.setVisibleFlag('inputEmployeeNameChecked', false)
      }
      if (!props.employee.email) {
        props.setVisibleFlag('inputEmployeeEmailChecked', false)
      }
      if (!props.employee.login) {
        props.setVisibleFlag('inputEmployeeLoginChecked', false)
      }
    }
  }

  return (
    <div className="rightBlock">
      <div className="rightBlockWindow" id="createNewRoleWiondow">
        <div className="createNewTitle">
          {props.edit
            ? `${props.employee.last_name} ${props.employee.first_name}`
            : 'Новый сотрудник'}
        </div>

        <div className="tabs">
          <div
            className={props.tabs === 1 ? 'tabOn' : 'tab'}
            onClick={() => props.changeEmployeeTabs(1)}
          >
            Общие
          </div>
          <div
            className={props.tabs === 2 ? 'tabOn' : 'tab'}
            onClick={() => props.changeEmployeeTabs(2)}
          >
            Доступ
          </div>
        </div>

        {props.tabs === 1 ? <EditEmployeeGenerally /> : null}
        {props.tabs === 2 ? <EditEmployeePermission /> : null}

        <BottomButtons
          edit={props.edit}
          create={hangleCreate}
          save={hangleSave}
          delete={() => props.deleteEmployee(true)}
          recover={
            props.permissions.includes('setting_recover_employees')
              ? () => props.deleteEmployee(false)
              : null
          }
          close={() => props.setVisibleFlag('statusEmployeeEditor', false)}
          deleted={props.employee.deleted}
        />
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  tabs: state.employee.tabs,
  edit: state.employee.edit,
  employee: state.employee,
  permissions: state.data.user.role.permissions,
})

const mapDispatchToProps = {
  changeEmployeeTabs,
  setVisibleFlag,
  createEmployee,
  seveEditEmployee,
  deleteEmployee,
}

export default connect(mapStateToProps, mapDispatchToProps)(EmploeeyEditor)
