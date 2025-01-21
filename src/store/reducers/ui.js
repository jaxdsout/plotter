import {
    RESET_CLIENT_VIEW,
    RESET_SEND_MODE,
    SET_SEND_MODE,
    RESET_LIST_MODE,
    SET_LIST_MODE,
    SET_CLIENT_VIEW,
    SET_REORDER_MODE, 
    RESET_REORDER_MODE
} from '../actions/types';

const initialState = {
    access: localStorage.getItem('access'),
    refresh: localStorage.getItem('refresh'),
    isClientView: false,  
    isSendMode: false,
    isListMode: false,
    resetDealForm: false,
    isReorderMode: false,
};

export default function uiReducer(state = initialState, action) {
    const { type } = action;
    switch(type) {
        case SET_CLIENT_VIEW:
            return { 
                ...state, 
                isClientView: true 
            }
        case SET_SEND_MODE:
            return { 
            ...state, 
            isListMode: false, 
            isSendMode: true,
            }
        case SET_LIST_MODE:
            return { 
            ...state, 
            isListMode: true,
            isSendMode: false,
            }
        case SET_REORDER_MODE:
            return {
                ...state,
                isReorderMode: true
            }
        case RESET_CLIENT_VIEW:
            return { 
                ...state, 
                isClientView: false 
            }
        case RESET_LIST_MODE:
            return { 
            ...state, 
            isListMode: false, 
        }
        case RESET_SEND_MODE:
            return { 
            ...state, 
            isSendMode: false, 
            }
        case RESET_REORDER_MODE:
            return {
                ...state,
                isReorderMode: false
            }
        default:
            return state;
    }
}
