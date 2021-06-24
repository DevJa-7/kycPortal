import {
    EmptyPage,
} from 'shared_components/src/components/common';

import {
    LoginPage,
    SubscriptionManagement,
    VerificationPage,
    VerificationDetailPage,
    DocumentListPage,
    TemplateDetailPage,
    TestTemplatePage,
    AccountSettings,
    UsersPage,
    UserDetailPage,
    ManualVerificationPage,
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
    // Document
    {
        path: '/document-template',
        component: DocumentListPage,
        hasAuth: true,
        exact: true,
    },
    {
        path: '/document-template/test',
        component: TestTemplatePage,
        hasAuth: true,
        exact: true,
    },
    {
        path: '/document-template/create',
        component: TemplateDetailPage,
        hasAuth: true,
        exact: true,
    },
    {
        path: '/document-template/:type/:tmpId',
        component: TemplateDetailPage,
        hasAuth: true,
        exact: true,
    },
    // Manual Verify
    {
        path: '/manual-verification',
        component: ManualVerificationPage,
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
