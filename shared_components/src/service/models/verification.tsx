import { IListType } from '../../common/constants';

/**
 * Verification List
 */
export interface IVerificationList {
    items: IVerificationDocument[];
    count: number;
    limit: number;
    page: number;
    pageCount: number;
    hasPrevPage: boolean;
    hasNextPage: boolean;
    prevPage: number;
    nextPage: number;
}

/**
 * Verification Document
 */
export interface IVerificationDocument {
    agentDetails: IAgentDetails;
    inviteeDetails: IInviteeDetails;
    _id: string;
    verificationID: string;
    subscriptionID: string;
    agentID: string;
    externalRefId: string;
    status: VERIFICATION_STATUS;
    createdAt: Date;
    updatedAt: Date;
    result?: IVerificationResult;
    face?: IFace;
}

export interface IAgentDetails {
    firstName: string;
    lastName: string;
    mobile: string;
}

export interface IFace {
    imageUrl: string;
}

export interface IInviteeDetails {
    email: string;
    firstName: string;
    lastName: string;
}

export interface IVerificationResult {
    verificationStatus: string;
    requiresManualVerification: boolean;
    verificationDetails?: IVerificationDetail[];
}

export enum VERIFICATION_STATUS {
    NEW = 'NEW',
    IN_PROGRESS = 'IN_PROGRESS',
    PROCESSING = 'PROCESSING',
    DONE = 'DONE',
    DELETE = 'DELETE',
    ERROR = 'ERROR',
}

/**
 * Verification Detail
 */
export interface IVerificationDetail {
    _id: string;
    documentType: VERIFICATION_DOCUMENT_TYPES;
    identityDocument: IIdentityDocument;
    security: IVerificationDetailSecurity;
    images: IVerificationDetailImages;
    provider: VERIFICATION_PROVIDER;
    outcome: string;
}

export interface IIdentityDocument {
    personalNumber: string,
    firstName: string,
    lastName: string,
    dateOfBirth: string,
    dateOfExpiry: string,
    country: string,
    placeOfBirth: string,
    state: string,
    licenceClass: string,
    idNumber: string,
    MRZ1: string,
    MRZ2: string,
    cardNumber: string,
    dateOfIssue: string,
    gender: string,
    issueNumber: string,
    issuingAuthority: string,
    issuingCode: string,
    middleName: string,
    nationality: string,
    passportType: string,
    firstName2?: string,
    lastName2?: string,
    firstName3?: string,
    lastName3?: string,
    firstName4?: string,
    lastName4?: string,
    firstName5?: string,
    lastName5?: string,
    individualReferenceNumber?: number,
    cardType?: string,
}

export interface IVerificationDetailImages {
    frontImageUrl: string;
    backImageUrl: string;
}

export interface IVerificationDetailSecurity {
    documentAuthenticity?: DOCUMENT_AUTHENTICITY_CHECK,
    faceMatch?: FACE_MATCH_CHECK,
    expired?: EXPIRY_CHECK,
    nameMatch?: NAME_MATCH_CHECK,
    dobMatch?: DOB_MATCH_CHECK,
    ePassportChip?: EPASSPORT_CHIP_CHECK,
    dvsCheck?: DVS_CHECK,
    irnMatch?: IRN_CHECK,
}

export enum DOCUMENT_AUTHENTICITY_CHECK {
    ok = 'OK',
    failed = 'FAILED',
    na = 'N/A',
}

export enum FACE_MATCH_CHECK {
    ok = 'OK',
    failed = 'FAILED',
    na = 'N/A',
}

export enum EXPIRY_CHECK {
    ok = 'OK',
    expired = 'EXPIRED',
    na = 'N/A',
}

export enum NAME_MATCH_CHECK {
    ok = 'OK',
    failed = 'FAILED',
    na = 'N/A',
}

export enum DOB_MATCH_CHECK {
    ok = 'OK',
    failed = 'FAILED',
    na = 'N/A',
}

export enum EPASSPORT_CHIP_CHECK {
    ok = 'OK',
    failed = 'FAILED',
    data = 'DATA',
    mismatch = 'MISMATCH',
    na = 'N/A',
}

export enum DVS_CHECK {
    ok = 'OK',
    failed = 'FAILED',
    na = 'N/A',
}

export enum IRN_CHECK {
    ok = 'OK',
    failed = 'FAILED',
}

export enum VERIFICATION_DOCUMENT_TYPES {
    DRIVERS_LICENCES = 'DRIVERS_LICENCE',
    PASSPORT = 'PASSPORT',
    MEDICARE_CARD = 'MEDICARE',
    PROOF_OF_AGE_CARD = 'PROOF_OF_AGE_CARD',
}

export enum VERIFICATION_PROVIDER {
    TEXTRACT = 'TEXTRACT',
    NETVERIFY = 'NETVERIFY'
}

export enum VERIFICATION_RESULT_VALUE {
    APPROVED_VERIFIED = 'APPROVED_VERIFIED',
    DENIED_FRAUD = 'DENIED_FRAUD',
    DENIED_UNSUPPORTED_ID_TYPE = 'DENIED_UNSUPPORTED_ID_TYPE',
    DENIED_UNSUPPORTED_ID_COUNTRY = 'DENIED_UNSUPPORTED_ID_COUNTRY',
    ERROR_NOT_READABLE_ID = 'ERROR_NOT_READABLE_ID',
    NO_ID_UPLOADE = 'NO_ID_UPLOADE',
    DENIED_UNMATCH_FACE_IMAGE = 'DENIED_UNMATCH_FACE_IMAGE',
    REJECTED_NAME_MISMATCH = 'REJECTED_NAME_MISMATCH',
    DECLINE_TERMS_AND_CONDITIONS = 'DECLINE_TERMS_AND_CONDITIONS',
    DENIED_DOCUMENT_EXPIRED = 'DENIED_DOCUMENT_EXPIRED',
    DENIED_MULTIPLE_REASONS = 'DENIED_MULTIPLE_REASONS',
    REJECTED_DVS_FAIL = 'REJECTED_DVS_FAIL',
    REJECTED_DOB_MISMATCH = 'REJECTED_DOB_MISMATCH',
    DENIED_EPASSPORT_FAIL = 'DENIED_EPASSPORT_FAIL',
    DENIED_EPASSPORT_DATA_MISMATCH = 'DENIED_EPASSPORT_DATA_MISMATCH',
    AWAITING_VERIFICATION = 'AWAITING_VERIFICATION',
    AWAIT_MANUAL_VERIFICATION = 'AWAIT_MANUAL_VERIFICATION',
    REJECTED_DOCUMENT_NOT_AUTHENTIC = 'REJECTED_DOCUMENT_NOT_AUTHENTIC',
    REJECTED_IRN_MISMATCH = 'REJECTED_IRN_MISMATCH'
}
/**
 * Invite For KYC
 */
export interface IVerificationInviteRequest {
    email: string,
    firstName?: string,
    lastName?: string,
    externalRefId?: string,
    organisation?: string,
}

/**
 * Others
 */
export const VERIFICATION_STATUS_DISPLAY: { [key: string]: string } = {
    NEW: 'New',
    PROCESSING: 'Processing',
    IN_PROGRESS: 'In Progress',
    DONE: 'Done',
    DELETE: 'Delete',
    ERROR: 'Error',
}

export const VERIFICATION_STATES = [
    { value: 'all', display: 'All', subfix: '', },
    { value: 'new', display: 'New', subfix: 'NEW', },
    { value: 'in-progress', display: 'In Progress', subfix: 'IN_PROGRESS' },
    { value: 'processing', display: 'Processing', subfix: 'PROCESSING' },
    { value: 'done', display: 'Done', subfix: 'DONE' },
];

export interface IVerificationDetailResult {
    value: string,
    display: string,
    reason: string,
}

export const VERIFICATION_RESULTS: IVerificationDetailResult[] = [
    { value: VERIFICATION_RESULT_VALUE.APPROVED_VERIFIED, display: 'APPROVED', reason: '' },
    { value: VERIFICATION_RESULT_VALUE.DENIED_FRAUD, display: 'REJECTED - FRAUD', reason: 'Fraud' },
    { value: VERIFICATION_RESULT_VALUE.DENIED_UNSUPPORTED_ID_TYPE, display: 'REJECTED - UNSUPPORTED ID TYPE', reason: 'Type of the ID document is not supported for the organisation' },
    { value: VERIFICATION_RESULT_VALUE.DENIED_UNSUPPORTED_ID_COUNTRY, display: 'REJECTED - UNSUPPORTED ID COUNTRY', reason: 'Country of the ID document is not supported for the organisation' },
    { value: VERIFICATION_RESULT_VALUE.ERROR_NOT_READABLE_ID, display: 'REJECTED - ID NOT READBLE', reason: 'ID document is not readable' },
    { value: VERIFICATION_RESULT_VALUE.NO_ID_UPLOADE, display: 'REJECTED - NO ID UPLOADED', reason: 'No ID document was uploaded' },
    { value: VERIFICATION_RESULT_VALUE.DENIED_UNMATCH_FACE_IMAGE, display: 'REJECTED - MISMATCH FACE IMAGE', reason: 'Face image captured does not match the image on the ID document' },
    { value: VERIFICATION_RESULT_VALUE.REJECTED_NAME_MISMATCH, display: 'REJECTED - NAME MISMATCH', reason: 'Name mismatch and not additional documents provided.' },
    { value: VERIFICATION_RESULT_VALUE.DECLINE_TERMS_AND_CONDITIONS, display: 'REJECTED - DECLINED T&C', reason: 'Decline Terms and conditions in mobile app' },
    { value: VERIFICATION_RESULT_VALUE.DENIED_DOCUMENT_EXPIRED, display: 'REJECTED - EXPIRED DOCUMENT', reason: 'One or more of the documents submitted has expired.' },
    { value: VERIFICATION_RESULT_VALUE.REJECTED_DVS_FAIL, display: 'REJECTED - DVS CHECK FAILED', reason: 'Document did not pass the Australian Document Verification Service check.' },
    { value: VERIFICATION_RESULT_VALUE.REJECTED_DOB_MISMATCH, display: 'REJECTED - DOB MISMATCH', reason: 'Date of Birth mismatch.' },
    { value: VERIFICATION_RESULT_VALUE.REJECTED_DOCUMENT_NOT_AUTHENTIC, display: 'REJECTED - DOCUMENT NOT AUTHENTIC', reason: 'Document authenticity check failed.' },
    { value: VERIFICATION_RESULT_VALUE.DENIED_EPASSPORT_FAIL, display: 'REJECTED - E-PASSPORT NOT READABLE', reason: 'Unable to read data from the e-Passport chip.' },
    { value: VERIFICATION_RESULT_VALUE.DENIED_EPASSPORT_DATA_MISMATCH, display: 'REJECTED - E-PASSPORT DATA MISMATCH', reason: 'Data from e-Passport chip does not match text from Passport.' },
    { value: VERIFICATION_RESULT_VALUE.REJECTED_IRN_MISMATCH, display: 'REJECTED - IRN MISMATCH', reason: 'User has selected an invalid IRN from Medicare Card.' },
    { value: VERIFICATION_RESULT_VALUE.DENIED_MULTIPLE_REASONS, display: 'DENIED MULTIPLE REASONS', reason: 'Multiple checks have failed for this verification' },
    { value: VERIFICATION_RESULT_VALUE.AWAITING_VERIFICATION, display: 'AWAITING VERIFICATION', reason: 'Verification is still in progress' },
    { value: VERIFICATION_RESULT_VALUE.AWAIT_MANUAL_VERIFICATION, display: 'AWAIT MANUAL VERIFICATION', reason: '' },
]

export interface IVERIFICATION_DETAIL_EDIT_STATES {
    result: boolean,
    detail: boolean,
}

export enum STATE_LISTS_VALUE {
    NSW = 'NSW',
    ACT = 'ACT',
    QLD = 'QLD',
    VIC = 'VIC',
    NT = 'NT',
    SA = 'SA',
    WA = 'WA',
    TAS = 'TAS',
}

export const STATE_LISTS: IListType[] = [
    { value: STATE_LISTS_VALUE.NSW, display: STATE_LISTS_VALUE.NSW },
    { value: STATE_LISTS_VALUE.ACT, display: STATE_LISTS_VALUE.ACT },
    { value: STATE_LISTS_VALUE.QLD, display: STATE_LISTS_VALUE.QLD },
    { value: STATE_LISTS_VALUE.VIC, display: STATE_LISTS_VALUE.VIC },
    { value: STATE_LISTS_VALUE.NT, display: STATE_LISTS_VALUE.NT },
    { value: STATE_LISTS_VALUE.SA, display: STATE_LISTS_VALUE.SA },
    { value: STATE_LISTS_VALUE.WA, display: STATE_LISTS_VALUE.WA },
    { value: STATE_LISTS_VALUE.TAS, display: STATE_LISTS_VALUE.TAS },
]
