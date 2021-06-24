import React, {
    useState,
    useEffect,
    useMemo,
} from 'react';
import clsx from 'clsx';
import {
    makeStyles,
    withTheme,
    Theme,
    withStyles,
} from '@material-ui/core/styles';
import {
    Grid,
    IconButton,
    FormControl,
    Input,
    InputAdornment,
    TextField,
    Link,
} from '@material-ui/core';
import Visibility from '@material-ui/icons/VisibilityOutlined';
import VisibilityOff from '@material-ui/icons/VisibilityOffOutlined';
import styled from 'styled-components';
import ValidStateIcon from '../common/ValidStateIcon';

import {
    ContentText,
    CustomButton,
    ContentParagraph,
} from '../common';
import { TEXT_COLOR } from '../../common/styles';
import CommonModal from '../common/CommonModal';
import { hasUppercase, hasLowercase, hasNumber, hasSpecialCharacter } from '../../common/validation';

/**
 * Props
 */
interface IProps {
    open: boolean,
    onClose: any,
    handleResendCode: any,
    handleResetPassword: any,
    email: string,
    expiredSendCode?: boolean,
}

/**
 * Styles
 */
const useStyles = makeStyles((theme: Theme) => ({
    modal: {
        '& .MuiPaper-root': {
            minWidth: 500,
        }
    },

    label: {
        marginTop: 35,
        marginBottom: 20,
        fontSize: 16,
        lineHeight: 1.63,
        color: TEXT_COLOR.graylight,

        '@media screen and (max-width: 600px)': {
            marginTop: 30,
            fontSize: 17,
            lineHeight: 1.4,
        },
    },

    content: {
        marginTop: 10,
        marginBottom: 60,
        fontSize: 16,
        lineHeight: 1.63,
        color: TEXT_COLOR.graylight,

        '@media screen and (max-width: 600px)': {
            marginTop: 30,
            fontSize: 17,
            lineHeight: 1.4,
        },
    },

    email: {
        color: theme.palette.grey[900]
    },

    buttons: {
        justifyContent: 'center',
    },

    changeButton: {
        width: '60%',
        marginRight: 'auto',
        marginLeft: 'auto',
        minWidth: 185,
        fontSize: 16,
        lineHeight: 1.31,
        padding: 15,

        '@media screen and (max-width: 128px)': {
            padding: 16,
        },

        '@media screen and (max-width: 900px)': {
            width: '100%',
            maxWidth: '100%',
            fontSize: 14,
            padding: 17,
        },
        '@media screen and (max-width: 600px)': {
            padding: 12,
        },
    },

    resend: {
        cursor: 'pointer',
    }
}));

const passwordControl = makeStyles((theme: Theme) => ({
    root: {
        width: '100%',
        margin: '0 auto',
        color: theme.palette.grey[900],

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
            '@media screen and (max-width: 900px)': {
                fontSize: 14
            },
            '@media screen and (max-width: 600px)': {
                fontSize: 12
            },
        },

        '& .MuiIconButton-root': {
            '& svg': {
                '@media screen and (max-width: 600px)': {
                    width: 21.8,
                    height: 19.1
                },
            }
        },

        '& .password-label': {
            fontSize: 17,
            marginBottom: 40,
        },

        '& .new-password': {
            fontSize: 12,
            color: '#727272',
            marginBottom: 10,
            marginTop: 50,
        },

        '& .password-requirement': {
            color: theme.palette.grey[900],
            fontSize: 12,
            marginTop: 10,
            marginBottom: 10,
        }
    },
    errorLabel: {
        margin: 0,
        fontSize: '0.75rem',
        marginTop: 3,
        textAlign: 'left',
        lineHeight: 1.66,
        letterSpacing: '0.03333em',
        marginBottom: 20,
        '@media screen and (max-width: 600px)': {
            marginBottom: 2
        },
    },
}));

