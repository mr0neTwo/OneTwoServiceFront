
import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { setVisibleFlag, addCounters, changeBranchForm } from '../../../../Redux/actions'
import Checkbox from '../../../general/Checkbox'
import BranchEditor from './BranchEditor'
import TableBranches from './TableBranches'

const SettingBranches = (props) => {

  useEffect(() => {
    props.addCounters()
  }, [])

  return (
    <div className='settingContent'>

        <div className='Header'>
          <span className='headerTitle'>Локации</span>
        </div>

        <div className='settingPageBody'>
        <p>Таблица показывает все локации компании. Каждой локации можно присвоить уникальный код и цвет.</p>
        <div className='row'>
          <div 
          className='greenButton'
          onClick={() => props.setVisibleFlag('statusBranchEditor', true)}
          > 
            + Добавить локацию
          </div>
          {props.permissions.includes('setting_see_branch') ? <Checkbox
            className='ml10'
            label='Показать удаленные'
            onChange={event => props.changeBranchForm('showDeleted', event.target.checked)}
            checked={props.showDeleted}
          /> : null}
        </div>

        <TableBranches/>

        {props.statusBranchEditor ? <BranchEditor/> : null}
        </div>
      </div>
  )
}

const mapStateToProps = state => ({
  statusBranchEditor: state.view.statusBranchEditor,
  showDeleted: state.branch.showDeleted,
  permissions: state.data.user.role.permissions
})

const mapDispatchToProps = {
  setVisibleFlag,
  addCounters,
  changeBranchForm
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingBranches)