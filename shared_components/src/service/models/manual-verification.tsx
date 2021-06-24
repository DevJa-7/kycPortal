/**
 * Manual verification
 */
/* Job Types
 * Job Type code must be set based on request
 * Manual Authenticity Verification Request = DOCUMENT_AUTHENTICITY
 * Manual OCR Verification Request = OCR_VERIFICATION
 * Manual Face Match Verification Request = FACE_MATCH
 * Manual Name Match Verification Request = NAME_MATCH
 */
export enum VERIFIER_JOB_TYPES {
	ocr = 'OCR_VERIFICATION',
	authenticity = 'DOCUMENT_AUTHENTICITY',
	faceMatch = 'FACE_MATCH',
	nameMatch = 'NAME_MATCH',
	none = '',
}

export enum VERIFIER_JOB_STATUS {
	new = 'NEW',
	inProgress = 'IN_PROGRESS',
	completed = 'COMPLETED',
	failed = 'FAILED',
}

export enum VERIFIER_JOB_RESULT_STATUS {
	passed = 'PASSED',
	failed = 'FAILED',
}

export enum VERIFIER_JOB_RESULT_STATUS_REASON {
	unreadable = 'UNREADABLE',
	verified = 'VERIFIED',
	fake = 'FAKE',
	wrongDocument = 'WRONG_DOCUMENT',
	authentic = 'AUTHENTIC',
	matched = 'MATCHED',
	notMatched = 'NOT_MATCHED',
	noSupportDocument = 'NO_SUPPORT_DOCUMENT',
	multipleFaceOnDocument = 'MULTIPLE_FACE_ON_DOCUMENT',
	multipleFace = 'MULTIPLE_FACE',
	noFaceOnDocument = 'NO_FACE_ON_DOCUMENT',
	noFace = 'NO_FACE',
}

export interface IVerifierJobDetail {
	input: any;
	output?: any;
}

export interface IVerifierJobState {
	_id: string;
	jobId: string;
	jobType: VERIFIER_JOB_TYPES;
	jobSentAt?: string;
	jobReceived: string;
	jobCompleted?: string;
	assignee: string;
	lockExpiry: string;
	status: VERIFIER_JOB_STATUS;
	requestor: any;
	truuthContext: any;
	jobDetail: IVerifierJobDetail | undefined;
}

export enum SECURITY_ITEM_CHECK {
	ok = 'OK',
	failed = 'FAILED',
	na = 'N/A',
}

export interface IVerifierSecurityDetail {
	idTemplate?: SECURITY_ITEM_CHECK;
	expiryData?: SECURITY_ITEM_CHECK;
	colour?: SECURITY_ITEM_CHECK;
	signature?: SECURITY_ITEM_CHECK;
	photo?: SECURITY_ITEM_CHECK;
	waterMark?: SECURITY_ITEM_CHECK;
	emblem?: SECURITY_ITEM_CHECK;
}
