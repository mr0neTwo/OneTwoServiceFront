import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import {
  setVisibleFlag,
  changeBranchForm,
  createBranch,
  saveBranch,
  deleteBranch,
} from '../../../../Redux/actions'
import BottomButtons from '../../../general/BottomButtons'
import LableInput from '../../../general/LableInput'
import Schedule from './Schedule'
import ChooseIcon from './ChooseIcon'
import ChooseOfList from '../../../general/ChooseOfList'
import ChooseEmployees from './ChooseEmployees'

const BranchEditor = (props) => {
  const clickHandel = (event) => {
    if (!event.path.map((el) => el.id).includes('BranchEditorWiondow')) {
      props.setVisibleFlag('statusBranchEditor', false)
    }
  }

  useEffect(() => {
    window.addEventListener('click', clickHandel)
    return () => {
      window.removeEventListener('click', clickHandel)
    }
  })

  const handleCreateBranch = () => {
    if (
      props.branch.name &&
      props.branch.orders_prefix &&
      props.branch.documents_prefix
    ) {
      props.createBranch()
    } else {
      if (!props.branch.name) {
        props.setVisibleFlag('inputBranchNameChecked', false)
      }
      if (!props.branch.orders_prefix) {
        props.setVisibleFlag('inputBranchPrefixChecked', false)
      }
      if (!props.branch.documents_prefix) {
        props.setVisibleFlag('inputBranchPrefixDocChecked', false)
      }
    }
  }

  return (
    <div className="rightBlock">
      <div className="rightBlockWindow" id="BranchEditorWiondow">
        <div className="createNewTitle">
          {props.branch.edit ? props.branch.name : ' Новая локация'}
        </div>

        <LableInput
          className="w250 mt15"
          title="Название"
          onChange={(event) => props.changeBranchForm('name', event.target.value)}
          value={props.branch.name}
          checkedFlag="inputBranchNameChecked"
          checked={props.view.inputBranchNameChecked}
          redStar={ true }
          disabled={props.branch.deleted}
        />
        <LableInput
          className="w250 mt15"
          title="Адрес"
          onChange={(event) => props.changeBranchForm('address', event.target.value)}
          value={props.branch.address}
          disabled={props.branch.deleted}
        />
        <LableInput
          className='textInput w250'
          title='Телефон'
          onChange={value => props.changeBranchForm('phone', value)}
          value={props.branch.phone}
          disabled={props.branch.deleted}
          isPhone={true}
        />
        <Schedule />
        <ChooseIcon />
        <div className="lableImput mt15">Тип заказа по умолчанию</div>
        <ChooseOfList
          id={18}
          list={props.order_type}
          field="orders_type_id"
          setElement={props.changeBranchForm}
          current_id={props.branch.orders_type_id}
          width={'250px'}
          disabled={props.branch.deleted}
        />
        <LableInput
          className="w250 mt15"
          title="Шаблон номера заказа"
          onChange={(event) => props.changeBranchForm('orders_prefix', event.target.value)}
          value={props.branch.orders_prefix}
          checkedFlag="inputBranchPrefixChecked"
          checked={props.view.inputBranchPrefixChecked}
          redStar={ true }
          disabled={props.branch.deleted}
        />
        <p className="mt0">
          Пример:{' '}
          {`${props.branch.orders_prefix}-${
            props.counters.find((count) => count.id === 1).count
          }`}
        </p>
        <LableInput
          className="w250 mt15"
          title="Шаблон номера документов"
          onChange={(event) => props.changeBranchForm('documents_prefix', event.target.value)}
          value={props.branch.documents_prefix}
          checkedFlag="inputBranchPrefixDocChecked"
          checked={props.view.inputBranchPrefixDocChecked}
          redStar={ true }
          disabled={props.branch.deleted}
        />
        <p className="mt0">
          Пример:{' '}
          {`${props.branch.documents_prefix}-${
            props.counters.find((count) => count.id === 2).count
          }`}
        </p>
        <ChooseEmployees />

        <BottomButtons
          edit={props.branch.edit}
          create={handleCreateBranch}
          save={() => props.saveBranch()}
          recover={
            props.permissions.includes('setting_recover_branch')
              ? () => props.deleteBranch(false)
              : null
          }
          delete={() => props.deleteBranch(true)}
          close={() => props.setVisibleFlag('statusBranchEditor', false)}
          deleted={props.branch.deleted}
        />
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  branch: state.branch,
  view: state.view,
  order_type: state.data.order_type,
  counters: state.data.counters,
  permissions: state.data.user.role.permissions,
})

const mapDispatchToProps = {
  setVisibleFlag,
  changeBranchForm,
  createBranch,
  saveBranch,
  deleteBranch,
}

export default connect(mapStateToProps, mapDispatchToProps)(BranchEditor)
