import React, { useMemo, useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

import { ContentDetails, ContentImage, ContentText, CustomButton, ConfirmDialog } from '../common';
import { TEXT_COLOR } from '../../common/styles';
import { getImageUrl } from '../../common/utils';

import {
	IVerifierJobDetail,
	VERIFIER_JOB_STATUS,
	VERIFIER_JOB_RESULT_STATUS,
	VERIFIER_JOB_RESULT_STATUS_REASON,
} from '../../service/models/manual-verification';
import { STATE_LISTS, VERIFICATION_DOCUMENT_TYPES } from '../../service/models';

/**
 * IProps
 */
interface IProps {
	handleSave: any;
	jobDetail: IVerifierJobDetail | undefined;
	jobId: string,
	handleReject: any;
	getImageData: any;
}

/**
 * Main component
 */
const VerifierOcrExtract = ({
	handleSave,
	jobDetail,
	jobId,
	handleReject,
	getImageData,
}: IProps) => {
	const [detailData, setDetailData] = useState([] as Array<any>);
	const [selectedIndex, setSelectedItem] = useState(-1);
	// const [openSaveModal, setOpenSaveModal] = useState(false);
	const [openUnreadableModal, setOpenUnreadableModal] = useState(false);
	const [images, setImages] = useState([
		{ key: 'front', url: '', label: 'FRONT IMAGE', readable: true },
		{ key: 'back', url: '', label: 'BACK IMAGE', readable: false },
	]);

	const defaultImage = useMemo(() => {
		return getImageUrl('defalutVerificationImage.png');
	}, []);

	const getOCRData = useCallback(() => {
		const convJobDetail: any = {};
		jobDetail?.input?.textract?.map(({ key, value }) => {
			if (key) {
				convJobDetail[key] = value;
			}
		});

		if (jobDetail?.input?.documentType === VERIFICATION_DOCUMENT_TYPES.PASSPORT) {
			setDetailData([
				{ key: 'idNumber', type: 'text', label: 'Passport Number', text: convJobDetail?.idNumber, required: false },
				{ key: 'firstName', type: 'text', label: 'Given Name', text: convJobDetail?.firstName, required: false },
				{ key: 'middleName', type: 'text', label: 'Middle Names', text: convJobDetail?.middleName, required: false },
				{ key: 'lastName', type: 'text', label: 'Family Name', text: convJobDetail?.lastName, required: false },
				{ key: 'nationality', type: 'text', label: 'Nationality', text: convJobDetail?.nationality, required: false },
				{ key: 'dateOfBirth', type: 'date', label: 'Date of Birth', text: convJobDetail?.dateOfBirth, required: false },
				{ key: 'gender', type: 'text', label: 'Gender', text: convJobDetail?.gender, required: false },
				{ key: 'dateOfExpiry', type: 'date', label: 'Expiry Date', text: convJobDetail?.dateOfExpiry, required: false },
				{ key: 'issuingAuthority', type: 'text', label: 'Issuing Authority', text: convJobDetail?.issuingAuthority, required: false },
			]);
		}
		if (jobDetail?.input?.documentType === VERIFICATION_DOCUMENT_TYPES.DRIVERS_LICENCES) {
			setDetailData([
				{ key: 'firstName', type: 'text', label: 'Given Name', text: convJobDetail?.firstName, required: false },
				{ key: 'middleName', type: 'text', label: 'Middle Names', text: convJobDetail?.middleName, required: false },
				{ key: 'lastName', type: 'text', label: 'Family Name', text: convJobDetail?.lastName, required: false },
				{ key: 'dateOfBirth', type: 'date', label: 'Date of Birth', text: convJobDetail?.dateOfBirth, required: false },
				{ key: 'idNumber', type: 'text', label: 'Licence Number', text: convJobDetail?.idNumber, required: false },
				{ key: 'licenceClass', type: 'text', label: 'Licence Class', text: convJobDetail?.licenceClass, required: false },
				{ key: 'state', type: 'select', label: 'State of Issue', text: convJobDetail?.state, list: STATE_LISTS, required: false },
				{ key: 'dateOfExpiry', type: 'date', label: 'Expiry Date', text: convJobDetail?.dateOfExpiry, required: false },
			]);
		}
		if (jobDetail?.input?.documentType === VERIFICATION_DOCUMENT_TYPES.MEDICARE_CARD) {
			setDetailData([
				{ key: 'idNumber', type: 'text', label: 'Medicare Number', text: convJobDetail?.idNumber, required: false },
				{ key: 'individualReferenceNumber', type: 'number', label: 'IRN', text: convJobDetail?.individualReferenceNumber, required: false },
				{ key: 'cardType', type: 'text', label: 'Card Type', text: convJobDetail?.cardType, required: false },
				{ key: 'fullNameLine1', type: 'text', label: 'Full Name Line 1', text: convJobDetail?.fullNameLine1, required: false },
				{ key: 'firstName', type: 'text', label: 'Given Name', text: convJobDetail?.firstName, required: false },
				{ key: 'middleName', type: 'text', label: 'Middle Name', text: convJobDetail?.middleName, required: false },
				{ key: 'lastName', type: 'text', label: 'Family Name', text: convJobDetail?.lastName, required: false },
				{ key: 'dateOfExpiry', type: 'date', label: 'Expiry Date', text: convJobDetail?.dateOfExpiry, required: false },
			]);
		}
	}, [jobDetail]);

	const getImages = async () => {
		const frontImgUrl = jobDetail?.input?.documentImages?.[0];
		const backImgUrl = jobDetail?.input?.documentImages?.[1];

		let frontImg = '';
		if (frontImgUrl !== 'N/A') {
			frontImg = (await getImageData('front')) as string;
			frontImg = frontImg ? ('data:image/png;base64,' + frontImg) : '';
		}

		let backImg = '';
		if (backImgUrl !== 'N/A') {
			backImg = (await getImageData('back')) as string;
			backImg = backImg ? ('data:image/png;base64,' + backImg) : '';
		}

		setImages([
			{ key: 'front', url: frontImg, label: 'FRONT IMAGE', readable: true },
			{ key: 'back', url: backImg, label: 'BACK IMAGE', readable: false },
		]);
	}

	useEffect(() => {
		getImages();
	}, [jobDetail]);

	useEffect(() => {
		getOCRData();
	}, []);

	const handleChangeDetail = (val: string | number | null, key: string) => {
		const _detailData = [...detailData];
		const id = _detailData.findIndex((item) => item.key === key);

		if (id > -1) {
			switch (_detailData[id].type) {
				case 'autocomplete':
					_detailData[id].value = val;
					break;

				case 'number':
					_detailData[id].text = Math.max(Number(val), _detailData[id].minVal);
					break;

				default:
					_detailData[id].text = val;
			}

			setDetailData(_detailData);
		}
	};

	const handleClickItem = (index: number) => {
		setSelectedItem(index);
	};

	const handleImageNotReadable = () => {
		setOpenUnreadableModal(true);
	};

	const handleUnreadableImage = () => {
		const data = {
			jobId: jobId,
			status: VERIFIER_JOB_STATUS.completed,
			jobDetail: {
				input: jobDetail?.input || null,
				output: {
					status: VERIFIER_JOB_RESULT_STATUS.failed,
					statusReason: VERIFIER_JOB_RESULT_STATUS_REASON.unreadable,
				}
			}
		};
		handleReject(data);
	};

	const handleSaveData = () => {
		const output = jobDetail?.input?.textract?.map((item) => {
			const curItem = detailData?.find(_item => _item.key === item.key);
			const curValue = curItem?.text;
			const originValue = item?.value;
			return {
				...item,
				value: curValue,
				originValue,
			};
		});

		const data = {
			jobId: jobId,
			status: VERIFIER_JOB_STATUS.completed,
			jobDetail: {
				input: jobDetail?.input || null,
				output: {
					status: VERIFIER_JOB_RESULT_STATUS.passed,
					statusReason: VERIFIER_JOB_RESULT_STATUS_REASON.verified,
					confidence: jobDetail?.input.confidence || 0,
					textract: output || [],
				},
			},
		};
		handleSave(data);
	};

	console.log('images: ', images);

	return (
		<VerifierOcrExtractWrapper>
			<Contents>
				<ImageContainer>
					{images?.map((img: any, id: number) => {
						return (
							<ImageItem key={`ocr-image-${img.label}-${id}`}>
								<ContentText className="title">{img.label}</ContentText>
								<ImageDetail>
									<ContentImage src={img.url || defaultImage} className="image" />
									{img.url ? <CheckCircleIcon className="check-icon" /> : null}
								</ImageDetail>
								<CustomButton
									label="IMAGE IS NOT READABLE"
									variant="text"
									color="primary"
									onClick={() => handleImageNotReadable()}
									className="readable"
								/>
							</ImageItem>
						);
					})}
				</ImageContainer>
				<ContentDetailWrapper>
					<ContentDetails
						data={detailData}
						editable={false}
						onChange={handleChangeDetail}
						onClickItem={handleClickItem}
						selectedIndex={selectedIndex}
					/>
				</ContentDetailWrapper>
				<ButtonsWrapper>
					<CustomButton
						label="SAVE & CONFIRM"
						className="button"
						onClick={handleSaveData}
						variant="contained"
					/>
				</ButtonsWrapper>
				{/* <ConfirmDialog
					title="Alert"
					open={openSaveModal}
					setOpen={setOpenSaveModal}
					onConfirm={handleSaveData}
					cancelLabel="CANCEL"
					confirmLabel="CONTINUE"
				>
					Your job has been stopped. Do you want to continue?
				</ConfirmDialog> */}
				<ConfirmDialog
					title="Are you sure?"
					open={openUnreadableModal}
					setOpen={setOpenUnreadableModal}
					onConfirm={handleUnreadableImage}
					cancelLabel="CANCEL"
					confirmLabel="CONFIRM"
				>
					Please confirm that the image is unreadable.
				</ConfirmDialog>
			</Contents>
		</VerifierOcrExtractWrapper>
	);
};

export default VerifierOcrExtract;

VerifierOcrExtract.defaultProps = {
	handleSave: null,
	jobDetail: undefined,
	jobId: null,
	handleReject: null,
	getImageData: null,
};

const VerifierOcrExtractWrapper = styled.div`
	display: flex;
	width: 100%;
`;

const Contents = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;

	margin-top: 38px;

	@media screen and (max-width: 900px) {
		margin-top: 30px;
	}

	@media screen and (max-width: 600px) {
		margin-top: 20px;
	}
`;

const ImageContainer = styled.div`
	display: flex;
	width: 100%;

	@media screen and (max-width: 600px) {
		flex-direction: column;
	}
`;

const ImageItem = styled.div`
	display: flex;
	flex-direction: column;
	position: relative;
	width: 100%;
	max-width: 641px;
	margin-right: 30px;
	align-items: center;

	@media screen and (max-width: 600px) {
		margin-bottom: 30px;
	}

	.title {
		font-size: 20px;
		line-height: 1.21;
		margin-bottom: 7px;

		@media screen and (max-width: 900px) {
			font-size: 18px;
		}

		@media screen and (max-width: 600px) {
			font-size: 16px;
		}
	}

	.readable {
		margin-top: 24px;
		font-size: 18px;
		box-shadow: unset;

		@media screen and (max-width: 900px) {
			font-size: 16px;
		}

		@media screen and (max-width: 600px) {
			font-size: 14px;
		}
	}
`;

const ImageDetail = styled.div`
	display: flex;
	width: 100%;
	position: relative;

	max-width: 641px;

	@media screen and (max-width: 600px) {
		min-width: 100%;
	}

	.image {
		width: 100%;
	}

	.check-icon {
		position: absolute;
		top: 10px;
		right: 10px;
		fill: ${TEXT_COLOR.state.valid};
	}
`;

const ContentDetailWrapper = styled.div`
	display: flex;
	width: 100%;
	max-width: 1000px;

	margin-top: 30px;

	@media screen and (max-width: 600px) {
		margin-top: 10px;
	}

	.MuiGrid-item:nth-child(even) {
		padding-left: 70px;
	}

	.MuiGrid-item:nth-child(odd) {
		padding-right: 70px;
	}
`;

const ButtonsWrapper = styled.div`
	display: flex;
	width: 100%;
	justify-content: center;
	margin-top: 60px;
`;
