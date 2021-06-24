import { RootState } from './rootReducer';
import { useSelector } from 'react-redux';

export const _getState = () => useSelector((state: RootState) => state);

/**
 * Menu
 */
export const _getMenuKey = () => useSelector((state: RootState) => state.menu.key);

/**
 * Common
 */
export const _getLoadingState = () => useSelector((state: RootState) => state.common.isLoading);
export const _getIdleStatus = () => useSelector((state: RootState) => state.common.isIdle);
export const _getNotification = () => useSelector((state: RootState) => state.common.notification);

/**
 * Auth
 */
export const _getAuth = () => useSelector((state: RootState) => state.auth);
export const _getAuthRole = () => useSelector((state: RootState) => state.auth.role);
export const _getAuthInfo = () => useSelector((state: RootState) => state.auth.info);
export const _getIsLoggedIn = () => useSelector((state: RootState) => state.auth.isLoggedin);
export const _getAuthRoles = () => useSelector((state: RootState) => state.auth.roles);
export const _getAuthTenant = () => useSelector((state: RootState) => state.auth.tenant);

/**
 * Subscription
 */
export const _getSubscriptionData = () => useSelector((state: RootState) => state.subscription);
export const _getSubscriptions = () => useSelector((state: RootState) => state.subscription.subscriptions);
export const _getSubscriptionId = () => useSelector((state: RootState) => state.subscription.subscriptionId);
export const _getSubscriptionFilter = () => useSelector((state: RootState) => state.subscription.filter);
export const _getSubscriptionKycState = () => useSelector((state: RootState) => state.subscription.kycState);

/**
 * Verification
 */
export const _getVerificationData = () => useSelector((state: RootState) => state.verification);
export const _getVerifications = () => useSelector((state: RootState) => state.verification.verifications);
export const _getVerificationPage = () => useSelector((state: RootState) => state.verification.verificationPage);
export const _getVerificationDetail = () => useSelector((state: RootState) => state.verification.verificationDetail);
export const _getVerificationId = () => useSelector((state: RootState) => state.verification.verificationId);
export const _getVerificationDetailStates = () => useSelector((state: RootState) => state.verification.editStatus);
export const _getRefreshVerifications = () => useSelector((state: RootState) => state.verification.refreshList);

/**
 * Users
 */
export const _getUserData = () => useSelector((state: RootState) => state.user);
export const _getUsers = () => useSelector((state: RootState) => state.user.users);
export const _getUserPage = () => useSelector((state: RootState) => state.user.userPage);
export const _getUserDetail = () => useSelector((state: RootState) => state.user.userDetail);
export const _getUserId = () => useSelector((state: RootState) => state.user.userId);
export const _getRefreshUsers = () => useSelector((state: RootState) => state.user.refreshList);

/**
 * Document Template
 */
export const _getDocuments = () => useSelector((state: RootState) => state.documentTemplate.documents);
export const _getDocumentPage = () => useSelector((state: RootState) => state.documentTemplate.documentPage);

/**
 * Manual Verification
 */
export const _getVerifierJobState = () => useSelector((state: RootState) => state.manualVerification.job);
export const _getVerifierJobDetail = () => useSelector((state: RootState) => state.manualVerification.job?.jobDetail);
/**
 * Tenants
 */
export const _getTenantData = () => useSelector((state: RootState) => state.tenant);
export const _getTenants = () => useSelector((state: RootState) => state.tenant.tenants);
export const _getTenantAlias = () => useSelector((state: RootState) => state.tenant.tenantAlias);
export const _getTenantFilter = () => useSelector((state: RootState) => state.tenant.filter);
export const _getTenantKycState = () => useSelector((state: RootState) => state.tenant.kycState);

/**
 * Products
 */
export const _getProductData = () => useSelector((state: RootState) => state.product);
export const _getProducts = () => useSelector((state: RootState) => state.product.products);
export const _getProduct = () => useSelector((state: RootState) => state.product.product);
