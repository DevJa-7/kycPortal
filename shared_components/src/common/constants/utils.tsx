// Sort
export enum SORT_TYPE {
	asc = 2,
	desc = 1,
}

// List
export interface IListType {
	value: string | null;
	display: string;
	id?: number;
}

export const ALL_DEFAULT_ITEM: IListType = {
	value: 'all',
	display: 'All',
	id: 0,
};

/**
 * Notification
 */
export enum NOTIFICATION_STATES {
	success = 'success',
	warning = 'warning',
	error = 'error',
	info = 'info',
}

export interface INotification {
	message: string;
	type: NOTIFICATION_STATES;
	classes?: any;
}

/**
 * Common Pagination
 */
export const TABLE_PAGE_NUMBER = 10;

/**
 * Date Format
 */
export const DATE_FORMAT_FNS = 'yyyy-MM-dd';
export const DATE_FORMAT_MOMENT = 'yyyy-MM-DD';

/**
 * States of component 'StateItem'
 */
export enum STATEITEM_STATES {
	success = 'SUCCESS',
	warning = 'WARNING',
	error = 'ERROR',
}
