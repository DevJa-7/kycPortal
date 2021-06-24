import React, { useMemo, useState, useEffect } from 'react';
import styled from 'styled-components';

import {
    ContentImage,
    ContentText,
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
const VerifierNameMismatch = ({
    jobDetail,
    jobId,
    handleApprove,
    handleReject,
    getImageData,
}: IProps) => {
    // const [openApproveModal, setOpenApproveModal] = useState(false);
    const [openRejectModal, setOpenRejectModal] = useState(false);
    const [images, setImages] = useState([] as any);

    const defaultImage = useMemo(() => {
        return getImageUrl('defalutVerificationImage.png');
    }, []);

    const getImages = async () => {
        const firstDocImgUrl = jobDetail?.input?.documents?.[0]?.documentImages[0];
        const secondDocImgUrl = jobDetail?.input?.documents?.[1]?.documentImages[0];
        const additionalDocImgUrl = jobDetail?.input?.documents?.[2]?.documentImages[0];

        const imgs = [] as any;
        let firstDocImg = '';
        if (firstDocImgUrl !== 'N/A') {
            firstDocImg = (await getImageData('front')) as string;
            firstDocImg = firstDocImg ? ('data:image/png;base64,' + firstDocImg) : '';
            imgs.push({ key: 'firstDoc', label: 'First Document', url: firstDocImg });
        }

        let secondDocImg = '';
        if (secondDocImgUrl !== 'N/A') {
            secondDocImg = (await getImageData('back')) as string;
            secondDocImg = secondDocImg ? ('data:image/png;base64,' + secondDocImg) : '';
            imgs.push({ key: 'secondDoc', label: 'Second Document', url: secondDocImg });
        }

        let additionalDocImg = '';
        if (additionalDocImgUrl !== 'N/A') {
            additionalDocImg = (await getImageData('back')) as string;
            additionalDocImg = additionalDocImg ? ('data:image/png;base64,' + additionalDocImg) : '';
            imgs.push({ key: 'additionalDoc', label: 'Additional Document', url: additionalDocImg });
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

    const handleApproveData = () => {
        const data = {
            jobId: jobId,
            status: VERIFIER_JOB_STATUS.completed,
            jobDetail: {
                input: jobDetail?.input || null,
                output: {
                    status: VERIFIER_JOB_RESULT_STATUS.passed,
                    statusReason: VERIFIER_JOB_RESULT_STATUS_REASON.matched,
                    supportedDocumentId: jobDetail?.input?.documents?.[0]?.documentImages?.[0] || '',
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
                    supportedDocumentId: jobDetail?.input?.documents?.[0]?.documentImages?.[0] || '',
                }
            }
        };
        handleReject(data);
    }

    return (
        <VerifierFaceMismatchWrapper>
            <Contents>
                <DocContainer>
                    {images && images.length > 0 && images.map((doc: any, id: number) => {
                        return (
                            <DocItem
                                key={`face-image-${doc.key}-${id}`}
                                className={doc.className}
                            >
                                <ContentText className="label">{doc.label}</ContentText>
                                <DocDetail>
                                    <ContentImage src={doc.url || defaultImage} className="image" />
                                </DocDetail>
                            </DocItem>
                        );
                    })}
                </DocContainer>
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
            </Contents>
        </VerifierFaceMismatchWrapper>
    );
}

export default VerifierNameMismatch;

VerifierNameMismatch.defaultProps = {
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

const DocContainer = styled.div`
    display: flex;
    width: 100%;

    @media screen and (max-width: 1000px) {
        flex-direction: column;
    }
`;

const DocItem = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
    width: 100%;
    max-width: 641px;
    margin-right: 30px;
    align-items: center;

    @media screen and (max-width: 1000px) {
        margin-bottom: 30px;
    }

    &:last-child {
        margin-bottom: 0;
    }

    .label {
        text-align: center;
        font-weight: 600;
        font-size: 24px;
        line-height: 29px;
        padding-bottom: 20px;

        @media screen and (max-width: 1000px) {
            font-size: 18px;
            line-height: 24px;
            padding-bottom: 10px;
        }   
    }
`;

const DocDetail = styled.div`
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
