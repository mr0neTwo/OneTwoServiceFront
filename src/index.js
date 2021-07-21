import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import firebase from 'firebase/app'
import 'firebase/database'
import { Provider } from 'react-firebase'
import { BrowserRouter } from 'react-router-dom';




const firebaseConfig = {
  apiKey: "AIzaSyCXkB7Q-qeQLHJ0hOcDiifCMeEKJCtwcUY",
  authDomain: "onetwoservice-krasnodar.firebaseapp.com",
  databaseURL: "https://onetwoservice-krasnodar-default-rtdb.firebaseio.com",
  projectId: "onetwoservice-krasnodar",
  storageBucket: "onetwoservice-krasnodar.appspot.com",
  messagingSenderId: "293970199456",
  appId: "1:293970199456:web:61533d41ad9ac9f176dac5"
}

export const firebaseApp = firebase.initializeApp(firebaseConfig)


const app = (
  <BrowserRouter>
    <Provider firebaseApp = {firebaseApp}>
      <App />
    </Provider>
  </BrowserRouter>
)

ReactDOM.render(app, document.getElementById('root'))