/*
 * Custom Controllers
*/
const SendCodeTextField = withStyles((theme: Theme) => ({
    root: {
        marginTop: 10,
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

/**
 * Main Component
 */
const ResetPassword = ({
    open,
    onClose,
    handleResetPassword,
    handleResendCode,
    email,
    expiredSendCode,
}: IProps) => {
    const classes = useStyles();
    const passwordStyle = passwordControl();

    const [code, setCode] = useState('');
    const [password, setPassword] = useState({
        password: '',
        showPassword: false,
    });
    const [error, setError] = useState(false);
    const [valids, setValids] = useState({
        min10: false,
        hasOneUppercase: false,
        hasOneLowercase: false,
        hasOneNumber: false,
        hasSpecialCharacter: false,
    });
    const [disabled, setDisabled] = useState(true);
    const [errCodeMessage, setErrCodeMessage] = useState('');

    useEffect(() => {
        setPassword({ password: '', showPassword: false });
        setError(false);
        setCode('');
        setErrCodeMessage('');
    }, [!open]);

    const onResetPassword = () => {
        handleResetPassword(code, password.password)
            .then((res: any) => {
                setError(false);
            })
            .catch((err: any) => {
                if (err && err.data && err.data.code === 'CodeMismatchException') {
                    setErrCodeMessage(err.data.message);
                }
                setError(true);
            });
    }

    const onChangePassword = (event: any) => {
        setPassword({ ...password, password: event.target.value });
    };

    const handleClickShowPassword = () => {
        setPassword({ ...password, showPassword: !password.showPassword });
    };

    const handleMouseDownPassword = (event: any) => {
        event.preventDefault();
    };

    const handleChangeCode = (event: any) => {
        const _code = event.target.value;
        setCode(_code);
    };

    useEffect(() => {
        const pass = password.password;
        const checks = {
            min10: false,
            hasOneUppercase: false,
            hasOneLowercase: false,
            hasOneNumber: false,
            hasSpecialCharacter: false,
        };

        checks.min10 = (pass.length >= 10);
        checks.hasOneUppercase = hasUppercase(pass);
        checks.hasOneLowercase = hasLowercase(pass);
        checks.hasOneNumber = hasNumber(pass);
        checks.hasSpecialCharacter = hasSpecialCharacter(pass);

        setValids(checks);
        setDisabled(!(checks.min10 && checks.hasOneUppercase && checks.hasOneLowercase && checks.hasOneNumber && checks.hasSpecialCharacter) || !code);
    }, [password.password, code]);

    const passwordIcon = useMemo(() => {
        if (password.showPassword) {
            return {
                type: 'text',
                icon: <Visibility />, // : <VisibilityOff />
            }
        }

        return {
            type: 'password',
            icon: <VisibilityOff />,
        }
    }, [password]);

    return (
        <CommonModal
            className={classes.modal}
            open={open}
            onClose={onClose}
            title={
                <ContentText>Reset Password</ContentText>
            }
            contents={
                <ResetPasswordContent>
                    <ContentParagraph>
                        <ContentText className={classes.content}>
                            Enter your code sent to{' '}
                        </ContentText>
                        <ContentText className={`${classes.content} ${classes.email}`}>
                            {email}
                        </ContentText>
                        <ContentText className={classes.content}>
                            {' '}to reset your password, try checking your spam folder too
                        </ContentText>
                    </ContentParagraph>
                    {expiredSendCode ? (
                        <>
                            <ResendError>
                                <ContentText>You have re-sent code too many times.</ContentText>
                                <ContentText>Please try again later.</ContentText>
                            </ResendError>
                            <ResendContact>
                                <ContentText>Please contact the account administrator from your organisation</ContentText>
                                <ContentText>if you are having trouble accessing your account.</ContentText>
                            </ResendContact>
                        </>
                    ) : (
                            <FormControl className={clsx(passwordStyle.root)}>
                                <SendCodeTextField
                                    id="code"
                                    type="text"
                                    label="Enter Code"
                                    value={code}
                                    onChange={handleChangeCode}
                                    error={error}
                                    autoComplete="off"
                                    helperText={errCodeMessage}
                                />
                                <ResendButton>
                                    <ContentText>Didn't receive a code?&nbsp;</ContentText>
                                    <Link className={classes.resend} onClick={() => handleResendCode(email)}>Resend Code</Link>
                                </ResendButton>
                                <ContentText className="new-password">New Password</ContentText>
                                <Input
                                    error={error}
                                    id="reset-adornment-password"
                                    type={passwordIcon.type}
                                    value={password.password}
                                    onChange={onChangePassword}
                                    autoComplete="new-password"
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                            >
                                                {passwordIcon.icon}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                                <ContentText className="password-requirement">Password Requirement</ContentText>
                                <PasswordValidChecks>
                                    <ValidItem>
                                        <ValidStateIcon valid={valids.min10} />
                                        <ContentText className="label">Min 10 characters</ContentText>
                                    </ValidItem>
                                    <ValidItem>
                                        <ValidStateIcon valid={valids.hasOneUppercase} />
                                        <ContentText className="label">1 Uppercase</ContentText>
                                    </ValidItem>
                                    <ValidItem>
                                        <ValidStateIcon valid={valids.hasOneLowercase} />
                                        <ContentText className="label">1 Lowercase</ContentText>
                                    </ValidItem>
                                    <ValidItem>
                                        <ValidStateIcon valid={valids.hasOneNumber} />
                                        <ContentText className="label">1 Number</ContentText>
                                    </ValidItem>
                                    <ValidItem>
                                        <ValidStateIcon valid={valids.hasSpecialCharacter} />
                                        <ContentText className="label">1 Special Character</ContentText>
                                    </ValidItem>
                                </PasswordValidChecks>
                            </FormControl>
                        )}
                </ResetPasswordContent>
            }
            actions={
                expiredSendCode ? (
                    <Grid container className={classes.buttons}>
                        <CustomButton label="CLOSE" className={classes.changeButton} onClick={onClose} />
                    </Grid>
                ) : (
                        <Grid container className={classes.buttons}>
                            <CustomButton label="SUBMIT" className={classes.changeButton} onClick={onResetPassword} disabled={disabled} />
                        </Grid>
                    )
            }
        />
    );
}

ResetPassword.defaultProps = {
    open: false,
    onClose: null,
    handleResendCode: null,
    handleResetPassword: null,
    email: '',
    expiredSendCode: false,
}

export default ResetPassword;

const ResetPasswordContent = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;

    padding: 14px 0 20px 0;
`;

const PasswordValidChecks = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 100%;
`;

const ValidItem = withTheme(styled.div`
    display: flex;
    align-items: center;
    min-width: 100px;
    margin-right: 10px;
    margin-bottom: 18px;

    .label {
        font-size: 12px;
        color: ${(props: any) => props.theme.palette.grey[900]};
        margin-left: 5px;
    }
`);

const ResendButton = withTheme(styled.div`
    display: flex;
    font-size: 14px;
    margin-top: 15px;
    justify-content: flex-end;
    
    span {
        color: ${(props: any) => props.theme.palette.grey[900]};
    }

    a {
        color: ${(props: any) => props.theme.palette.primary.main};
        text-transform: uppercase;
    }
`);

const ResendError = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;

    font-size: 14px;
    line-height: 26px;
    color: #ff0000;
`;

const ResendContact = withTheme(styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    margin-top: 100px;

    font-size: 14px;
    line-height: 26px;
    color: ${(props: any) => props.theme.palette.grey[900]};
`);
