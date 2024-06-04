import {
    NEW_CLIENT_SUCCESS,
    NEW_CLIENT_FAIL,
    EDIT_CLIENT_SUCCESS,
    EDIT_CLIENT_FAIL,
    DELETE_CLIENT_SUCCESS,
    DELETE_CLIENT_FAIL,
    CREATE_LIST_SUCCESS,
    CREATE_LIST_FAIL,
    EDIT_LIST_SUCCESS,
    EDIT_LIST_FAIL,
    DELETE_LIST_SUCCESS,
    DELETE_LIST_FAIL,
    ALL_CLIENTS_FAIL,
    ALL_CLIENTS_SUCCESS

} from './types';

const initialState = {
    clients: []
};

export default function dashReducer(state = initialState, action) {
    const { type, payload } = action;
    switch(type) {
        case ALL_CLIENTS_SUCCESS:
            return {
                ...state,
                clients: payload
            };
        case ALL_CLIENTS_FAIL:
            return {
                ...state,
                clients: []
            };
        default:
            return state;
    }
}