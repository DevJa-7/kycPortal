/**
 * Users List
 */
export interface Users {
	userId: string;
	firstname: string;
	lastname: string;
	status: boolean;
	email: string;
	organisation: string;
	subscriptionId: string;
}

/**
 * Users List
 */
export interface IUsersList {
	items: IUsersDocument[];
	count: number;
	limit: number;
	page: number;
	pageCount: number;

	hasPrevPage: boolean;
	nextPage: number;
	pagingCounter: number;
	prevPage: boolean;
	totalDocs: number;
	totalPages: number;
}

/**
 * User Document
 */
export interface IUsersDocument {
	username: string;
	status: string;
	email: string;
	givenName: string;
	familyName: string;
	phoneNumber: string;
	roles: Array<string>;
}

/**
 * New User
 */
export interface IUserCreateRequest {
	givenName: string;
	familyName: string;
	phoneName?: string;
	roles: Array<string>;
	status?: boolean;
}

/**
 * Others
 */
export const USER_STATUS_DISPLAY: { [key: string]: string } = {
	ACTIVE: 'Enabled',
	INACTIVE: 'Disabled',
};

export const USER_STATUS = {
	ENABLED: 'ACTIVE',
	DISABLED: 'INACTIVE',
};
