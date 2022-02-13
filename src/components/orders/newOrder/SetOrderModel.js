import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'

import { setOrderEquipment, resetEquipment, changeOrderFormS } from '../../../Redux/actions'
import { createEquipmentModel, addEquipmentModel, changeBookForm } from '../../../Redux/actions/bookActions'
import { icon_close } from '../../../data/icons'

const SetOrderModel = (props) => {

  const [visibleList, setVisibleList] = useState(false)
  const [visibleBotton, setVisisbleBotton] = useState(false)

  useEffect(() => {
    if (Object.values(props.book.equipment_subtype).length) props.addEquipmentModel()
  }, [props.book.equipment_subtype, props.book.filter_model])

  const edit = props.order.edit

  const model = edit ? props.order.model: props.order.equipments[props.idx].model
  const disabled = !Object.values(props.book.equipment_subtype).length
  const seted = !!Object.values(model).length

  const clickHandel = (event) => {
    if (
      !event.path.map((el) => el.id).includes('listOrderOfModel') &&
      !event.path.map((el) => el.id).includes('optionsOrderTextOfModel')
    ) {
      if (visibleList) {
        setVisibleList(false)
        setVisisbleBotton(false)
      }
    }
  }

  useEffect(() => {
    window.addEventListener('click', clickHandel)
    return () => {
      window.removeEventListener('click', clickHandel)
    }
  })

  const setModel = (idx, model) => {
    edit ? props.changeOrderFormS(model, 'model') : props.setOrderEquipment(idx, 'model', model)
    props.changeBookForm(model, 'equipment_model')
    setVisibleList(false)
    setVisisbleBotton(false)
    props.changeBookForm('', 'filter_model')
  }

  const reset = () => {
    edit ? props.changeOrderFormS({}, 'model') : props.resetEquipment(props.idx, 'model')
    props.changeBookForm({}, 'equipment_model')
  }

  return (
    <>
      <button
        className={disabled ? 'optionsUnavaliable' : 'optionsFilterText'}
        id="optionsOrderTextOfModel"
        onClick={() => setVisibleList(true)}
        disabled={disabled || seted}
      >
        <input
          className={disabled ? 'optionsUnavaliable' : 'optionFilterInput'}
          onChange={ event => props.changeBookForm(event.target.value, 'filter_model')}
          placeholder="Выбирете модель"
          value={seted ? model.title : props.book.filter_model}
          disabled={disabled || seted}
        />
        {seted && props.permissions.includes('edit_info_orders') ? (
          <svg
            className="icon-close"
            viewBox="0 0 22 22"
            onClick={ reset }
          >
            <path d={icon_close} />
          </svg>
        ) : (
          <span>&#6662;</span>
        )}
      </button>
      {visibleList && !disabled ? (
        <div className="listFilter" id="listOrderOfModel">
          {props.equipment_models.map((model) => {
              return (
                <div
                  key={model.id}
                  className="rowGropList"
                  onClick={() => setModel(props.idx, model) }
                >
                  {model.title}
                </div>
              ) 
            })}
          <div className="btmsts">
            {visibleBotton ? (
              <input
                className="optionFilterInput"
                autoFocus
                onKeyPress={(event) => {
                  if (event.key === 'Enter') {
                    props.createEquipmentModel(props.idx, event.target.value)
                    props.changeBookForm(event.target.value, 'filter_model')
                    // props.addEquipmentModel()
                    setVisisbleBotton(false)
                  }
                }}
                placeholder="Введите и нажмиете Enter"
              />
            ) : (
              <div
                className="btnstsTitle"
                onClick={() => setVisisbleBotton(true)}
              >
                Добавить модель
              </div>
            )}
          </div>
        </div>
      ) : null}
    </>
  )
}

const mapStateToProps = (state) => ({
  equipment_models: state.data.equipment_models,
  order: state.order,
  book: state.book,
  permissions: state.data.user.role.permissions
})

const mapDispatchToProps = {
  createEquipmentModel,
  setOrderEquipment,
  resetEquipment,
  changeOrderFormS,
  addEquipmentModel,
  changeBookForm
}

export default connect(mapStateToProps, mapDispatchToProps)(SetOrderModel)
