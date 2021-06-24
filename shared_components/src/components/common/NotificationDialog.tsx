import React from 'react';
import {
    makeStyles,
} from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';


/**
 * Props
 */
interface IProps {
    open: boolean,
    handleClose?: any,
    message: string,
    type: any,
    autoHideDuration: number
}

/**
 * Styles
 */
const useStyles = makeStyles(() => ({
    backdrop: {
        zIndex: 2000,
    },
}),
);

/**
 * Main
 */
const NotificationDialog = ({
    open,
    handleClose,
    message,
    type,
    autoHideDuration
}: IProps) => {
    const classes = useStyles();

    return (
        <Snackbar open={open} autoHideDuration={autoHideDuration} onClose={handleClose}>
            <MuiAlert onClose={handleClose} severity={type}>
                {message}
            </MuiAlert>
        </Snackbar>
    )
}

NotificationDialog.defaultProps = {
    open: false,
    message: '',
    handleClose: null,
    type : '',
    autoHideDuration : 6000
}

export default NotificationDialog;