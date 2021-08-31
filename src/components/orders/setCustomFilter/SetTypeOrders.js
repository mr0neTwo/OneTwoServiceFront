import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { changeTypeListFilter, changeCheckType, setAllTypeTrue, setAllTypeFalse } from '../../../Redux/actions'

const SetTypeOrders = (props) => {

   const clickHandel = (event) => {

      if ( 
          !event.path.map(el => el.id).includes('listFilterOfType') && 
          !event.path.map(el => el.id).includes('optionsFilterButtonOfType')
      ) {
         if (props.typeListFilter) {
          props.changeTypeListFilter()
      }}
    }
   
    useEffect(() => {
      window.addEventListener('click', clickHandel)
      return () => {
        window.removeEventListener('click', clickHandel)
      }
    })


  const chooseWord = (count) => {

    if (count === props.order_type.length) {
      return 'Любой'
    }

    if (count === 0) {
       return 'Выбирете тип'
    }

    if (count > 10 &&  count < 20) {
       return `${count} типов`
    }

    if (count % 10  === 1 ) {
       return `${count} тип`
    }

    if (count % 10  > 1 && count % 10  < 5) {
       return `${count} типа`
    }
    return `${count} типов`
}

   return (
    <>
    <div className='optionsFilterTitle'>Тип заказа</div>
    <div 
    className='optionsFilterButton'
    id='optionsFilterButtonOfType'
    onClick={() => props.changeTypeListFilter()}
    > 
      <span>{chooseWord(props.tempFilter.order_type_id.length)}</span>  
      <span>&#6662;</span> 
    </div>
    {props.typeListFilter ? <div className='listFilter' id='listFilterOfType'>

        {props.order_type.map(type => {
          return (
            <div className='statusListTitle2' key={type.id}>
                <input 
                className = 'chackboxListStatus' 
                type = 'checkbox'
                name = {type.id}
                onChange = {event => props.changeCheckType(event.target.name)}
                checked = {props.tempFilter.order_type_id.includes(type.id)}
                />
                <div className='listFilterMenu'>{type.name}</div>
            </div>
          )
        })}
         
      <div className='btmsts'>
         <div 
         className='btnstsTitle'
         onClick={() => props.setAllTypeTrue()}
         >
            Выбрать все
         </div>
         <div 
         className='btnstsTitle'
         onClick={() => props.setAllTypeFalse()}
         >
            Отменить все
         </div>
      </div>
    </div> : null}
    </>
   )
}

const mapStateToProps = state => ({
  typeListFilter: state.view.typeListFilter,
  order_type: state.data.order_type,
  tempFilter: state.filter.tempFilter
})


const mapDispatchToProps = {
  changeTypeListFilter,
  changeCheckType,
  setAllTypeTrue,
  setAllTypeFalse
}
  
export default connect(mapStateToProps, mapDispatchToProps)(SetTypeOrders)