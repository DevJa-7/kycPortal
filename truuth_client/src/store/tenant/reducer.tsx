import * as ActionTypes from './actionTypes';
import { TenantAction } from './actions';
import {
    ITenantDocument,
    VERIFICATION_STATES
} from 'shared_components/src/service/models';

type Tenant = {
    tenants:  ITenantDocument[],
    tenantAlias: string,
    filter: string,
    kycState: string,
}

const initialState: Tenant = {
    tenants:  [],
    tenantAlias: '',
    filter:   '',
    kycState: VERIFICATION_STATES[0].value,
}

const TenantReducer = (
    state: Tenant = initialState,
    action: TenantAction,
) => {
    switch (action.type) {

        case ActionTypes.SET_TENANT_LIST:
            return {
                ...state,
                tenants: action.payload,
            };

        case ActionTypes.SET_TENANT_ALIAS:
            return {
                ...state,
                tenantAlias: action.payload,
            };

        case ActionTypes.SET_TENANT_FILTER:
            return {
                ...state,
                filter: action.payload,
            };

        case ActionTypes.SET_TENANT_KYCSTATE:
            return {
                ...state,
                kycState: action.payload,
            };

        default:
            return state;
    }
}

export default TenantReducer;
