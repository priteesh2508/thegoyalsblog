import {SIGN_OUT, SIGN_IN, HEADER_UPDATE} from "./types";

export const signIn = (userProfile) => (dispatch,getState) => {
    dispatch( {
        type: SIGN_IN,
        payload: {
            userId: userProfile.getId(),
            imageUrl: userProfile.getImageUrl(),
            userName: userProfile.getName(),
            email: userProfile.getEmail()
        }
    });
};

export const signOut = () => {
    return {
        type: SIGN_OUT
    }
};

export const headerUpdate = (header) => {
    return {
        type: HEADER_UPDATE,
        payload: header
    }
};