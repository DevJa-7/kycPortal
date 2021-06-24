import HttpService from './http.service';
import { getCookie } from 'shared_components/src/service/common.service';
import { GENERAL_COOKIES } from 'shared_components/src/common/constants';

const objectToQueryString = (obj: any, isStarted = false) => {
    Object.keys(obj).forEach((key) => (obj[key] == '') && delete obj[key]);

    if (obj) {
        return (
            Object.keys(obj).map((key, id) => {
                if (obj[key])
                    return ((isStarted && id === 0) ? '?' : '&') + encodeURIComponent(key) + '=' + encodeURIComponent(obj[key])
            }).join('')
        )
    }

    return '';
}

class KycApiService {

    constructor() {
        HttpService.init('');
    }

    /**
     * Initialize
     * @param token
     */
    init(token?: string) {
        HttpService.init(token ?? '');
    }

    /**
     * Get api url from configuration cookie
     */
    getApiUrlFromCookie() {
        HttpService.getBaseUrlFromCookie();
    }

    /**
     * API related to Configuration
     */
    getConfiguration(
        url: string,
    ) {
        return HttpService.get(`${url}/config.json`, true, false);
    }

    /**
     * APIs related to Verification
     */
    getVerificationList(
        pageIndex: number,
        pageSize: number,
        columnSort: string,
        filter: Object,
    ) {
        return HttpService.get(`/v1/verifications?page=${pageIndex}&limit=${pageSize}&order=${columnSort}${objectToQueryString(filter)}`);
    }

    getVerificationDetail(
        id: string,
    ) {
        return HttpService.get(`/v1/verifications/${id}`);
    }

    getVerificationImageByUrl(
        id: string,
        type: string,
        side?: string,
    ) {
        const query = side ? `?side=${side}` : '';
        return HttpService.get(`/v1/verifications/${id}/documents/${type}/images${query}`);
    }

    getFaceImageByUrl(
        id: string
    ) {
        return HttpService.get(`/v1/verifications/${id}/faces`);
    }

    updateVerificationDetails(
        id: string,
        req: any,
    ) {
        return HttpService.put(`/v1/verifications/${id}`, req);
    }

    sendInviteToCustomer(
        req: any,
        id?: string,
    ) {
        return HttpService.post(`/v1/verifications/${id ? (id + '/') : ''}invite`, req);
    }

    deleteVerification(
        verId: string,
    ) {
        return HttpService.delete(`/v1/verifications/${verId}`);
    }

    generateInviteUrl(
        req: any
    ) {
        return HttpService.post(`/v1/verifications/create`, req)
    }

    updateVerificationComplete(
        id: string,
        req: any,
    ) {
        return HttpService.post(`/v1/verifications/${id}/complete`, req);
    }

    getVerificationDocument(
        id: string,
        type: string,
    ) {
        return HttpService.get(`/v1/verifications/${id}/documents/${type}/images`);
    }

    /**
     * APIs related to Users
     */
    getCurrentUserDetails() {
        const userInfo = JSON.parse(getCookie(GENERAL_COOKIES.userInfo));

        if (userInfo) {
            return HttpService.get(`/v1/users/me`);
        } else {
            return new Promise(resolve => {
                return resolve({});
            });
        }
    }

    createUser(
        req: any,
    ) {
        return HttpService.post(`/v1/users`, req);
    }

    updateUser(
        req: any,
        username: string,
    ) {
        return HttpService.put(`/v1/users/${username}`, req);
    }

    getUserDetail (
        username: string,
    ) {
        return HttpService.get(`/v1/users/${username}`);
    }

    getUsersList(
        pageIndex: number,
        pageSize: number,
        columnSort: string,
        filter: Object,
    ) {
        return HttpService.get(`/v1/users?page=${pageIndex}&limit=${pageSize}&order=${columnSort}${objectToQueryString(filter)}`);
    }


    getDeepLink(
        verificationID: string,
        tenantName: string
    ) {
        return HttpService.get(`/v1/verifications/${verificationID}/deep-link/${tenantName}`, false, false);
    }

    /**
     * Products
     */
    getProducts() {
        return HttpService.get(`/v1/products`);
    }

    getProductDetail(code: string) {
        return HttpService.get(`/v1/products/${code}`);
    }

}

export default new KycApiService();
