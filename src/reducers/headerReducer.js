import {HEADER_UPDATE} from "../actions/types";

export default (state={headerImg: null}, action) => {
    if (action.type === HEADER_UPDATE) {
        return action.payload;
    }
    return state;
}