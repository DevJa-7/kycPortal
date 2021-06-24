import AuthService from './auth.service';
import { getConfigurationInfo } from 'shared_components/src/common/utils';

const processError = (err: any) => {
    if (err == 'TypeError: Failed to fetch') {
        // AuthService.signOut();
        // window.location.href = APP_URL_PREFIX + '/';
    }
}

/**
 * Class : Http Service
 */
class HttpService {
    baseUrl: string;
    token: string;

    constructor() {
        this.baseUrl = '';
        this.token = '';
        this.init('');
    }

    init(token: string) {
        this.token = token;
        this.getBaseUrlFromCookie();
    }

    getBaseUrlFromCookie() {
        const tenantInfo = getConfigurationInfo();

        let baseUrl = '';

        if (tenantInfo && tenantInfo.apiUrl) {
            const _url = tenantInfo.apiUrl.replace(/\/+$/, '');
            if (_url) {
                baseUrl = _url;
            };
        }

        this.baseUrl = baseUrl;
    }

    getHeader() {
        return {
            'Content-Type':'application/json',
            'Authorization': 'Bearer ' + this.token,
        }
    }

    async get(url: string, no_base_url: boolean = false, hasToken: boolean = true) {
        if (hasToken) {
            const headers = this.getHeader() as unknown as Headers;

            return fetch((no_base_url ? url : this.baseUrl + url), {
                method: 'GET',
                mode: 'cors',
                headers: headers,
            })
                .then((res: any) => res.json())
                .catch((err: any) => {
                    processError(err);
                    console.log(err);
                    throw err;
                });
        } else {
            return fetch((no_base_url ? url : this.baseUrl + url), {
                method: 'GET',
                mode: 'cors',
            })
                .then((res: any) => res.json())
                .catch((err: any) => {
                    processError(err);
                    console.log(err);
                    throw err;
                });
        }
    }

    async post(url: string, data: Object, no_base_url: boolean = false) {
        const headers = this.getHeader() as unknown as Headers;

        return fetch((no_base_url ? url : this.baseUrl + url), {
            method: 'POST',
            mode: 'cors',
            body: data ? JSON.stringify(data) : '',
            headers: headers,
        })
            .then((res: any) => res.json())
            .catch((err: any) => {
                processError(err);
                throw err;
            });
    }

    async delete(url: string, no_base_url: boolean = false) {
        const headers = this.getHeader() as unknown as Headers;

        return fetch((no_base_url ? url : this.baseUrl + url), {
            method: 'DELETE',
            mode: 'cors',
            headers: headers,
        })
            .then((res: any) => res.json())
            .catch((err: any) => {
                processError(err);
                throw err;
            });
    }

    async put(url: string, data: Object, no_base_url: boolean = false) {

        const headers = this.getHeader() as unknown as Headers;

        return fetch((no_base_url ? url : this.baseUrl + url), {
            method: "PUT",
            mode: "cors",
            body: data ? JSON.stringify(data) : '',
            headers: headers,
        }) .then((res: any) => res.json())
        .catch((err: any) => {
            processError(err);
            throw err;
        });
    }
}

export default new HttpService();
