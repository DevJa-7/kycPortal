/**
 *  Manual Verification
 */
import { SECURITY_ITEM_CHECK } from '../../service/models/manual-verification';
import { STATEITEM_STATES } from './utils';

// Verifier Queue
export const VERIFIER_QUEUE_STATS = {
	ocr: {
		key: 'ocr',
		pageTitle: 'OCR EXTRACT',
		description:
			'A job has assigned to manually verify the OCR data, click save & confirm to validate the data.',
	},
	authenticity: {
		key: 'authenticity',
		pageTitle: 'Authenticity',
		description: 'A job has assigned to manually verify the authenticity data.',
	},
	faceMatch: {
		key: 'faceMatch',
		pageTitle: 'Face mismatch',
		description: 'A job has assigned to manually verify the face mismatch.',
	},
	nameMatch: {
		key: 'nameMmatch',
		pageTitle: 'Name mismatch',
		description: 'A job has assigned to manually verify the name mismatch.',
	},
};

export const VERIFIER_JOB_STATS = {
	queuePerJobType: { key: 'queuePerJobType', label: 'Queue Per Job Type' },
	jobsDoneToday: { key: 'jobsDoneToday', label: 'Jobs done today' },
	avgTimePerJob: { key: 'avgTimePerJob', label: 'Average time per job' },
	comparisonWithOther: { key: 'comparisonWithOther', label: 'Comparison with other verifiers ?' },
};

/**
 * Verification Security Check
 */
export interface IVerifierCheckItem {
	id: number;
	key: string;
	export: any;
	value: SECURITY_ITEM_CHECK | undefined;
	label: string;
	type: STATEITEM_STATES;
	isEditable?: boolean;
}

export interface IVerifierCheckList {
	label: string;
	values: Array<IVerifierCheckItem>;
}

export const ID_TEMPLATE_CHECKLIST: IVerifierCheckList = {
	label: 'ID Template Check',
	values: [
		{
			id: 0,
			key: 'ok',
			export: true,
			value: SECURITY_ITEM_CHECK.ok,
			label: 'Ok',
			type: STATEITEM_STATES.success,
		},
		{
			id: 1,
			key: 'faild',
			export: false,
			value: SECURITY_ITEM_CHECK.failed,
			label: 'Failed',
			type: STATEITEM_STATES.error,
		},
		{
			id: 2,
			key: 'na',
			export: undefined,
			value: SECURITY_ITEM_CHECK.na,
			label: 'N/A',
			type: STATEITEM_STATES.warning,
		},
	],
};

export const EXPIRY_DATE_CHECKLIST: IVerifierCheckList = {
	label: 'Expiry Date Check',
	values: [
		{
			id: 0,
			key: 'ok',
			export: true,
			value: SECURITY_ITEM_CHECK.ok,
			label: 'Ok',
			type: STATEITEM_STATES.success,
		},
		{
			id: 1,
			key: 'faild',
			export: false,
			value: SECURITY_ITEM_CHECK.failed,
			label: 'Failed',
			type: STATEITEM_STATES.error,
		},
		{
			id: 2,
			key: 'na',
			export: undefined,
			value: SECURITY_ITEM_CHECK.na,
			label: 'N/A',
			type: STATEITEM_STATES.warning,
		},
	],
};

export const COLOUR_CHECKLIST: IVerifierCheckList = {
	label: 'Colour Check',
	values: [
		{
			id: 0,
			key: 'ok',
			export: false,
			value: SECURITY_ITEM_CHECK.ok,
			label: 'Ok',
			type: STATEITEM_STATES.success,
		},
		{
			id: 1,
			key: 'failed',
			export: true,
			value: SECURITY_ITEM_CHECK.failed,
			label: 'Failed',
			type: STATEITEM_STATES.error,
		},
		{
			id: 2,
			key: 'na',
			export: undefined,
			value: SECURITY_ITEM_CHECK.na,
			label: 'N/A',
			type: STATEITEM_STATES.warning,
		},
	],
};

export const SIGNATURE_CHECKLIST: IVerifierCheckList = {
	label: 'Signature Check',
	values: [
		{
			id: 0,
			key: 'ok',
			export: true,
			value: SECURITY_ITEM_CHECK.ok,
			label: 'Ok',
			type: STATEITEM_STATES.success,
		},
		{
			id: 1,
			key: 'faild',
			export: false,
			value: SECURITY_ITEM_CHECK.failed,
			label: 'Failed',
			type: STATEITEM_STATES.error,
		},
		{
			id: 2,
			key: 'na',
			export: undefined,
			value: SECURITY_ITEM_CHECK.na,
			label: 'N/A',
			type: STATEITEM_STATES.warning,
		},
	],
};

export const PHOTO_CHECKLIST: IVerifierCheckList = {
	label: 'Photo Check',
	values: [
		{
			id: 0,
			key: 'ok',
			export: true,
			value: SECURITY_ITEM_CHECK.ok,
			label: 'Ok',
			type: STATEITEM_STATES.success,
		},
		{
			id: 1,
			key: 'faild',
			export: false,
			value: SECURITY_ITEM_CHECK.failed,
			label: 'Failed',
			type: STATEITEM_STATES.error,
		},
		{
			id: 2,
			key: 'na',
			export: undefined,
			value: SECURITY_ITEM_CHECK.na,
			label: 'N/A',
			type: STATEITEM_STATES.warning,
		},
	],
};

export const WATERMARK_CHECKLIST: IVerifierCheckList = {
	label: 'Watermark Check',
	values: [
		{
			id: 0,
			key: 'ok',
			export: true,
			value: SECURITY_ITEM_CHECK.ok,
			label: 'Ok',
			type: STATEITEM_STATES.success,
		},
		{
			id: 1,
			key: 'faild',
			export: false,
			value: SECURITY_ITEM_CHECK.failed,
			label: 'Failed',
			type: STATEITEM_STATES.error,
		},
		{
			id: 2,
			key: 'na',
			export: undefined,
			value: SECURITY_ITEM_CHECK.na,
			label: 'N/A',
			type: STATEITEM_STATES.warning,
		},
	],
};

export const EMBLEM_CHECKLIST: IVerifierCheckList = {
	label: 'Emblem Check',
	values: [
		{
			id: 0,
			key: 'ok',
			export: true,
			value: SECURITY_ITEM_CHECK.ok,
			label: 'Ok',
			type: STATEITEM_STATES.success,
		},
		{
			id: 1,
			key: 'faild',
			export: false,
			value: SECURITY_ITEM_CHECK.failed,
			label: 'Failed',
			type: STATEITEM_STATES.error,
		},
		{
			id: 2,
			key: 'na',
			export: undefined,
			value: SECURITY_ITEM_CHECK.na,
			label: 'N/A',
			type: STATEITEM_STATES.warning,
		},
	],
};

export const VERIFIER_SECURIRY_CHECKLIST: { [key: string]: IVerifierCheckList } = {
	idTemplate: ID_TEMPLATE_CHECKLIST,
	expiryDate: EXPIRY_DATE_CHECKLIST,
	colour: COLOUR_CHECKLIST,
	signature: SIGNATURE_CHECKLIST,
	photo: PHOTO_CHECKLIST,
	watermark: WATERMARK_CHECKLIST,
	emblem: EMBLEM_CHECKLIST,
};
