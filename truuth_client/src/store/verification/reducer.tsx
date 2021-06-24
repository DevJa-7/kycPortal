import * as ActionTypes from './actionTypes';
import { VerificationAction } from './actions';
import {
    IVerificationDocument,
    IVerificationList,
    IAgentDetails,
    IInviteeDetails,
    VERIFICATION_STATUS,
    IFace,
    IVerificationResult,
    IVERIFICATION_DETAIL_EDIT_STATES
} from 'shared_components/src/service/models/verification';

type Verification = {
    verifications:      IVerificationList,
    verificationPage:   number,
    verificationId:     string,
    verificationDetail: IVerificationDocument,
    editStatus:         IVERIFICATION_DETAIL_EDIT_STATES,
}

const initialState: Verification = {
    verifications:      {
        items:         [],
        count:         0,
        limit:         0,
        page:          1,
        pageCount:     1,
        hasPrevPage:   false,
        hasNextPage:   false,
        prevPage:      1,
        nextPage:      1,
    } as IVerificationList,
    verificationId:     '',
    editStatus: {
        result: false,
        detail: false,
    } as IVERIFICATION_DETAIL_EDIT_STATES,
    verificationPage:   1,
    verificationDetail: {
        gentDetails: {
            firstName: '',
            lastName: '',
            mobile: '',
        } as IAgentDetails,
        inviteeDetails: {
            firstName: '',
            lastName: '',
            email: '',
        } as IInviteeDetails,
        _id: '',
        verificationID: '',
        subscriptionID: '',
        agentID: '',
        externalRefId: '',
        status: VERIFICATION_STATUS.ERROR,
        createdAt: new Date(),
        updatedAt: new Date(),
        result: {
            verificationStatus: '',
            requiresManualVerification: false,
            verificationDetails: [],
        } as IVerificationResult,
        face: {
            imageUrl: ''
        } as IFace,
    } as unknown as IVerificationDocument,
}

const VerificationReducer = (
    state: Verification = initialState,
    action: VerificationAction,
) => {
    switch (action.type) {

        case ActionTypes.SET_VERIFICATION_LIST:
            return {
                ...state,
                verifications: action.payload,
            };

        case ActionTypes.RESET_VERIFICATION_LIST:
            return {
                ...state,
                verifications: initialState.verifications,
            };

        case ActionTypes.SET_VERIFICATION_PAGE_INDEX:
            return {
                ...state,
                verificationPage: action.payload,
            };

        case ActionTypes.SET_VERIFICATION_ID:
            return {
                ...state,
                verificationId: action.payload,
            };

        case ActionTypes.SET_VERIFICATION_DETAIL:
            return {
                ...state,
                verificationDetail: action.payload,
            };

        case ActionTypes.SET_VERIFICATION_EDIT_STATES:
            return {
                ...state,
                editStatus: action.payload,
            };

        case ActionTypes.SET_VERIFICATION_EDIT_STATE_DETAIL:
            return {
                ...state,
                editStatus: {
                    ...state.editStatus,
                    detail: action.payload,
                },
            };

        case ActionTypes.SET_VERIFICATION_EDIT_STATE_RESULT:
            return {
                ...state,
                editStatus: {
                    ...state.editStatus,
                    result: action.payload,
                },
            };
        default:
            return state;
    }
}

export default VerificationReducer;