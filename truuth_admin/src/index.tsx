import React from 'react';
import ReactDOM from 'react-dom';
import { history } from './common/routes/history';
import * as serviceWorker from './shared/serviceWorker';

import './styles.scss';
import 'shared_components/src/assets/fonts/fonts.css';
import 'prismjs/themes/prism-coy.css';

import App from './shared/App';
import { APP_URL_PREFIX } from 'shared_components/src/common/constants';

let rootApp = document.getElementById('root');

if (rootApp) {
    const reg = new RegExp(APP_URL_PREFIX + '(\/.*)$');
    const hasPrefix = location.pathname.search(APP_URL_PREFIX);
    const removedPath = (reg.exec(location.pathname) || [])[1];
    let path = APP_URL_PREFIX;
    
    if (removedPath != undefined) {
        path += removedPath;
    } else {
        if (hasPrefix != -1) {
            path = location.pathname;
        } else {
            path += location.pathname;
        }
    }

    if (path) {
        history.replace(path + history.location.search);
    }

    ReactDOM.render(
        <React.StrictMode>
            <App />
        </React.StrictMode>,
        rootApp
    );
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
