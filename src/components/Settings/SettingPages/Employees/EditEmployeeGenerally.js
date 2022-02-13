import React from 'react'
import { connect } from 'react-redux'

import LableInput from '../../../general/LableInput'
import LableArea from '../../../general/LableInput'
import ChooseOfList from '../../../general/ChooseOfList'
import SalaryRule from './SalaryRule'

import { changeEmployeEditorForm, changeEmployeeEditorRoleOptions, setRoleEmployeeEdetor } from '../../../../Redux/actions'


function EditEmployeeGenerally(props) {
  return (
    <div className="employeeGenterally">
      <div className="buttons">
        <div className="flexColumn mr-rg-20">
          <LableInput
            className="w250"
            title="Имя"
            onChange={event => props.changeEmployeEditorForm(event.target.value, 'first_name')}
            value={props.employee.first_name}
            checkedFlag="inputEmployeeNameChecked"
            checked={props.view.inputEmployeeNameChecked}
            redStar={ true }
            disabled={props.employee.deleted}
          />
        </div>
        <div className="flexColumn">
          <LableInput
            className="w250"
            title="Фамилия"
            onChange={event => props.changeEmployeEditorForm(event.target.value, 'last_name') }
            value={props.employee.last_name}
            disabled={props.employee.deleted}
          />
        </div>
      </div>

      <LableInput
        className="w250 mt15"
        title="email"
        onChange={event => props.changeEmployeEditorForm(event.target.value, 'email')}
        value={props.employee.email}
        checkedFlag="inputEmployeeEmailChecked"
        checked={props.view.inputEmployeeEmailChecked}
        redStar={ true }
        disabled={props.employee.deleted}
      />
      {props.view.errorSameMail ? (
        <div className="errorMassageInput">Такой email уже существует</div>
      ) : null}
      <LableInput
        className="w250 mt15"
        title="login"
        onChange={event => props.changeEmployeEditorForm(event.target.value, 'login') }
        value={props.employee.login}
        checkedFlag="inputEmployeeLoginChecked"
        checked={props.view.inputEmployeeLoginChecked}
        redStar={ true }
        disabled={props.employee.deleted}
      />
      {props.view.errorSameLogin ? (
        <div className="errorMassageInput">Такой Login уже существует</div>
      ) : null}
      <LableInput
        className="w250 mt15"
        title="Пароль"
        onChange={event => props.changeEmployeEditorForm(event.target.value, 'password')}
        value={props.employee.password}
        checkedFlag={ props.employee.edit ? null : 'inputEmployeePasswordChecked' }
        checked={props.view.inputEmployeePasswordChecked}
        redStar={ !props.employee.edit }
        disabled={props.employee.deleted}
      />
       <LableInput
        className="w250 mt15"
        title="Телефон"
        onChange={value => props.changeEmployeEditorForm(value, 'phone')}
        value={props.employee.phone}
        disabled={props.employee.deleted}
        isPhone={true}
      />
      <LableInput
        className="w250 mt15"
        title="ИНН Сотрудника"
        onChange={event => props.changeEmployeEditorForm(event.target.value, 'inn')}
        value={props.employee.inn}
        disabled={props.employee.deleted}
      />
      <LableInput
        className="w250 mt15"
        title="Имя в печатных документах"
        onChange={event => props.changeEmployeEditorForm(event.target.value, 'doc_name')}
        value={props.employee.doc_name}
        disabled={props.employee.deleted}
      />
      <LableArea
        className="mt15"
        title="Примечание"
        onChange={event =>
          props.changeEmployeEditorForm(event.target.value, 'notes')
        }
        value={props.employee.notes}
        disabled={props.employee.deleted}
      />
      <LableInput
        className="w250 mt15"
        title="Должность"
        onChange={event => props.changeEmployeEditorForm(event.target.value, 'post')}
        value={props.employee.post}
        disabled={props.employee.deleted}
      />
      <div className="lableImput mt15">Роль</div>
      <ChooseOfList
        id={19}
        className="mt15"
        list={props.roles}
        field="role_id"
        setElement={props.changeEmployeEditorForm}
        current_id={props.employee.role_id}
        width={'250px'}
        disabled={props.employee.deleted}
      />
      {!props.view.inputEmployeeRoleChecked ? <div className="errorMassageInput">Выберете роль</div> : null}
      {props.employee.edit ? <SalaryRule/> : null}
    </div>
  )
}

const mapStateToProps = (state) => ({
  employee: state.employee,
  roles: state.data.roles,
  employeeEditorRoleOptions: state.view.employeeEditorRoleOptions,
  view: state.view,
})

const mapDispatchToProps = {
  changeEmployeEditorForm,
  changeEmployeeEditorRoleOptions,
  setRoleEmployeeEdetor,
}

export default connect( mapStateToProps, mapDispatchToProps )(EditEmployeeGenerally)
