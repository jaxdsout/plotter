import { 
    NEW_LIST_FAIL,
    NEW_LIST_SUCCESS,
    UPDATE_OPTION_FAIL,
    UPDATE_OPTION_SUCCESS,
    NEW_OPTION_FAIL,
    NEW_OPTION_SUCCESS,
    LOAD_OPTIONS_FAIL,
    LOAD_OPTIONS_SUCCESS,
    DELETE_OPTION_FAIL,
    DELETE_OPTION_SUCCESS,
    SEARCH_CLIENT_FAIL,
    SEARCH_CLIENT_SUCCESS,
    SEARCH_PROPERTY_SUCCESS,
    SEARCH_PROPERTY_FAIL,
    CLEAR_OPTIONS_FAIL,
    CLEAR_OPTIONS_SUCCESS
} from "./types"

import axios from "axios";

export const new_list = (agentID, clientID) => async dispatch => {
    if (localStorage.getItem('access')) {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access')}`,
        }
    }; 
    const body = JSON.stringify({ agentID, clientID });
    console.log(body, "body before list creation")
    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/lists/`, body, config);
        dispatch({
            type: NEW_LIST_SUCCESS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: NEW_LIST_FAIL
        });
    }
    } else {
    dispatch({
        type: NEW_LIST_FAIL
    });
    }
};


export const search_clients = (query, userID) => async dispatch => {
    if (localStorage.getItem('access')) {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access')}`,
        }
    }; 
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/clients/?agent=${userID}&search=${query}`, config);
        console.log("search clients", res.data)
        dispatch({
            type: SEARCH_CLIENT_SUCCESS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: SEARCH_CLIENT_FAIL
        });
    }
    } else {
    dispatch({
        type: SEARCH_CLIENT_FAIL
    });
    }
};


export const new_option = (property, list, client) => async dispatch => {
    if (localStorage.getItem('access')) {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access')}`,
        }
    }; 
    const body = JSON.stringify({ property, list, client });
    console.log(body)
    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/options/`, body, config);
        dispatch({
            type: NEW_OPTION_SUCCESS,
            payload: res.data
        });
        dispatch(load_options(list));
    } catch (err) {
        dispatch({
            type: NEW_OPTION_FAIL
        });
    }
    } else {
    dispatch({
        type: NEW_OPTION_FAIL
    });
    }
};



export const load_options = (listID) => async dispatch => {
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('access')}`,
            }
        }; 
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/lists/${listID}/`, config);
            dispatch({
                type: LOAD_OPTIONS_SUCCESS,
                payload: res.data
            });
        } catch (err) {
            dispatch({
                type: LOAD_OPTIONS_FAIL
            });
        }
    } else {
        dispatch({
            type: LOAD_OPTIONS_FAIL
        });
    }
};


export const delete_option = (optionID, list) => async dispatch => {
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('access')}`,
            }
        }; 
        try {
            await axios.delete(`${process.env.REACT_APP_API_URL}/options/${optionID}/`, config);
            dispatch({
                type: DELETE_OPTION_SUCCESS,
            });
            console.log("option deleted")
            dispatch(load_options(list));
        } catch (err) {
            dispatch({
                type: DELETE_OPTION_FAIL
            });
        }
    } else {
        dispatch({
            type: DELETE_OPTION_FAIL
        });
    }
};



export const update_option = (optionID, listID, price, unit_number, layout, sq_ft, available, notes, list, property) => async dispatch => {
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('access')}`,
            }
        }; 
        const body = JSON.stringify({ price, unit_number, layout, sq_ft, available, notes, list, property });
        try {
            console.log(body)
            const res = await axios.put(`${process.env.REACT_APP_API_URL}/options/${optionID}/`, body, config);
            dispatch({
                type: UPDATE_OPTION_SUCCESS,
                payload: res.data
            });
            dispatch(load_options(listID));
        } catch (err) {
            dispatch({
                type: UPDATE_OPTION_FAIL
            });
        }
    } else {
        dispatch({
            type: UPDATE_OPTION_FAIL
        });
    }
};



export const search_properties = (query) => async dispatch => {
    if (localStorage.getItem('access')) {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access')}`,
        }
    }; 
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/properties/?search=${query}`, config);
        dispatch({
            type: SEARCH_PROPERTY_SUCCESS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: SEARCH_PROPERTY_FAIL
        });
    }
    } else {
    dispatch({
        type: SEARCH_PROPERTY_FAIL
    });
    }
};


export const clear_options = (listID) => async dispatch => {
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('access')}`,
            }
        };
        try {
            await axios.delete(`${process.env.REACT_APP_API_URL}/lists/${listID}/clear-options/`, config);
            dispatch({
                type: CLEAR_OPTIONS_SUCCESS,
                payload: { options: [] } 
            });
        } catch (err) {
            dispatch({
                type: CLEAR_OPTIONS_FAIL
            });
        }
    } else {
        dispatch({
            type: CLEAR_OPTIONS_FAIL
        });
    }
};

