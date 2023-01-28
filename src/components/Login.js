import React, {useState} from 'react'
import {connect} from 'react-redux'

import { log_in} from '../Redux/actions'
import LableInput from './general/LableInput'

function Login(props) {

    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')


    const handleClick = () => {
        props.log_in(login, password)
    }


    return (
        <div className="login">
            <div className="login__body">
                <h3>Войдите в аккаунт</h3>
                {props.error_message ? (<span className="login__error-message">{props.error_message}</span>) : null}
                <LableInput
                    title='Логин или Email'
                    onChange={event => setLogin(event.target.value)}
                    value={login}
                    redStar={false}
                />
                <LableInput
                    title='Пароль'
                    onChange={event => setPassword(event.target.value)}
                    value={password}
                    password={true}
                    redStar={false}
                />
                <button
                    className='login__button'
                    onClick={handleClick}
                >
                    Авторизоваться
                </button>

            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    error_message: state.data.error_message
})

const mapDispatchToProps = {
    log_in
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
