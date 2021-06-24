import React, { useMemo, useState, useEffect } from 'react';
import styled from 'styled-components';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

import {
    ContentImage,
    CustomButton,
    ConfirmDialog
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
    jobDetail: IVerifierJobDetail | undefined,
    jobId: string,
    handleReject: any,
    handleApprove: any,
    getImageData: any,
}

/**
* Main component
*/
const VerifierFaceMismatch = ({
    jobDetail,
    jobId,
    handleApprove,
    handleReject,
    getImageData,
}: IProps) => {
    // const [openApproveModal, setOpenApproveModal] = useState(false);
    const [openRejectModal, setOpenRejectModal] = useState(false);
    const [openUnreadableModal, setOpenUnreadableModal] = useState(false);
    const [images, setImages] = useState([] as any);

    const defaultImage = useMemo(() => {
        return getImageUrl('defalutVerificationImage.png');
    }, []);

    const getImages = async () => {
        const frontImgUrl = jobDetail?.input?.documentImages?.[0];
        const backImgUrl = jobDetail?.input?.documentImages?.[1];
        const additionalImgUrl = jobDetail?.input?.documentImages?.[2];

        const imgs = [] as any;
        let frontImg = '';
        if (frontImgUrl !== 'N/A') {
            frontImg = (await getImageData('front')) as string;
            frontImg = frontImg ? ('data:image/png;base64,' + frontImg) : '';
            imgs.push({ key: 'front', url: frontImg, label: 'FRONT IMAGE', readable: true });
        }

        let backImg = '';
        if (backImgUrl !== 'N/A') {
            backImg = (await getImageData('back')) as string;
            backImg = backImg ? ('data:image/png;base64,' + backImg) : '';
            imgs.push({ key: 'back', url: backImg, label: 'BACK IMAGE', readable: false });
        }

        let additionalImg = '';
        if (additionalImgUrl !== 'N/A') {
            additionalImg = (await getImageData('back')) as string;
            additionalImg = additionalImg ? ('data:image/png;base64,' + additionalImg) : '';
            imgs.push({ key: 'additional', url: additionalImg, label: 'ADDITIONAL IMAGE', readable: true },);
        }

        setImages(imgs);
    }

    useEffect(() => {
        getImages();
    }, [jobDetail]);

    // const handleApproveModal = () => {
    //     setOpenApproveModal(true);
    // };

    const handleRejectModal = () => {
        setOpenRejectModal(true);
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
                    statusReason: VERIFIER_JOB_RESULT_STATUS_REASON.matched,
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
                    statusReason: VERIFIER_JOB_RESULT_STATUS_REASON.notMatched,
                }
            }
        };
        handleReject(data);
    }

    return (
        <VerifierFaceMismatchWrapper>
            <Contents>
                <ImageContainer>
                    {images && images.length > 0 && images.map((img: any, id: number) => {
                        return (
                            <ImageItem
                                key={`face-image-${img.label}-${id}`}
                                className={img.className}
                            >
                                <ImageDetail>
                                    <ContentImage src={img.url || defaultImage} className="image" />
                                    {(img.url && img.readable !== undefined) ? (
                                        <CheckCircleIcon className="check-icon" />
                                    ) : null}
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
                <ButtonsWrapper>
                    <CustomButton
                        label="MATCH"
                        className="button"
                        onClick={handleApproveData}
                        variant="contained"
                    />
                    <CustomButton
                        label="NO MATCH"
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
                    confirmLabel="NO MATCH"
                >
                </ConfirmDialog>
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
        </VerifierFaceMismatchWrapper>
    );
}

export default VerifierFaceMismatch;

VerifierFaceMismatch.defaultProps = {
    jobDetail: null,
    jobId: null,
    handleReject: null,
    handleApprove: null,
    getImageData: null,
}

const VerifierFaceMismatchWrapper = styled.div`
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

    &:last-child {
        margin-bottom: 0;
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

    &.face-base {
        max-width: 329px !important;
        
        @media screen and (max-width: 900px) {
            max-width: 329px !important;
        }

        @media screen and (max-width: 600px) {
            max-width: 329px !important;
        }
    }
`;

const ImageDetail = styled.div`
    display: flex;
    width: 100%;
    position: relative;

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

const ButtonsWrapper = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
    margin-top: 60px;

    & > button:first-child {
        margin-right: 30px;
    }
`;
