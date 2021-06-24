// Max count for attempting sign in
export const MAX_SIGNIN_FAIL_COUNT = 5;
export const TIMEOUT_OVER_ATTEMPTING_SIGNIN = 15; // [min]

// Max count for attempting resend
export const MAX_RESEND_FAIL_COUNT = 5;
export const TIMEOUT_OVER_ATTEMPTING_RESEND = 15; // [min]

/**
 * Auth Roles
 */
export enum AUTH_ROLE {
	none = 'NONE',
	admin = 'PLATFORM_ADMIN',
	agent = 'AGENT',
	client = 'ADMIN',
	owner = 'OWNER',
	tenant = 'TENANT',
	verifier = 'VERIFIER',
	docMgr = 'DOC-MGR',
}

// idle time for auto logout when user is idle (in minutes)
export const IDLE_TIME_IN_MINS_DEFAULT = 30;
