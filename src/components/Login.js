import React from 'react'
import {connect} from 'react-redux'

import { log_in} from '../Redux/actions'
import {changeDataState} from '../Redux/actions/dataAction'

function Login(props) {


    const handleClick = ({target: {form}}) => {
        props.log_in(form.login.value, form.password.value)
    }


    return (
        <div className="mainLoginContaner">
            <div className="loginContanier">
                <h2>Войдите в аккаунт</h2>
                {props.error_message ? (<span className="errorMessageLogin">{props.error_message}</span>) : null}
                <form id="loginForm">
                    <div>
                        <label className="loginFormLable">Логин или Email</label>
                        <input
                            id="login"
                            className="loginFormInput"
                            type="text"
                            onKeyPress={event => {
                                if (event.key === 'Enter') handleClick(event)
                            }}
                        />
                    </div>
                    <div>
                        <label className="loginFormLable">Пароль</label>
                        <input
                            id="password"
                            className="loginFormInput"
                            type="password"
                            onKeyPress={event => {
                                if (event.key === 'Enter') handleClick(event)
                            }}
                        />
                    </div>
                    <div>
                        <button className="loginButtom" type="button" onClick={handleClick}>
                            Авторизоваться
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    serverUrl: state.data.url_server,
    error_message: state.data.error_message,
    csrfToken: state.data.csrfToken
})

const mapDispatchToProps = {
    log_in,
    changeDataState
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
