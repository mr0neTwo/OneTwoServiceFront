import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'

import { changeGroupListFilter, changeGroupMainFilter, addEquipmentType, setOrderEquipment, resetEquipment, setVisibleListFlag} from '../../../Redux/actions'
import { icon_close } from '../../../data/icons'

const SetOrderGroupe = (props) => {

  const [visibleList, setVisibleList] = useState(false)
  const [visibleBotton, setVisisbleBotton] = useState(false)
  const [title, setTitle] = useState('')

  const seted = !!Object.values(props.order.equipments[props.idx].kindof_good).length 

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
          onChange={event => setTitle(event.target.value)}
          placeholder='Выбирете группу'
          value={seted ? props.order.equipments[props.idx].kindof_good.title : title}
          disabled={seted}
          // onBlur={() => props.setVisibleListFlag('checkedOrderKindofGood', props.idx, !!Object.values(props.order.equipments[props.idx].kindof_good).length)}
        />
        {seted ?
        <svg 
          className="icon-close"  
          viewBox="0 0 22 22"
          onClick={() => {
            props.resetEquipment(props.idx, 'kindof_good')
            props.resetEquipment(props.idx, 'brand')
            props.resetEquipment(props.idx, 'subtype')
            props.resetEquipment(props.idx, 'model')
          }}
        >
          <path d={icon_close}/>
        </svg> :
        <span>&#6662;</span> }
      </button>
      {!props.view.checkedOrderKindofGood[props.idx] ? <div className='errorMassageInput'>{'Необоходимо выбрать из списка'}</div> : null}
      {visibleList ? <div className='listFilter' id='listOrderOfGroup'>
        {props.equipment.map(equipment => {
      
        return (
          equipment.title.toLowerCase().includes(title.toLowerCase()) ? 
          <div
          key={equipment.id} 
          className='rowGropList'
          onClick={() => {
            props.setOrderEquipment(props.idx, 'kindof_good', equipment)
            props.setVisibleListFlag('checkedOrderKindofGood', props.idx, true)
            setVisibleList(false)
            setVisisbleBotton(false)
            setTitle('')
          }}
          >
            {equipment.title}
          </div> : null
        )})}
        <div className='btmsts'>
        {visibleBotton ? 
        <input 
          className='optionFilterInput'
          autoFocus
          onKeyPress={(event) => {
            if (event.key === 'Enter') { 
              props.addEquipmentType(event.target.value)
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
  equipment: state.data.equipment,
  order: state.order,
  view: state.view
})

const mapDispatchToProps = {
  changeGroupListFilter,
  changeGroupMainFilter,
  addEquipmentType,
  setOrderEquipment,
  resetEquipment,
  setVisibleListFlag
}
  
 export default connect(mapStateToProps, mapDispatchToProps)(SetOrderGroupe)