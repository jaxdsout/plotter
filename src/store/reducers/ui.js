import {
    RESET_CLIENT_VIEW,
    RESET_SEND_MODE,
    SET_SEND_MODE,
    RESET_LIST_MODE,
    SET_LIST_MODE,
    SET_CLIENT_VIEW,
    SET_REORDER_MODE, 
    RESET_REORDER_MODE,
    SIGNUP_SUCCESS,
    SET_SIGNUP_SUCCESS,
    PASSWORD_RESET_SUCCESS,
    SET_RESET_SUCCESS,
    SET_ACTIVATE_SUCCESS,
    ACTIVATE_SUCCESS,
    ACTIVATE_FAIL,
    CLEAR_MESSAGE,
    RESET_DEAL_MODE,
    SET_DEAL_MODE
} from '../actions/types';

const initialState = {
    isClientView: false,  
    isSendMode: false,
    isListMode: false,
    resetDealForm: false,
    isReorderMode: false,
    isDealMode: false,
    signupSuccess: false,
    resetSuccess: false,
    activateSuccess: false
};

export default function uiReducer(state = initialState, action) {
    const { type } = action;
    switch(type) {
        case SET_CLIENT_VIEW:
            return { 
                ...state, 
                isClientView: true 
            }
        case SET_SEND_MODE:
            return { 
            ...state, 
            isListMode: false, 
            isSendMode: true,
            }
        case SET_LIST_MODE:
            return { 
            ...state, 
            isListMode: true,
            isSendMode: false,
            }
        case SET_REORDER_MODE:
            return {
                ...state,
                isReorderMode: true
            }
        case SET_DEAL_MODE:
            return {
                ...state,
                isDealMode: true
            }
        case RESET_CLIENT_VIEW:
            return { 
                ...state, 
                isClientView: false 
            }
        case RESET_LIST_MODE:
            return { 
            ...state, 
            isListMode: false, 
        }
        case RESET_SEND_MODE:
            return { 
            ...state, 
            isSendMode: false, 
            }
        case RESET_REORDER_MODE:
            return {
                ...state,
                isReorderMode: false
            }
        case SIGNUP_SUCCESS:
            return {
                ...state,
                signupSuccess: true

            }
        case SET_SIGNUP_SUCCESS:
            return {
                ...state,
                signupSuccess: false,
            }
        case PASSWORD_RESET_SUCCESS:
            return {
                ...state,
                message: 'An email will be sent to you if address is in our system. Redirecting to login...',
                resetSuccess: true
            }
        case SET_RESET_SUCCESS:
            return {
                ...state,
                resetSuccess: null,
            }
        case ACTIVATE_SUCCESS:
            return {
                ...state,
                message: 'Account successfully activated. Redirecting to login...',
                activateSuccess: true
            }
        case ACTIVATE_FAIL:
            return {
                ...state,
                error: 'Account already activated',
                activateSuccess: null
            }
        case SET_ACTIVATE_SUCCESS:
            return {
                ...state,
                activateSuccess: null,
            }
        case CLEAR_MESSAGE:
            return {
                ...state,
                message: null,
                error: null,
            };
        case RESET_DEAL_MODE:
            return {
                ...state,
                isDealMode: false
            }
        default:
            return state;
    }
}
