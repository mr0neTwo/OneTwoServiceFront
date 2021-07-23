import React from 'react'
import ReactDOM from 'react-dom'
import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/auth'
import 'firebase/firestore'
import { Provider } from 'react-redux'
import { ReactReduxFirebaseProvider, firebaseReducer} from 'react-redux-firebase'
import { createFirestoreInstance, firestoreReducer } from 'redux-firestore'
import { BrowserRouter } from 'react-router-dom';
import { createStore, combineReducers, compose } from 'redux'


import './index.css'
import App from './App'
// import { rootReducer } from './Redux/rootReducer'



const firebaseConfig = {
  apiKey: "AIzaSyCXkB7Q-qeQLHJ0hOcDiifCMeEKJCtwcUY",
  authDomain: "onetwoservice-krasnodar.firebaseapp.com",
  databaseURL: "https://onetwoservice-krasnodar-default-rtdb.firebaseio.com",
  projectId: "onetwoservice-krasnodar",
  storageBucket: "onetwoservice-krasnodar.appspot.com",
  messagingSenderId: "293970199456",
  appId: "1:293970199456:web:61533d41ad9ac9f176dac5"
}

// react-redux-firebase config
const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
}

// Initialize firebase instance
firebase.initializeApp(firebaseConfig)

// Initialize other services on firebase instance
firebase.firestore() // <- needed if using firestore


// Add firebase to reducers
const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer // <- needed if using firestore
})

// Create store with reducers and initial state
const initialState = {}
const store = createStore(rootReducer, initialState)


const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance // <- needed if using firestore
}

const app = (
  <React.StrictMode>
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ReactReduxFirebaseProvider>
    </Provider>
  </React.StrictMode>
)

ReactDOM.render(app, document.getElementById('root'))


