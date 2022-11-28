import React from 'react'
import {connect} from 'react-redux'

import {getRegistration} from '../../../../Redux/actions/registrationAction'


const DocRegistration = (props) => {

    return (
        <td>
            <span
                className='link'
                onClick={() => props.getRegistration(props.back.registration.id)}
            >
                {props.back.registration.label}
            </span>
        </td>
    )
}


const mapDispatchToProps = {
    getRegistration
}

export default connect(null, mapDispatchToProps)(DocRegistration)
