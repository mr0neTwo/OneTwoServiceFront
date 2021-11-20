import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import {
  changeTitleCreateRole,
  createRole,
  seveEditRole,
  deleteRole,
  setVisibleFlag,
} from '../../../../Redux/actions'

import PermissionsGroup from './PermissionsGroup'
import ChooseAvailableStatuses from './ChooseAvailableStatuses'
import { permission } from '../../../../data/permissions'
import ChooseButton from './ChooseButton'
import CooseAvailablePrices from './CooseAvailablePrices'
import BottomButtons from '../../../general/BottomButtons'

const RoleEditor = (props) => {
  const clickHandel = (event) => {
    if (!event.path.map((el) => el.id).includes('createNewRoleWiondow')) {
      props.setVisibleFlag('statusCreateNewRole', false)
    }
  }

  useEffect(() => {
    window.addEventListener('click', clickHandel)
    return () => {
      window.removeEventListener('click', clickHandel)
    }
  })

  const handleCreateRole = () => {
    if (props.title_create) {
      props.createRole()
    } else {
      props.setVisibleFlag('inputRoleTitleChecked', false)
    }
  }

  return (
    <div className="rightBlock">
      <div className="rightBlockWindow" id="createNewRoleWiondow">
        <div className="createNewTitle">
          {props.edit ? props.title_create : ' Новая роль'}
        </div>

        <div className="contentEditor">
          <div className="lableImput">
            Название<span className="redStar">*</span>
          </div>
          <input
            className="textInput"
            onChange={(event) =>
              props.changeTitleCreateRole(event.target.value)
            }
            value={props.title_create}
            onBlur={(event) =>
              props.setVisibleFlag(
                'inputRoleTitleChecked',
                !!event.target.value
              )
            }
            style={!props.inputRoleTitleChecked ? { borderColor: 'red' } : null}
          />
          {!props.inputRoleTitleChecked ? (
            <div className="errorMassageInput">Необоходимо заполнить</div>
          ) : null}

          {permission.map((permission, idx) => (
            <PermissionsGroup data={permission} key={idx} />
          ))}

          <ChooseButton />

          <div className="lableImput mt15">Доступные статусы заказов</div>
          <ChooseAvailableStatuses
            status={props.status.filter((status) => status.group < 8)}
          />

          <div className="lableImput mt15">Доступные статусы обращений</div>
          <ChooseAvailableStatuses
            status={props.status.filter((status) => status.group > 7)}
          />

          <div className="lableImput mt15">Доступ к ценам</div>
          <CooseAvailablePrices />
        </div>

        <BottomButtons
          edit={props.edit}
          create={handleCreateRole}
          save={() => props.seveEditRole(props.edit)}
          delete={() => props.deleteRole(props.edit)}
          close={() => props.setVisibleFlag('statusCreateNewRole', false)}
        />
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  title_create: state.role.title_create,
  edit: state.role.edit,
  status: state.data.status,
  inputRoleTitleChecked: state.view.inputRoleTitleChecked,
})

const mapDispatchToProps = {
  changeTitleCreateRole,
  createRole,
  seveEditRole,
  deleteRole,
  setVisibleFlag,
}

export default connect(mapStateToProps, mapDispatchToProps)(RoleEditor)
