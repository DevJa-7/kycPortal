import React, { useEffect, useMemo, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { MuiThemeProvider } from "@material-ui/core/styles";
import _ from 'lodash';

import Routers from '../common/routes/Routers';
import { AdminTheme, makeTheme } from '../common/themes/adminTheme';

import store from '../store';
import KycApiService from '../service/kycApi.service';
import { Loading, NotMatch } from 'shared_components/src/components/common';
import { clearCookie, setCookie } from 'shared_components/src/service/common.service';
import {
    CONFIGURATION_COOKIES,
    APP_URL_PREFIX
} from 'shared_components/src/common/constants';
import {
    getConfigUrl
} from 'shared_components/src/common/utils';
import AuthService from '../service/auth.service';

/**
 *  APP
 */
const App = () => {
    const [config, setConfig] = useState({ loading: true, data: {} as any });
    const { loading, data } = config;

    useEffect(() => {
        const baseUrl = window.location.hostname;
        let tenant = '';

        if (baseUrl == 'localhost') {
            tenant = 'client';
        } else {
            if (baseUrl.includes('truuth.id')) {
                const splittedUrl = baseUrl.split('.');
                tenant = splittedUrl.length > 0 ? splittedUrl[0] : '';
            }
        }

        const configUrl = getConfigUrl(tenant);

        KycApiService.getConfiguration(configUrl)
            .then(res => {
                setCookie(tenant, JSON.stringify(res), 1);
                setCookie(CONFIGURATION_COOKIES.tenant, tenant, 1);
                KycApiService.getApiUrlFromCookie();
                AuthService.init();
                setConfig({
                    loading: false,
                    data: res,
                });
            })
            .catch(err => {
                clearCookie();
                setConfig({
                    loading: false,
                    data: { error: 'Not found data' },
                })
            });
    }, []);

    const theme = useMemo(() => {
        let theme = AdminTheme;

        if (data && !data?.error) {
            if (data?.style?.primaryColor) {
                Object.keys(data.style.primaryColor).forEach(key => {
                    if (theme?.palette?.primary) {
                        _.set(theme?.palette?.primary, key, data.style.primaryColor[key]);
                    }
                });
            }

            if (data?.style?.secondaryColor) {
                Object.keys(data.style.secondaryColor).forEach(key => {
                    if (theme?.palette?.secondary) {
                        _.set(theme.palette.secondary, key, data.style.secondaryColor[key]);
                    }
                });
            }
        }

        return makeTheme(theme);
    }, [data]);

    return (
        <Provider store={store}>
            <MuiThemeProvider theme={theme}>
                {loading ? (
                    <Loading open={loading} />
                ) : (
                        data.error ? (
                            <NotMatch />
                        ) : (
                                <Router basename={APP_URL_PREFIX}>
                                    <Routers />
                                </Router>
                            )
                    )}
            </MuiThemeProvider>
        </Provider>
    );
}

export default App;
