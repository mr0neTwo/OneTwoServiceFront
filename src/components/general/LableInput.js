import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { setVisibleFlag } from '../../Redux/actions'
import { valueOfPhoneInput } from './utils'

const LableInput = (props) => {

   const handleChange = (event) => {
      const out = event.target.value.replace(/[^0-9]/g, '')
      if (out.length < 12) props.onChange(out)
   }

   return (
      <div className={props.className}>
            <div className='lableImput'>{props.title}{props.redStar ? <span className='redStar'>*</span> : null}</div>
            <div className='row'>
               <input 
                  className={`${props.unit ? 'numberInput' : 'textInput'} ${props.disabled ? 'ds' : null} ${props.inputClassName}`}
                  style={{
                     width: props.width ? props.width : null,
                     borderColor: props.checkedFlag && !props.checked  ? 'red' : null
                  }}
                  name={props.name}
                  onChange={props.isPhone ? handleChange : props.onChange}
                  value={props.isPhone ? valueOfPhoneInput(props.value) : props.value}
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

LableInput.propTypes = {
    className: PropTypes.string,
    inputClassName: PropTypes.string,
    width: PropTypes.string,
    title: PropTypes.string,
    name: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    unit: PropTypes.string,
    checkedFlag: PropTypes.string,
    checked: PropTypes.bool,
    disabled: PropTypes.bool,
    redStar: PropTypes.bool,
    errorMassage: PropTypes.string,
    isPhone: PropTypes.bool
}

const mapStateToProps = state => ({
   // checked: state.view[props.checkedFlag]
   })

const mapDispatchToProps = {
   setVisibleFlag
}
  
 export default connect(mapStateToProps, mapDispatchToProps)(LableInput)


//  className=''
//  inputClassName=''
//  width=''
//  title=''
//  name=''
//  onChange={}
//  value={}
//  unit=''
//  checkedFlag=''
//  checked={}
//  disabled={}
//  redStar={false}
//  errorMassage=''
//  isPhone={true}