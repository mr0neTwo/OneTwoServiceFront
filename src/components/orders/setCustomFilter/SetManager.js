import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { changeManagerListFilter, changeCheckManager, setAllManagerTrue, setAllManagerFalse } from '../../../Redux/actions'

const SetManager = (props) => {

   const clickHandel = (event) => {
      if (
         !event.path.map(el => el.id).includes('listFilterOfManager') &&
         !event.path.map(el => el.id).includes('optionsFilterButtonOfManager')
         ) {
         if (props.managerListFilter) {
          props.changeManagerListFilter()
      }}
    }
   
    useEffect(() => {
      window.addEventListener('click', clickHandel)
      return () => {
        window.removeEventListener('click', clickHandel)
      }
    })
  

   const chooseWord = (count) => {

      if (count === props.employees.length) {
        return 'Любой'
      }
  
      if (count === 0) {
         return 'Выбирете менеджера'
      }
  
      if (count > 10 &&  count < 20) {
         return `${count} менеджеров`
      }
  
      if (count % 10  === 1 ) {
         return `${count} менеджер`
      }
  
      if (count % 10  > 1 && count % 10  < 5) {
         return `${count} менеджера`
      }
      return `${count} менеджеров`
   }

   return (
    <>
    <div className='optionsFilterTitle'>Менеджер</div>
    <div 
    className='optionsFilterButton' 
    id='optionsFilterButtonOfManager' 
    onClick={() => props.changeManagerListFilter()}
    > 
      <span>{chooseWord(props.tempFilter.manager_id.length)}</span>  
      <span>&#6662;</span> 
    </div>
    {props.managerListFilter ? <div className='listFilter' id='listFilterOfManager'>

        {props.employees.map(employee => {
          
          if (!employee.deleted) {
            return (
              <div className='statusListTitle2' key={employee.id}>
                  <input 
                  className = 'chackboxListStatus' 
                  type = 'checkbox'
                  onChange = {() => props.changeCheckManager(employee.id)}
                  checked = {props.tempFilter.manager_id.includes(employee.id)}
                  />
                  <div className='listFilterMenu'>{`${employee.first_name} ${employee.last_name}`}</div>
              </div>
          )}
          return null
        })}
         
      <div className='btmsts'>
         <div 
         className='btnstsTitle'
         onClick={() => props.setAllManagerTrue()}
         >
            Выбрать все
         </div>
         <div 
         className='btnstsTitle'
         onClick={() => props.setAllManagerFalse()}
         >
            Отменить все
         </div>
      </div>
    </div> : null}
    </>
   )
}

const mapStateToProps = state => ({
   tempFilter: state.filter.tempFilter,
   managerListFilter: state.view.managerListFilter,
   employees: state.data.employees
   })

const mapDispatchToProps = {
  changeManagerListFilter,
  changeCheckManager,
  setAllManagerTrue,
  setAllManagerFalse
}
  
 export default connect(mapStateToProps, mapDispatchToProps)(SetManager)