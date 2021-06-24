import * as ActionTypes from './actionTypes';
import { SubscriptionAction } from './actions';
import { 
    ISubscripionDocument,
} from 'shared_components/src/service/models/subscription';
import { VERIFICATION_STATES } from 'shared_components/src/service/models/verification';

type Subscription = {
    subscriptions:  ISubscripionDocument[],
    subscriptionId: string,
    filter:         string,
    kycState:       string,
}

const initialState: Subscription = {
    subscriptions:  [],
    subscriptionId: '',
    filter:         '',
    kycState:       VERIFICATION_STATES[0].value,
}

const SubscriptionReducer = (
    state: Subscription = initialState, 
    action: SubscriptionAction,
) => {
    switch (action.type) {

        case ActionTypes.SET_SUBSCRIPTION_LIST:
            return {
                ...state,
                subscriptions: action.payload,
            };
            
        case ActionTypes.SET_SUBSCRIPTION_ID:
            return {
                ...state,
                subscriptionId: action.payload,
            };

        case ActionTypes.SET_SUBSCRIPTION_FILTER:
            return {
                ...state,
                filter: action.payload,
            };

        case ActionTypes.SET_SUBSCRIPTION_KYCSTATE:
            return {
                ...state,
                kycState: action.payload,
            };

        default:
            return state;
    }
}

export default SubscriptionReducer;