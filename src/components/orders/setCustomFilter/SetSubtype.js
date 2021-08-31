import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { changeSubtypeListFilter, changeSubtypeMainFilter } from '../../../Redux/actions'

const SetSubtype = (props) => {

  const clickHandel = (event) => {
    if (
       !event.path.map(el => el.id).includes('listFilterOfSubtype') &&
       !event.path.map(el => el.id).includes('optionsFilterTextOfSubtype')
       ) {
       if (props.subtypeListFilter) {
        props.changeSubtypeListFilter()
    }}
  }
 
  useEffect(() => {
    window.addEventListener('click', clickHandel)
    return () => {
      window.removeEventListener('click', clickHandel)
    }
  })

  const listOfSubtype = (tempFilter, equipment) => {
  
    if (
      equipment.map(equipment => equipment.title).includes(tempFilter.kindof_good) && 
      equipment.find(equip => equip.title == tempFilter.kindof_good).equipment_brand.map(brand => brand.title).includes(tempFilter.brand)
    ) {
      
      return (
        equipment.find(equipment => equipment.title === tempFilter.kindof_good)
        .equipment_brand.find(brand => brand.title == tempFilter.brand).equipment_subtype.map(subtype => {

       return (
        subtype.title.toLowerCase().includes(props.tempFilter.subtype.toLowerCase()) ? 
        <div 
        key={subtype.id}
        className='rowGropList'
        onClick={() => {
          props.changeSubtypeMainFilter(subtype.title)
          props.changeSubtypeListFilter()
        }}
        >
          {subtype.title}
        </div> : null
      )})
      
    )
  } else {
    let list_subtype = []
    props.equipment.forEach(equip => {
      equip.equipment_brand.forEach(brand => {
        list_subtype = list_subtype.concat(brand.equipment_subtype)
      })
    })
    list_subtype = list_subtype.map(subtype => subtype.title)
    list_subtype = [...new Set(list_subtype)]  

    return (
      list_subtype.map((subtype, idx) => {
          return (
            subtype.toLowerCase().includes(props.tempFilter.subtype.toLowerCase()) ? 
        <div
        key={idx} 
        className='rowGropList'
        onClick={() => {
          props.changeSubtypeMainFilter(subtype)
          props.changeSubtypeListFilter()
        }}
        >
          {subtype}
        </div> : null
          )}))}}

   return (
    <>
    <div className='optionsFilterTitle'>Модуль</div>
    <div 
    className='optionsFilterText'
    id='optionsFilterTextOfSubtype'
    onClick={() => props.changeSubtypeListFilter()}
    > 
      <input 
      className='optionFilterInput'
      onChange={event => props.changeSubtypeMainFilter(event.target.value)}
      placeholder='Выбирете тип модуля'
      value={props.tempFilter.subtype}
      />
      <span>&#6662;</span> 
    </div>
    {props.subtypeListFilter ? <div className='listFilter' id='listFilterOfSubtype'>
      {listOfSubtype(props.tempFilter, props.equipment)}
    </div> : null}
    </>
   )
}

const mapStateToProps = state => ({
  subtypeListFilter: state.view.subtypeListFilter,
  equipment: state.data.equipment,
  tempFilter: state.filter.tempFilter
})

const mapDispatchToProps = {
  changeSubtypeListFilter,
  changeSubtypeMainFilter
}
  
 export default connect(mapStateToProps, mapDispatchToProps)(SetSubtype)