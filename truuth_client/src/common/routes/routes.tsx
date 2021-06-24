import {
    EmptyPage,
} from 'shared_components/src/components/common';

import {
    LoginPage,
    SubscriptionManagement,
    VerificationPage,
    VerificationDetailPage,
    AccountSettings,
    UsersPage,
    UserDetailPage,
    RequestLaunch,
} from '../../pages';

const routes = [
    // No required authentication
    {
        path: '/',
        component: EmptyPage,
        hasAuth: false,
        exact: true,     
    },
    {
        path: '/login',
        component: LoginPage,
        hasAuth: false, 
        exact: true,       
    },
    {
        path: '/launch',
        component: RequestLaunch,
        hasAuth: false,
        exact: false,
    },
    // Subscripton
    {
        path: '/subscription-management',
        component: SubscriptionManagement,
        hasAuth: true,
        exact: true,
    },
    // Verification
    {
        path: '/verification',
        component: VerificationPage,
        hasAuth: true,
        exact: true,
    },
    {
        path: '/verification-detail/:subId/:verId',
        component: VerificationDetailPage,
        hasAuth: true,
        exact: true,
    },
    // User
    {
        path: '/view-users',
        component: UsersPage,
        hasAuth: true,
        exact: true,
    },
    {
        path: '/user-detail/:subId/:type/:verId',
        component: UserDetailPage,
        hasAuth: true,
        exact: true,
    },
    // Account Settings
    {
        path: '/account-settings',
        component: AccountSettings,
        hasAuth: true,
        exact: true,
    },
];

export default routes;
