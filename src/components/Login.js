import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'

import { loginAction, loguotAction, addUserAction } from '../Redux/actions'

function Login(props) {

  const [errorMessage, setErrorMessage] = useState('')

  async function log_in(login, password) {
      const request_config = {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({'email': login, 'password': password})
      }
      const response = await fetch(props.serverUrl + '/login', request_config)
      const data = await response.json()
      if (data.success) {
        props.login(data.access_token)
        props.addUser(data.user)
      } else {
        console.log(data.message)
        setErrorMessage(data.message)
        props.loguot()
      }
    }

  const handleClick = ({target: {form}}) => {
     log_in(form.login.value, form.password.value)
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
    addUser: addUserAction
  }

export default connect(mapStateToProps, mapDispatchToProps) (Login)
