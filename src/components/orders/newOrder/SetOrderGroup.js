import React, { useEffect, useState, useMemo } from 'react'
import { connect } from 'react-redux'

import { setOrderEquipment, resetEquipment, setVisibleListFlag, changeOrderFormS} from '../../../Redux/actions'
import { createEquipmentType, addEquipmentType, changeBookForm } from '../../../Redux/actions/bookActions'
import { icon_close } from '../../../data/icons'

const SetOrderGroupe = (props) => {

  const [visibleList, setVisibleList] = useState(false)
  const [visibleBotton, setVisisbleBotton] = useState(false)

  useEffect(() => {
    props.addEquipmentType()
  }, [props.book.filter_type])

  const edit = props.order.edit
  // const types = edit ? props.order.kindof_good : props.order.equipments[props.idx].kindof_good
  const types = useMemo(() => edit ? props.order.kindof_good : props.order.equipments[props.idx].kindof_good, [props.order.kindof_good, props.order.equipments[props.idx].kindof_good])
  const seted = !!Object.values(types).length 

  const clickHandel = (event) => {
    if (
       !event.path.map(el => el.id).includes('listOrderOfGroup') &&
       !event.path.map(el => el.id).includes('optionsOrderTextOfGroup')
       ) {
       if (visibleList) {
        setVisibleList(false)
        setVisisbleBotton(false)
    }}
  }
 
  useEffect(() => {
    window.addEventListener('click', clickHandel)
    return () => {
      window.removeEventListener('click', clickHandel)
    }
  })

  const reset = () => {
    if (edit) {
      props.changeOrderFormS( {}, 'kindof_good' )
      props.changeOrderFormS( {}, 'brand' )
      props.changeOrderFormS( {}, 'subtype' )
      props.changeOrderFormS( {}, 'model' ) 
    } else {
      props.resetEquipment(props.idx, 'kindof_good')
      props.resetEquipment(props.idx, 'brand')
      props.resetEquipment(props.idx, 'subtype')
      props.resetEquipment(props.idx, 'model')
    }
    props.changeBookForm({}, 'equipment_type')
  }


  const setOrderType = (idx, equipment) => {
    edit ? props.changeOrderFormS( equipment, 'kindof_good' ) : props.setOrderEquipment(idx, 'kindof_good', equipment)
    props.changeBookForm(equipment, 'equipment_type')
    setVisibleList(false)
    setVisisbleBotton(false)
    props.changeBookForm('', 'filter_type')
  }

   return (
    <>
    
      <button 
        className={false ? 'optionsEquipmentChoosed' : 'optionsFilterText'}
        id='optionsOrderTextOfGroup'
        onClick={() => setVisibleList(true)}
        disabled={seted}
        style={!props.view.checkedOrderKindofGood[props.idx] ? {borderColor: 'red'} : null}
      > 
        <input 
          className={false ? 'optionEquipmentInputChoosed' : 'optionFilterInput'}
          onChange={event => props.changeBookForm(event.target.value, 'filter_type')}
          placeholder='Выбирете группу'
          value={seted ? types.title : props.book.filter_type}
          disabled={seted}
        />
        {seted ?
        <svg 
          className="icon-close"  
          viewBox="0 0 22 22"
          onClick={ reset }
        >
          <path d={icon_close}/>
        </svg> :
        <span>&#6662;</span> }
      </button>
      {!props.view.checkedOrderKindofGood[props.idx] ? <div className='errorMassageInput'>{'Необоходимо выбрать из списка'}</div> : null}
      {visibleList ? <div className='listFilter' id='listOrderOfGroup'>
        {props.equipment_types.map(equipment => {
      
        return (
          <div
            key={equipment.id} 
            className='rowGropList'
            onClick={() => setOrderType(props.idx, equipment) }
          >
            {equipment.title}
          </div> 
        )})}
        <div className='btmsts'>
        {visibleBotton ? 
        <input 
          className='optionFilterInput'
          autoFocus
          onKeyPress={(event) => {
            if (event.key === 'Enter') { 
              props.createEquipmentType(event.target.value)
              props.changeBookForm(event.target.value, 'filter_type')
              // props.addEquipmentType()
              setVisisbleBotton(false)
              
            } 
          }}
          placeholder = 'Введите и нажмиете Enter' 
        /> :
        <div 
          className='btnstsTitle'
          onClick={() => setVisisbleBotton(true)}
        >
          Добавить тип
        </div>}
        </div>

      </div> : null}
      </>
   )
}

const mapStateToProps = state => ({
  equipment_types: state.data.equipment_types,
  order: state.order,
  view: state.view,
  book: state.book
})

const mapDispatchToProps = {
  createEquipmentType,
  setOrderEquipment,
  resetEquipment,
  setVisibleListFlag,
  changeOrderFormS,
  addEquipmentType,
  changeBookForm
}
  
 export default connect(mapStateToProps, mapDispatchToProps)(SetOrderGroupe)