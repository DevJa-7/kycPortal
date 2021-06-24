import React, {
    useState,
    useEffect,
} from 'react';
import { 
    createStyles, 
    makeStyles, 
    Theme 
} from '@material-ui/core/styles';
import {
    Snackbar,
 } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';

import { 
    NOTIFICATION_STATES 
} from '../../common/constants';

/**
 * Props
 */
interface ISnackbarMessage {
    message: string,
    key: number,
    type: any,
}

interface IState {
    open: boolean;
    snackPack: ISnackbarMessage[];
    messageInfo?: ISnackbarMessage;
}

interface IProps {
    message: string,
    type: NOTIFICATION_STATES,
    className?: any,
    onClose: any,
}

/**
 * Styles
 */
const useStyles = makeStyles((theme: Theme) => ({
    close: {
        padding: theme.spacing(0.5),
    },
    root: {
        borderRadius: 6,
    }
}));

const NotificationBar = ({
    message,
    type,
    className,
    onClose,
}: IProps) => {
    const classes = useStyles();

    const [snackPack, setSnackPack] = useState<ISnackbarMessage[]>([]);
    const [open, setOpen] = useState(false);
    const [messageInfo, setMessageInfo] = useState<ISnackbarMessage | undefined>(undefined);

    useEffect(() => {
        if (snackPack.length && !messageInfo) {
            // Set a new snack when we don't have an active one
            setMessageInfo({ ...snackPack[0] });
            setSnackPack((prev: any) => prev.slice(1));
            setOpen(true);
        } else if (snackPack.length && messageInfo && open) {
            // Close an active snack when a new one is added
            setOpen(false);
        }
    }, [snackPack, messageInfo, open]);

    useEffect(() => {
        message && setSnackPack((prev: any) => [...prev, { message, key: new Date().getTime(), type: type }]);
    }, [message]);

    const handleClose = (event: React.SyntheticEvent | MouseEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        onClose();
        setOpen(false);
    };

    const handleExited = () => {
        setMessageInfo(undefined);
    };

    return (
        <Snackbar
            key={messageInfo ? messageInfo.key : undefined}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
            onExited={handleExited}
        >
            <MuiAlert 
                elevation={8} 
                variant="filled" 
                severity={messageInfo ? messageInfo.type : 'info'} 
                onClose={handleClose}
                className={`${classes.root} ${className}`}
            >
                {messageInfo ? messageInfo.message : undefined}
            </MuiAlert>
        </Snackbar>
    );
}

NotificationBar.defaultProps = {
    message: '',
    type: NOTIFICATION_STATES.info,
    onClose: null,
    className: '',
}

export default NotificationBar;