import {
	VERIFIER_JOB_TYPES,
	VERIFIER_JOB_STATUS,
} from 'shared_components/src/service/models/manual-verification';

// export const dummyVerificationId = "46c82343-a805-4b98-860e-e52d0f50dd2c";
export const dummyVerificationId = "83fd16f4-2539-4bfb-bc2d-af92ace6cdf1";

export const dummyJobState = {
	ocr: {
		_id: 'd3eb3227-2113-b7e3-9c24-4760038bd6fd',
		jobId: 'd3eb3227-2113-b7e3-9c24-4760038bd6fd',
		jobType: VERIFIER_JOB_TYPES.ocr,
		jobReceived: '2021-01-10T13:12:32Z',
		status: VERIFIER_JOB_STATUS.inProgress,
		requestor: 'Verifier',
		truuthContext: 'Truuth Context',
		assignee: 'John Hen',
		lockExpiry: '',
		jobDetail: {
			input: {
				documentType: 'PASSPORT',
				countryCode: 'AUS',
				documentImages: [],
				confidence: 0.97,
				textract: [
					{
						key: 'firstName',
						value: 'Maria',
						confidence: 0.99,
					},
					{
						key: 'lastName',
						value: 'Maria',
						confidence: 0.99,
					},
					{
						key: 'number',
						value: '123456789',
						confidence: 0.99,
					},
					{
						key: 'optionalData1',
						value: null,
						confidence: 0.99,
					},
					{
						key: 'issuingDate',
						value: '21/03/2018',
						confidence: 0.99,
					},
					{
						key: 'expiryDate',
						value: '21/03/2021',
						confidence: 0.99,
					},
					{
						key: 'issuingPlace',
						value: 'Australia',
						confidence: 0.99,
					},
					{
						key: 'issuingCountry',
						value: 'Australia',
						confidence: 0.99,
					},
					{
						key: 'country',
						value: 'NSW',
						confidence: 0.99,
					},
				],
			},
		},
	},
	authenticity: {
		_id: 'd3eb3227-2113-b7e3-9c24-4760038bd6fd',
		jobId: 'd3eb3227-2113-b7e3-9c24-4760038bd6fd',
		jobType: VERIFIER_JOB_TYPES.authenticity,
		jobReceived: '2021-01-10T13:12:32Z',
		status: VERIFIER_JOB_STATUS.inProgress,
		requestor: 'Verifier',
		truuthContext: 'Truuth Context',
		assignee: 'John Hen',
		lockExpiry: '',
		jobDetail: {
			input: {
				documentType: 'PASSPORT',
				countryCode: 'AUS',
				documentImages: [],
				confidence: 0.97,
				textract: [
					{
						key: 'country',
						value: 'NSW',
						confidence: 0.99,
					},
					{
						key: 'documentType',
						value: 'Passport',
						confidence: 0.99,
					},
				],
			},
		},
	},
	faceMatch: {
		_id: 'd3eb3227-2113-b7e3-9c24-4760038bd6fd',
		jobId: 'd3eb3227-2113-b7e3-9c24-4760038bd6fd',
		jobType: VERIFIER_JOB_TYPES.faceMatch,
		jobReceived: '2021-01-10T13:12:32Z',
		status: VERIFIER_JOB_STATUS.inProgress,
		requestor: 'Verifier',
		truuthContext: 'Truuth Context',
		assignee: 'John Hen',
		lockExpiry: '',
		jobDetail: {
			input: {
				documentType: 'PASSPORT',
				countryCode: 'AUS',
				documentImages: [],
				confidence: 0.97,
			},
		},
	},
	nameMatch: {
		_id: 'd3eb3227-2113-b7e3-9c24-4760038bd6fd',
		jobId: 'd3eb3227-2113-b7e3-9c24-4760038bd6fd',
		jobType: VERIFIER_JOB_TYPES.nameMatch,
		jobSentAt: '2021-01-10T13:12:32Z',
		jobReceived: '2021-01-10T13:12:32Z',
		jobCompleted: '2021-01-10T13:22:32Z',
		assignee: 'Jack Citizen',
		status: VERIFIER_JOB_STATUS.inProgress,
		lockExpiry: '64872362364',
		requestor: 'Verifier',
		truuthContext: 'Truuth Context',
		jobDetail: {
			input: {
				documents: [
					{
						isLatestDocument: true,
						documentImages: [],
						textract: [
							{
								key: 'firstName',
								value: 'John',
							},
							{
								key: 'lastName',
								value: 'Henry',
							},
						],
					},
					{
						isLatestDocument: true,
						documentImages: [],
						textract: [
							{
								key: 'firstName',
								value: 'John',
							},
							{
								key: 'lastName',
								value: 'Henry',
							},
						],
					},
				],
			},
		},
	},
};

const tt =
/**
 * Paste one or more documents here
 */
{
	jobId: 'd3eb3227-2113-b7e3-9c24-4760038bd6fb',
	jobType: 'FACE_MATCH',
	jobSentAt: '2021-01-10T13:12:32Z',
	jobCompletedAt: 1614574182145,
	assignee: null,
	status: 'NEW',
	lockExpiryAt: '64872362364',
	requestor: {},
	truuthContext: {},
	jobDetail: {
		input: {
			documents: [
				{
					isLatestDocument: true,
					documentImages: [],
					textract: [
						{
							key: 'firstName',
							value: 'John',
						},
						{
							key: 'lastName',
							value: 'Henry',
						},
					],
				},
				{
					isLatestDocument: true,
					documentImages: [],
					textract: [
						{
							key: 'firstName',
							value: 'John',
						},
						{
							key: 'lastName',
							value: 'Henry',
						},
					],
				},
			],
		},
		output: {},
	},
	lockExpiry: '',
	updatedAt: {
		$date: '2021-03-02T11:09:59.639Z',
	},
	output: {},
};
