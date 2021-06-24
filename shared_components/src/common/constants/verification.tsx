// Verification
import {
	DOCUMENT_AUTHENTICITY_CHECK,
	FACE_MATCH_CHECK,
	EXPIRY_CHECK,
	NAME_MATCH_CHECK,
	DOB_MATCH_CHECK,
	EPASSPORT_CHIP_CHECK,
	DVS_CHECK,
	IRN_CHECK,
} from '../../service/models/verification';
import { STATEITEM_STATES } from './utils';

/**
 * Verification Table
 */
export const VERIFICATION_TABLE_PAGE_NUMBER = 10;

export interface IVerificationContentDetails {
	key: string;
	label: string;
	text: string;
}

/**
 * Verification Document Data
 */
export interface IVerificationDocumentItem {
	key: string;
	label: string;
}

export const VERIFICATION_DOCUMENT_ITEMS: IVerificationDocumentItem[] = [
	{ key: 'driversLicence', label: 'Drivers Licence' },
	{ key: 'passport', label: 'Passport' },
	{ key: 'medicareCard', label: 'Medicare Card' },
	{ key: 'proofOfAgeCard', label: 'Proof of Age Card' },
];

/**
 * Verification Document Data
 */
export interface IVerificationCapturedImages {
	frontImageUrl: string;
	backImageUrl: string;
	faceImageUrl: string;
}

export const VERIFICATION_IMAGE_SIDES = {
	backImageUrl: { key: 'back', query: 'back' },
	frontImageUrl: { key: 'front', query: 'front' },
};

/**
 * Verification Security Check
 */
export interface ICheckItem {
	id: number;
	key: string;
	export: any;
	value:
		| DOCUMENT_AUTHENTICITY_CHECK
		| FACE_MATCH_CHECK
		| EXPIRY_CHECK
		| NAME_MATCH_CHECK
		| DOB_MATCH_CHECK
		| EPASSPORT_CHIP_CHECK
		| DVS_CHECK
		| IRN_CHECK
		| undefined;
	label: string;
	type: STATEITEM_STATES;
}

export interface ICheckList {
	label: string;
	values: Array<ICheckItem>;
}

export const DOCUMENT_AUTHENTICITY_CHECKLIST: ICheckList = {
	label: 'Document Authenticity Check',
	values: [
		{
			id: 0,
			key: 'ok',
			export: true,
			value: DOCUMENT_AUTHENTICITY_CHECK.ok,
			label: 'Ok',
			type: STATEITEM_STATES.success,
		},
		{
			id: 1,
			key: 'faild',
			export: false,
			value: DOCUMENT_AUTHENTICITY_CHECK.failed,
			label: 'Failed',
			type: STATEITEM_STATES.error,
		},
		{
			id: 2,
			key: 'na',
			export: undefined,
			value: DOCUMENT_AUTHENTICITY_CHECK.na,
			label: 'N/A',
			type: STATEITEM_STATES.warning,
		},
	],
};

export const FACE_MATCH_CHECKLIST: ICheckList = {
	label: 'Face Match Check',
	values: [
		{
			id: 0,
			key: 'ok',
			export: true,
			value: FACE_MATCH_CHECK.ok,
			label: 'Ok',
			type: STATEITEM_STATES.success,
		},
		{
			id: 1,
			key: 'faild',
			export: false,
			value: FACE_MATCH_CHECK.failed,
			label: 'Failed',
			type: STATEITEM_STATES.error,
		},
		{
			id: 2,
			key: 'na',
			export: undefined,
			value: FACE_MATCH_CHECK.na,
			label: 'N/A',
			type: STATEITEM_STATES.warning,
		},
	],
};

export const EXPIRY_CHECKLIST: ICheckList = {
	label: 'Expiry Check',
	values: [
		{
			id: 0,
			key: 'ok',
			export: false,
			value: EXPIRY_CHECK.ok,
			label: 'Ok',
			type: STATEITEM_STATES.success,
		},
		{
			id: 1,
			key: 'expired',
			export: true,
			value: EXPIRY_CHECK.expired,
			label: 'Expired',
			type: STATEITEM_STATES.error,
		},
		{
			id: 2,
			key: 'na',
			export: undefined,
			value: EXPIRY_CHECK.na,
			label: 'N/A',
			type: STATEITEM_STATES.warning,
		},
	],
};

