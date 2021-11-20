
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'

import { changeGroupListFilter, changeGroupMainFilter, addEquipmentSubtype, setOrderEquipment, resetEquipment, setVisibleListFlag} from '../../../Redux/actions'
import { icon_close } from '../../../data/icons'

const SetOrderSubtype = (props) => {

  const [visibleList, setVisibleList] = useState(false)
  const [visibleBotton, setVisisbleBotton] = useState(false)
  const [title, setTitle] = useState('')

  const disabled = !Object.values(props.order.equipments[props.idx].brand).length
  const seted = !!Object.values(props.order.equipments[props.idx].subtype).length

  const clickHandel = (event) => {
    if (
       !event.path.map(el => el.id).includes('listOrderOfSubtype') &&
       !event.path.map(el => el.id).includes('optionsOrderTextOfSubtype')
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
        className={disabled ? 'optionsUnavaliable' : 'optionsFilterText'}
        id='optionsOrderTextOfSubtype'
        onClick={() => setVisibleList(true)}
        disabled={disabled || seted}
        style={!props.view.checkedOrderSubtype[props.idx] ? {borderColor: 'red'} : null}
      > 
        <input 
        className={disabled ? 'optionsUnavaliable' : 'optionFilterInput'}
        onChange={event => setTitle(event.target.value)}
        placeholder='Выбирете модуль / серию'
        value={seted ? props.order.equipments[props.idx].subtype.title : title}
        disabled={disabled || seted}
        />
        {seted ?
        <svg 
          className="icon-close"  
          viewBox="0 0 22 22"
          onClick={() => {
             props.resetEquipment(props.idx, 'subtype')
             props.resetEquipment(props.idx, 'model')
            }}
        >
          <path d={icon_close}/>
        </svg> :
        <span>&#6662;</span> }
      </button>
      {!props.view.checkedOrderSubtype[props.idx] ? <div className='errorMassageInput'>{'Необоходимо выбрать из списка'}</div> : null}
      {visibleList && !disabled  ? <div className='listFilter' id='listOrderOfSubtype'>
        {props.equipment.find(group => group.id === props.order.equipments[props.idx].kindof_good.id).equipment_brand
        .find(brand => brand.id === props.order.equipments[props.idx].brand.id).equipment_subtype
        .map(subtype => {
      
        return (
          subtype.title.toLowerCase().includes(title.toLowerCase()) ? 
          <div
          key={subtype.id} 
          className='rowGropList'
          onClick={() => {
            props.setOrderEquipment(props.idx, 'subtype', subtype)
            setVisibleList(false)
            setVisisbleBotton(false)
            props.setVisibleListFlag('checkedOrderSubtype', props.idx, true)
          }}
          >
            {subtype.title}
          </div> : null
        )})}
        <div className='btmsts'>
        {visibleBotton ? 
        <input 
          className='optionFilterInput'
          autoFocus
          onKeyPress={(event) => {
            if (event.key === 'Enter') { 
              props.addEquipmentSubtype(props.idx, event.target.value)
              setVisisbleBotton(false)
            } 
          }}
          placeholder = 'Введите и нажмиете Enter' 
        /> :
        <div 
          className='btnstsTitle'
          onClick={() => setVisisbleBotton(true)}
        >
          Добавить модуль / серию
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
  addEquipmentSubtype,
  setOrderEquipment,
  resetEquipment,
  setVisibleListFlag
}
  
 export default connect(mapStateToProps, mapDispatchToProps)(SetOrderSubtype)