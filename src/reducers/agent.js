import {
    NEW_CLIENT_SUCCESS,
    NEW_CLIENT_FAIL,
    LOAD_CLIENTS_FAIL,
    LOAD_CLIENTS_SUCCESS,
    UPDATE_CLIENT_SUCCESS,
    UPDATE_CLIENT_FAIL,
    LOAD_DEALS_SUCCESS,
    LOAD_DEALS_FAIL,
    NEW_DEAL_FAIL,
    NEW_DEAL_SUCCESS,
    NEW_LIST_SUCCESS,
    NEW_LIST_FAIL,
    LOAD_LISTS_SUCCESS,
    LOAD_LISTS_FAIL,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAIL
} from '../actions/types';

const initialState = {
    access: localStorage.getItem('access'),
    refresh: localStorage.getItem('refresh'),
    clients: [],
    deals: [],
    lists: [],
};

export default function agentReducer(state = initialState, action) {
    const { type, payload } = action;
    switch(type) {
        case LOAD_CLIENTS_SUCCESS:
            return {
                ...state,
                clients: payload
            }
        case LOAD_DEALS_SUCCESS:
            return {
                ...state,
                deals: payload
            }
        case LOAD_LISTS_SUCCESS:
            return {
                ...state,
                lists: payload
            }
        case NEW_CLIENT_SUCCESS:
        case NEW_LIST_SUCCESS:
        case NEW_DEAL_SUCCESS:
        case NEW_CLIENT_FAIL:
        case NEW_LIST_FAIL:
        case NEW_DEAL_FAIL:
        case UPDATE_CLIENT_SUCCESS:
        case UPDATE_CLIENT_FAIL:
        case UPDATE_PROFILE_SUCCESS:
        case UPDATE_PROFILE_FAIL:
        case LOAD_DEALS_FAIL:
        case LOAD_LISTS_FAIL:
        case LOAD_CLIENTS_FAIL:
            return {
                ...state
            }
        
        default:
            return state;
    }
}
