import React, { useMemo, useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

import {
	ContentImage,
	CustomButton,
	ConfirmDialog,
	ContentDetails
} from '../common';
import { TEXT_COLOR } from '../../common/styles';
import { getImageUrl } from '../../common/utils';

import {
	IVerifierJobDetail,
	VERIFIER_JOB_RESULT_STATUS,
	VERIFIER_JOB_RESULT_STATUS_REASON,
	VERIFIER_JOB_STATUS
} from '../../service/models/manual-verification';

/**
 * IProps
 */
interface IProps {
	jobDetail: IVerifierJobDetail | undefined;
	jobId: string,
	handleApprove: any;
	handleReject: any;
	handleChange: any;
	getImageData: any;
}

/**
 * Main component
 */
const VerifierAuthenticity = ({
	jobDetail,
	jobId,
	handleApprove,
	handleReject,
	getImageData
}: IProps) => {

	const [detailData, setDetailData] = useState([] as Array<any>);
	const [selectedIndex, setSelectedItem] = useState(-1);

	// const [openApproveModal, setOpenApproveModal] = useState(false);
	const [openRejectModal, setOpenRejectModal] = useState(false);
	const [openUnreadableModal, setOpenUnreadableModal] = useState(false);
	const [images, setImages] = useState([
		{ key: 'front', url: '', label: 'FRONT IMAGE', readable: false },
		{ key: 'back', url: '', label: 'BACK IMAGE', readable: false },
	]);

	// const handleApproveModal = () => {
	// 	setOpenApproveModal(true);
	// };

	const handleRejectModal = () => {
		setOpenRejectModal(true);
	};

	const defaultImage = useMemo(() => {
		return getImageUrl('defalutVerificationImage.png');
	}, []);

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

	const getAuthenticityData = useCallback(() => {

		const convJobDetail: any = {};
		jobDetail?.input?.textract?.map(({ key, value }) => {
			if (key) {
				convJobDetail[key] = value;
			}
		});

		setDetailData([
			{
				key: 'country',
				type: 'text',
				label: 'NSW',
				text: convJobDetail?.country || '',
				required: false
			},
			{
				key: 'documentType',
				type: 'text',
				label: 'Document Type',
				text: convJobDetail?.documentType || '',
				required: false
			},
		]);
	}, [jobDetail]);

	useEffect(() => {
		getAuthenticityData();
	}, []);

	const handleChangeDetail = (val: string | number | null, key: string) => {
		const _detailData = [...detailData];
		const id = _detailData.findIndex(item => item.key === key);

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

	const handleApproveData = () => {
		const data = {
			jobId: jobId,
			status: VERIFIER_JOB_STATUS.completed,
			jobDetail: {
				input: jobDetail?.input || null,
				output: {
					status: VERIFIER_JOB_RESULT_STATUS.passed,
					statusReason: VERIFIER_JOB_RESULT_STATUS_REASON.authentic,
					authenticityScore: 0.98,
					detail: {
						documentType: detailData?.[1].text,
						signature: "NA",
						hologram: "N",
						microprint: "Y",
						photo: "Y",
					}
				}
			}
		};
		handleApprove(data);
	}

	const handleRejectData = () => {
		const data = {
			jobId: jobId,
			status: VERIFIER_JOB_STATUS.completed,
			jobDetail: {
				input: jobDetail?.input || null,
				output: {
					status: VERIFIER_JOB_RESULT_STATUS.failed,
					statusReason: VERIFIER_JOB_RESULT_STATUS_REASON.fake,
					authenticityScore: 0.08,
					detail: {
						documentType: detailData?.[1].text,
						signature: "NA",
						hologram: "N",
						microprint: "Y",
						photo: "Y",
					}
				}
			}
		};
		handleReject(data);
	}

	return (
		<VerifierAuthenticityWrapper>
			<Contents>
				<ImageContainer>
					{images.map((img: any, id: number) => {
						return (
							<ImageItem key={`ocr-image-${img.label}-${id}`}>
								{/* <ContentText className="title">{img.label}</ContentText> */}
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
						className="content-detail"
					/>
				</ContentDetailWrapper>
				<ButtonsWrapper>
					<CustomButton
						label="APPROVE"
						className="button"
						onClick={handleApproveData}
						variant="contained"
					/>
					<CustomButton
						label="REJECT"
						className="button"
						onClick={handleRejectModal}
						variant="outlined"
					/>
				</ButtonsWrapper>
				{/* <ConfirmDialog
					title="Alert"
					open={openApproveModal}
					setOpen={setOpenApproveModal}
					onConfirm={handleApproveData}
					cancelLabel="CANCEL"
					confirmLabel="APPROVE"
				>
					Are you sure you want to approve the data? <br />
					Data once approved cannot be undo and will automatically directed to next assigned job.
				</ConfirmDialog> */}
				<ConfirmDialog
					title="Are you sure?"
					open={openRejectModal}
					setOpen={setOpenRejectModal}
					onConfirm={handleRejectData}
					cancelLabel="CANCEL"
					confirmLabel="REJECT"
				/>
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
		</VerifierAuthenticityWrapper>
	);
};

export default VerifierAuthenticity;

VerifierAuthenticity.defaultProps = {
	jobDetail: undefined,
	jobId: null,
	handleReject: null,
	handleApprove: null,
	handleChange: null,
};

const VerifierAuthenticityWrapper = styled.div`
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

	.content-detail {
		width: 100%;
	}
`;

const ButtonsWrapper = styled.div`
	display: flex;
	width: 100%;
	justify-content: center;
	margin-top: 60px;

	& > button:first-child {
		margin-right: 30px;
	}
`;
