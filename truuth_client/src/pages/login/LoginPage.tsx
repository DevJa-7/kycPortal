import React, {
    useEffect,
    useState,
} from 'react';
import {
    useHistory,
} from 'react-router-dom';
import {
    useDispatch,
} from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

import {
    Login,
    Welcome,
    ForgotPassword,
    ResetPassword,
    ForgotPasswordNotification,
    CompleteNewPassword,
} from 'shared_components/src/components/login';
import { RootContainer } from 'shared_components/src/components/common';

import {
    clearGeneralCookies,
} from 'shared_components/src/service/common.service';
import {
    NOTIFICATION_STATES,
    APP_URL_PREFIX,
} from 'shared_components/src/common/constants';
import { getAuthInfoFromCognitoResponse } from 'shared_components/src/common/utils';

import AuthService from '../../service/auth.service';
import KycApiService from '../../service/kycApi.service';
import { LOGIN_USER_TYPES } from '../../common/constants';
import {
    setLoading,
    clearLoading,
    setNotification,
} from '../../store/common/actions';
import {
    IAuthInfo,
} from '../../service/models/auth';
import {
    updateAuthUser,
    logoutAuthUser,
} from '../../store/auth/actions';
import {
    setTenantAlias
} from '../../store/tenant/actions';

/**
 * Styles
 */
const useStyles = makeStyles(() => ({
    itemFit: {
        height: '100%',

        '@media screen and (max-width: 600px)': {
            height: 'fit-content'
        },
    },

    itemNoFit: {
        height: '100%',
    },
}))

/**
 * Main Component
 */
