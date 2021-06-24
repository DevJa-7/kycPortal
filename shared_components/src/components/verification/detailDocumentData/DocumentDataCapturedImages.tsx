import React, { 
    useState,
    useEffect,
    useMemo
} from 'react';
import {
    makeStyles,
    withTheme
} from '@material-ui/core/styles';
import styled from 'styled-components';

import {
    TEXT_COLOR,
} from '../../../common/styles';
import { 
    ContentText, 
    ContentImage,
    EnlargeImage,
} from '../../common';
import {
    IVerificationCapturedImages,
} from '../../../common/constants';
import { getImageUrl } from '../../../common/utils';

/**
 * Constants
 */
const FRONT_IMAGE_TITLE = 'Front Image';
const BACK_IMAGE_TITLE = 'Back Image';

/**
 * Props
 */
interface IProps {
    data?: IVerificationCapturedImages,
    hasFace?: boolean,
}

/**
 * Styles
 */
const useStyles = makeStyles(() => ({
    title: {
        fontFamily: 'Roboto',
        fontSize: 24,
        lineHeight: 1.31,
        fontWeight: 'bold',
        width: '100%',
        marginBottom: 17,

        '@media screen and (max-width: 1280px)' : {
            fontSize: 20,
            marginBottom: 0,
        },

        '@media screen and (max-width: 600px)' : {
            fontSize: 16,
        }
    },

    imageItem: {
        marginTop: 20,
        marginBottom: 20,

        '@media screen and (max-width: 900px)': {
            width: '100%',
        },
    }
}));

/**
 * Styled Components
 */
const DocumentDataCapturedImagesContainer = styled.div`
    display: flex;
    margin-top: 35px;
    margin-bottom: 40px;

    @media screen and (max-width: 1280px) {
        margin-top: 0;
    }

    @media screen and (max-width: 600px) {
        margin-top: 20px;
        width: 100%;
    }
`;

const DocumentDataCapturedImagesWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: flex-end;

    @media screen and (max-width: 600px) {
        width: 100%;
    }
`;

const ImageItem = withTheme(styled.div`
    display: flex;
    flex-flow: column;
    margin-right: 30px;

    justify-content: center;
    align-items: center;

    &:last-child {
        margin-right: 0;
    }

    @media screen and (max-width: 1440px) {
        margin-right: 30px;
    }

    @media screen and (max-width: 900px) {
        margin-right: 0;
    }

    & .title {
        font-family: Roboto;
        font-size: 16px;
        line-height: 1.31;
        color: ${TEXT_COLOR.graylight};
        margin-bottom: 20px;

        @media screen and (max-width: 1440px) {
            font-size: 14px;
        }

        @media screen and (max-width: 1280px) {
            margin-bottom: 5px;
        }
    }

    & .image {
        max-width: 385px;
        max-height: 215px;
        background-color: ${(props: any) => props.theme.palette.grey[50]};

        @media screen and (max-width: 1440px) {
            max-width: 364.6px;
            max-height: 203.6px;
        }

        @media screen and (max-width: 1280px) {
            max-width: 311.4px;
            max-height: 173.9px;
        }

        @media screen and (max-width: 900px) {
            max-width: 311.4px;
        }

        @media screen and (max-width: 600px) {
            max-width: 100%;
        }
    }

    .pointer {
        cursor: pointer;
    }
`);

/**
 * Main Component
 */
const DocumentDataCapturedImages = ({
    data,
    hasFace,
}: IProps) => {
    const classes = useStyles();
    
    const defaultImage = useMemo(() => {
        return getImageUrl('defalutVerificationImage.png');
    }, []);

    const [faceImage, setFaceImage] = useState(defaultImage);
    const [frontImage, setFrontImage] = useState(defaultImage);
    const [backImage, setBackImage] = useState(defaultImage);
    const [openImages, setOpenImages] = useState({ front: false, back: false, face: false} as any);

    useEffect(() => {
        setFaceImage((data?.faceImageUrl ? ('data:image/png;base64,' + data?.faceImageUrl) : defaultImage));
        setFrontImage((data?.frontImageUrl ? ('data:image/png;base64,' + data?.frontImageUrl) : defaultImage));
        setBackImage((data?.backImageUrl ? ('data:image/png;base64,' + data?.backImageUrl) : defaultImage));
    }, [data]);

    const handleOpenImage = (key: string) => {
        const _opens = JSON.parse(JSON.stringify(openImages));
        _opens[key] = true;
        setOpenImages(_opens);
    }

    const handleCloseImage = (key: string) => {
        const _opens = JSON.parse(JSON.stringify(openImages));
        _opens[key] = false;
        setOpenImages(_opens);
    }

    const imageView = (label: string, url?: string, imageKey?: string, hasFace?: boolean) => {
        return (
            <ImageItem className={classes.imageItem}>
                {label && <ContentText className="title">{label || ''}&nbsp;</ContentText>}
                <ContentImage className={'image ' + (imageKey ? 'pointer' : '')} src={url} onClick={() => handleOpenImage(imageKey ?? '')} />
                {imageKey && 
                    <EnlargeImage 
                        specImage={url ?? defaultImage} 
                        faceImage={hasFace ? faceImage : undefined} 
                        open={openImages[imageKey]} 
                        handleClose={handleCloseImage} 
                        imageKey={imageKey} 
                    />
                }
            </ImageItem>
        );
    };

    return (
        <DocumentDataCapturedImagesContainer >
            <DocumentDataCapturedImagesWrapper>
                <ContentText className={classes.title}>CAPTURED IMAGES</ContentText>
                {data?.frontImageUrl != 'N/A' && imageView(FRONT_IMAGE_TITLE, frontImage, 'front', hasFace)}
                {data?.backImageUrl != 'N/A' && imageView(BACK_IMAGE_TITLE, backImage, 'back', hasFace)}
                {hasFace && imageView('', faceImage)}
            </DocumentDataCapturedImagesWrapper>
        </DocumentDataCapturedImagesContainer>
    );
}

DocumentDataCapturedImages.defaultProps = {
    data: {},
    hasFace: false,
}

export default DocumentDataCapturedImages;
