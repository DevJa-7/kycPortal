import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
	useHistory,
	// useParams,
} from 'react-router-dom';
import { useParams } from 'react-router';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardHeader, Avatar, IconButton, Theme } from '@material-ui/core';
import _ from 'lodash';

import { ContentText, ContentBreak } from 'shared_components/src/components/common';
import {
	VerificationDetailInformation,
	VerifictionDetailCustomerData,
	VerifictionDetailDocumentData,
	VerificationReopenModal,
} from 'shared_components/src/components/verification';
import { TEXT_COLOR, cardStyles } from 'shared_components/src/common/styles';
import { getIsMobile } from 'shared_components/src/common/utils';
import {
	IVerificationDocument,
	IVerificationDetail,
	VERIFICATION_DOCUMENT_TYPES,
	VERIFICATION_STATUS,
} from 'shared_components/src/service/models/verification';

import { updateMenu } from '../../store/menu/actions';
import { MENU } from '../../common/routes/menu';
import { setLoading, clearLoading, setNotification } from '../../store/common/actions';
import KycApiService from '../../service/kycApi.service';
import {
	setVerificationEditDetailState,
	setVerificationEditResultState,
} from '../../store/verification/actions';
import { _getAuthRoles, _getVerificationDetailStates } from '../../store/selectors';
import {
	AUTH_ROLE,
	NOTIFICATION_STATES,
	VERIFICATION_IMAGE_SIDES,
} from 'shared_components/src/common/constants';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { gotoStartPage } from '../../common/utils';

/**
 * Types and Constants
 */
interface ParamTypes {
	subId: string;
	verId: string;
}

/*
 * Styles
 */
const useStyles = makeStyles((theme: Theme) => ({
	root: {
		padding: 0,
		'& > .MuiCardHeader-root': {
			padding: '20px 45px 20px 45px',
			marginBottom: 0,
			alignItems: 'center',

			'@media screen and (max-width: 600px)': {
				padding: '14px 20px 14px 20px',
				minHeight: 70,
			},
		},

		'& .MuiCardHeader-title ': {
			marginTop: 30,

			'& .title': {
				fontSize: 24,
				lineHeight: 1.33,
			},

			'& .verification-id': {
				fontSize: 16,
				lineHeight: 1.31,
				fontWeight: 500,
			},

			'@media screen and (max-width: 600px)': {
				textAlign: 'center',
				fontFamily: 'Roboto',
				fontSize: 17,
				fontWeight: 600,
				lineHeight: 1.35,

				marginTop: 25,
			},
		},

		'& .MuiCardHeader-avatar': {
			marginRight: 0,
		},

		'& .MuiCardHeader-action': {
			'@media screen and (max-width: 600px)': {
				width: 'auto',
			},
		},
	},

	avatar: {
		backgroundColor: 'transparent',
		width: 'fit-content',
		height: 'fit-content',
		marginLeft: -12,

		'& button': {
			marginLeft: 0,
		},

		'& svg': {
			color: '#000000',
			width: 30,
			height: 'auto',
		},

		'@media screen and (max-width: 600px)': {
			marginLeft: 0,

			'& button': {
				padding: 0,
			},

			'& svg': {
				width: 24,
				height: 24,
			},
		},
	},

	item: {
		marginBottom: 28,
		'& .name': {
			fontSize: 14,
			lineHeight: 1.3125,
			color: TEXT_COLOR.graylight,
			marginBottom: 4,
		},
		'& .value': {
			fontSize: 16,
			lineHeight: 1.5,
			color: theme.palette.grey[900],
		},
	},

	content: {
		padding: '32px 35px 20px 35px',
		flexWrap: 'nowrap',
	},

	detail: {
		marginBottom: '4px !important',

		'& > .MuiCardHeader-root': {
			padding: 0,
		},

		'& .MuiAvatar-root': {
			width: 80,
			height: 80,
		},

		'& .MuiCardHeader-title': {
			fontSize: 20,
			lineHeight: 1.3,
			color: theme.palette.grey[900],
		},

		'& .MuiCardHeader-subheader': {
			fontSize: 18,
			lineHeight: 1.333333,
			color: theme.palette.grey[900],
		},
	},

	values: {
		'&> .title': {
			marginBottom: 35,
			marginTop: 35,
			fontSize: 26,
			lineHeight: 1.3077,
			color: theme.palette.grey[900],
		},
	},

	rightValues: {
		paddingLeft: 22.5,
	},

	editButton: {
		width: '44.03%',
		marginLeft: '7.863%',
		maxWidth: 201,

		'@media screen and (max-width: 1280px)': {
			paddingTop: 11,
			paddingBottom: 11,
			maxWidth: 148,
		},
		'@media screen and (max-width: 600px)': {
			width: 'auto',
		},
	},

	saveButton: {
		width: '44.03%',
		marginLeft: '7.863%',
		maxWidth: 201,
		fontSize: 16,
		lineHeight: 1.36,

		'@media screen and (max-width: 1280px)': {
			paddingTop: 11,
			paddingBottom: 11,
			maxWidth: 148,
			fontSize: 14,
		},
		'@media screen and (max-width: 600px)': {
			padding: 20,
		},
	},

	cancelButton: {
		width: '44.03%',
		maxWidth: 201,
		fontSize: 16,
		lineHeight: 1.36,

		'@media screen and (max-width: 1280px)': {
			paddingTop: 11,
			paddingBottom: 11,
			maxWidth: 148,
			fontSize: 14,
		},
		'@media screen and (max-width: 600px)': {
			padding: 20,
		},
	},

	buttons: {
		padding: '20px 20px 40px 20px',
		justifyContent: 'space-evenly',
	},
}));

