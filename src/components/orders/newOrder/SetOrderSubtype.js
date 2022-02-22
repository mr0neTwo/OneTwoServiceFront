import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'

import { setOrderEquipment, resetEquipment, setVisibleListFlag, changeOrderFormS } from '../../../Redux/actions'
import { cteateEquipmentSubtype, changeBookForm, addEquipmentSubtype } from '../../../Redux/actions/bookActions'
import { icon_close } from '../../../data/icons'

const SetOrderSubtype = (props) => {
  const [visibleList, setVisibleList] = useState(false)
  const [visibleBotton, setVisisbleBotton] = useState(false)

  useEffect(() => {
    if (Object.values(props.book.equipment_brand).length) props.addEquipmentSubtype()
  }, [props.book.equipment_brand, props.book.filter_subtype])

  const edit = props.order.edit
  const subtype = edit ? props.order.subtype : props.order.equipments[props.idx].subtype
  const disabled = !Object.values(props.book.equipment_brand).length
  const seted = !!Object.values(subtype).length

  const clickHandel = (event) => {
    if (
      !event.path.map((el) => el.id).includes('listOrderOfSubtype') &&
      !event.path.map((el) => el.id).includes('optionsOrderTextOfSubtype')
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

  const reset = () => {
    if (edit) {
      props.changeOrderFormS({}, 'subtype')
      props.changeOrderFormS({}, 'model')
    } else {
      props.resetEquipment(props.idx, 'subtype')
      props.resetEquipment(props.idx, 'model')
    }
    props.changeBookForm({}, 'equipment_subtype')

  }

  const setSubtype = (idx, subtype) => {
    edit ? props.changeOrderFormS(subtype, 'subtype') :props.setOrderEquipment(idx, 'subtype', subtype)
    props.changeBookForm(subtype, 'equipment_subtype')
    setVisibleList(false)
    setVisisbleBotton(false)
    props.setVisibleListFlag('checkedOrderSubtype', props.idx, true)
    props.changeBookForm('', 'filter_subtype')
  }

  return (
    <>
      <button
        className={disabled ? 'optionsUnavaliable' : 'optionsFilterText'}
        id="optionsOrderTextOfSubtype"
        onClick={() => setVisibleList(true)}
        disabled={disabled || seted}
        style={ !props.view.checkedOrderSubtype[props.idx] ? { borderColor: 'red' } : null}
      >
        <input
          className={disabled ? 'optionsUnavaliable' : 'optionFilterInput'}
          onChange={event => props.changeBookForm(event.target.value, 'filter_subtype')}
          placeholder="Выбирете модуль / серию"
          value={seted ? subtype.title : props.book.filter_subtype}
          disabled={disabled || seted}
        />
        {seted && props.permissions.includes('edit_info_orders') ? 
          <svg className="icon-close" viewBox="0 0 22 22" onClick={reset}>
            <path d={icon_close} />
          </svg> : <span>&#6662;</span>
        }
      </button>
      {!props.view.checkedOrderSubtype[props.idx] ?  <div className="errorMassageInput">{'Необоходимо выбрать из списка'}</div> : null}
      {visibleList && !disabled ? (
        <div className="listFilter" id="listOrderOfSubtype">
          {props.book.equipment_subtypes.map((subtype) => {
              return (
                <div
                  key={subtype.id}
                  className="rowGropList"
                  onClick={() => setSubtype(props.idx, subtype)}
                >
                  {subtype.title}
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
                    props.cteateEquipmentSubtype(props.idx, event.target.value)
                    props.changeBookForm(event.target.value, 'filter_subtype')
                    // props.addEquipmentSubtype()
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
                Добавить модуль / серию
              </div>
            )}
          </div>
        </div>
      ) : null}
    </>
  )
}

const mapStateToProps = state => ({
  order: state.order,
  view: state.view,
  book: state.book,
  permissions: state.data.user.role.permissions
})

const mapDispatchToProps = {
  cteateEquipmentSubtype,
  setOrderEquipment,
  resetEquipment,
  setVisibleListFlag,
  changeOrderFormS,
  changeBookForm,
  addEquipmentSubtype
}

export default connect(mapStateToProps, mapDispatchToProps)(SetOrderSubtype)
