import React from "react";
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose} from "redux";
import reduxThunk from 'redux-thunk'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/analytics'
import 'firebase/firestore'
import {ReactReduxFirebaseProvider} from 'react-redux-firebase'
import { createFirestoreInstance } from 'redux-firestore'

import App from './components/App.js';
import reducers from './reducers';
import {firebaseConfig} from "./firebase";

// react-redux-firebase config
const rrfConfig = {
    userProfile: 'users'
    // useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
};

// Initialize firebase instance and other services on firebase
firebase.initializeApp(firebaseConfig);
firebase.firestore();
firebase.analytics();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    reducers,
    composeEnhancers(applyMiddleware(reduxThunk))
);

const rrfProps = {
    firebase,
    config: rrfConfig,
    dispatch: store.dispatch,
    createFirestoreInstance
};

ReactDOM.render(
    <Provider store={store}>
        <ReactReduxFirebaseProvider {...rrfProps}>
            <App/>
        </ReactReduxFirebaseProvider>
    </Provider>,
    document.querySelector('#root')
);
