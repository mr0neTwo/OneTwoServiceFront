import React, { useEffect } from 'react'
import firebase from 'firebase/app'
import { apps } from '../index'
import { connect } from 'react-redux'
import { changeCurrentInput} from '../Redux/actions'



require('firebase/database')
require('firebase/auth')




function Login({currentLogin, currentPassword, changeCurrentInput}) {
    

   useEffect(() => {
      const db = firebase.database(apps);
      console.log(db)
      const name = db.ref('name')
      name.on('value', (elem) => elem.val())
      console.log(name)
   }, []
   )
  
   const handleChange = ({target: {id , value} }) => {
      changeCurrentInput(id , value)
      console.log(id, value)
   }

   const handleClick = () => {

      firebase.auth().createUserWithEmailAndPassword(currentLogin, currentPassword)
         .catch(error => console.log(error))
   }
   
      // ​signInWithEmailAndPassword(login, password)


   return (
      <div className = 'mainLoginContaner'>
         <div className = 'loginContanier'>
            <h2>Войдите в аккаунт</h2>
            <form id = 'loginForm'>
               <div>
                  <label className = 'loginFormLable'>Логин или Email</label>
                  <input 
                     className = 'loginFormInput' 
                     type = 'text' 
                     id = 'currentLogin'
                     placeholder = 'email or login'
                     onChange = {handleChange}
                  />
               </div>
               <div>
                  <label className = 'loginFormLable'>Пароль</label>
                  <input 
                     className = 'loginFormInput' 
                     type = 'password'  
                     id = 'currentPassword'
                     placeholder = 'password'
                     onChange = {handleChange}
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

const mapStateToProps = (state) => {
   return {
      currentLogin: state.data.currentLogin,
      currentPassword: state.data.currentPassword,
   }
 }

export default connect(mapStateToProps, { changeCurrentInput })(Login)