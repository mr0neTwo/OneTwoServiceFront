

import React from 'react'
import { connect } from 'react-redux'

import {changeVisibleState} from '../../../../Redux/actions'

const LabelInputOrder = (props) => {

   return (
      <div className = {props.className}>
         <div className='optionsTitle'>{props.title}{props.checkedFlag ? <span className='redStar'>*</span> : null}</div>
         <div className='blockInput'>
            <input 
               className='textInput'
               name={props.name}
               onChange={props.onChange}
               value={props.value}
               onBlur={props.checkedFlag ? event => props.changeVisibleState({[props.checkedFlag]: !!event.target.value}) : null}
               style={props.checkedFlag && !props.checked  ? { borderColor: 'red' } : null}
               disabled={props.disabled}
            />
            {props.checkedFlag && !props.checked ? <div className='errorMassageInput'>{props.errorMassage ? props.errorMassage : 'Необоходимо заполнить'}</div> : null}
         </div>

      </div>
   )
}

const mapStateToProps = state => ({
   // checked: state.view[props.checkedFlag]
   })

const mapDispatchToProps = {
    changeVisibleState
}
  
 export default connect(mapStateToProps, mapDispatchToProps)(LabelInputOrder)