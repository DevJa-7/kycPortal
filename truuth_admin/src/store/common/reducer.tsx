import { CommonAction } from './actions';
import * as ActionTypes from './actionTypes';
import { NOTIFICATION_STATES } from 'shared_components/src/common/constants';

type Common = {
    isLoading: boolean,
    isIdle: boolean,
    notification: {
        message: string,
        type: NOTIFICATION_STATES,
        classes?: any,
    },
}

const initialState: Common = {
    isLoading: false,
    isIdle: false,
    notification: {
        message: '',
        type: NOTIFICATION_STATES.info,
        classes: '',
    }
}

const commonReducer = (
    state: Common = initialState, 
    action: CommonAction,
) => {
    switch (action.type) {

        case ActionTypes.SET_LOADING:
            return {
                ...state,
                isLoading: action.payload,
            };

        case ActionTypes.CLEAR_LOADING:
            return {
                ...state,
                isLoading: action.payload,
            };

        case ActionTypes.SET_IDLE_STATUS:
            return {
                ...state,
                isIdle: action.payload,
            };

        case ActionTypes.SET_NOTIFICATION:
            return {
                ...state,
                notification: action.payload,
            };

        default:
            return state;
    }
}

export default commonReducer;