const LoginPage = () => {

    const dispatch = useDispatch();
    const history = useHistory();

    const classes = useStyles();

    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState({
        email: false,
        password: false,
    });

    const [showForgotPasswordNotification, setShowForgotPasswordNotification] = useState(false);
    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const [showSetPassword, setShowSetPassword] = useState(false);
    const [showReset, setShowReset] = useState(false);
    const [expiredSendCode, setExpiredSendCode] = useState(false);
    const [tempUser, setTempUser] = useState(null);

    const openForgotPasswordNotification = () => setShowForgotPasswordNotification(true);
    const closeForgotPasswordNotification = () => setShowForgotPasswordNotification(false);
    const openForgotPassword = () => {
        setShowForgotPassword(true);
        setExpiredSendCode(false);
    };
    const closeForgotPassword = () => setShowForgotPassword(false);
    const openSetPassword = () => setShowSetPassword(true);
    const closeSetPassword = () => setShowSetPassword(false);
    const openReset = () => setShowReset(true);
    const closeReset = () => setShowReset(false);

    const setUserInfo = (res: any, isReset = false) => {

        const authInfo: IAuthInfo = getAuthInfoFromCognitoResponse(res.signInUserSession);

        if (checkUser(authInfo.roles)) {
            AuthService.setAuthCookies(authInfo);

            dispatch(updateAuthUser(authInfo));
            dispatch(setTenantAlias(authInfo.tenant));
            KycApiService.init(authInfo.token);

            setExpiring(res.signInUserSession.idToken.payload.exp);

            history.push(('/verification'));
        } else {
            if (showReset) {
                openReset();
            } else {
                failedLogin();
            }

            AuthService.signOut()
                .then(res => {
                    if (isReset) {
                        const msg = 'Please login in proper site again.';
                        dispatch(setNotification({
                            message: msg,
                            type: NOTIFICATION_STATES.error,
                        }));
                    }
                    setErrors({
                        email: false,
                        password: true,
                    })
                })
                .catch(err => handleSignOutError(err));
        }
    }

    const handleSignIn = (email: string, password: string) => {

        if (checkSignInState()) {
            openForgotPasswordNotification();

            return;
        }

        if (!email || !password) {
            setErrors({
                email: !email,
                password: !password,
            });

            return;
        }

        const userInfo = {
            username: email,
            password,
        };

        dispatch(setLoading());
        AuthService.signIn(userInfo)
            .then(res => {
                dispatch(clearLoading());

                if (res?.challengeName) {
                    setTempUser(res);
                    openSetPassword();
                } else {
                    switch (res?.code) {
                        case 'UserNotFoundException':
                        case 'NotAuthorizedException':
                        case 'PasswordResetRequiredException':
                            setErrors({
                                email: false,
                                password: true,
                            });
                            failedLogin();
                            break;

                        default:
                            setErrors({
                                email: false,
                                password: false,
                            });
                            setUserInfo(res);
                            AuthService.successedForAttemptSignIn();

                            break;
                    }
                }
            })
            .catch(err => {
                failedLogin();
                dispatch(clearLoading());
            });
    }

    const checkUser = (roles: string) => {
        const arrRoles = roles?.split(',') || [];

        let hasPermission = false;

        arrRoles.forEach(role => {
            if (LOGIN_USER_TYPES.includes(role)) {
                hasPermission = true;
            }
        });

        return hasPermission;
    }

    const setExpiring = (expireIn: number) => {
        const delta = expireIn * 1000 - new Date().getTime();

        if (delta > 0) {
            setTimeout(() => {
                refreshToken();
            }, delta);
        } else {
            refreshToken();
        }
    }

    const clearSignInfo = () => {
        clearGeneralCookies();
        dispatch(logoutAuthUser());
        window.location.href = APP_URL_PREFIX + '/login';
    }

    const refreshToken = async () => {
        AuthService.currentSession().then((res: any) => {

            if (res) {
                const userInfo: IAuthInfo = getAuthInfoFromCognitoResponse(res);

                if (checkUser(userInfo.roles)) {
                    AuthService.setAuthCookies(userInfo);

                    dispatch(updateAuthUser(userInfo));
                    KycApiService.init(userInfo.token);

                    setExpiring(res.idToken.payload.exp);
                } else {
                    handleSignOut();
                }
            } else {
                handleSignOut();
            }
        })
            .catch(err => {
                handleSignOut();
            });
    }

    const handleSignOut = () => {
        AuthService.signOut()
            .then(res => {
                clearSignInfo();
            })
            .catch(err => handleSignOutError(err));
    };

    const handleSignOutError = (err: any) => {
        console.log('Sign Out Error', err);
        clearSignInfo();
        localStorage.clear();
        sessionStorage.clear();
    }

    const handleForgotPassword = async (_email: string) => {
        dispatch(setLoading());

        return new Promise(async (resolve, reject) => {
            AuthService.forgotPassword(_email)
                .then(res => {
                    dispatch(clearLoading());
                    setEmail(_email);
                    setExpiredSendCode(false);
                    openReset();
                    return resolve({ status: 'success' });
                })
                .catch(err => {
                    dispatch(clearLoading());
                    if (err?.code === "LimitExceededException") {
                        setEmail(_email);
                        setExpiredSendCode(true);
                        openReset();
                    }

                    return reject({ status: 'error', data: err });
                });
        });
    }

    const handleResetPassword = (code: string, newPassword: string) => {
        dispatch(setLoading());
        return new Promise(async (resolve, reject) => {
            AuthService.forgotPasswordSubmit(email, code, newPassword)
                .then((res: any) => {
                    dispatch(setNotification({
                        message: 'Successfully reset password!',
                        type: NOTIFICATION_STATES.success,
                    }));
                    resolve({ status: 'success' });
                    closeReset();
                })
                .catch((err: any) => {
                    if (err) {
                        if (err.code !== 'CodeMismatchException') {
                            dispatch(
                                setNotification({
                                    message: err.message,
                                    type: NOTIFICATION_STATES.error,
                                })
                            );
                        }
                        if (err.code === 'LimitExceededException') {
                            setExpiredSendCode(true);
                        }
                    }
                    reject({ status: 'error', data: err });
                })
                .finally(() => {
                    dispatch(clearLoading());
                });
        })
    }

    const handleForgotPasswordNotification = (res: boolean) => {
        openForgotPassword();
        closeForgotPasswordNotification();
    }

    const checkSignInState = () => {
        return AuthService.checkFailedSignIn();
    }

    const handleSetPassword = (newPassword: string) => {
        dispatch(setLoading());
        return new Promise(async (resolve, reject) => {
            AuthService.completeNewPassword(tempUser, newPassword)
                .then((res: any) => {
                    setUserInfo(res, true);
                    resolve({ status: 'success' });
                })
                .catch((err: any) => {
                    reject({ status: 'error', data: err });
                })
                .finally(() => {
                    dispatch(clearLoading());
                    closeSetPassword();
                });
        });
    }

    const failedLogin = () => {
        AuthService.failedForAttemptSignIn();
        if (checkSignInState()) {
            openForgotPasswordNotification();
        }
    }

    const onForgotPassword = async (_email: string) => {
        return new Promise(async (resolve, reject) => {
            handleForgotPassword(_email)
                .then((res: any) => {
                    if (res && res.status === 'success') {
                        setEmail(_email);
                        return resolve(res);
                    } else {
                        return reject(res);
                    }
                })
                .catch((err: any) => { return reject(err); })
                .finally(() => {
                    closeForgotPassword();
                });
        });
    }

    useEffect(() => {
        AuthService.init();
        dispatch(logoutAuthUser());
    }, []);

    return (
        <RootContainer>
            <Grid container item sm={7} className={classes.itemFit}>
                <Welcome />
            </Grid>
            <Grid container item sm={5} className={classes.itemNoFit}>
                <Login
                    errors={errors}
                    handleSignIn={handleSignIn}
                    openForgotPassword={openForgotPassword}
                />
                <CompleteNewPassword
                    open={showSetPassword}
                    onClose={closeSetPassword}
                    handleSetPassword={handleSetPassword}
                />
                <ForgotPasswordNotification
                    open={showForgotPasswordNotification}
                    onClose={closeForgotPasswordNotification}
                    handleNotification={handleForgotPasswordNotification}
                />
                <ForgotPassword
                    open={showForgotPassword}
                    onClose={closeForgotPassword}
                    handleForgotPassword={onForgotPassword}
                />
                <ResetPassword
                    open={showReset}
                    onClose={closeReset}
                    handleResendCode={handleForgotPassword}
                    handleResetPassword={handleResetPassword}
                    email={email}
                    expiredSendCode={expiredSendCode}
                />
            </Grid>
        </RootContainer>
    );
}

export default LoginPage;
