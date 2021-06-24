import Amplify, { Auth } from 'aws-amplify';
import { CognitoUser } from '@aws-amplify/auth';

import UtilService from 'shared_components/src/service/util.service';
import { getCookie, setCookie } from 'shared_components/src/service/common.service';

import {
    CONFIGURATION_COOKIES,
    GENERAL_COOKIES,
    AWS_AMPLIFY_AUTH_REGION_DEFAULT,
    AWS_AMPLIFY_AUTH_IDENTITYPOOL_REGION_DEFAULT,
    AWS_AMPLIFY_AUTH_MANDATORY_SIGNIN_DEFAULT,
    SIGNIN_COOKIES,
    TIMEOUT_OVER_ATTEMPTING_SIGNIN,
    MAX_SIGNIN_FAIL_COUNT,
    TIMEOUT_OVER_ATTEMPTING_RESEND,
    MAX_RESEND_FAIL_COUNT,
} from 'shared_components/src/common/constants';

import { IAuthInfo } from './models/auth';

/**
 * Types
 */
interface SignInInfo {
    username: string,
    password: string,
}

interface SignUpInfo {
    username: string,
    password: string,
    attributes: {
        email: string,
    }
}

/**
 * Class : Authentication Service
 */
class AuthService {

    static init() {
        const config = this.getConfiguration();
        Amplify.configure(config);
    }

    static getConfiguration() {
        let config = {
            ClientId: '',
            UserPoolId: '',

            Auth: {
                region: AWS_AMPLIFY_AUTH_REGION_DEFAULT,
                identityPoolRegion: AWS_AMPLIFY_AUTH_IDENTITYPOOL_REGION_DEFAULT,
                userPoolId: '',
                userPoolWebClientId: '',
                mandatorySignIn: AWS_AMPLIFY_AUTH_MANDATORY_SIGNIN_DEFAULT,
            }
        }

        const tenant = getCookie(CONFIGURATION_COOKIES.tenant);
        const _tenantInfo = getCookie(tenant);
        const tenantInfo = _tenantInfo ? JSON.parse(_tenantInfo) : null;

        if (tenantInfo && tenantInfo.cognito) {
            const userpoolId = tenantInfo.cognito.userpoolId ? tenantInfo.cognito.userpoolId : '';
            const clientId = tenantInfo.cognito.clientId ? tenantInfo.cognito.clientId : '';

            config = {
                ClientId: userpoolId,
                UserPoolId: clientId,

                Auth: {
                    region: AWS_AMPLIFY_AUTH_REGION_DEFAULT,
                    identityPoolRegion: AWS_AMPLIFY_AUTH_IDENTITYPOOL_REGION_DEFAULT,
                    userPoolId: userpoolId,
                    userPoolWebClientId: clientId,
                    mandatorySignIn: AWS_AMPLIFY_AUTH_MANDATORY_SIGNIN_DEFAULT,
                }
            };
        }

        return config;
    }

    static getToken() {
        const userToken = getCookie(GENERAL_COOKIES.token);

        return userToken;
    }

    static getUserId() {
        const id = getCookie(GENERAL_COOKIES.userId);

        return id;
    }

    static async signUp(userInfo: SignUpInfo) {
        Auth.signUp(userInfo)
            .then((data: any) => {
                return data;
            })
            .catch((err: any) => { console.log(err); });
    }

    static async signIn(userInfo: SignInInfo) {
        try {
            const user = await Auth.signIn(userInfo.username, userInfo.password);
            return user;
        } catch (error) {
            return error;
        }
    }

    static async currentSession() {
        return new Promise( async (res, rej) => {
            try {
                const cognitoUser = await Auth.currentAuthenticatedUser();
                const currentSession = await Auth.currentSession() as any;
                cognitoUser.refreshSession(currentSession.refreshToken, (err: any, session: any) => {
                    if (err) {
                        rej(err);
                    } else {
                        res(session);
                    }
                });
            } catch (e) {
                console.log('Unable to refresh Token', e);
                rej(e);
            }
        });
    }

    static async signOut() {
        return new Promise(async (resolve, reject) => {
            Auth.signOut({ global: true })
                .then((res: any) => resolve(res))
                .catch((err: any) => reject(err));
        });
    }

    static async completeNewPassword(user: CognitoUser | any, password: string) {
        return new Promise(async (resolve, reject) => {
            Auth.completeNewPassword(user, password)
                .then((res: any) => resolve(res))
                .catch((err: any) => reject(err));
        });
    }

