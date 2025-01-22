import {
    SIGNUP_SUCCESS,
    SIGNUP_FAIL,
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
    REFRESH_TOKEN_FAIL, 
    REFRESH_TOKEN_SUCCESS,
    CLEAR_MESSAGE,
    LOCK_OUT
} from '../actions/types';

const initialState = {
    access: localStorage.getItem('access'),
    refresh: localStorage.getItem('refresh'),
    isAuthenticated: false,
    user: null,
};



export default function authReducer(state = initialState, action) {
    const { type, payload } = action;
    switch(type) {
        case SIGNUP_SUCCESS:
            return {
                ...state,
                isAuthenticated: false,
                message: 'Please check provided email address to activate account. Redirecting to login...',
            }
        case AUTHENTICATE_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                message: '',
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
                access: payload,
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
        case LOCK_OUT:
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
