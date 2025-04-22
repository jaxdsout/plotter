import { 
    RESET_CLIENT_VIEW,
    SET_SEND_MODE,
    RESET_SEND_MODE,
    RESET_LIST_MODE,
    SET_LIST_MODE,
    SET_CLIENT_VIEW,
    RESET_DEAL_FORM,
    SET_REORDER_MODE,
    RESET_REORDER_MODE,
    CLEAR_MESSAGE,
    RESET_CARD_FORM,
    TAB_SWITCH_CLEAR,
    RESET_COMMISSION_SEARCH,
    SET_RESET_SUCCESS,
    SET_ACTIVATE_SUCCESS,
    SET_SIGNUP_SUCCESS,
    RESET_DEAL_MODE,
    SET_DEAL_MODE,
    RESET_EDIT_LIST,
    CLIENT_FOUND_SOMEWHERE,
    CLIENT_NOT_FOUND,
    PROFILE_WIDGET_OPEN,
    PROFILE_WIDGET_CLOSE,
    SET_EDIT_LIST
} from "./types"

import axios from "axios";

export const verify_client_status = (client) => async dispatch => {
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('access')}`,
            }
        }; 
        try {
            const encodeSearch = encodeURIComponent(`${client.first_name} ${client.last_name} ${client.email} ${client.phone_number}`)

            const res = await axios.get(`${process.env.REACT_APP_API_URL}/clients/?search=${encodeSearch}`, config);
            if (res.data.length > 1) {
                dispatch({
                    type: CLIENT_FOUND_SOMEWHERE,
                    payload: res.data
                });
            } else {
                dispatch({
                    type: CLIENT_NOT_FOUND
                }); 
            }
        } catch (err) {
            dispatch({
                type: CLIENT_NOT_FOUND
            });
        }
    } else {
        dispatch({
            type: CLIENT_NOT_FOUND
        });
    }
};


export const verify_client_initial = (client) => async dispatch => {
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('access')}`,
            }
        }; 
        try {
            const encodeSearch = encodeURIComponent(`${client.first_name} ${client.last_name} ${client.email} ${client.phone_number}`)

            const res = await axios.get(`${process.env.REACT_APP_API_URL}/clients/?search=${encodeSearch}`, config);
            if (res.data.length >= 1) {
                dispatch({
                    type: CLIENT_FOUND_SOMEWHERE,
                    payload: res.data
                });
            } else {
                dispatch({
                    type: CLIENT_NOT_FOUND
                }); 
            }
        } catch (err) {
            dispatch({
                type: CLIENT_NOT_FOUND
            });
        }
    } else {
        dispatch({
            type: CLIENT_NOT_FOUND
        });
    }
};

export const reset_client_taken = () => dispatch => {
    dispatch({
        type: CLIENT_NOT_FOUND
    })
}


export const clear_message = () => dispatch => {
    dispatch({
        type: CLEAR_MESSAGE,
    });
    return Promise.resolve();
};

export const set_client_view = () => dispatch => {
    dispatch({
        type: SET_CLIENT_VIEW
    });
    return Promise.resolve();
};

export const reset_client_view = () => dispatch => {
    dispatch({
        type: RESET_CLIENT_VIEW
    });
    return Promise.resolve();
};

export const set_send_mode = () => dispatch => {
    dispatch({
        type: SET_SEND_MODE
    });
    return Promise.resolve();
};

export const reset_commission = () => dispatch => {
    dispatch({
        type: RESET_COMMISSION_SEARCH
    });
    return Promise.resolve();
};

export const set_list_mode = () => dispatch => {
    dispatch({
        type: SET_LIST_MODE
    });
    return Promise.resolve();
};

export const set_deal_mode = () => dispatch => {
    dispatch({
        type: SET_DEAL_MODE
    });
    return Promise.resolve();
};

export const reset_send_mode = () => dispatch => {
    dispatch({
        type: RESET_SEND_MODE
    });
    return Promise.resolve();
};

export const reset_list_mode = () => dispatch => {
    dispatch({
        type: RESET_LIST_MODE
    });
    return Promise.resolve();
};

export const reset_deal_mode = () => dispatch => {
    dispatch({
        type: RESET_DEAL_MODE
    });
    return Promise.resolve();
};

export const reset_deal_form = () => dispatch => {
    dispatch({
        type: RESET_DEAL_FORM
    });
    return Promise.resolve();
};


export const reset_guest_card = () => dispatch => {
    dispatch({
        type: RESET_CARD_FORM
    });
    return Promise.resolve();
};


export const set_reorder_mode = () => dispatch => {
    dispatch({
        type: SET_REORDER_MODE
    });
    return Promise.resolve();
};

export const reset_reorder_mode = () => dispatch => {
    dispatch({
        type: RESET_REORDER_MODE
    });
    return Promise.resolve();
};

export const tab_switch = () => dispatch => {
    dispatch({
        type: TAB_SWITCH_CLEAR
    });
    return Promise.resolve();
};

export const set_reset_success = () => dispatch => {
    dispatch({
        type: SET_RESET_SUCCESS
    })
}

export const set_activate_success = () => dispatch => {
    dispatch({
        type: SET_ACTIVATE_SUCCESS
    })
}
export const set_signup_success = () => dispatch => {
    dispatch({
        type: SET_SIGNUP_SUCCESS
    })
}


export const set_edit_list = () => dispatch => {
    dispatch({
        type: SET_EDIT_LIST
    })
}


export const reset_edit_list = () => dispatch => {
    dispatch({
        type: RESET_EDIT_LIST
    })
}


export const profile_widget_open = () => dispatch => {
    dispatch({
        type: PROFILE_WIDGET_OPEN
    })
}

export const profile_widget_close = () => dispatch => {
    dispatch({
        type: PROFILE_WIDGET_CLOSE
    })
}
