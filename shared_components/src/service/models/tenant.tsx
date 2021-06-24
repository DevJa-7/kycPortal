/**
 * Tenant List
 */
import {
    IDataRetentionPolicy,
    IAPICredentials,
    ICallBack,
    IIdentityProofing,
} from './common';

export interface ITenantList {
    docs:          ITenantDocument[];
    totalDocs:     number;
    limit:         number;
    totalPages:    number;
    page:          number;
    pagingCounter: number;
    hasPrevPage:   boolean;
    hasNextPage:   boolean;
    prevPage:      number | null;
    nextPage:      number | null;
}

export interface IOwner {
    name: string,
    email: string,
    phoneNumber: string,
    address: string,
}

export interface IUserPool {
    id: string,
    name: string,
    usageIdentifierKey: string,
}

export interface ITenantDocument {
    alias: string,
    createdAt: Date,
    organisationName: string,
    owner: IOwner,
    product: string,
    status: string,
    tier: string,
    updatedAt: Date,
    userPool: IUserPool,
}

export interface ITenantFeatures {
    livenessCheck:       boolean;
    authorityCheck:      boolean;
    faceScan?:           boolean;
    voiceScan?:          boolean;
    dvs?:                boolean;
    addressVerification: boolean;
    sanctionScreening:   boolean;
    voiceRecognition?:   boolean;
    faceMatch?:          boolean;
}

/**
 * Tenant Selection
 */
export interface ITenantSelectItem {
    value: string,
    display: string,
    subfix: string,
}