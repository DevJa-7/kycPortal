import React, { 
    useState,
    useEffect,
} from 'react';
import clsx from 'clsx';
import {
    createStyles,
    Theme,
    withStyles,
    makeStyles,
    WithStyles,
} from '@material-ui/core/styles';
import {
    Grid,
    TextField,
    IconButton,
    FormControl,
    InputLabel,
    Input,
    InputAdornment,
    Dialog,
    Typography,
    Link,
} from '@material-ui/core';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogActions from '@material-ui/core/DialogActions';
import MuiDialogContent from '@material-ui/core/DialogContent';

import CloseIcon from '@material-ui/icons/Close';

import { CustomButton, ContentText } from '../common';
import {
    TEXT_COLOR,
} from '../../common/styles';

/*
 * Styles
*/
const useStyles = makeStyles((theme: Theme) => ({

    margin: {
        marginBottom: 20,
        '@media screen and (max-width: 600px)': {
            marginBottom: 15,
        },
    },

    container: {
        '& .MuiPaper-root': {
            padding: '50px 57px',
            minWidth: 500,
            borderRadius: 12,
            borderColor: TEXT_COLOR.graylight,
            color: theme.palette.grey[900], 
            margin: 27,           

            '@media screen and (max-width: 600px)': {
                padding: '30px',
                minWidth: 'auto',
            },
        },
    },

    content: {
        marginTop: 35,
        marginBottom: 90,
        fontSize: 20,
        lineHeight: 1.63,
        color: TEXT_COLOR.graylight,

        '@media screen and (max-width: 1280px)': {
            marginTop: 30,
            fontSize: 16,
            lineHeight: 1.4,
            marginBottom: 60,
        },

        '@media screen and (max-width: 600px)': {
            marginTop: 30,
            fontSize: 14,
            lineHeight: 1.4,
            marginBottom: 50,
        },
    },

    reopen: {
        marginRight: 10,
        minWidth: 100,
    },

    cancel: {
        marginBottom: 0,
        minWidth: 100,
    },

}));

/**
 * Dialogue
 */
const styles = (theme: Theme) => createStyles({
    root: {
        margin: 0,
        padding: theme.spacing(0),
        display: 'flex',

        '@media screen and (max-width: 900px)': {
            fontSize: 16,
        },
        '@media screen and (max-width: 600px)': {
            fontSize: 14,
        },
    },

    title: {
        fontSize: 24,
        lineHeight: 1.2,
        fontWeight: 600,

        '@media screen and (max-width: 600px)': {
            fontSize: 22,
        },
    },

    closeButton: {
        position: 'absolute',
        right: 34,
        top: 35,
        color: TEXT_COLOR.graylight,

        '@media screen and (max-width: 1280px)': {
            right: 14,
        },

        '@media screen and (max-width: 600px)': {
            top: 20,
        },

        '& .MuiSvgIcon-root': {
            fontSize: '2.15rem',
            '@media screen and (max-width: 1280px)': {
                fontSize: '1.95rem',
            },
        }
    },
});

export interface DialogTitleProps extends WithStyles<typeof styles> {
    id: string;
    children: React.ReactNode;
    onClose: () => void;
}

const DialogTitle = withStyles(styles)((props: DialogTitleProps) => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <ContentText className={classes.title}>{children}</ContentText>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles((theme: Theme) => ({
    root: {
        padding: theme.spacing(0),
    },
}))(MuiDialogContent);

const DialogActions = withStyles((theme: Theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(0),
    },
}))(MuiDialogActions);


/**
 * Main Component
 */
const VerificationReopenModal = ({ 
    open,
    onClose,
    handleReopen,
}: IProps) => {

    const classes = useStyles();

    const handleVerificationReopen = () => {
        handleReopen();
    };

    const handleCancelReopen = () => {
        onClose();
    };

    return (
        <Dialog
            onClose={onClose}
            open={open}
            className={classes.container}
            aria-labelledby="verification-reopen"
        >
            <DialogTitle id="verification-reopen" onClose={onClose}>
                Re-Open Verification
            </DialogTitle>
            <DialogContent>
                <Typography gutterBottom className={classes.content}>
                    Are you sure? The agent may have already viewed this verification.
                </Typography>
            </DialogContent>
            <DialogActions>
                <CustomButton 
                    label="RE-OPEN" 
                    className={classes.reopen} 
                    onClick={handleVerificationReopen} 
                    variant="contained"
                />
                <CustomButton 
                    label="CLOSE" 
                    className={classes.cancel} 
                    onClick={handleCancelReopen} 
                    variant="outlined"
                />
            </DialogActions>
        </Dialog>
    );
}

/**
 * Props
 */
interface IProps {
    handleReopen: any,
    open: boolean,
    onClose: any,
}

VerificationReopenModal.defaultProps = {
    handleReopen: null,
    open: false,
    onClose: null,
}

export default VerificationReopenModal;
