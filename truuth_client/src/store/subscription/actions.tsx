import * as ActionTypes from './actionTypes';
import { ISubscripionDocument } from 'shared_components/src/service/models/subscription';

export const setSubscripions = (list: ISubscripionDocument[]) => ({
    type: ActionTypes.SET_SUBSCRIPTION_LIST, 
    payload: list
});

export const setSubscriptionId = (id: string) => ({
    type: ActionTypes.SET_SUBSCRIPTION_ID, 
    payload: id
});

export const setSubscriptionFilter = (filter: string) => ({
    type: ActionTypes.SET_SUBSCRIPTION_FILTER, 
    payload: filter
});

export const setSubscriptionKycState = (kycState: string) => ({
    type: ActionTypes.SET_SUBSCRIPTION_KYCSTATE, 
    payload: kycState
});

export type SubscriptionAction = 
    | ReturnType<typeof setSubscripions>
    | ReturnType<typeof setSubscriptionId>
    | ReturnType<typeof setSubscriptionFilter>
    | ReturnType<typeof setSubscriptionKycState>;