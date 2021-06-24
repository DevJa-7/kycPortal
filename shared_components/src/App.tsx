import React, { useEffect, Suspense } from 'react';
import { MuiThemeProvider } from "@material-ui/core/styles";
import { Layout } from './components/layout';
import { Route, BrowserRouter } from 'react-router-dom';

import { lightTheme } from './common/themes/light';
import { 
    LoginPage, 
} from './components';

function App() {

    useEffect(() => {
        const curPath = window.location.pathname;
        if (curPath === '/') {
            window.location.href = '/login';
        }
    }, []);

    const handleSignOut = () => {
        window.location.href = '/';
    };

    return (
        <BrowserRouter>
            <Suspense fallback={<div>Loading...</div>}>
                <MuiThemeProvider theme={lightTheme}>
                    <Route exact path='/' component={LoginPage} />
                    <Route path='/login' component={LoginPage} />
                </MuiThemeProvider>
            </Suspense>
        </BrowserRouter>
    );
}

export default App;
