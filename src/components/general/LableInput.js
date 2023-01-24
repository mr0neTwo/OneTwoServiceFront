import React, {useMemo, useState} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

import {changeVisibleState} from '../../Redux/actions'
import {valueOfPhoneInput} from './utils'

/**
 *  className='className'
 *
 *  title='title'
 *
 *  onChange={event => console.log(event.target.value)}
 *
 *  value={props.value}
 *
 *  unit='%'
 *
 *  checkedFlag='flagName'
 *
 *  disabled={false}
 *
 *  redStar={false}
 *
 *  isPhone={false}
 *
 *  invisible={false}
 *
 * @returns {JSX.Element}
 * @constructor
 */

const LableInput = (props) => {

    const [focus, setFocus] = useState(false)

    const handleChange = (event) => {
        const out = event.target.value.replace(/[^0-9]/g, '')
        if (out.length < 12) props.onChange(out)
    }

    const handleBlur = (event) => {
        if (props.checkedFlag) props.changeVisibleState({[props.checkedFlag]: !!event.target.value})
        setFocus(false)
    }

    const mainClassName = useMemo(() => {
        let className = 'input-label'
        if (props.className) className += ` ${props.className}`
        if (focus) className += ' input-label_focus'
        if (props.unit) className += ' input-label_unit'
        if (props.checkedFlag && !props.view[props.checkedFlag]) className += ' input-label_error'
        return className
    }, [props.className, focus, props.checkedFlag, props.view[props.checkedFlag]])

    if (props.invisible) return <div/>

    return (
        <div className={mainClassName}>
            <div className='label input-label__label'>
                {props.title}
                {props.redStar ? <span className={props.value ? '' : 'input-label__red-star'}>*</span> : null}
            </div>
            <div className='input input-label__input'>
                <input
                    className='input-label__text'
                    autoFocus={props.autoFocus}
                    onChange={props.isPhone ? handleChange : props.onChange}
                    value={props.isPhone ? valueOfPhoneInput(props.value) : props.value}
                    onFocus={() => setFocus(true)}
                    onBlur={event => handleBlur(event)}
                    disabled={props.disabled}
                />
                {props.unit ? <div className='input-label__unit'>{props.unit}</div> : null}
            </div>
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
    view: state.view
})

const mapDispatchToProps = {
    changeVisibleState
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
//  invisible={false}