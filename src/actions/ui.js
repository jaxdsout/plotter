import { 
    RESET_CLIENT_VIEW,
    SET_SEND_MODE,
    RESET_SEND_MODE,
    RESET_LIST_MODE,
    SET_LIST_MODE,
    SET_CLIENT_VIEW,
    RESET_DEAL_FORM,
    CLEAR_MESSAGE,
    SET_REORDER_MODE,
    RESET_REORDER_MODE
} from "./types"


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

export const set_list_mode = () => dispatch => {
    dispatch({
        type: SET_LIST_MODE
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

export const reset_deal_form = () => dispatch => {
    dispatch({
        type: RESET_DEAL_FORM
    });
    return Promise.resolve();
};

export const clear_message = () => dispatch => {
    dispatch({
        type: CLEAR_MESSAGE,
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