/**
 * Main Component
 */
const VerificationDetailPage = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const { subId, verId } = useParams<ParamTypes>();

	/**
	 * Use Styles
	 */
	const classes = useStyles();
	const cardClasses = cardStyles();

	/**
	 * States
	 */
	const [isMobile, setIsMobile] = useState(getIsMobile());
	const [isEditable, setIsEditable] = useState(false);
	const [tenantAlias, setTenantAlias] = useState('');
	const [verificationID, setVerificationID] = useState('');
	const [verificationData, setVerificationData] = useState({} as IVerificationDocument);
	const [tempVerificationData, setTempVerificationData] = useState({} as IVerificationDocument);
	const [informationData, setInformationData] = useState({});
	const [customerData, setCustomerData] = useState({} as IVerificationDetail);
	const [openReopen, setOpenReopen] = useState(false);
	const [editableVerification, setEditableVerification] = useState(false);

	const authRoles = _getAuthRoles();
	const editStates = _getVerificationDetailStates();

	/**
	 * Initialize when didMount and updating
	 */
	useEffect(() => {
		// Set function for window resize
		window.addEventListener('resize', () => {
			setIsMobile(getIsMobile());
		});
	}, []);

	const handleGotoStartPage = () => {
		gotoStartPage(history, authRoles);
	};

	useEffect(() => {
		// Get editable via URL
		if (subId == undefined || verId == undefined) {
			handleGotoStartPage();
		} else {
			setVerificationID(verId);
			setTenantAlias(subId);
		}

		// Set menu key
		dispatch(updateMenu(MENU.verificaton));
	}, [window.location.pathname]);

	useEffect(() => {
		if (checkAdminUser()) {
			setIsEditable(true);
		} else {
			setIsEditable(false);
		}
	}, [authRoles]);

	/**
	 * Get information for verification detail via API
	 */
	useEffect(() => {
		getVerificationData();
	}, [tenantAlias, verificationID]);

	const checkAdminUser = () => {
		return authRoles.includes(AUTH_ROLE.admin);
	};

	const getVerificationData = () => {
		if (verificationID) {
			dispatch(setLoading());
			KycApiService.getVerificationDetail(verificationID, tenantAlias)
				.then(async (res: any) => {
					dispatch(clearLoading());

					if (res && !res?.error) {
						processData(res);
						setTempVerificationData(res);
					} else {
						history.push('/not-match');
					}
				})
				.catch((err: any) => {
					dispatch(clearLoading());
					history.push('/not-match');
				});
		}
	};

	const processData = async (docData: IVerificationDocument, reload = true) => {
		const detailData: IVerificationDocument = docData;
		let _details: IVerificationDetail[] = [];

		detailData.result?.verificationDetails?.forEach(async (item: IVerificationDetail, index: number) => {
			const _images: any = item.images;

			let images: any = {
				frontImageUrl: null,
				backImageUrl: null,
			};

			if (reload) {
				Object.keys(_images).forEach(async (key: string) => {
					let _imgData = '';
					if (_images[key] !== 'N/A') {
						_imgData = (await getImageData(
							docData.verificationID,
							item.documentType,
							VERIFICATION_IMAGE_SIDES[key].query
						)) as string;
					} else {
						_imgData = 'N/A';
					}
					images[key] = _imgData;
				});
			} else {
				images.frontImageUrl = verificationData?.result?.verificationDetails
					? verificationData?.result?.verificationDetails[index]?.images.frontImageUrl
					: '';
				images.backImageUrl = verificationData?.result?.verificationDetails
					? verificationData?.result?.verificationDetails[index]?.images.backImageUrl
					: '';
			}

			_details.push({
				...item,
				images,
			});
		});

		// Store total data
		const data = {
			...detailData,
			result: {
				...detailData.result,
				verificationDetails: _details,
			},
		} as IVerificationDocument;

		setVerificationData(data);

		// Store customer data
		let _customerData = docData.result?.verificationDetails?.find(
			(item: IVerificationDetail) => item.documentType === VERIFICATION_DOCUMENT_TYPES.DRIVERS_LICENCES
		);
		_customerData = !_customerData
			? docData.result?.verificationDetails?.find(
					(item: IVerificationDetail) => item.documentType === VERIFICATION_DOCUMENT_TYPES.PASSPORT
			  )
			: _customerData;
		_customerData = !_customerData
			? docData.result?.verificationDetails?.find(
					(item: IVerificationDetail) =>
						item.documentType === VERIFICATION_DOCUMENT_TYPES.MEDICARE_CARD
			  )
			: _customerData;
		_customerData = !_customerData
			? docData.result?.verificationDetails?.find(
					(item: IVerificationDetail) =>
						item.documentType === VERIFICATION_DOCUMENT_TYPES.PROOF_OF_AGE_CARD
			  )
			: _customerData;

		if (_customerData) {
			const faceUrl =
				reload &&
				(docData?.face && docData?.face.imageUrl
					? await getFaceImageData(docData.verificationID)
					: '');
			setCustomerData(_customerData);
			setInformationData({
				firstName: _customerData.identityDocument.firstName,
				lastName: _customerData.identityDocument.lastName,
				email: docData.inviteeDetails.email,
				externalRefId: docData.externalRefId,
				verificationResult: docData.result?.verificationStatus,
				verificationReason: '',
				verificationStatus: docData?.status,
				face: reload ? faceUrl : _.get(informationData, 'face'),
			});

			if (docData?.status == VERIFICATION_STATUS.DONE) {
				setIsEditable(false);
			} else {
				if (checkAdminUser()) {
					setIsEditable(true);
				} else {
					setIsEditable(false);
				}
			}
		}

		return data;
	};

	/**
	 * Get document images
	 */
	const getImageData = (id: string, type: string, side: string) => {
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

	/**
	 * Get face image
	 */
	const getFaceImageData = (id: string) => {
		return new Promise((resolve) => {
			dispatch(setLoading());
			KycApiService.getFaceImageByUrl(tenantAlias, id)
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

	/**
	 * Different handles
	 */
	const handleEditResult = () => {
		dispatch(setVerificationEditResultState(true));
	};

	const handleEditDetail = () => {
		dispatch(setVerificationEditDetailState(true));
	};

	const handleSaveResult = () => {
		const _data = JSON.parse(JSON.stringify(verificationData));
		const req = {
			verificationStatus: _data.result.verificationStatus ?? '',
		};

		dispatch(setLoading());
		KycApiService.updateVerificationDetails(verificationID, req, tenantAlias)
			.then((res) => {
				if (!res?.errror) {
					dispatch(
						setNotification({
							message: 'Failed to update verification result',
							type: NOTIFICATION_STATES.error,
						})
					);
				} else {
					getVerificationData();
					dispatch(
						setNotification({
							message: 'Details updated successfully',
							type: NOTIFICATION_STATES.success,
						})
					);
				}
			})
			.catch((err) => {
				dispatch(
					setNotification({
						message: 'Failed to update verification result',
						type: NOTIFICATION_STATES.error,
					})
				);
			})
			.finally(() => {
				dispatch(clearLoading());
				dispatch(setVerificationEditResultState(false));
			});
	};

	const handleSaveDetail = () => {
		const _data = JSON.parse(JSON.stringify(verificationData));
		const detailData = _data.result?.verificationDetails?.map(
			(item: IVerificationDetail, index: number) => {
				return {
					documentType: item.documentType,
					identityDocument: item.identityDocument,
					outcome: item.outcome,
					security: item.security,
				};
			}
		);
		const req = {
			verificationDetails: detailData,
		};

		dispatch(setLoading());
		KycApiService.updateVerificationDetails(verificationID, req, tenantAlias)
			.then((res) => {
				if (!res?.error) {
					dispatch(
						setNotification({
							message: 'Details updated successfully',
							type: NOTIFICATION_STATES.success,
						})
					);
				} else {
					dispatch(
						setNotification({ message: 'Details update failed', type: NOTIFICATION_STATES.error })
					);
				}
			})
			.catch((err) => {
				dispatch(
					setNotification({ message: 'Details update failed', type: NOTIFICATION_STATES.error })
				);
			})
			.finally(() => {
				dispatch(setVerificationEditDetailState(false));
				dispatch(clearLoading());
			});
	};

	const handleCancelResult = () => {
		processData(tempVerificationData, false);
		dispatch(setVerificationEditResultState(false));
	};

	const handleCancelDetail = () => {
		processData(tempVerificationData, false);
		dispatch(setVerificationEditDetailState(false));
	};

	const handleReturn = () => {
		handleGotoStartPage();
	};

	const handleChangeDetail = (val: string, documentType: string, key: string) => {
		const _data = JSON.parse(JSON.stringify(verificationData));
		const index = _data?.result?.verificationDetails?.findIndex(
			(item: IVerificationDetail) => item.documentType === documentType
		);

		if (index != -1) {
			_.set(_data?.result?.verificationDetails[index], key, val);
		}

		setVerificationData(_data);
	};

	const handleChangeResult = (val: string) => {
		const _data = JSON.parse(JSON.stringify(verificationData));

		_.set(_data, 'result.verificationStatus', val);
		setVerificationData(_data);
		setInformationData({
			...informationData,
			verificationResult: val,
		});
	};

	const openReopenVerification = () => {
		setOpenReopen(true);
	};

	const handleReopenVerification = () => {
		const req = {
			status: 'PROCESSING',
		};

		dispatch(setLoading());
		KycApiService.updateVerificationDetails(verificationID, req, tenantAlias)
			.then((res) => {
				dispatch(clearLoading());
				getVerificationData();
				dispatch(
					setNotification({
						message: 'Re-open this verification successfully',
						type: NOTIFICATION_STATES.success,
					})
				);
				setOpenReopen(false);
			})
			.catch((err) => {
				showErrMsg('Failed to re-open this verification', NOTIFICATION_STATES.error, err);
			});
	};

	const handleVerification = () => {
		dispatch(setLoading());
		KycApiService.updateVerificationComplete(verificationID, null, tenantAlias)
			.then((res) => {
				if (res.error) {
					showErrMsg('Failed to complete verification', NOTIFICATION_STATES.error, res.error);
				} else {
					handleGotoStartPage();
				}
			})
			.catch((err) => {
				showErrMsg('Failed to complete verification', NOTIFICATION_STATES.error, err);
			})
			.finally(() => {
				dispatch(clearLoading());
			});
	};

	const handleVerificationDisabled = (res: boolean) => {
		setEditableVerification(!res);
	};
	const showErrMsg = (msg: string, type: NOTIFICATION_STATES, err: any) => {
		dispatch(setNotification({ message: msg, type: type }));
	};

	/**
	 * Main HTML part
	 */
	return (
		<Card className={clsx(cardClasses.root, classes.root)}>
			<CardHeader
				avatar={
					<Avatar aria-label="recipe" className={classes.avatar}>
						<IconButton
							edge="start"
							color="inherit"
							aria-label="open detail"
							aria-haspopup="true"
							onClick={handleReturn}
						>
							<ArrowBackIcon />
						</IconButton>
					</Avatar>
				}
				title={
					<>
						<ContentText className="title">KYC Verification Details</ContentText>
						<ContentBreak />
						<ContentText className="verification-id">ID: {verificationID}</ContentText>
					</>
				}
			/>
			<VerificationDetailInformation
				data={informationData}
				roles={authRoles}
				editable={isEditable}
				isEdit={editStates.result}
				handleChange={handleChangeResult}
				handleEdit={handleEditResult}
				handleSave={handleSaveResult}
				handleCancel={handleCancelResult}
				handleReopenVerification={openReopenVerification}
				handleVerification={handleVerification}
				handleVerificationDisabled={handleVerificationDisabled}
			/>
			<VerificationReopenModal
				open={openReopen}
				onClose={() => setOpenReopen(false)}
				handleReopen={handleReopenVerification}
			/>
			<VerifictionDetailCustomerData data={customerData} />
			<VerifictionDetailDocumentData
				editable={isEditable && editableVerification}
				roles={authRoles}
				isEdit={editStates.detail}
				data={verificationData?.result?.verificationDetails ?? []}
				handleChange={handleChangeDetail}
				handleEdit={handleEditDetail}
				handleSave={handleSaveDetail}
				handleCancel={handleCancelDetail}
				faceImage={_.get(informationData, 'face') ?? ''}
			/>
		</Card>
	);
};

export default VerificationDetailPage;
