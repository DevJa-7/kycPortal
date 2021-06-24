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
        tenant: string,
        pageIndex: number,
        pageSize: number,
        columnSort: string,
        filter: Object,
    ) {
        return HttpService.get(`/v1/tenants/${tenant}/verifications?page=${pageIndex}&limit=${pageSize}&order=${columnSort}${objectToQueryString(filter)}`);
    }

    getVerificationDetail(
        id: string,
        tenant: string,
    ) {
        return HttpService.get(`/v1/tenants/${tenant}/verifications/${id}`);
    }

    getVerificationImageByUrl(
        tenant: string,
        id: string,
        type: string,
        side?: string,
    ) {
        const query = side ? `?side=${side}` : '';
        return HttpService.get(`/v1/tenants/${tenant}/verifications/${id}/documents/${type}/images${query}`);
    }

    getFaceImageByUrl(
        tenant: string,
        id: string
    ) {
        return HttpService.get(`/v1/tenants/${tenant}/verifications/${id}/faces`);
    }

    updateVerificationDetails(
        id: string,
        req: any,
        tenant: string,
    ) {
        return HttpService.put(`/v1/tenants/${tenant}/verifications/${id}`, req);
    }

    sendInviteToCustomer(
        req: any,
        tenant: string,
        id?: string,
    ) {
        return HttpService.post(`/v1/tenants/${tenant}/verifications/${id ? (id + '/') : ''}invite`, req);
    }

    deleteVerification(
        verId: string,
        tenant: string,
    ) {
        return HttpService.delete(`/v1/tenants/${tenant}/verifications/${verId}`);
    }

    updateVerificationComplete(
        id: string,
        req: any,
        tenant: string,
    ) {
        return HttpService.post(`/v1/tenants/${tenant}/verifications/${id}/complete`, req);
    }

    getVerificationDocument(
        id: string,
        type: string,
        tenant: string,
    ) {
        return HttpService.get(`/v1/tenants/${tenant}/verifications/${id}/documents/${type}/images`);
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
        tenant?: string,
    ) {
        return HttpService.post(`/v1/tenants/${tenant}/users`, req);
    }

    updateUser(
        req: any,
        tenant: string,
        username: string,
    ) {
        return HttpService.put(`/v1/tenants/${tenant}/users/${username}`, req);
    }

    getUserDetail(
        tenant: string,
        username: string,
    ) {
        return HttpService.get(`/v1/tenants/${tenant}/users/${username}`);
    }

    getUsersList(
        tenant: string,
        pageIndex: number,
        pageSize: number,
        columnSort: string,
        filter: Object,
    ) {
        return HttpService.get(`/v1/tenants/${tenant}/users?page=${pageIndex}&limit=${pageSize}&order=${columnSort}${objectToQueryString(filter)}`);
    }

    /**
     * APIs related to Document Template
     */
    getDocumentList(
        query: Object,
    ) {
        return HttpService.get(`/v1/document-templates${objectToQueryString(query, true)}`);
    }

    getDocumentTypes() {
        return HttpService.get(`/v1/document-templates/types`);
    }

    getCountries() {
        return HttpService.get(`/v1/countries`);
    }

    createDocument(req: any) {
        return HttpService.post(`/v1/document-templates`, req);
    }

    updateDocument(tempId: string, req: any) {
        return HttpService.put(`/v1/document-templates/${tempId}`, req);
    }

    getDocument(tempId: string) {
        return HttpService.get(`/v1/document-templates/${tempId}`);
    }

    importDocument(req: any) {
        return HttpService.post(`/v1/document-templates/import`, req);
    }

    deleteDocument(id: string) {
        return HttpService.delete(`/v1/document-templates/${id}`);
    }

    testTemplate(req: any) {
        return HttpService.post(`/v1/document-templates/test-textract`, req);
    }

    runTemplate(req: any) {
        return HttpService.post(`/v1/document-templates/run`, req);
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

    getActiveTenantsForProduct(code: string) {
        return HttpService.get(`/v1/products/${code}/tenants`);
    }

    popJobQueue() {
        return HttpService.post(`/v1/manual-verification/jobs/pop`, {});
    }

    completeJob(data: Object) {
        return HttpService.post(`/v1/manual-verification/jobs/complete`, data);
    }

}

export default new KycApiService();
