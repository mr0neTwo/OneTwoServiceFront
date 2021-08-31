import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { changeStausListFilter, changeCheckStatus, setAllStatusFalse, setAllStatusTrue } from '../../../Redux/actions'





const SetStatus = (props) => {

   const clickHandel = (event) => {
      if (
         !event.path.map(el => el.id).includes('stausListFilter') &&
         !event.path.map(el => el.id).includes('optionsFilterButtonOfStatus')
         ) {
         if (props.stausListFilter) {
          props.changeStausListFilter()
      }}
    }
   
    useEffect(() => {
      window.addEventListener('click', clickHandel)
      return () => {
        window.removeEventListener('click', clickHandel)
      }
    })


  const chooseWord = (count_status) => {

      if (count_status === props.status.length) {
         return 'Любой'
      }

      if (count_status === 0) {
         return 'Выбирете статус'
      }

      if (count_status > 10 &&  count_status < 20) {
         return `${count_status} статусов`
      }

      if (count_status % 10  === 1 ) {
         return `${count_status} статус`
      }

      if (count_status % 10  > 1 && count_status % 10  < 5) {
         return `${count_status} статусa`
      }
      return `${count_status} статусов`
  }

   return (
    <>
    <div className='optionsFilterTitle'>Статус</div>
    <div 
    className='optionsFilterButton' 
    id='optionsFilterButtonOfStatus'
    onClick = {() => props.changeStausListFilter()}
    > 
      <span>
         {chooseWord(props.tempFilter.status_id.length)}
      </span>  
      <span>&#6662;</span> 
    </div>
    {props.stausListFilter ? <div className='stausListFilter' id='stausListFilter'>
       {props.status_group.map(group => {
          return (
             <div key={group.id}>

             {group.status.length ? <div className='statusListTitle' >
             
                {group.name}
                </div> : null}

             {group.status.map(status => {
                return (
                  <div className='statusListTitle2' key={status.id + group.id * 100}>
                     <input 
                     className = 'chackboxListStatus' 
                     type = 'checkbox'
                     name = {status.id}
                     onChange = {() => props.changeCheckStatus(status.id)}
                     checked = {props.tempFilter.status_id.includes(status.id)}
                     />
                     <div className='statusListRow' style = {{backgroundColor: status.color}}> {status.name}</div>
                  </div>
                )
             })}
          </div>
          )
       })}
      <div className='btmsts'>
         <div 
         className='btnstsTitle'
         onClick={() => props.setAllStatusTrue()}
         >
            Выбрать все
         </div>
         <div 
         className='btnstsTitle'
         onClick={() => props.setAllStatusFalse()}
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
   status: state.data.status,
   status_group: state.data.status_group,
   stausListFilter: state.view.stausListFilter
   })

const mapDispatchToProps = {
   changeStausListFilter,
   changeCheckStatus,
   setAllStatusFalse,
   setAllStatusTrue
}
  
 export default connect(mapStateToProps, mapDispatchToProps)(SetStatus)