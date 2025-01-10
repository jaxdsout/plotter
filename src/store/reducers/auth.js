import {
    SIGNUP_SUCCESS,
    SIGNUP_FAIL,
    ACTIVATE_SUCCESS,
    ACTIVATE_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
    AUTHENTICATE_SUCCESS,
    AUTHENTICATE_FAIL,
    LOGOUT,
    PASSWORD_RESET_CONFIRM_FAIL,
    PASSWORD_RESET_FAIL,
    PASSWORD_RESET_CONFIRM_SUCCESS,
    PASSWORD_RESET_SUCCESS,
    REFRESH_TOKEN_FAIL, 
    REFRESH_TOKEN_SUCCESS,
    CLEAR_MESSAGE
} from '../actions/types';


const initialState = {
    access: localStorage.getItem('access'),
    refresh: localStorage.getItem('refresh'),
    isAuthenticated: null,
    user: null,
    signupSuccess: null,
    resetSuccess: null,
    activateSuccess: null
};

export default function authReducer(state = initialState, action) {
    const { type, payload } = action;
    switch(type) {
        case SIGNUP_SUCCESS:
            return {
                ...state,
                isAuthenticated: false,
                message: 'Please check provided email address to activate account. Redirecting to login...',
                signupSuccess: true
            }
        case AUTHENTICATE_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                message: '',
                signupSuccess: null
            }
        case LOGIN_SUCCESS:
            localStorage.setItem('access', payload.access);
            localStorage.setItem('refresh', payload.refresh);
            return {
                ...state,
                isAuthenticated: true,
                access: payload.access,
                refresh: payload.refresh,
                error: null,
                message: 'Login successful.',
            };
        case REFRESH_TOKEN_SUCCESS:
            localStorage.setItem('access', payload.access);
            return {
                ...state,
                isAuthenticated: true,
                access: payload.access,
                error: null,
                message: 'Refresh successful!',
            };
        case LOAD_USER_SUCCESS:
            return {
                ...state,
                user: payload
            };
        case AUTHENTICATE_FAIL:
            return {
                ...state,
                isAuthenticated: false
            }
        case LOAD_USER_FAIL:
            return {
                ...state,
                user: null
            };
        case SIGNUP_FAIL:
            return {
                error: 'Invalid signup credentials provided. Please review and adjust.',
                ...state,
                access: null,
                refresh: null,
                isAuthenticated: false,
                user: null
            }
        case LOGIN_FAIL:
            return {
                ...state,
                error: 'Invalid email or password',
                access: null,
                refresh: null,
                isAuthenticated: false,
                user: null
            }
        case LOGOUT:
            localStorage.removeItem('access');
            localStorage.removeItem('refresh')
            return {
                ...state,
                access: null,
                refresh: null,
                isAuthenticated: false,
                user: null,
                error: null,
                message: 'Logout successful.'

            };
        case CLEAR_MESSAGE:
            return {
                ...state,
                message: null,
                error: null,
            };
        case PASSWORD_RESET_SUCCESS:
            return {
                ...state,
                message: 'An email will be sent to you if address is in our system. Redirecting to login...',
                resetSuccess: true
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
        case PASSWORD_RESET_CONFIRM_FAIL:
        case PASSWORD_RESET_FAIL:
        case PASSWORD_RESET_CONFIRM_SUCCESS:
        case REFRESH_TOKEN_FAIL:
            return {
                ...state
            }
        default:
            return state;
    }
}
