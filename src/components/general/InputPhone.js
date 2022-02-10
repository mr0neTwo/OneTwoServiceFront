
import React from 'react'
import { connect } from 'react-redux'

import { setVisibleFlag } from '../../Redux/actions'

const InputPhone = (props) => {

   const value = `+${props.value.slice(0, 1)}(${props.value.slice(1, 4)}) ${props.value.slice(4, 7)}-${props.value.slice(7, 10)}-${props.value.slice(9, 12)}`


   return (
      <div className={props.className}>
            <div className='lableImput'>{props.title}{props.redStar ? <span className='redStar'>*</span> : null}</div>
            <div className='row'>
               <input 
                  className={`textInput ${props.disabled ? 'ds' : null}`}
                  style={{
                     width: props.width ? props.width : null,
                     borderColor: props.checkedFlag && !props.checked  ? 'red' : null
                  }}
                  name={props.name}
                  onChange={props.onChange}
                  value={value}
                  onBlur={props.checkedFlag ? event => props.setVisibleFlag(props.checkedFlag, !!event.target.value) : null}
                  disabled={props.disabled}
               />
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
  
 export default connect(mapStateToProps, mapDispatchToProps)(InputPhone)


//  className=''
//  width=''
//  title=''
//  name=''
//  onChange={}
//  value={}
//  checkedFlag=''
//  checked={}
//  disabled={}
//  redStar={false}
//  errorMassage=''