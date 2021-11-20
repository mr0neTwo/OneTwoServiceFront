
import React from 'react'
import { connect } from 'react-redux'

import { setVisibleFlag } from '../../Redux/actions'

const LableInput = (props) => {

   return (
      <div className={props.className}>
            <div className='lableImput'>{props.title}{props.redStar ? <span className='redStar'>*</span> : null}</div>
            <div className='row'>
               <input 
                  className={`${props.unit ? 'numberInput' : 'textInput'} ${props.disabled ? 'ds' : null}`}
                  style={{
                     width: props.width ? props.width : null,
                     borderColor: props.checkedFlag && !props.checked  ? 'red' : null
                  }}
                  name={props.name}
                  onChange={props.onChange}
                  value={props.value}
                  onBlur={props.checkedFlag ? event => props.setVisibleFlag(props.checkedFlag, !!event.target.value) : null}
                  // style={props.checkedFlag && !props.checked  ? {borderColor: 'red'} : null}
                  disabled={props.disabled}
               />
               {props.unit ? <div className='ml5'>{props.unit}</div> : null}
            </div>
         {props.checkedFlag && !props.checked ? <div className='errorMassageInput'>{props.errorMassage ? props.errorMassage : 'Необходимо заполнить'}</div> : null}
      </div>
   )
}

const mapStateToProps = state => ({
   // checked: state.view[props.checkedFlag]
   })

const mapDispatchToProps = {
   setVisibleFlag
}
  
 export default connect(mapStateToProps, mapDispatchToProps)(LableInput)


//  className=''
//  width=''
//  title=''
//  name=''
//  onChange={}
//  value={}
//  unit=''
//  checkedFlag=''
//  checked={}
//  disabled={}
//  errorMassage=''