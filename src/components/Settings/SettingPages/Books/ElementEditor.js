import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { setVisibleFlag, createBookElement } from '../../../../Redux/actions'
import { changeBookForm } from '../../../../Redux/actions/bookActions'

import LableInput from '../../../general/LableInput'
import BottomButtons from '../../../general/BottomButtons'
import ChooseOfList from '../../../general/ChooseOfList'

const ElementEditor = (props) => {
  const clickHandel = (event) => {
    if (!event.composedPath().map((el) => el.id).includes('elementEditorWiondow')) {
      props.setVisibleFlag('statusElementEditor', false)
    }
  }

  useEffect(() => {
    window.addEventListener('click', clickHandel)
    return () => {
      window.removeEventListener('click', clickHandel)
    }
  })

  const handleCreateEquipment = () => {
    if (props.book.title) {
      props.createBookElement()
      props.setVisibleFlag('statusElementEditor', false)
    } else {
      props.setVisibleFlag('inputBookTitleChecked', false)
    }
  }

  return (
    <div className="rightBlock">
      <div className="rightBlockWindow" id="elementEditorWiondow">
        <div className="createNewTitle">Новый элемент</div>

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

        {props.book.type === 2 ?
          <ChooseOfList
            id='21'
            className='mt15'
            width='250px'
            title='Направление'
            list={[{id:1, title: 'Расход'}, {id:2, title: 'Приход'}]}
            current_id={props.book.direction}
            setElement={props.changeBookForm}
            field='direction'
            // disabled={}
          /> : null}
        </div>
        

        <BottomButtons
          create={handleCreateEquipment}
          close={() => props.setVisibleFlag('statusElementEditor', false)}
        />
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  book: state.book,
  inputBookTitleChecked: state.view.inputBookTitleChecked,
})

const mapDispatchToProps = {
  setVisibleFlag,
  changeBookForm,
  createBookElement,
}

export default connect(mapStateToProps, mapDispatchToProps)(ElementEditor)
