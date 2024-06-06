import {
    NEW_CLIENT_SUCCESS,
    NEW_CLIENT_FAIL,
    UPDATE_CLIENT_FAIL,
    UPDATE_CLIENT_SUCCESS

} from '../actions/types'

const initialState = {
    clients: []
};

export default function dashReducer(state = initialState, action) {
    const { type, payload } = action;
    switch(type) {
        case UPDATE_CLIENT_SUCCESS:
        case NEW_CLIENT_SUCCESS:
            return {
                ...state,
                clients: payload
            };
        case UPDATE_CLIENT_FAIL:
        case NEW_CLIENT_FAIL:
            return {
                ...state,
                clients: []
            };
        default:
            return state;
    }
}