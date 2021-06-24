/**
 * Subscription List
 */
import {
    IDataRetentionPolicy,
    IAPICredentials,
    ICallBack,
    IIdentityProofing
} from './common';

export interface ISubsriptionList {
    docs:          ISubscripionDocument[];
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

export interface ISubscripionDocument {
    __v:                  number;
    _id:                  string;
    id:                   string;
    schemaVersion:        string;
    subscriptionID:       string;
    name:                 string;
    status:               string;
    channels:             string[];
    updatedBy?:           string;
    captureMethod:        string;
    autoSyncAcceptedIDs?: boolean;
    features:             ISubscriptionFeatures;
    dataRetentionPolicy:  IDataRetentionPolicy;
    apiCredentials:       IAPICredentials;
    callBack?:            ICallBack;
    identityProofing?:    IIdentityProofing[];
    callbackURL?:         string;
    createdBy:            string;
    createdAt:            string;
    updatedAt:            string;
}

export interface ISubscriptionFeatures {
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
 * Subscription Selection
 */
export interface ISubscripionSelectItem {
    value: string,
    display: string,
    subfix: string,
}
