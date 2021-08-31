import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { changeStatusCreateNewFilter, changeTitleCreate, changeGeneraleCreate, addCustomFilter } from '../../Redux/actions'



const CreateNewFilter = (props) => {

   const clickHandel = (event) => {
      if (!event.path.map(el => el.id).includes('createNewFilterWiondow') ) {
          props.changeStatusCreateNewFilter()
    }}
   
    useEffect(() => {
      window.addEventListener('click', clickHandel)
      return () => {
        window.removeEventListener('click', clickHandel)
      }
    })

   return (
     <div className='rightBlock'>
        <div 
        className='rightBlockWiondow'
        id='createNewFilterWiondow'
        >
         <div className='createNewTitle'>Новый фильтр</div>
         <div className='lableImput'>Название филтьтра <span className='redStar'>*</span></div>
         <input 
         className='textInput'
         onChange={(event) => props.changeTitleCreate(event.target.value)}
         value={props.title_create}
         />
         <div className='checkboxRow'>
            <input 
            type='checkbox' 
            className='chackboxListStatus'
            onChange={() => props.changeGeneraleCreate()}
            value={props.generale_create}
            />
            <div className='lableImput'>Общий фильтр</div>
         </div>
         <div className='buttons mr-top-15'>
            <div 
            className='blueButton'
            onClick={() => {
               props.addCustomFilter()
               props.changeStatusCreateNewFilter()
            }}
            >
               Cохранить
            </div>
            <div 
            className='whiteBlueBotton'
            onClick={() => props.changeStatusCreateNewFilter()}
            >
               Отменить
            </div>
         </div>
        </div>
     </div>
   )
}

const mapStateToProps = state => ({
   generale_create: state.filter.generale_create,
   title_create: state.filter.title_create
   })

   const mapDispatchToProps = {
      changeStatusCreateNewFilter,
      changeTitleCreate,
      changeGeneraleCreate,
      addCustomFilter
   }
  
 export default connect(mapStateToProps, mapDispatchToProps)(CreateNewFilter)