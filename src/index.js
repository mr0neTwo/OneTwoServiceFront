import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { rootReducer } from './Redux/rootReducer'
import { Provider } from 'react-redux'
import { compose, createStore } from 'redux'
import firebase from 'firebase/app'

// import Rebase from "re-base";
// import { RebaseProvider } from "react-rebase";





const firebaseConfig = {
  apiKey: "AIzaSyCXkB7Q-qeQLHJ0hOcDiifCMeEKJCtwcUY",
  authDomain: "onetwoservice-krasnodar.firebaseapp.com",
  databaseURL: "https://onetwoservice-krasnodar-default-rtdb.firebaseio.com",
  projectId: "onetwoservice-krasnodar",
  storageBucket: "onetwoservice-krasnodar.appspot.com",
  messagingSenderId: "293970199456",
  appId: "1:293970199456:web:61533d41ad9ac9f176dac5"
}

export const apps = firebase.initializeApp(firebaseConfig)

// const base = Rebase.createClass(
//   firebase.database()
// );

const store = createStore(rootReducer, compose(
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
))

const app = (
  <Provider store={store}> 
    <App />
  </Provider>
)

ReactDOM.render(app, document.getElementById('root'))

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
