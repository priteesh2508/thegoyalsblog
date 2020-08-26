import {SET_SUBSCRIBED, SIGN_IN, SIGN_OUT} from "../actions/types";

const INITIAL_STATE = {
    isSignedIn: null,
    userProfile: null,
    isSubscribed: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SIGN_IN:
            return {...state, isSignedIn: true, userProfile: action.payload};
        case SIGN_OUT:
            return {...state, isSignedIn: false, userProfile: null};
        case SET_SUBSCRIBED:
            return {...state, isSubscribed: action.payload};
        default:
            return state;

    }
}