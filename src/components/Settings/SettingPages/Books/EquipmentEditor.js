import React, { useEffect, useState, useRef } from 'react'
import { connect } from 'react-redux'

import { setVisibleFlag, chooseEquipmentBranches, createBookEquipment } from '../../../../Redux/actions'
import { changeBookForm, resetBookEquipment, seveEquipmentModel } from '../../../../Redux/actions/bookActions'
import { seveEquipmentType, seveEquipmentBrand, seveEquipmentSubtype  } from '../../../../Redux/actions/bookActions'
import { deleteEquipmentType, deleteEquipmentBrand, deleteEquipmentSubtype, deleteEquipmentModel } from '../../../../Redux/actions/bookActions'

import LableInput from '../../../general/LableInput'
import BottomButtons from '../../../general/BottomButtons'
import AddPicture from '../../../general/AddPicture'
import ChooseOfList from '../../../general/ChooseOfList'
import ChooseBotton from '../../../general/ChooseBotton'
import ChooseOfListMany from '../../../general/ChooseOfListMany'
import ChooseIcon from './CooseIcon'
import JoinEquipmets from './JoinEquipmets'

const EquipmentEditor = (props) => {

  const handleClose = () => {
    props.setVisibleFlag('statusEquipmentEditor', false)
    props.resetBookEquipment()
    props.setVisibleFlag('inputBookTitleChecked', true)
  }

  const clickHandel = (event) => {
    if (!event.path.map((el) => el.id).includes('equipmentEditorWiondow')) {
      handleClose()
    }
  }

  useEffect(() => {
    window.addEventListener('click', clickHandel)
    return () => {
      window.removeEventListener('click', clickHandel)
    }
  })

  const [all, setAll] = useState(props.branches
      .filter((branch) => !branch.deleted)
      .every((branch) => props.book.branches.includes(branch.id))
  )

  const handleCreateEquipment = () => {
    if (props.book.title) {
      props.createBookEquipment()
    } else {
      props.setVisibleFlag('inputBookTitleChecked', false)
    }
  }

  const handleSaveEquipment = () => {
    if (props.book.title) {

      if (props.book.type === 0) props.seveEquipmentType()
      if (props.book.type === 1) props.seveEquipmentBrand()
      if (props.book.type === 2) props.seveEquipmentSubtype()
      if (props.book.type === 3) props.seveEquipmentModel()

    } else {
      props.setVisibleFlag('inputBookTitleChecked', false)
    }
  }

  const handleDelete = () => {
    if (props.book.type === 0) props.deleteEquipmentType(true)
    if (props.book.type === 1) props.deleteEquipmentBrand(true)
    if (props.book.type === 2) props.deleteEquipmentSubtype(true)
    if (props.book.type === 3) props.deleteEquipmentModel(true)
  }

  const handleRecover = () => {
    if (props.permissions.includes('setting_recover_equipment')) {
      if (props.book.type === 0) props.deleteEquipmentType(false)
      if (props.book.type === 1) props.deleteEquipmentBrand(false)
      if (props.book.type === 2) props.deleteEquipmentSubtype(false)
      if (props.book.type === 3) props.deleteEquipmentModel(false)
    }
  }


  const tilte_list = [
    'Новая группа',
    'Новый бренд',
    'Новый модуль / серия',
    'Новая модель',
  ]

  return (
    <div className="rightBlock">
      <div className="rightBlockWindow" id="equipmentEditorWiondow">

        <div className="createNewTitle">
          {props.book.edit ? props.book.title : tilte_list[props.book.type]}
        </div>

        <div className="contentEditor">
          <LableInput
            className="w250 mt15"
            title="Наименование"
            onChange={(event) => props.changeBookForm(event.target.value, 'title')}
            value={props.book.title}
            checkedFlag="inputBookTitleChecked"
            checked={props.inputBookTitleChecked}
            redStar={ true }
            disabled={props.book.deleted}
          />
          {props.book.type === 2 ? (
            <AddPicture
              className="mt15"
              title="Добавить изображение"
              url={props.book.url}
              onChange={file => props.changeBookForm(file, 'img')}
              value={props.book.img}
              disabled={props.book.deleted}
            />
          ) : null}
          {props.book.type ? (
            <ChooseOfList
              id={20}
              className="mt15"
              title="Родительский элемент"
              list={props.book.choose_list}
              setElement={props.changeBookForm}
              field="parent_id"
              current_id={props.book.parent_id}
              width={'200px'}
              disabled={props.book.deleted}
            />
          ) : null}

          {props.book.type === 0 ? (
            <ChooseIcon disabled={props.book.deleted} />
          ) : null}

          <ChooseBotton
            className="mt15"
            title="Локация"
            name={['Все', 'Отдельные']}
            func1={() => setAll(true)}
            func2={() => setAll(false)}
            checked={props.branches
              .filter((branch) => !branch.deleted)
              .every((branch) => props.book.branches.includes(branch.id))}
            disabled={props.book.deleted}
          />

          {all ? null : (
            <ChooseOfListMany
              className="mt15"
              mainLable="Локации"
              list={props.branches.filter((branch) => !branch.deleted)}
              checked_list={props.book.branches}
              func={props.chooseEquipmentBranches}
              disabled={props.book.deleted}
            />
          )}
          <JoinEquipmets 
            unvisible={!props.book.edit || props.book.type === 3 || !props.permissions.includes('setting_join_equipment')}
          />
        </div>

        <BottomButtons
          edit={props.book.edit}
          create={ handleCreateEquipment }
          save={ handleSaveEquipment }
          delete={ handleDelete }
          recover={ handleRecover }
          close={ handleClose }
          deleted={ props.book.deleted }
        />
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  book: state.book,
  inputBookTitleChecked: state.view.inputBookTitleChecked,
  branches: state.data.branches,
  permissions: state.data.user.role.permissions,
})

const mapDispatchToProps = {
  setVisibleFlag,
  changeBookForm,
  chooseEquipmentBranches,
  createBookEquipment,
  seveEquipmentType, seveEquipmentBrand, seveEquipmentSubtype, seveEquipmentModel,
  deleteEquipmentType, deleteEquipmentBrand, deleteEquipmentSubtype, deleteEquipmentModel,
  resetBookEquipment
}

export default connect(mapStateToProps, mapDispatchToProps)(EquipmentEditor)
