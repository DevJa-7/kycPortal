import * as ActionTypes from './actionTypes';
import { ManualVerificatonActions } from './actions';
import { IVerifierJobState } from 'shared_components/src/service/models/manual-verification';

type ManualVerification = {
    job: IVerifierJobState | null | undefined,
}

const initialState: ManualVerification = {
    job: undefined,
}

const Reducer = (
    state: ManualVerification = initialState,
    action: ManualVerificatonActions,
) => {
    switch (action.type) {

        case ActionTypes.SET_JOB_STATE:
            return {
                ...state,
                job: action.payload,
            };

        default:
            return state;
    }
}

export default Reducer;
