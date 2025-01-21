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
    LOAD_LISTS_SUCCESS,
    DELETE_DEAL_SUCCESS,
    DELETE_DEAL_FAIL,
    UPDATE_STATUS_SUCCESS,
    UPDATE_STATUS_FAIL,
    DELETE_CLIENT_FAIL,
    DELETE_CLIENT_SUCCESS,
    NEW_CARD_SUCCESS,
    NEW_CARD_FAIL,
    NEW_TASK_SUCCESS,
    NEW_TASK_FAIL,
    LOAD_TASKS_FAIL,
    LOAD_TASKS_SUCCESS,
    UPDATE_TASK_FAIL,
    UPDATE_TASK_SUCCESS,
    LOAD_PROPERTIES_FAIL,
    LOAD_PROPERTIES_SUCCESS,
} from './types';

import axios from 'axios';

export const update_profile = (userObj, trec, website, phone_number) => async dispatch => {
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('access')}`,
            }
        }; 
        const user = userObj.id
        const body = JSON.stringify({ user, trec, website, phone_number });
        console.log(body)
        try {
            const res = await axios.put(`${process.env.REACT_APP_API_URL}/profiles/${userObj.id}/`, body, config);
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

export const update_avatar = (userObj, file) => async dispatch => {
    if (localStorage.getItem('access')) {
        const formData = new FormData();
        formData.append('avatar', file);
        formData.append('id', userObj.id);

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${localStorage.getItem('access')}`,
                }
            };

            const res = await axios.put(`${process.env.REACT_APP_API_URL}/profiles/${userObj.id}/`, formData, config);
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


export const load_clients = (userID) => async dispatch => {
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('access')}`,
            }
        }; 
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/clients/?agent=${userID}`, config);
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


export const delete_client = (clientID) => async dispatch => {
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('access')}`,
            }
        }; 
        try {
            await axios.delete(`${process.env.REACT_APP_API_URL}/clients/${clientID}/`, config);
            dispatch({
                type: DELETE_CLIENT_SUCCESS,
            });
        } catch (err) {
            dispatch({
                type: DELETE_CLIENT_FAIL
            });
        }
    } else {
        dispatch({
            type: DELETE_CLIENT_FAIL
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


export const load_deals = (userID) => async dispatch => {
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('access')}`,
            }
        }; 
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/deals/?agent=${userID}`, config);
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


export const new_deal = (property, agent, client, unit_no, move_date, lease_term, rent, rate, flat_fee, commission) => async dispatch => {
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('access')}`,
            }
        }; 
        const body = {
            property,   
            unit_no,
            move_date,
            lease_term, 
            rent: parseInt(rent),   
            rate: rate ? parseInt(rate) : null, 
            flat_fee: flat_fee ? parseFloat(flat_fee) : null, 
            commission,  
            agent,    
            client   
        };
        console.log(body, "body")
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

export const delete_deal = (dealID) => async dispatch => {
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('access')}`,
            }
        }; 
        try {
            await axios.delete(`${process.env.REACT_APP_API_URL}/deals/${dealID}/`, config);
            dispatch({
                type: DELETE_DEAL_SUCCESS,
            });
        } catch (err) {
            dispatch({
                type: DELETE_DEAL_FAIL
            });
        }
    } else {
        dispatch({
            type: DELETE_DEAL_FAIL
        });
    }
};

export const update_deal_status = (dealID, status) => async dispatch => {
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('access')}`,
            }
        }; 
        const body = JSON.stringify({ status })
        console.log(body)
        try {
            await axios.patch(`${process.env.REACT_APP_API_URL}/deals/${dealID}/`, body, config);
            dispatch({
                type: UPDATE_STATUS_SUCCESS,
            });
        } catch (err) {
            dispatch({
                type: UPDATE_STATUS_FAIL
            });
        }
    } else {
        dispatch({
            type: UPDATE_STATUS_FAIL
        });
    }
};


export const load_lists = (userID) => async dispatch => {
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('access')}`,
            }
        }; 
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/lists/?agent=${userID}`, config);
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



export const new_guest_card = (property, agent, client, interested, move_by) => async dispatch => {
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('access')}`,
            }
        }; 
        const body = JSON.stringify({ property, agent, client, interested, move_by });
        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/cards/`, body, config);
            dispatch({
                type: NEW_CARD_SUCCESS,
                payload: res.data
            });
        } catch (err) {
            dispatch({
                type: NEW_CARD_FAIL
            });
        }
    } else {
        dispatch({
            type: NEW_CARD_FAIL
        });
    }
};


export const new_task = (user, description, is_active) => async dispatch => {
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('access')}`,
            }
        }; 
        const body = JSON.stringify({ user, description, is_active });
        console.log(body, 'body before new_task')
        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/tasks/`, body, config);
            dispatch({
                type: NEW_TASK_SUCCESS,
                payload: res.data
            });
        } catch (err) {
            dispatch({
                type: NEW_TASK_FAIL
            });
        }
    } else {
        dispatch({
            type: NEW_TASK_FAIL
        });
    }
};

export const load_tasks = (userID) => async dispatch => {
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('access')}`,
            }
        }; 
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/tasks/?user=${userID}`, config);
            dispatch({
                type: LOAD_TASKS_SUCCESS,
                payload: res.data
            });
        } catch (err) {
            dispatch({
                type: LOAD_TASKS_FAIL
            });
        }
    } else {
        dispatch({
            type: LOAD_TASKS_FAIL
        });
    }
};

export const update_task = (taskID, user, is_active) => async dispatch => {
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('access')}`,
            }
        }; 
        const body = JSON.stringify({ taskID, user, is_active });
        console.log(body)
        try {
            const res = await axios.put(`${process.env.REACT_APP_API_URL}/tasks/${taskID}/`, body, config);
            dispatch({
                type: UPDATE_TASK_SUCCESS,
                payload: res.data
            });
        } catch (err) {
            dispatch({
                type: UPDATE_TASK_FAIL
            });
        }
    } else {
        dispatch({
            type: UPDATE_TASK_FAIL
        });
    }
};


export const load_properties = () => async dispatch => {
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('access')}`,
            }
        }; 
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/properties/`, config);
            dispatch({
                type: LOAD_PROPERTIES_SUCCESS,
                payload: res.data
            });
        } catch (err) {
            dispatch({
                type: LOAD_PROPERTIES_FAIL
            });
        }
    } else {
        dispatch({
            type: LOAD_PROPERTIES_FAIL
        });
    }
};



