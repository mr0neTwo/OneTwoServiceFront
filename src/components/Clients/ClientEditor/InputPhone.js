import React, {useCallback, useMemo, useState} from 'react'
import {connect} from 'react-redux'

import {setVisibleListFlag, addVisibleFlag, deleteVisibleFlag,} from '../../../Redux/actions'
import {valueOfPhoneInput} from '../../general/utils'
import {addPhoneCounter, changeClientEditorPhone, deleteCountNumber} from '../../../Redux/actions/clientAction'
import {ICON} from '../../../data/icons'

import PhoneTitle from './PhoneTitle'
import Icon from '../../general/Icon'
import Checkbox from '../../general/Checkbox'


const InputPhone = (props) => {

    const [focus, setFocus] = useState(false)

    const handleChange = (event) => {
        const out = event.target.value.replace(/[^0-9]/g, '')
        if (out.length < 12) props.changeClientEditorPhone(props.idx, 'number', out,)
    }

    const handleBlur = (event) => {
        props.setVisibleListFlag('inputClientPhoneChecked', props.idx, event.target.value.replace(/[^0-9]/g, '').length === 11)
        setFocus(false)
    }

    const mainClassName = useMemo(() => {
        let className = 'input-label'
        if (props.className) className += ` ${props.className}`
        if (focus) className += ' input-label_focus'
        if (!props.view.inputClientPhoneChecked[props.idx]) className += ' input-label_error'
        return className
    }, [props.className, focus, props.view.inputClientPhoneChecked[props.idx]])

    return (
        <div
            className={mainClassName}
        >
            <PhoneTitle idx={props.idx} title={props.phone.title}/>
            <div className='phone__box'>
                <div className="input input-label__input ">
                    <input
                        className='input-label__text'
                        onChange={handleChange}
                        value={valueOfPhoneInput(props.phone.number)}
                        onFocus={() => setFocus(true)}
                        onBlur={handleBlur}
                    />
                </div>
                {props.idx !== 0 ? (
                    <div
                        className='phone__icon-trash'
                        onClick={() => {
                            props.deleteCountNumber(props.idx)
                            props.deleteVisibleFlag('inputClientPhoneChecked', props.idx)
                        }}
                    >
                        <Icon
                            className='icon'
                            icon={ICON.TRASH}
                            color='var(--error)'
                        />
                    </div>
                ) : null}
            </div>
            <Checkbox
                id={`ClientEditorNotify${props.idx}`}
                type='slide-three'
                className='mt5'
                label='Согласен получать SMS'
                onChange={event => props.changeClientEditorPhone(props.idx, 'notify', event.target.checked)}
                checked={props.phone.notify}
            />

        </div>
    )
}

const mapStateToProps = (state) => ({
    client: state.client,
    view: state.view,
})

const mapDispatchToProps = {
    changeClientEditorPhone,
    addPhoneCounter,
    deleteCountNumber,
    setVisibleListFlag,
    addVisibleFlag,
    deleteVisibleFlag,
}

export default connect(mapStateToProps, mapDispatchToProps)(InputPhone)
