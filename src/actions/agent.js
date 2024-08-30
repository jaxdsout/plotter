import {
    NEW_CLIENT_SUCCESS,
    NEW_CLIENT_FAIL,
    LOAD_CLIENTS_SUCCESS,
    LOAD_CLIENTS_FAIL,
    UPDATE_CLIENT_SUCCESS,
    UPDATE_CLIENT_FAIL,
    LOAD_DEALS_SUCCESS,
    LOAD_DEALS_FAIL,
    NEW_DEAL_SUCCESS,
    NEW_DEAL_FAIL,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAIL,
    LOAD_LISTS_FAIL,
    LOAD_LISTS_SUCCESS
} from './types';

import axios from 'axios';

export const update_profile = (userID, full_name, trec, website, phone_number) => async dispatch => {
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('access')}`,
            }
        }; 
        const body = JSON.stringify({ full_name, trec, website, phone_number });
        try {
            console.log(body)
            const res = await axios.put(`${process.env.REACT_APP_API_URL}/profiles/${userID}/`, body, config);
            dispatch({
                type: UPDATE_PROFILE_SUCCESS,
                payload: res.data
            });
        } catch (err) {
            dispatch({
                type: UPDATE_PROFILE_FAIL
            });
        }
    } else {
        dispatch({
            type: UPDATE_PROFILE_FAIL
        });
    }
};


export const load_clients = () => async dispatch => {
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('access')}`,
            }
        }; 
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/clients/`, config);
            dispatch({
                type: LOAD_CLIENTS_SUCCESS,
                payload: res.data
            });
        } catch (err) {
            dispatch({
                type: LOAD_CLIENTS_FAIL
            });
        }
    } else {
        dispatch({
            type: LOAD_CLIENTS_FAIL
        });
    }
};


export const new_client = (agent, first_name, last_name, email, phone_number) => async dispatch => {
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('access')}`,
            }
        }; 
        const body = JSON.stringify({ agent, first_name, last_name, email, phone_number });
        console.log(body)
        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/clients/`, body, config);
            dispatch({
                type: NEW_CLIENT_SUCCESS,
                payload: res.data
            });
        } catch (err) {
            dispatch({
                type: NEW_CLIENT_FAIL
            });
        }
    } else {
        dispatch({
            type: NEW_CLIENT_FAIL
        });
    }
};


export const update_client = (clientID, agent, first_name, last_name, email, phone_number) => async dispatch => {
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('access')}`,
            }
        }; 
        const body = JSON.stringify({ agent, first_name, last_name, email, phone_number });
        try {
            console.log(body)
            const res = await axios.put(`${process.env.REACT_APP_API_URL}/clients/${clientID}/`, body, config);
            dispatch({
                type: UPDATE_CLIENT_SUCCESS,
                payload: res.data
            });
        } catch (err) {
            dispatch({
                type: UPDATE_CLIENT_FAIL
            });
        }
    } else {
        dispatch({
            type: UPDATE_CLIENT_FAIL
        });
    }
};


export const load_deals = () => async dispatch => {
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('access')}`,
            }
        }; 
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/deals/`, config);
            dispatch({
                type: LOAD_DEALS_SUCCESS,
                payload: res.data
            });
        } catch (err) {
            dispatch({
                type: LOAD_DEALS_FAIL
            });
        }
    } else {
        dispatch({
            type: LOAD_DEALS_FAIL
        });
    }
};


export const new_deal = (property, rent, rate, commission, flat_fee, move_date, unit_no,
            lease_term, client, agent) => async dispatch => {
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('access')}`,
            }
        }; 
        const body = JSON.stringify({ property, rent, rate, commission, flat_fee, move_date, unit_no,
            lease_term, client, agent });
        console.log(body)
        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/deals/`, body, config);
            dispatch({
                type: NEW_DEAL_SUCCESS,
                payload: res.data
            });
        } catch (err) {
            dispatch({
                type: NEW_DEAL_FAIL
            });
        }
    } else {
        dispatch({
            type: NEW_DEAL_FAIL
        });
    }
};


export const load_lists = () => async dispatch => {
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('access')}`,
            }
        }; 
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/lists/`, config);
            dispatch({
                type: LOAD_LISTS_SUCCESS,
                payload: res.data
            });
        } catch (err) {
            dispatch({
                type: LOAD_LISTS_FAIL
            });
        }
    } else {
        dispatch({
            type: LOAD_LISTS_FAIL
        });
    }
};

