import React, { useState } from 'react'
import firebase  from 'firebase/app'
import 'firebase/database'
import 'firebase/auth'




function Login(props) {
    
   const [errorMessage, setErrorMessage] = useState('')

   const getErrorMessege = (error) => {
      switch (error.code) {
         case 'auth/too-many-requests': {
            return 'Слишком много попыток входа. Аккаунт времменно заблокирован. Попробуйте войти позже.'
         } 
         case 'auth/user-disabled': {
            return 'Данная учетная запись была отключена администратором.'
         }
         case 'auth/user-token-expired': {
            return 'Срок действия учетных данных истек'
         }
         case 'auth/wrong-password': {
            return 'Вы ввели не венрных пароль'
         }
         case 'auth/user-not-found': {
            return 'Пользователь с таким именем не найден'
         }
         default: {
            return error.message
         }
      }
   }
  


   const handleClick = ({ target : { form : { login, password }}}) => {

      firebase.auth().signInWithEmailAndPassword(login.value, password.value)
         .then((userCredential) => {
           
               const user = {
               email: userCredential.user.email,
               uid: userCredential.user.uid,
               phoneNumber: userCredential.user.phoneNumber,
               metadata: userCredential.user.metadata
               }
            
            window.sessionStorage.setItem('user', JSON.stringify(user))
            props.setCurrentUser(user)
         })
         .catch(error => {
            console.log(error)
            window.sessionStorage.setItem('user', false)
            setErrorMessage(getErrorMessege(error))
         })


      // Регистрация нового пользователя
      // firebase.auth().createUserWithEmailAndPassword(login.value, password.value)
      //    .catch(error => console.log(error))
   }
   
   console.log(JSON.parse(window.sessionStorage.getItem('user')))

   



   return (
      <div className = 'mainLoginContaner'>
         <div className = 'loginContanier'>
            <h2>Войдите в аккаунт</h2>
            {errorMessage ? (<span className = 'errorMessageLogin'>{errorMessage}</span>) : null}
            <form id = 'loginForm'>
               <div>
                  <label className = 'loginFormLable'>Логин или Email</label>
                  <input 
                     className = 'loginFormInput' 
                     type = 'text' 
                     id = 'login'
                  />
               </div>
               <div>
                  <label className = 'loginFormLable'>Пароль</label>
                  <input 
                     className = 'loginFormInput' 
                     type = 'password'  
                     id = 'password'
                  />
               </div>
               <div>
                  <button 
                     className ='loginButtom' 
                     type = 'button'
                     onClick = {handleClick}
                  >
                     Авторизоваться
                  </button>
               </div>   
            </form>
         </div>
      </div>
   )
   
}


  
  
 export default Login


