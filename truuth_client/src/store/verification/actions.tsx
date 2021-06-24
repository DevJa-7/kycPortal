import * as ActionTypes from './actionTypes';
import { 
    IVerificationDocument,
    IVerificationList,
    IVERIFICATION_DETAIL_EDIT_STATES,
} from 'shared_components/src/service/models/verification';

export const setVerifications = (list: IVerificationList) => ({
    type: ActionTypes.SET_VERIFICATION_LIST, 
    payload: list
});

export const resetVerifications = () => ({
    type: ActionTypes.RESET_VERIFICATION_LIST, 
});

export const setVerificationPageIndex = (index: number) => ({
    type: ActionTypes.SET_VERIFICATION_PAGE_INDEX, 
    payload: index,
});

export const setVerificationId = (verId: string) => ({
    type: ActionTypes.SET_VERIFICATION_ID, 
    payload: verId
});

export const setVerificationDetail = (data: IVerificationDocument) => ({
    type: ActionTypes.SET_VERIFICATION_DETAIL, 
    payload: data
});

export const setVerificationEditStates = (states: IVERIFICATION_DETAIL_EDIT_STATES) => ({
    type: ActionTypes.SET_VERIFICATION_EDIT_STATES, 
    payload: states
});


export const setVerificationEditDetailState = (state: boolean) => ({
    type: ActionTypes.SET_VERIFICATION_EDIT_STATE_DETAIL, 
    payload: state
});

export const setVerificationEditResultState = (state: boolean) => ({
    type: ActionTypes.SET_VERIFICATION_EDIT_STATE_RESULT, 
    payload: state
});

export type VerificationAction = 
    | ReturnType<typeof setVerificationId>
    | ReturnType<typeof setVerifications>
    | ReturnType<typeof resetVerifications>
    | ReturnType<typeof setVerificationPageIndex>
    | ReturnType<typeof setVerificationDetail>
    | ReturnType<typeof setVerificationEditStates>
    | ReturnType<typeof setVerificationEditDetailState>
    | ReturnType<typeof setVerificationEditResultState>;