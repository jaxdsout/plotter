import {
    UPDATE_OPTION_FAIL,
    UPDATE_OPTION_SUCCESS,
    NEW_OPTION_FAIL,
    NEW_OPTION_SUCCESS,
    DELETE_OPTION_FAIL,
    DELETE_OPTION_SUCCESS,
    NEW_LIST_SUCCESS,
    NEW_LIST_FAIL,
    SEARCH_CLIENT_FAIL,
    SEARCH_CLIENT_SUCCESS,
    SEARCH_PROPERTY_SUCCESS,
    SEARCH_PROPERTY_FAIL,
    LOAD_OPTIONS_SUCCESS,
    LOAD_OPTIONS_FAIL,
    CLEAR_OPTIONS_SUCCESS,
    CLEAR_OPTIONS_FAIL,
    SET_SEARCH_CLIENT_FAIL,
    SET_SEARCH_CLIENT_SUCCESS,
    RETRIEVE_LIST_FAIL,
    RETRIEVE_LIST_SUCCESS,
    UPDATE_OPTIONS_ORDER
} from '../actions/types';

const initialState = {
    access: localStorage.getItem('access'),
    refresh: localStorage.getItem('refresh'),
    client_results: [],
    client: null,
    list: null,
    prop_results: [],
    options: [],  
    retrlist: null,
};

export default function listmakerReducer(state = initialState, action) {
    const { type, payload } = action;
    switch(type) {
        case SEARCH_CLIENT_SUCCESS:
            return {
                ...state,
                client_results: payload
            }
        case SET_SEARCH_CLIENT_SUCCESS:
            return {
                ...state,
                client: payload
            }
        case NEW_LIST_SUCCESS:
            return {
                ...state,
                list: payload,
            }
        case SEARCH_PROPERTY_SUCCESS:
            return {
                ...state,
                prop_results: payload
            }
        case LOAD_OPTIONS_SUCCESS:
            return {
                ...state,
                options: payload.options
            }
        case CLEAR_OPTIONS_SUCCESS:
            return {
                ...state,
                options: payload.options
            }
        case RETRIEVE_LIST_SUCCESS:
            return {
                ...state,
                retrlist: payload,
            }
        case UPDATE_OPTIONS_ORDER:
            return {
                ...state,
                options: payload,
            }
        case NEW_OPTION_FAIL:
        case NEW_OPTION_SUCCESS:
        case NEW_LIST_FAIL:
        case UPDATE_OPTION_FAIL:
        case UPDATE_OPTION_SUCCESS:
        case DELETE_OPTION_FAIL:
        case DELETE_OPTION_SUCCESS:
        case SEARCH_CLIENT_FAIL:
        case SEARCH_PROPERTY_FAIL:
        case LOAD_OPTIONS_FAIL:
        case CLEAR_OPTIONS_FAIL:
        case SET_SEARCH_CLIENT_FAIL:
        case RETRIEVE_LIST_FAIL:
            return {
                ...state
            }
        
        default:
            return state;
    }
}
