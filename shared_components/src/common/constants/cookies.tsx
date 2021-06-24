/**
 * Cookie Constants
 */
export const GENERAL_COOKIES: { [key: string]: string } = {
	isLoggedIn: 'is_logged_in',
	userFirstName: 'user_first_name',
	userLastName: 'user_last_name',
	userId: 'user_id',
	userRole: 'user_role',
	token: 'token',
	userInfo: 'user_info',
	userSession: 'user_session',
	userRoles: 'user_roles',
	userTenant: 'user_tenant',
};

export const SIGNIN_COOKIES: { [key: string]: string } = {
	countForSignIn: 'count_for_sign_in',
	timeForLastSignInAttempt: 'time_for_last_attempt',
	countForResend: 'count_for_resend',
	timeForLastResendAttempt: 'time_for_last_resend_attempt',
};

export const CONFIGURATION_COOKIES: { [key: string]: string } = {
	tenant: 'tenant',
};
