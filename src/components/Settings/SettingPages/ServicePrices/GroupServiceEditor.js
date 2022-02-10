
import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { 
   setVisibleFlag, 
   changeDictServiceForm, 
   resetGruopDictService, 
   createGroupDictService,
   saveGroupDictService,
   deleteGroupDictService 
} from '../../../../Redux/actions'

import LableInput from '../../../general/LableInput'
import BottomButtons from '../../../general/BottomButtons'

const GroupServiceEditor = (props) => {
  const clickHandel = (event) => {
    if (!event.path.map((el) => el.id).includes('groupServiceEditorWiondow')) {
      props.setVisibleFlag('statusGroupServiceEditor', false)
    }
  }

  useEffect(() => {
    window.addEventListener('click', clickHandel)
    return () => {
      window.removeEventListener('click', clickHandel)
    }
  })

  const handleCreate = () => {
    if (props.dictService.group_title) {
      props.createGroupDictService()
    } else {
      props.setVisibleFlag('inputDictServiceChecked', false)
    }
  }

  const handleSave = () => {
   if (props.dictService.group_title) {
     props.saveGroupDictService()
   } else {
     props.setVisibleFlag('inputDictServiceChecked', false)
   }
 }

  const handleClose = () => {
   props.setVisibleFlag('statusGroupServiceEditor', false)
   props.resetGruopDictService()
  }

  return (
    <div className='rightBlock'>
      <div className='rightBlockWindow' id='groupServiceEditorWiondow'>
        <div className='createNewTitle'>{props.dictService.group_edit ? props.dictService.group_title : 'Новая категория'}</div>

        <div className='contentEditor'>
          <LableInput
            className='w250 mt15'
            title='Наименование'
            onChange={(event) => props.changeDictServiceForm(event.target.value, 'group_title')}
            value={props.dictService.group_title}
            checkedFlag='inputDictServiceChecked'
            checked={props.inputDictServiceChecked}
            redStar={ true }
            disabled={props.dictService.group_deleted}
          />

         </div>
        

         <BottomButtons
            edit={props.dictService.group_edit}
            deleted={props.dictService.group_deleted}
            create={handleCreate}
            save={handleSave}
            delete={props.permissions.includes('setting_delete_service') ?  () => props.deleteGroupDictService(true) : null}
            recover={props.permissions.includes('setting_recover_service') ?  () => props.deleteGroupDictService(false) : null}
            close={handleClose}
         />
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
   dictService: state.dictService,
   inputDictServiceChecked: state.view.inputDictServiceChecked,
   permissions: state.data.user.role.permissions
})

const mapDispatchToProps = {
   changeDictServiceForm,
   resetGruopDictService,
   createGroupDictService,
   setVisibleFlag,
   saveGroupDictService,
   deleteGroupDictService
}

export default connect(mapStateToProps, mapDispatchToProps)(GroupServiceEditor)
