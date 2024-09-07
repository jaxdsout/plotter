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
    CLEAR_OPTIONS_SUCCESS,
    SET_SEARCH_CLIENT_SUCCESS,
    SET_SEARCH_CLIENT_FAIL,
    RETRIEVE_LIST_FAIL,
    RETRIEVE_LIST_SUCCESS,
    UPDATE_OPTIONS_ORDER
} from "./types"

import axios from "axios";
import { v4 as uuidv4 } from 'uuid';

export const new_list = (agent, client) => async dispatch => {
    if (localStorage.getItem('access')) {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access')}`,
        }
    }; 
    const body = JSON.stringify({ agent, client });
    console.log(body, "body before list creation")
    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/lists/`, body, config);
        console.log("new list res data", res.data)
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



export const update_option = (option, price, unit_number, layout, sq_ft, available, notes, property, list) => async dispatch => {
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('access')}`,
            }
        }; 
        const body = JSON.stringify({ option, property, price, unit_number, layout, sq_ft, available, notes, list });
        console.log(body, "update option body")
        try {
            console.log(body)
            const res = await axios.put(`${process.env.REACT_APP_API_URL}/options/${option}/`, body, config);
            dispatch({
                type: UPDATE_OPTION_SUCCESS,
                payload: res.data
            });
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


export const set_search_client = (id, name) => dispatch => {
    if (localStorage.getItem('access')) {
        const client = { id, name };
        try {
            dispatch({
                type: SET_SEARCH_CLIENT_SUCCESS,
                payload: client
            });
        } catch (err) {
            dispatch({
                type: SET_SEARCH_CLIENT_FAIL
            });
        }
    } else {
        dispatch({
            type: SET_SEARCH_CLIENT_FAIL
        });
    }
}

export const add_list_uuid = (agent, client, list) => async dispatch => {
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('access')}`,
            }
        }; 
        const uuid = list.uuid === null ? uuidv4() : list.uuid;
        const body = JSON.stringify({ agent, client, uuid });
        try {
            const res = await axios.put(`${process.env.REACT_APP_API_URL}/lists/${list.id}/`, body, config);
            console.log("Updated list with new order or UUID:", res.data);
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
        console.error("No access token found.");
        dispatch({
            type: NEW_LIST_FAIL
        });
    }
};



export const retrieve_list = (uuid) => async dispatch => {
    if (uuid) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            }
        }; 
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/client-list/${uuid}/`, config);
            console.log("retrieved list", res.data)
            dispatch({
                type: RETRIEVE_LIST_SUCCESS,
                payload: res.data
            });
        } catch (err) {
            dispatch({
                type: RETRIEVE_LIST_FAIL
            });
        }
    } else {
        dispatch({
            type: RETRIEVE_LIST_FAIL
        });
    }
};


export const update_options_order = (newOrder) => (dispatch) => {
    dispatch({
        type: 'UPDATE_OPTIONS_ORDER',
        payload: newOrder,
    });
};