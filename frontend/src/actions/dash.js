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

} from './types';

import axios from 'axios';

export const new_client = (first_name, last_name, email, phone_number) => async (dispatch, getState) => {
    const state = getState()
    const { access, user } = state.auth;

    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `JWT ${access}`,
            'Accept': 'application/json'
        }
    };

    const agent = user.id
    console.log(agent)

    const body = JSON.stringify({ first_name, last_name, email, phone_number, agent });

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/plotter/clients/`, body, config);

        dispatch({
            type: NEW_CLIENT_SUCCESS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: NEW_CLIENT_FAIL
        })
    }
};