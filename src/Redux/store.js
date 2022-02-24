import {createStore, compose, applyMiddleware} from 'redux'
import thunk from 'redux-thunk';
// import createSagaMiddleware from 'redux-saga';

import {rootReducer} from './rootReducer'
// import { sagaWatcher } from './sagas';

// const saga = createSagaMiddleware()

// saga.run(sagaWatcher)

const store = createStore(rootReducer, compose(
    applyMiddleware(
        thunk
    ),
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
))

export default store