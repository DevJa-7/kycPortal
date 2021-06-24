import React, {
    useState,
    useEffect,
} from 'react';
import {
    withStyles,
    makeStyles,
    Theme,
} from '@material-ui/core/styles';
import {
    Grid,
    TextField,
    Typography,
} from '@material-ui/core';

import {
    TEXT_COLOR,
} from '../../common/styles';
import { CustomButton, ContentText } from '../common';
import CommonModal from '../common/CommonModal';
import { isValidEmail } from '../../common/validation';

/*
 * Custom Controllers
*/
const ForgotTextField = withStyles((theme: Theme) => ({
    root: {
        marginTop: 35,
        width: '100%',

        '@media screen and (max-width: 600px)': {
            marginTop: 15,
            marginBottom: 40,
        },

        '& .MuiInputBase-input': {
            color: theme.palette.grey[900],
            fontSize: 16,
            lineHeight: 1.31,
            '@media screen and (max-width: 1280px)': {
                fontSize: 14,
            },
        },

        '& .MuiFormLabel-root': {
            fontSize: 14,
            lineHeight: 1.2,
            '@media screen and (max-width: 1280px)': {
                fontSize: 12,
                lineHeight: 1.16667,
            },
        },
    },
}))(TextField);

/*
 * Styles
*/
const forgotStyles = makeStyles((theme: Theme) => ({

    margin: {
        marginBottom: 30,
        '@media screen and (max-width: 600px)': {
            marginBottom: 35,
        },
    },

    content: {
        marginTop: 35,
        fontSize: 16,
        lineHeight: 1.63,
        color: TEXT_COLOR.graylight,

        '@media screen and (max-width: 600px)': {
            marginTop: 30,
            fontSize: 17,
            lineHeight: 1.4,
        },
    },

    buttons: {
        justifyContent: 'center',
    },

    sendButton: {
        width: '60%',
        marginRight: 'auto',
        marginLeft: 'auto',
        marginTop: 13,
        maxWidth: 185,
        padding: 15,
        fontSize: 16,
        lineHeight: 1.31,

        '@media screen and (max-width: 600px)': {
            width: '100%',
            fontSize: 14,
            lineHeight: 1.143,
            marginBottom: 0,
        },
    },
}));

/**
 * Main Component
 */
const ForgotPassword = ({
    handleForgotPassword,
    open,
    onClose,
}: IProps) => {

    const classes = forgotStyles();

    const [email, setEmail] = useState('');
    const [error, setError] = useState(false);

    useEffect(() => {
        setError(false);
    }, [!open]);

    const handleChangaEmail = (event: any) => {
        setEmail(event.target.value);
    };

    const handleClose = () => {
        setEmail('');
        setError(false);
        onClose();
    };

    const handleSubmit = () => {
        if (isValidEmail(email)) {
            handleForgotPassword(email)
                .then((res: any) => {
                    if (res) {
                        setError(false);
                        setEmail('');
                    }
                })
                .catch((err: any) => {
                    setError(false);
                });
        } else {
            setError(true);
        }
    }

    return (
        <CommonModal
            open={open}
            onClose={handleClose}
            title={
                <ContentText>Forgot Password?</ContentText>
            }
            contents={
                <>
                    <Typography className={classes.content}>
                        Please enter your registered Email ID we will
                        send you a password reset link shortly.
                    </Typography>
                    <ForgotTextField
                        error={error}
                        id="email"
                        type="email"
                        label="Email ID"
                        value={email}
                        helperText={error ? "Please Enter an Email." : ""}
                        className={classes.margin}
                        onChange={handleChangaEmail}
                        required
                    />
                </>
            }
            actions={
                <Grid container className={classes.buttons}>
                    <CustomButton label="SEND CODE" id="send-code" className={classes.sendButton} onClick={handleSubmit} />
                </Grid>
            }
        />
    );
}

/**
 * Props
 */
interface IProps {
    handleForgotPassword: any,
    open: boolean,
    onClose: any,
}

ForgotPassword.defaultProps = {
    handleForgotPassword: null,
    open: false,
    onClose: null,
}

export default ForgotPassword;
