import {combineReducers} from "redux";
import {reducer as formReducer} from "redux-form";
import authReducer from "./authReducer";
import {firebaseReducer} from 'react-redux-firebase'
import {firestoreReducer } from 'redux-firestore'
import headerReducer from "./headerReducer";

export default combineReducers({
    auth: authReducer,
    firebase: firebaseReducer,
    firestore: firestoreReducer,
    header: headerReducer,
    form: formReducer

})