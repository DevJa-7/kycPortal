import * as ActionTypes from './actionTypes';
import {
    IVerifierJobState,
} from 'shared_components/src/service/models/manual-verification';

export const setJobState = (detail: IVerifierJobState) => ({
    type: ActionTypes.SET_JOB_STATE,
    payload: detail,
});

export type ManualVerificatonActions =
    | ReturnType<typeof setJobState>;
