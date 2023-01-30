import React from 'react'
import {connect} from 'react-redux'

import { addVisibleFlag} from '../../../Redux/actions'
import {addPhoneCounter} from '../../../Redux/actions/clientAction'

import Button from '../../general/Button'
import InputPhone from './InputPhone'

const AddPhones = (props) => {

    return (
        <div className='phone'>
            {props.client.phone.map((phone, idx) => (
                <InputPhone
                    key={idx}
                    idx={idx}
                    phone={phone}
                />
            ))}
            <Button
                size='med'
                type='tertiary'
                className='ml10'
                title='Добавить телефон'
                onClick={() => {
                    props.addPhoneCounter()
                    props.addVisibleFlag('inputClientPhoneChecked')
                }}
            />
        </div>
    )
}


const mapStateToProps = (state) => ({
    client: state.client
})

const mapDispatchToProps = {
    addPhoneCounter,
    addVisibleFlag,
}

export default connect(mapStateToProps, mapDispatchToProps)(AddPhones)
