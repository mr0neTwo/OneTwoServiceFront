import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { changeBrandListFilter, changeBrandMainFilter } from '../../../Redux/actions'

const SetBrand = (props) => {

  const clickHandel = (event) => {
    if (
       !event.path.map(el => el.id).includes('listFilterOfBrand') &&
       !event.path.map(el => el.id).includes('optionsFilterTextOfBrand')
       ) {
       if (props.brandListFilter) {
        props.changeBrandListFilter()
    }}
  }
 
  useEffect(() => {
    window.addEventListener('click', clickHandel)
    return () => {
      window.removeEventListener('click', clickHandel)
    }
  })

  const listOfBrand = (tempFilter, equipment) => {

    if (equipment.map(equipment => equipment.title).includes(tempFilter.kindof_good)) {
      
      return (
        equipment.find(equipment => equipment.title === tempFilter.kindof_good).equipment_brand.map(brand => {

       return (
        brand.title.toLowerCase().includes(props.tempFilter.brand.toLowerCase()) ? 
        <div key={brand.id}
        className='rowGropList'
        onClick={() => {
          props.changeBrandMainFilter(brand.title)
          props.changeBrandListFilter()
        }}
        >
          {brand.title}
        </div> : null
      )})
      
    )
  } else {
    let list_brand = []
    props.equipment.forEach(equip => {
      list_brand = list_brand.concat(equip.equipment_brand)
    } )
    list_brand = list_brand.map(brand => brand.title)
    list_brand = [...new Set(list_brand)]  

    return (
      list_brand.map((brand, idx) => {
          return (
            brand.toLowerCase().includes(props.tempFilter.brand.toLowerCase()) ? 
        <div 
        key={idx}
        className='rowGropList'
        onClick={() => {
          props.changeBrandMainFilter(brand)
          props.changeBrandListFilter()
        }}
        >
          {brand}
        </div> : null
          )}))}}

   return (
    <>
    <div className='optionsFilterTitle'>Бренд</div>
    <div 
    className='optionsFilterText'
    id='optionsFilterTextOfBrand'
    onClick={() => props.changeBrandListFilter()}
    > 
      <input 
      className='optionFilterInput'
      onChange={event => props.changeBrandMainFilter(event.target.value)}
      placeholder='Выбирете бренд'
      value={props.tempFilter.brand}
      />
      <span>&#6662;</span> 
    </div>
    {props.brandListFilter ? <div className='listFilter' id='listFilterOfBrand'>
      {listOfBrand(props.tempFilter, props.equipment)}
    </div> : null}
    </>
   )
}

const mapStateToProps = state => ({
  brandListFilter: state.view.brandListFilter,
  equipment: state.data.equipment,
  tempFilter: state.filter.tempFilter
})

const mapDispatchToProps = {
  changeBrandListFilter,
  changeBrandMainFilter,
}
  
 export default connect(mapStateToProps, mapDispatchToProps)(SetBrand)