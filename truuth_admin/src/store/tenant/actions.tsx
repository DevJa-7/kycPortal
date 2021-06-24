import * as ActionTypes from './actionTypes';
import { ITenantDocument } from 'shared_components/src/service/models/tenant';

export const setTenants = (productCode: string, list: ITenantDocument[]) => ({
    type: ActionTypes.SET_TENANT_LIST,
    payload: {
        [productCode]: list
    },
});

export const setTenantAlias = (id: string) => ({
    type: ActionTypes.SET_TENANT_ALIAS,
    payload: id
});

export const setTenantFilter = (filter: string) => ({
    type: ActionTypes.SET_TENANT_FILTER,
    payload: filter
});

export const setTenantKycState = (kycState: string) => ({
    type: ActionTypes.SET_TENANT_KYCSTATE,
    payload: kycState
});

export type TenantAction =
    | ReturnType<typeof setTenants>
    | ReturnType<typeof setTenantAlias>
    | ReturnType<typeof setTenantFilter>
    | ReturnType<typeof setTenantKycState>;