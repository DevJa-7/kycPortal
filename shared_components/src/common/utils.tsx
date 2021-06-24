import { getCookie } from '../service/common.service';
import {
    CONFIGURATION_BASE_URL,
    CONFIGURATION_COOKIES,
    IDLE_TIME_IN_MINS_DEFAULT,
    IMAGES_BASE_URL,
} from './constants';
import { MOBILE_WIDTH } from './styles';

/**
 * Get mobile status from window information
 */
export const getIsMobile = () => {
    let res = false;
    const windowWidth = window.screen.availWidth;
    res = windowWidth ? (windowWidth <= MOBILE_WIDTH) : false;
    return res;
}

/**
 * Get configuration data from cookie
 */
export const getConfigurationInfo = () => {
    const tenant = getCookie(CONFIGURATION_COOKIES.tenant);
    const confInfo = getCookie(tenant);

    return confInfo ? JSON.parse(confInfo) : null;
}

/**
 * Get idle time count from configuration data
 */
export const getIdleTimeCountFromConfiguration = () => {
    const confInfo = getConfigurationInfo();
    if (confInfo) {
        return confInfo?.cognito.sessionTimeout ?? IDLE_TIME_IN_MINS_DEFAULT;
    }

    return '';
}

/**
 * Get logo url from configuration data
 */
export const getLogoFromConfiguration = () => {
    const confInfo = getConfigurationInfo();
    if (confInfo) {
        return confInfo?.logo ?? '';
    }

    return '';
}


/**
 * Get the url to get configuration information from CloudFront
 * @param tenant
 */
export const getConfigUrl = (tenant: string | undefined) => {
    if (!tenant) return '';
    return CONFIGURATION_BASE_URL + `/${tenant}/portal`;
};

/**
 * Get image url from base url
 */
export const getImageUrl = (imgName: string) => {
    return IMAGES_BASE_URL + `/${imgName}`;
}

/**
 * Get authentication information from Cognito Response
 */
export const getAuthInfoFromCognitoResponse = (auth: any) => {
    return {
        isLoggedin: true,
        token: auth?.accessToken?.jwtToken,
        role: auth?.idToken?.payload?.['cognito:groups']?.[0],
        firstName: auth?.idToken?.payload?.given_name ?? '',
        lastName: auth?.idToken?.payload?.family_name ?? '',
        info: JSON.stringify(auth?.idToken?.payload ?? ''),
        session: JSON.stringify(auth.idToken),
        roles: auth?.idToken?.payload['custom:roles'],
        tenant: auth?.idToken?.payload['custom:tenant'],
    };
}
