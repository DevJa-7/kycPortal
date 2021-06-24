import React from 'react';
import {
    createStyles,
    Theme,
    withStyles,
    makeStyles,
    WithStyles,
} from '@material-ui/core/styles';
import {
    IconButton,
    Dialog,
} from '@material-ui/core';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogActions from '@material-ui/core/DialogActions';
import MuiDialogContent from '@material-ui/core/DialogContent';

import CloseIcon from '@material-ui/icons/Close';

import { ContentText } from '../common';
import {
    TEXT_COLOR,
} from '../../common/styles';

/*
 * Styles
*/
const useStyles = makeStyles((theme: Theme) => ({

    container: {
        width: '100%',

        '& .MuiPaper-root': {
            padding: '50px 57px',
            boxSizing: 'border-box',
            maxWidth: 520,
            width: '100%',
            borderRadius: 12,
            borderColor: TEXT_COLOR.graylight,
            color: theme.palette.grey[900], 
            margin: 27,           

            '@media screen and (max-width: 600px)': {
                padding: '33px 30px 45px 30px',
                borderRadius: 6,
            },
        },
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
    classes: any,
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
const CommonModal = ({ 
    open,
    onClose,
    title,
    contents,
    actions,
    className,
}: IProps) => {
    const classes = useStyles();

    return (
        <Dialog
            onClose={onClose}
            open={open}
            className={`${classes.container} ${className}`}
            aria-labelledby="common-dialog-title"
        >
            <DialogTitle id="common-dialog-title" onClose={onClose}>{title}</DialogTitle>
            <DialogContent>{contents}</DialogContent>
            <DialogActions>{actions}</DialogActions>
        </Dialog>
    );
}

/**
 * Props
 */
interface IProps {
    open: boolean,
    onClose: any,
    title?: any,
    contents?: any,
    actions?: any,
    className?: any,
}

CommonModal.defaultProps = {
    open: false,
    onClose: null,
    title: '',
    contents: '',
    actions: '',
    className: '',
}

export default CommonModal;
