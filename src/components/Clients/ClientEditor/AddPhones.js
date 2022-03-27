import React from 'react'
import {connect} from 'react-redux'

import {
    changeClientEditorPhone,
    addPhoneCounter,
    deleteCountNumber,
    setPhoneNotify,
    setVisibleListFlag,
    addVisibleFlag,
    deleteVisibleFlag,
} from '../../../Redux/actions'
import PhoneTitle from './PhoneTitle'
import {icon_trush} from '../../../data/icons'
import {valueOfPhoneInput} from '../../general/utils'

const AddPhones = (props) => {

    const handleChange = (idx, event) => {
        const out = event.target.value.replace(/[^0-9]/g, '')
        if (out.length < 12) props.changeClientEditorPhone(idx, out)
    }

    return (
        <div>
            {props.client.phone.map((phone, idx) => (
                <div key={idx}>
                    <PhoneTitle idx={idx} title={phone.title}/>

                    <div className="inputPhoneBox">
                        <input
                            className='textInput w250'
                            onChange={event => handleChange(idx, event)}
                            value={valueOfPhoneInput(phone.number)}
                            onBlur={event => props.setVisibleListFlag('inputClientPhoneChecked', idx, event.target.value.replace(/[^0-9]/g, '').length === 11)}
                            style={!props.view.inputClientPhoneChecked[idx] ? {borderColor: 'red'} : null}
                        />
                        {idx !== 0 ? (
                            <div
                                onClick={() => {
                                    props.deleteCountNumber(idx)
                                    props.deleteVisibleFlag('inputClientPhoneChecked', idx)
                                }}
                            >
                                <svg className="icon-deletePhone" viewBox="0 0 32 32">
                                    <path d={icon_trush}/>
                                </svg>
                            </div>
                        ) : null}
                    </div>
                    {!props.view.inputClientPhoneChecked[idx] ? (
                        <div className="errorMassageInput">Необоходимо заполнить</div>
                    ) : null}
                    <div className="checkbox mt5">
                        <input
                            type="checkbox"
                            onChange={() => props.setPhoneNotify(idx)}
                            checked={phone.notify}
                        />
                        <label>Согласен получать SMS</label>
                    </div>
                </div>
            ))}
            <div
                className="addPhone"
                onClick={() => {
                    props.addPhoneCounter()
                    props.addVisibleFlag('inputClientPhoneChecked')
                }}
            >
                + Добавить телефон
            </div>
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
    setPhoneNotify,
    setVisibleListFlag,
    addVisibleFlag,
    deleteVisibleFlag,
}

export default connect(mapStateToProps, mapDispatchToProps)(AddPhones)
