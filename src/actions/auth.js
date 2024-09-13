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
    REFRESH_TOKEN_SUCCESS,
    REFRESH_TOKEN_FAIL
} from './types';

import axios from 'axios';
import { Base64 } from 'js-base64';

export const load_user = () => async dispatch => {
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('access')}`,
            }
        }; 
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/auth/users/me/`, config);
            dispatch({
                type: LOAD_USER_SUCCESS,
                payload: res.data
            });
        } catch (err) {
            dispatch({
                type: LOAD_USER_FAIL
            });
        }
    } else {
        dispatch({
            type: LOAD_USER_FAIL
        });
    }
};

export const auth_user = () => async dispatch => {
    if(localStorage.getItem('access')) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        };
        const body = JSON.stringify({ token: localStorage.getItem('access') })
        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/jwt/verify/`, body, config)

            if (res.data.code !== 'token_not_valid') {
                dispatch({
                    type: AUTHENTICATE_SUCCESS
                });
            } else {
                dispatch({
                    type: AUTHENTICATE_FAIL
                });
            }
        } catch (err) {
            dispatch({
                type: AUTHENTICATE_FAIL
            });
        }
    } else {
        dispatch({
            type: AUTHENTICATE_FAIL
        });
    }
};

export const signup = (first_name, last_name, email, password, re_password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    const cap_first_name = capitalize(first_name);
    const cap_last_name = capitalize(last_name);

    const body = JSON.stringify({
        first_name: cap_first_name,
        last_name: cap_last_name,
        email,
        password,
        re_password
    });

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/`, body, config);
        console.log('url', process.env.REACT_APP_API_URL)
        dispatch({
            type: SIGNUP_SUCCESS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: SIGNUP_FAIL
        });
    }
};


export const activate = (uid, token) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const encodedUid = Base64.encode(uid);
    const body = JSON.stringify({ uid: encodedUid, token });
    try {
        await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/activation/`, body, config);
        
        dispatch({
            type: ACTIVATE_SUCCESS,
        })

    } catch (error) {
        dispatch({
            type: ACTIVATE_FAIL
        })
    }
}

export const login = (email, password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ email, password });
    
    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/jwt/create/`, body, config);
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        })

        dispatch(load_user());

    } catch (error) {
        dispatch({
            type: LOGIN_FAIL
        })
    }


}

export const reset_password = (email) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    const body = JSON.stringify({ email })

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/reset_password/`, body, config);
        
        dispatch({
            type: PASSWORD_RESET_SUCCESS,
            payload: res.data
        })


    } catch (error) {
        dispatch({
            type: PASSWORD_RESET_FAIL
        })
    }
};

export const reset_password_confirm = (uid, token, new_password, re_new_password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ uid, token, new_password, re_new_password })

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/reset_password_confirm/`, body, config);
        
        dispatch({
            type: PASSWORD_RESET_CONFIRM_SUCCESS,
            payload: res.data
        })


    } catch (error) {
        dispatch({
            type: PASSWORD_RESET_CONFIRM_FAIL
        })
    }
};

export const logout = () => dispatch => {
    dispatch({
        type: LOGOUT
    });
}

export const refresh_token = () => async dispatch => {
    const refresh = localStorage.getItem('refresh');
    if (refresh) {
        try {
            const res = await axios.post('/auth/jwt/refresh/', { refresh });
            const { access } = res.data;            
            localStorage.setItem('access', access);
            dispatch({
                type: REFRESH_TOKEN_SUCCESS,
                payload: access
            });
        } catch (error) {
            dispatch({
                type: REFRESH_TOKEN_FAIL
            });
        }
    }
};

