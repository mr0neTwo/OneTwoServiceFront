import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'

import { changeGroupListFilter, changeGroupMainFilter, addEquipmentModel, setOrderEquipment, resetEquipment} from '../../../Redux/actions'
import { icon_close } from '../../../data/icons'

const SetOrderModel = (props) => {

  const [visibleList, setVisibleList] = useState(false)
  const [visibleBotton, setVisisbleBotton] = useState(false)
  const [title, setTitle] = useState('')

  const disabled = !Object.values(props.order.equipments[props.idx].subtype).length
  const seted = !!Object.values(props.order.equipments[props.idx].model).length


  const clickHandel = (event) => {
    if (
       !event.path.map(el => el.id).includes('listOrderOfModel') &&
       !event.path.map(el => el.id).includes('optionsOrderTextOfModel')
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
        id='optionsOrderTextOfModel'
        onClick={() => setVisibleList(true)}
        disabled={disabled || seted}
      > 
        <input 
        className={disabled ? 'optionsUnavaliable' : 'optionFilterInput'}
        onChange={event => setTitle(event.target.value)}
        placeholder='Выбирете модель'
        value={seted ? props.order.equipments[props.idx].model.title : title}
        disabled={disabled || seted}
        />
        {seted ?
        <svg 
          className="icon-close"  
          viewBox="0 0 22 22"
          onClick={() => props.resetEquipment(props.idx, 'model')}
        >
          <path d={icon_close}/>
        </svg> :
        <span>&#6662;</span> } 
      </button>
      {visibleList && !disabled ? <div className='listFilter' id='listOrderOfModel'>
        {props.equipment.find(group => group.id === props.order.equipments[props.idx].kindof_good.id).equipment_brand
        .find(brand => brand.id === props.order.equipments[props.idx].brand.id).equipment_subtype
        .find(subtype => subtype.id === props.order.equipments[props.idx].subtype.id).equipment_model
        .map(model => {
      
        return (
         model.title.toLowerCase().includes(title.toLowerCase()) ? 
          <div
          key={model.id} 
          className='rowGropList'
          onClick={() => {
            props.setOrderEquipment(props.idx, 'model', model)
            setVisibleList(false)
            setVisisbleBotton(false)
          }}
          >
            {model.title}
          </div> : null
        )})}
        <div className='btmsts'>
        {visibleBotton ? 
        <input 
          className='optionFilterInput'
          autoFocus
          onKeyPress={(event) => {
            if (event.key === 'Enter') { 
              props.addEquipmentModel(props.idx, event.target.value)
              setVisisbleBotton(false)
            } 
          }}
          placeholder = 'Введите и нажмиете Enter' 
        /> :
        <div 
          className='btnstsTitle'
          onClick={() => setVisisbleBotton(true)}
        >
          Добавить модель
        </div>}
        </div>

      </div> : null}
      </>
   )
}

const mapStateToProps = state => ({
  equipment: state.data.equipment,
  order: state.order
})

const mapDispatchToProps = {
  changeGroupListFilter,
  changeGroupMainFilter,
  addEquipmentModel,
  setOrderEquipment,
  resetEquipment
}
  
 export default connect(mapStateToProps, mapDispatchToProps)(SetOrderModel)