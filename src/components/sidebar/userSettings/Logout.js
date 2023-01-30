import React, {useEffect} from 'react'
import { connect } from 'react-redux'

import {logout} from '../../../Redux/actions/employeeAction'
import {changeDataState} from '../../../Redux/actions/dataAction'

const Logout = (props) => {

    useEffect(() => {
        props.logout()
        props.changeDataState({login_status: false})
        props.history.push('/')
    })

    return (
        <div className = 'temp-page'>
            <div className = 'temp-page__body'>
                <h1 className = 'tempTitle'>Выход</h1>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({

})

const mapDispatchToProps = {
    logout,
    changeDataState
}

export default connect(mapStateToProps, mapDispatchToProps)(Logout)