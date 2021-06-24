import React, { useState, useEffect, useLayoutEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';

import {
	ContentText,
	VerifierLayout,
	VerifierOcrExtract,
	VerifierFaceMismatch,
	VerifierAuthenticity,
	VerifierNameMismatch,
} from 'shared_components/src/components';
import { NOTIFICATION_STATES } from 'shared_components/src/common/constants';

import { MENU } from '../../common/routes/menu';
import { updateMenu, clearLoading, setLoading, setNotification, setJobState } from '../../store/actions';
import { _getVerifierJobState } from '../../store/selectors';

import VerifierFirstTimeStartPage from './VerifierFirstTimeStartPage';

import KycApiService from '../../service/kycApi.service';

import {
	VERIFIER_JOB_STATUS,
	VERIFIER_JOB_TYPES,
} from 'shared_components/src/service/models/manual-verification';

import { dummyVerificationId } from './dummy';

/*
 * Styles
 */

/**
 * Main Component
 */
const ManualVerificationPage = () => {

	const dispatch = useDispatch();

	const jobState = _getVerifierJobState();

	const [isInited, setIsInited] = useState(false);
	const [jobQueue, setJobQueue] = useState<Array<string>>([]);

	const handleStart = () => {
		dispatch(setLoading());
		KycApiService.popJobQueue()
			.then((res: any) => {
				if (res && !res.error) {
					dispatch(setJobState(res));
				} else {
					if (res && res.error && res.error.code === 400)
					dispatch(
						setNotification({
							type: NOTIFICATION_STATES.info,
							message: 'No current jobs in the queue.',
						})
					);
				}
			})
			.catch((err: any) => {
				dispatch(
					setNotification({
						type: NOTIFICATION_STATES.error,
						message: err.message,
					})
				)
			})
			.finally(() => {
				dispatch(clearLoading());
			});
	};

	useEffect(() => {
		dispatch(updateMenu(MENU.manualVerify));
	}, []);

	const loadJobQueue = () => {
		setJobQueue([]);
	};

	useEffect(() => {
		if (isInited) {
			loadJobQueue();
		}
	}, [isInited]);

	useLayoutEffect(() => {
		setIsInited(true);
	}, []);

	const handleSave = (data) => {
		setCompleteJob(data);
	};

	const setCompleteJob = (data) => {
		if (jobState) {
			dispatch(setLoading());
			KycApiService.completeJob(data)
				.then(res => {
					console.log('res: ', res);
					dispatch(
						setNotification({
							type: NOTIFICATION_STATES.success,
							message: 'Verification Saved',
						})
					);
				})
				.catch(err => {
					console.log('errr => ', err);
					dispatch(
						setNotification({
							type: NOTIFICATION_STATES.error,
							message: 'Job Completion is failed.',
						})
					);
				})
				.finally(() => {
					dispatch(clearLoading());
					dispatch(
						setJobState({
							...jobState,
							status: VERIFIER_JOB_STATUS.completed,
						})
					);
				})
		}
	};

	const handleApprove = (data) => {
		setCompleteJob(data);
	};

	const handleReject = (data) => {
		setCompleteJob(data);
	};

	const handleChangeSecurity = () => {};

	/**
	 * Get document images
	 */
	const getImageData = (side: string) => {
		const id = dummyVerificationId;
		const type = 'DRIVERS_LICENCE';
		const tenantAlias = 'client';

		return new Promise((resolve) => {
			dispatch(setLoading());
			KycApiService.getVerificationImageByUrl(tenantAlias, id, type, side)
				.then((res) => {
					dispatch(clearLoading());
					if (res.error) {
						resolve('');
					}
					resolve(res.image);
				})
				.catch((err) => {
					dispatch(clearLoading());
					resolve('');
				});
		});
	};

	const curVerificationPage = useMemo(() => {
		let _curVerificationPage = <></>;

		if (jobState && jobState.status === VERIFIER_JOB_STATUS.inProgress) {
			switch (jobState.jobType) {
				case VERIFIER_JOB_TYPES.ocr:
					_curVerificationPage = (
						<VerifierOcrExtract
							handleSave={handleSave}
							jobDetail={jobState?.jobDetail}
							jobId={jobState.jobId}
							handleReject={handleReject}
							getImageData={getImageData}
						/>
					);
					break;

				case VERIFIER_JOB_TYPES.faceMatch:
					_curVerificationPage = (
						<VerifierFaceMismatch
							jobDetail={jobState?.jobDetail}
							handleReject={handleReject}
							jobId={jobState.jobId}
							handleApprove={handleApprove}
							getImageData={getImageData}
						/>
					);
					break;

				case VERIFIER_JOB_TYPES.authenticity:
					_curVerificationPage = (
						<VerifierAuthenticity
							jobDetail={jobState?.jobDetail}
							jobId={jobState.jobId}
							handleReject={handleReject}
							handleApprove={handleApprove}
							handleChange={handleChangeSecurity}
							getImageData={getImageData}
						/>
					);
					break;

				case VERIFIER_JOB_TYPES.nameMatch:
					_curVerificationPage = (
						<VerifierNameMismatch
							jobDetail={jobState?.jobDetail}
							jobId={jobState.jobId}
							handleReject={handleReject}
							handleApprove={handleApprove}
							getImageData={getImageData}
						/>
					);
					break;

				default:
					_curVerificationPage = <ContentText>No verification stat</ContentText>;
			}
		} else {
			_curVerificationPage = <VerifierFirstTimeStartPage handleStart={handleStart} />;
		}

		return _curVerificationPage;
	}, [jobState]);

	return (
		<VerifierLayout
			timeout={0}
			jobNumber={jobState?.jobId}
			jobType={jobState?.jobType}
			isStartPage={!jobState || jobState.status !== VERIFIER_JOB_STATUS.inProgress}
		>
			{curVerificationPage}
		</VerifierLayout>
	);
};

export default ManualVerificationPage;
