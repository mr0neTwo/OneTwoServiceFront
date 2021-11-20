import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'

import { 
  changeGroupListFilter, 
  changeGroupMainFilter, 
  addEquipmentBrand, 
  setOrderEquipment, 
  resetEquipment, 
  setVisibleListFlag 
} from '../../../Redux/actions'
import { icon_close } from '../../../data/icons'


const SetOrderBrand = (props) => {

  const [visibleList, setVisibleList] = useState(false)
  const [visibleBotton, setVisisbleBotton] = useState(false)
  const [title, setTitle] = useState('')

  const disabled = !Object.values(props.order.equipments[props.idx].kindof_good).length
  const seted = !!Object.values(props.order.equipments[props.idx].brand).length 

  const clickHandel = (event) => {
    if (
       !event.path.map(el => el.id).includes('listOrderOfBrand') &&
       !event.path.map(el => el.id).includes('optionsOrderTextOfBrand')
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
        id='optionsOrderTextOfBrand'
        onClick={() => setVisibleList(true)}
        disabled={disabled || seted}
        style={!props.view.checkedOrderBrand[props.idx] ? {borderColor: 'red'} : null}
      > 
        <input 
        className={disabled ? 'optionsUnavaliable' : 'optionFilterInput'}
        onChange={event => setTitle(event.target.value)}
        placeholder='Выбирете бренд'
        value={seted ? props.order.equipments[props.idx].brand.title : title}
        disabled={disabled || seted}
        // onBlur={() => props.setVisibleListFlag('checkedOrderBrand', props.idx, !!Object.values(props.order.equipments[props.idx].brand).length)}
        />
        {seted ?
        <svg 
          className="icon-close"  
          viewBox="0 0 22 22"
          onClick={() => {
             props.resetEquipment(props.idx, 'brand')
             props.resetEquipment(props.idx, 'subtype')
             props.resetEquipment(props.idx, 'model')
            }}
        >
          <path d={icon_close}/>
        </svg> :
        <span>&#6662;</span> }
      </button>
      {!props.view.checkedOrderBrand[props.idx] ? <div className='errorMassageInput'>{'Необоходимо выбрать из списка'}</div> : null}
      {visibleList && !disabled ?  <div className='listFilter' id='listOrderOfBrand'>
        {props.equipment.find(group => group.id === props.order.equipments[props.idx].kindof_good.id).equipment_brand.map(brand => {
        return (
          brand.title.toLowerCase().includes(title.toLowerCase()) ? 
          <div
          key={brand.id} 
          className='rowGropList'
          onClick={() => {
            props.setOrderEquipment(props.idx, 'brand', brand)
            setVisibleList(false)
            setVisisbleBotton(false)
            props.setVisibleListFlag('checkedOrderBrand', props.idx, true)
          }}
          >
            {brand.title}
          </div> : null
        )})}
        <div className='btmsts'>
        {visibleBotton ? 
        <input 
          className='optionFilterInput'
          autoFocus
          onKeyPress={(event) => {
            if (event.key === 'Enter') { 
              props.addEquipmentBrand(props.idx, event.target.value)
              setVisisbleBotton(false)
            } 
          }}
          placeholder = 'Введите и нажмиете Enter' 
        /> :
        <div 
          className='btnstsTitle'
          onClick={() => setVisisbleBotton(true)}
        >
          Добавить бренд
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
  addEquipmentBrand,
  setOrderEquipment,
  resetEquipment,
  setVisibleListFlag
}
  
 export default connect(mapStateToProps, mapDispatchToProps)(SetOrderBrand)