import React, {
    useEffect,
} from 'react';
import {
    Grid,
    Dialog,
    IconButton,
} from '@material-ui/core';
import {
    createStyles,
    Theme,
    withStyles,
    makeStyles,
    WithStyles,
} from '@material-ui/core/styles';
import styled from 'styled-components';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogActions from '@material-ui/core/DialogActions';
import MuiDialogContent from '@material-ui/core/DialogContent';
import CloseIcon from '@material-ui/icons/Close';

import { TEXT_COLOR } from '../../common/styles';
import { ContentText } from './styledComponents';
import CustomButton from './CustomButton';

/*
 * The Component is to show
 * - ID Image in fixed size in details page
 * - 2 merged images - Face Photo and ID Image.
 * 
 * While merging 2 images, the images should
 * - Be aligned horizontally
 * - Keep Aspect Ratio
 * - Enlarge to original scanned size as possible.
 * - Add 15px of gaps between 2 images.
 * 
 * The merged image is showed up when user clicked on document image.
 * props: 3 props will be passed 
 * - idImage: A Blob of ID Document Image
 * - faceImage: A Blob of Face Selfie
 */

 /**
  * Props
  */
interface IProps {
    faceImage: string,
    specImage: string,
    handleClose: any,
    open: boolean,
    imageKey: string,
}

/**
 * Styles
 */
const useStyles = makeStyles(() => ({

    container: {
        width: '100%',
        '& .MuiDialog-paperWidthSm': {
            maxWidth: '100%',
        },
        '& .MuiDialog-paperScrollPaper': {
            maxHeight: '100%',
        }
    },

    specImage: {
        maxWidth: '70%',
    },

    faceImage: {
        maxWidth: '30%',
    },
}));

/**
 * Styled Components
 */
const MergedImages = styled.div`
    display: flex;
    max-width: 100%;
    align-items: center;
    justify-content: center;
`;

const SpecImage = styled.img`
    padding: 5px;
    max-height: 100vh;
    object-fit: cover;
`;

/**
 * Main
 */
const EnlargeImage = ({
    faceImage,
    specImage,
    handleClose,
    open,
    imageKey,
}: IProps) => {
    const classes = useStyles()

    return (
        <Grid container>
            <Dialog
                aria-labelledby="simple-dialog-title" 
                open={open} 
                onClose={() => handleClose(imageKey)}
                PaperProps={{
                    style: {
                        backgroundColor: 'transparent',
                        boxShadow: 'none',
                    },
                }}
                className={classes.container}
            >
                <MergedImages>
                    <SpecImage src={specImage} className={classes.specImage} />
                    {faceImage != undefined && <SpecImage src={faceImage} className={classes.faceImage} />}
                </MergedImages>
            </Dialog>
        </Grid>
    )
}

EnlargeImage.defaultProps = {
    faceImage: '',
    specImage: '',
    open: false,
    imageKey: '',
    handleClose: null,
}

export default EnlargeImage;