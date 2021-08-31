import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { changeGroupListFilter, changeGroupMainFilter } from '../../../Redux/actions'

const SetGroupe = (props) => {

  const clickHandel = (event) => {
    if (
       !event.path.map(el => el.id).includes('listFilterOfGroup') &&
       !event.path.map(el => el.id).includes('optionsFilterTextOfGroup')
       ) {
       if (props.groupListFilter) {
        props.changeGroupListFilter()
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
    <div className='optionsFilterTitle'>Группа</div>
    <div 
    className='optionsFilterText'
    id='optionsFilterTextOfGroup'
    onClick={() => props.changeGroupListFilter()}
    > 
      <input 
      className='optionFilterInput'
      onChange={event => props.changeGroupMainFilter(event.target.value)}
      placeholder='Выбирете группу'
      value={props.tempFilter.kindof_good}
      />
      <span>&#6662;</span> 
    </div>
    {props.groupListFilter ? <div className='listFilter' id='listFilterOfGroup'>
      {props.equipment.map(equipment => {
        // console.log()
       return (
        equipment.title.toLowerCase().includes(props.tempFilter.kindof_good.toLowerCase()) ? 
        <div
        key={equipment.id} 
        className='rowGropList'
        onClick={() => {
          props.changeGroupMainFilter(equipment.title)
          props.changeGroupListFilter()
        }}
        >
          {equipment.title}
        </div> : null
      )})}

    </div> : null}
    </>
   )
}

const mapStateToProps = state => ({
  groupListFilter: state.view.groupListFilter,
  equipment: state.data.equipment,
  tempFilter: state.filter.tempFilter
})

const mapDispatchToProps = {
  changeGroupListFilter,
  changeGroupMainFilter
}
  
 export default connect(mapStateToProps, mapDispatchToProps)(SetGroupe)