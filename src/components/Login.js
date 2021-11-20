import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'

import { loginAction, loguotAction, addUserAction, log_in } from '../Redux/actions'

function Login(props) {

  const [errorMessage, setErrorMessage] = useState('')

  // useEffect(() => {

  // }, [])

  const handleClick = ({target: {form}}) => {
     props.log_in(form.login.value, form.password.value)
  }


  const history = useHistory()

  return (
    <div className="mainLoginContaner">
      <div className="loginContanier">
        <h2>Войдите в аккаунт</h2>
        {errorMessage ? (
          <span className="errorMessageLogin">{errorMessage}</span>
        ) : null}
        <form id="loginForm">
          <div>
            <label className="loginFormLable">Логин или Email</label>
            <input className="loginFormInput" type="text" id="login" />
          </div>
          <div>
            <label className="loginFormLable">Пароль</label>
            <input className="loginFormInput" type="password" id="password" />
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
  serverUrl: state.data.url_server
})

const mapDispatchToProps = {
    // explicitly forwarding arguments
    login: loginAction,
    loguot: loguotAction,
    addUser: addUserAction,
    log_in
  }

export default connect(mapStateToProps, mapDispatchToProps) (Login)