    static async forgotPassword(username: string) {
        return new Promise(async (resolve, reject) => {
            Auth.forgotPassword(username)
                .then((res: any) => resolve(res))
                .catch((err: any) => reject(err));
        });
    }

    static async resend(username: string) {
        return new Promise(async (resolve, reject) => {
            Auth.resendSignUp(username)
                .then((res: any) => resolve(res))
                .catch((err: any) => reject(err));
        });
    }

    static async forgotPasswordSubmit(username: string, code: string, newPassword: string) {
        return new Promise(async (resolve, reject) => {
            Auth.forgotPasswordSubmit(username, code, newPassword)
                .then((res: any) => resolve(res))
                .catch((err: any) => reject(err));
        });
    }

    static setAuthCookies(authInfo: IAuthInfo) {
        setCookie(GENERAL_COOKIES.isLoggedIn, authInfo.isLoggedin.toString(), 1);
        setCookie(GENERAL_COOKIES.token, authInfo.token ?? '', 1);
        setCookie(GENERAL_COOKIES.userRole, authInfo.role ?? 0, 1);
        setCookie(GENERAL_COOKIES.userFirstName, authInfo.firstName ?? '', 1);
        setCookie(GENERAL_COOKIES.userLastName, authInfo.lastName ?? '', 1);
        setCookie(GENERAL_COOKIES.userInfo, authInfo.info ?? '', 1);
        setCookie(GENERAL_COOKIES.userSession, authInfo.session ?? '', 1);
        setCookie(GENERAL_COOKIES.userRoles, authInfo.roles ?? '', 1);
        setCookie(GENERAL_COOKIES.userTenant, authInfo.tenant ?? '', 1);
    }

    static setSignInCount(count: number) {
        setCookie(SIGNIN_COOKIES.countForSignIn, (count ?? 0).toString());
    }

    static getSignInCount() {
        const count = getCookie(SIGNIN_COOKIES.countForSignIn);

        return count ? parseInt(count) : 0;
    }

    static setSignInTime(time: Date) {
        setCookie(SIGNIN_COOKIES.timeForLastSignInAttempt, (time ?? new Date()).toString());
    }

    static getSignInTime() {
        const time = getCookie(SIGNIN_COOKIES.timeForLastSignInAttempt);

        return time ? new Date(time) : new Date();
    }

    static setResendCount(count: number) {
        setCookie(SIGNIN_COOKIES.countForResend, (count ?? 0).toString());
    }

    static getResendCount() {
        const count = getCookie(SIGNIN_COOKIES.countForResend);

        return count ? parseInt(count) : 0;
    }

    static setResendTime(time: Date) {
        setCookie(SIGNIN_COOKIES.timeForLastResendAttempt, (time ?? new Date()).toString());
    }

    static getResendTime() {
        const time = getCookie(SIGNIN_COOKIES.timeForLastResendAttempt);

        return time ? new Date(time) : new Date();
    }

    static checkFailedSignIn() {
        const count = this.getSignInCount();

        if (count >= MAX_SIGNIN_FAIL_COUNT) {
            const lastTime = this.getSignInTime();
            const curTime = new Date();
            const diffTime = UtilService.getDiff(curTime, lastTime);

            if (diffTime <= TIMEOUT_OVER_ATTEMPTING_SIGNIN) {
                return true;
            } else {
                this.setSignInCount(0);
                this.setSignInTime(curTime);

                return false;
            }
        }

        return false;
    }

    static failedForAttemptSignIn() {
        const count = this.getSignInCount();

        this.setSignInCount(count + 1);
        this.setSignInTime(new Date());
    }

    static successedForAttemptSignIn() {
        this.setSignInCount(0);
        this.setSignInTime(new Date());
    }

    static checkAttemepResendCode() {
        const count = this.getResendCount();

        if (count >= MAX_RESEND_FAIL_COUNT) {
            const lastTime = this.getResendTime();
            const curTime = new Date();
            const diffTime = UtilService.getDiff(curTime, lastTime);

            if (diffTime <= TIMEOUT_OVER_ATTEMPTING_RESEND) {
                return true;
            } else {
                this.setResendCount(0);
                this.setResendTime(curTime);

                return false;
            }
        }

        return false;
    }

    static successedForAttemptCodeVerify() {
        this.setSignInCount(0);
        this.setSignInTime(new Date());
    }

    static attemptForResend(finalAttemp = false) {
        let count = this.getResendCount();
        if (finalAttemp) {
            count = MAX_RESEND_FAIL_COUNT;
        }

        this.setResendCount(count + 1);
        this.setResendTime(new Date());
    }

}

export default AuthService;
