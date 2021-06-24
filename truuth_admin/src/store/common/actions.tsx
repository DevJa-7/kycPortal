import { 
    SET_LOADING,
    CLEAR_LOADING,
    SET_NOTIFICATION,
    SET_IDLE_STATUS
} from './actionTypes';

import { INotification } from 'shared_components/src/common/constants';

export const setLoading = () => ({type: SET_LOADING, payload: true});
export const clearLoading = () => ({type: CLEAR_LOADING, payload: false});
export const setIdleStatus = (isIdle: boolean) => ({type: SET_IDLE_STATUS, payload: isIdle});
export const setNotification = (info: INotification) => ({
    type: SET_NOTIFICATION, 
    payload: info, 
});

export type CommonAction = 
    | ReturnType<typeof setLoading>
    | ReturnType<typeof clearLoading>
    | ReturnType<typeof setIdleStatus>
    | ReturnType<typeof setNotification>;