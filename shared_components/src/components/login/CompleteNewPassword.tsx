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
} from '@material-ui/core/styles';
import {
    Grid,
    IconButton,
    FormControl,
    Input,
    InputAdornment,
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
    handleSetPassword: any,
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
            marginTop: 30,
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

/**
 * Main Component
 */
const CompleteNewPassword = ({
    open,
    onClose,
    handleSetPassword,
}: IProps) => {
    const classes = useStyles();
    const passwordStyle = passwordControl();

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

    useEffect(() => {
        setPassword({ password: '', showPassword: false });
        setError(false);
    }, [!open]);

    const onResetPassword = () => {
        handleSetPassword(password.password)
            .then((res: any) => {
                setError(false);
            })
            .catch((err: any) => {
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
        setDisabled(!(checks.min10 && checks.hasOneUppercase && checks.hasOneLowercase && checks.hasOneNumber && checks.hasSpecialCharacter));
    }, [password.password]);

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
                <ContentText>Complete New Password</ContentText>
            }
            contents={
                <ResetPasswordContent>
                    <ContentParagraph>
                        <ContentText className={classes.content}>
                            Enter your new password
                        </ContentText>
                    </ContentParagraph>
                    <FormControl className={clsx(passwordStyle.root)}>
                        <ContentText className="new-password">New Password</ContentText>
                        <Input
                            error={error}
                            id="reset-adornment-password"
                            type={passwordIcon.type}
                            value={password.password}
                            onChange={onChangePassword}
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
                </ResetPasswordContent>
            }
            actions={
                <Grid container className={classes.buttons}>
                    <CustomButton label="SUBMIT" className={classes.changeButton} onClick={onResetPassword} disabled={disabled} />
                </Grid>
            }
        />
    );
}

CompleteNewPassword.defaultProps = {
    open: false,
    onClose: null,
    handleSetPassword: null,
}

export default CompleteNewPassword;

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