export const NAME_MATCH_CHECKLIST: ICheckList = {
	label: 'Name Match Check',
	values: [
		{
			id: 0,
			key: 'ok',
			export: true,
			value: NAME_MATCH_CHECK.ok,
			label: 'Ok',
			type: STATEITEM_STATES.success,
		},
		{
			id: 1,
			key: 'faild',
			export: false,
			value: NAME_MATCH_CHECK.failed,
			label: 'Failed',
			type: STATEITEM_STATES.error,
		},
		{
			id: 2,
			key: 'na',
			export: undefined,
			value: NAME_MATCH_CHECK.na,
			label: 'N/A',
			type: STATEITEM_STATES.warning,
		},
	],
};

export const DOB_MATCH_CHECKLIST: ICheckList = {
	label: 'DOB Match Check',
	values: [
		{
			id: 0,
			key: 'ok',
			export: true,
			value: DOB_MATCH_CHECK.ok,
			label: 'Ok',
			type: STATEITEM_STATES.success,
		},
		{
			id: 1,
			key: 'faild',
			export: false,
			value: DOB_MATCH_CHECK.failed,
			label: 'Failed',
			type: STATEITEM_STATES.error,
		},
		{
			id: 2,
			key: 'na',
			export: undefined,
			value: DOB_MATCH_CHECK.na,
			label: 'N/A',
			type: STATEITEM_STATES.warning,
		},
	],
};

export const EPASSPORT_CHIP_CHECKLIST: ICheckList = {
	label: 'e-Passport Chip Check',
	values: [
		{
			id: 0,
			key: 'ok',
			export: 'OK',
			value: EPASSPORT_CHIP_CHECK.ok,
			label: 'Ok',
			type: STATEITEM_STATES.success,
		},
		{
			id: 1,
			key: 'faild',
			export: 'Failed',
			value: EPASSPORT_CHIP_CHECK.failed,
			label: 'Failed',
			type: STATEITEM_STATES.error,
		},
		{
			id: 2,
			key: 'data',
			export: 'Data',
			value: EPASSPORT_CHIP_CHECK.data,
			label: 'Data',
			type: STATEITEM_STATES.error,
		},
		{
			id: 3,
			key: 'mismatch',
			export: 'Mismatch',
			value: EPASSPORT_CHIP_CHECK.mismatch,
			label: 'Mismatch',
			type: STATEITEM_STATES.error,
		},
		{
			id: 4,
			key: 'na',
			export: 'N/A',
			value: EPASSPORT_CHIP_CHECK.na,
			label: 'N/A',
			type: STATEITEM_STATES.warning,
		},
	],
};

export const DVS_CHECKLIST: ICheckList = {
	label: 'DVS Check',
	values: [
		{ id: 0, key: 'ok', export: true, value: DVS_CHECK.ok, label: 'Ok', type: STATEITEM_STATES.success },
		{
			id: 1,
			key: 'faild',
			export: false,
			value: DVS_CHECK.failed,
			label: 'Failed',
			type: STATEITEM_STATES.error,
		},
		{
			id: 2,
			key: 'na',
			export: undefined,
			value: DVS_CHECK.na,
			label: 'N/A',
			type: STATEITEM_STATES.warning,
		},
	],
};

export const IRN_MATCH_CHECKLIST: ICheckList = {
	label: 'IRN Check',
	values: [
		{
			id: 0,
			key: 'faild',
			export: false,
			value: IRN_CHECK.failed,
			label: 'Failed',
			type: STATEITEM_STATES.error,
		},
		{ id: 1, key: 'ok', export: true, value: IRN_CHECK.ok, label: 'Ok', type: STATEITEM_STATES.success },
	],
};

export interface IVerificationSecurityResponse {
	documentAuthenticity: DOCUMENT_AUTHENTICITY_CHECK;
	faceMatch: FACE_MATCH_CHECK;
	expired: EXPIRY_CHECK;
	nameMatch: NAME_MATCH_CHECK;
	dobMatch: DOB_MATCH_CHECK;
	ePassportChip: EPASSPORT_CHIP_CHECK;
	dvsCheck: DVS_CHECK;
	irnMatch: IRN_CHECK;
}

export const VERIFICATION_SECURIRY_CHECKLIST: { [key: string]: ICheckList } = {
	documentAuthenticity: DOCUMENT_AUTHENTICITY_CHECKLIST,
	faceMatch: FACE_MATCH_CHECKLIST,
	expired: EXPIRY_CHECKLIST,
	nameMatch: NAME_MATCH_CHECKLIST,
	dobMatch: DOB_MATCH_CHECKLIST,
	ePassportChip: EPASSPORT_CHIP_CHECKLIST,
	dvsCheck: DVS_CHECKLIST,
	irnMatch: IRN_MATCH_CHECKLIST,
};
