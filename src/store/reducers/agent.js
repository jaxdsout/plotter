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
    UPDATE_PROFILE_FAIL,
    DELETE_DEAL_FAIL,
    DELETE_DEAL_SUCCESS,
    UPDATE_STATUS_FAIL,
    UPDATE_STATUS_SUCCESS,
    DELETE_CLIENT_FAIL,
    DELETE_CLIENT_SUCCESS,
    NEW_TASK_FAIL,
    NEW_TASK_SUCCESS,
    LOAD_TASKS_FAIL,
    LOAD_TASKS_SUCCESS,
    LOAD_PROPERTIES_FAIL,
    LOAD_PROPERTIES_SUCCESS,
    SET_COMMISSION_PROP_SUCCESS,
    SET_COMMISSION_PROP_FAIL,
    LOGOUT
} from '../actions/types';

const initialState = {
    access: localStorage.getItem('access'),
    refresh: localStorage.getItem('refresh'),
    clients: [],
    deals: [],
    lists: [],
    tasks: [],
    properties: [],
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
        case LOAD_TASKS_SUCCESS:
            return {
                ...state,
                tasks: payload
            }
        case LOAD_PROPERTIES_SUCCESS:
            return {
                ...state,
                properties: payload
            }
        case UPDATE_CLIENT_SUCCESS:
            return {
                ...state,
                message: 'Client updated successfully'
            }
        case LOGOUT:
            return {
                ...state,
                clients: [],
                deals: [],
                lists: [],
                tasks: [],
                properties: [],
            }
        case NEW_CLIENT_SUCCESS:
        case NEW_LIST_SUCCESS:
        case NEW_DEAL_SUCCESS:
        case NEW_CLIENT_FAIL:
        case NEW_LIST_FAIL:
        case NEW_DEAL_FAIL:
        case UPDATE_CLIENT_FAIL:
        case UPDATE_PROFILE_SUCCESS:
        case UPDATE_PROFILE_FAIL:
        case LOAD_DEALS_FAIL:
        case LOAD_LISTS_FAIL:
        case LOAD_CLIENTS_FAIL:
        case DELETE_DEAL_FAIL:
        case DELETE_DEAL_SUCCESS:
        case UPDATE_STATUS_FAIL:
        case UPDATE_STATUS_SUCCESS:
        case DELETE_CLIENT_FAIL:
        case DELETE_CLIENT_SUCCESS:
        case NEW_TASK_FAIL:
        case NEW_TASK_SUCCESS:
        case LOAD_TASKS_FAIL:
        case LOAD_PROPERTIES_FAIL:
            return {
                ...state
            }
        
        default:
            return state;
    }
}
