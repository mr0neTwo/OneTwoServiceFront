import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { changeEngineerListFilter, changeCheckEngineer, setAllEngineerTrue, setAllEngineerFalse } from '../../../Redux/actions'

const SetEngineer = (props) => {

   const clickHandel = (event) => {
      if (
         !event.path.map(el => el.id).includes('listFilterOfEngineer') &&
         !event.path.map(el => el.id).includes('optionsFilterButtonOfEngineer')
         ) {
         if (props.engineerListFilter) {
          props.changeEngineerListFilter()
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
         return 'Выбирете инженера'
      }
  
      if (count > 10 &&  count < 20) {
         return `${count} инженеров`
      }
  
      if (count % 10  === 1 ) {
         return `${count} инженер`
      }
  
      if (count % 10  > 1 && count % 10  < 5) {
         return `${count} инженера`
      }
      return `${count} инженеров`
   }

   return (
    <>
    <div className='optionsFilterTitle'>Инженер</div>
    <div 
    className='optionsFilterButton' 
    id='optionsFilterButtonOfEngineer' 
    onClick={() => props.changeEngineerListFilter()}
    > 
      <span>{chooseWord(props.tempFilter.engineer_id.length)}</span>  
      <span>&#6662;</span> 
    </div>
    {props.engineerListFilter ? <div className='listFilter' id='listFilterOfEngineer'>

        {props.employees.map(employee => {
          
          if (!employee.deleted) {
            return (
              <div className='statusListTitle2' key={employee.id}>
                  <input 
                  className = 'chackboxListStatus' 
                  type = 'checkbox'
                  onChange = {() => props.changeCheckEngineer(employee.id)}
                  checked = {props.tempFilter.engineer_id.includes(employee.id)}
                  />
                  <div className='listFilterMenu'>{`${employee.first_name} ${employee.last_name}`}</div>
              </div>
          )}
          return null
        })}
         
      <div className='btmsts'>
         <div 
         className='btnstsTitle'
         onClick={() => props.setAllEngineerTrue()}
         >
            Выбрать все
         </div>
         <div 
         className='btnstsTitle'
         onClick={() => props.setAllEngineerFalse()}
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
   engineerListFilter: state.view.engineerListFilter,
   employees: state.data.employees
   })

const mapDispatchToProps = {
  changeEngineerListFilter,
  changeCheckEngineer,
  setAllEngineerTrue,
  setAllEngineerFalse
}
  
 export default connect(mapStateToProps, mapDispatchToProps)(SetEngineer)