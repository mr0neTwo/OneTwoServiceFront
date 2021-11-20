import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'

import { setVisibleFlag } from '../../Redux/actions'

const ChooseOfList = (props) => {

   const [listVisible, setListVisible] = useState(false)

   const clickHandel = (event) => {
      if (!event.path.map(el => el.id).includes(`chooseOfList${props.id}`) ) {
         if (listVisible) {
            setListVisible(false)
      }}
    }
   
    useEffect(() => {
      window.addEventListener('click', clickHandel)
      return () => {
        window.removeEventListener('click', clickHandel)
      }
    })

    const current = props.list.find(element => element.id === props.current_id)

 

   return (
      <div 
         className={props.className}
         style={{width: props.width ? props.width : '250px'}} 
         id={`chooseOfList${props.id}`}
      >
         <div className='lableImput'>{props.title}{props.checkedFlag ? <span className='redStar'>*</span> : null}</div>
         <div 
            className='optionsButton' 
            onClick={props.disabled ? null : () => setListVisible(!listVisible)}
            style={props.checkedFlag && !props.checked ? { borderColor: 'red' } : null}
         >
            <div className='noWr'>
               {props.employee ? 
               (props.current_id ? `${current.last_name} ${current.first_name}` : 'не назначен') : 
               (props.current_id ? (current.title ? current.title : current.name) : 'Выберете тип')}
            </div>
            <span>&#6662;</span>
         </div>
         {props.checkedFlag && !props.checked ? <div className='errorMassageInput'>{props.errorMassage ? props.errorMassage : 'Необходимо выбрать'}</div> : null}
         {listVisible ?
            <div 
               className='listOptionsChoose'
               style={{width: props.width ? props.width : '250px'}} 
            >
            {props.list.map(element => {
               return(
               <div
                  key={element.id}
                  className='options'
                  onClick={() => {
                  props.setElement(element.id, props.field ? props.field : null)
                  setListVisible(false)
                  props.setVisibleFlag(props.checkedFlag, true)
                  }}
               >
                  {props.employee ? `${element.last_name} ${element.first_name}` : (element.title ? element.title : element.name)}
               </div>
            )})}
         </div> : null}
      </div> 
   )
}

const mapStateToProps = state => ({
   // checked: state.view[props.checkedFlag]
   })

const mapDispatchToProps = {
   setVisibleFlag
}

  
 export default connect(mapStateToProps, mapDispatchToProps)(ChooseOfList)

