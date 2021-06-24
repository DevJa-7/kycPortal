import React, { useState, useEffect, useLayoutEffect } from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { Grid, Card, CardHeader, Avatar, Divider } from '@material-ui/core';

import { cardStyles } from 'shared_components/src/common/styles';
import { UsersTable } from './index';
import { SearchBar, CustomPagination } from 'shared_components/src/components/common';
import { getIsMobile } from 'shared_components/src/common/utils';
import { TABLE_PAGE_NUMBER, NOTIFICATION_STATES } from 'shared_components/src/common/constants';
import { USER_NOTIFICATION_MESSAGE } from 'shared_components/src/common/messages';

import { IUsersList, IUserCreateRequest } from 'shared_components/src/service/models/user';
import { setTenantFilter } from '../../store/tenant/actions';

import { updateMenu } from '../../store/menu/actions';
import { MENU } from '../../common/routes/menu';
import { setLoading, clearLoading, setNotification } from '../../store/common/actions';
import { setUsers, resetUsers, setUserPageIndex } from '../../store/user/actions';
import KycApiService from '../../service/kycApi.service';
import {
	_getTenants,
	_getTenantFilter,
	_getTenantKycState,
	_getUsers,
	_getTenantAlias,
	_getTenantData,
	_getUserPage,
	_getProduct,
} from '../../store/selectors';
import { UserCreateModalForClient } from 'shared_components/src/components/users';
import { GroupIcon } from 'shared_components/src/common/icons';

/*
 * Styles
 */
const useStyles = makeStyles(() => ({
	root: {
		'& .MuiCardHeader-action': {
			textAlign: 'right',
		},
		'& .card-header-bottom': {
			'@media screen and (max-width: 600px)': {
				margin: '0 16px',
			},
		},
	},

	avatar: {
		backgroundColor: 'transparent',
		width: 36,
		height: 'auto',
		borderRadius: 0,

		'& svg': {
			width: '100%',
			height: '100%',
			fill: '#727272',
		},

		'@media screen and (max-width: 1280px)': {
			width: 33.7,
			height: 21.4,
		},
		'@media screen and (max-width: 900px)': {
			width: 33.7,
			height: 21.4,
		},
		'@media screen and (max-width: 600px)': {
			width: 25,
			height: 16,
		},
	},

	tenantSelect: {
		minWidth: '300px',
		marginLeft: 0,
		'@media screen and (max-width: 1280px)': {
			minWidth: '250px',
		},
		'@media screen and (max-width: 999px)': {
			minWidth: '100%',
			marginRight: 0,
		},
		'@media screen and (max-width: 600px)': {
			minWidth: '100%',
			margin: 0,
			marginTop: 17,
		},
	},

	kycState: {
		minWidth: '207.5px',
		'@media screen and (max-width: 1408px)': {
			marginRight: 0,
		},
		'@media screen and (max-width: 1280px)': {
			minWidth: '150px',
		},
		'@media screen and (max-width: 999px)': {
			minWidth: '100%',
			width: '100%',
			marginLeft: 0,
			marginRight: 0,
		},
		'@media screen and (max-width: 600px)': {
			minWidth: '100%',
			margin: 0,
			marginTop: 17,
		},
	},

	userSearch: {
		maxWidth: '590px',
		marginLeft: 'auto',
		width: '43%',
		'@media screen and (max-width: 1440px)': {
			maxWidth: '100%',
			width: '40%',
		},
		'@media screen and (max-width: 1280px)': {
			maxWidth: '100%',
			width: '40%',
		},
		'@media screen and (max-width: 999px)': {
			maxWidth: '100%',
			width: '100%',
		},
		'& .search-bar': {
			width: '100%',
		},
	},

	table: {
		marginTop: 30,

		'& .tableHeader': {
			marginBottom: 25,
			'@media screen and (max-width: 1440px)': {
				marginBottom: 20,
			},

			'@media screen and (max-width: 1280px)': {
				marginBottom: 15,
			},

			'@media screen and (max-width: 600px)': {
				flexWrap: 'wrap',
				flexFlow: 'column-reverse',
				marginBottom: 18.6,
				padding: '0 16px',
			},
		},
		overflow: 'auto',
		'@media screen and (max-width: 600px)': {
			minWidth: 0,
			marginTop: 14.5,
		},
	},
	userTable: {},

	pagination: {
		marginTop: 25,
		marginBottom: 15,
		'@media screen and (max-width: 1280px)': {
			marginTop: 15,
			marginBottom: 5,
		},
	},
}));

/**
 * Main Component
 */
const UsersPage = () => {
	const dispatch = useDispatch();
	const tenantData = _getTenantData();
	const tenants = _getTenants();
	const users = _getUsers();
	const tenantAlias = _getTenantAlias();
	const product = _getProduct();

	const tenantFilter = _getTenantFilter();
	const tenantKycState = _getTenantKycState();
	const userPage = _getUserPage();

	const classes = useStyles();
	const cardClasses = cardStyles();
	const [isMobile, setIsMobile] = useState(getIsMobile());
	const [columnSort, setColumnSort] = useState('email');

	useEffect(() => {
		window.addEventListener('resize', () => {
			setIsMobile(getIsMobile());
		});

		dispatch(updateMenu(MENU.viewUsers));
	}, []);

	useLayoutEffect(() => {
		dispatch(setTenantFilter(''));
	}, []);

	useEffect(() => {
		if (!tenantAlias) {
			return;
		}
		loadTable();
	}, [userPage, tenants, tenantAlias, tenantKycState, tenantFilter]);

	useEffect(() => {
		return () => {
			dispatch(setTenantFilter(''));
		};
	}, []);

	const loadTable = async () => {
		const filters = {
			search: tenantFilter,
		};

		dispatch(setLoading());
		KycApiService.getUsersList(userPage, TABLE_PAGE_NUMBER, columnSort, filters)
			.then((res: IUsersList) => {
				dispatch(clearLoading());
				dispatch(setUsers(res));
			})
			.catch((err) => {
				dispatch(clearLoading());
				dispatch(resetUsers());
				console.log('User table error', err);
			});
	};

	const handleCreateUser = (createUserData: IUserCreateRequest) => {
		return new Promise(async (resolve, reject) => {
			dispatch(setLoading());
			//organisation
			const req = {
				...createUserData,
			};

			KycApiService.createUser(req)
				.then((response) => {
					dispatch(clearLoading());
					if (response.error) {
						displayNotificatoinError(
							response.error?.message || USER_NOTIFICATION_MESSAGE.USER_CREATE_FAILED_MESSAGE
						);
						reject({ status: 'error' });
					} else {
						displayNotificatoinSuccess(USER_NOTIFICATION_MESSAGE.USER_CREATE_SUCCESS_MESSAGE);
						resolve({ status: 'success' });
						loadTable();
					}
				})
				.catch((err) => {
					dispatch(clearLoading());
					displayNotificatoinError(USER_NOTIFICATION_MESSAGE.USER_CREATE_FAILED_MESSAGE);
					reject({ status: 'error' });
				});
		});
	};

	const initPageIndex = () => {
		dispatch(setUserPageIndex(1));
	};

	const handleUserSearch = (event: React.ChangeEvent<{ value: unknown }>) => {
		dispatch(setTenantFilter(event.target.value as string));
		initPageIndex();
	};

	const handleChangePageIndex = (curPage: number) => {
		dispatch(setUserPageIndex(curPage));
	};
	const displayNotificatoinSuccess = (msg: string) => {
		dispatch(
			setNotification({
				message: msg,
				type: NOTIFICATION_STATES.success,
			})
		);
	};

	const displayNotificatoinError = (msg: string) => {
		dispatch(
			setNotification({
				message: msg,
				type: NOTIFICATION_STATES.error,
			})
		);
	};

	return (
		<Card className={clsx(classes.root, cardClasses.root)}>
			<CardHeader
				avatar={
					<Avatar aria-label="recipe" className={classes.avatar}>
						<GroupIcon />
					</Avatar>
				}
				action={
					<UserCreateModalForClient
						isMobile={isMobile}
						createUser={handleCreateUser}
						roles={product?.roles}
					/>
				}
				title="View Users"
			/>
			<Divider className="card-header-bottom" />
			<Grid container className={classes.table}>
				<Grid container className="tableHeader" alignContent="space-between">
					<Grid container item className={classes.userSearch}>
						<SearchBar
							id="user-list-search"
							placeholder="Search by Email, First Name, Last Name..."
							handleSearchbar={handleUserSearch}
							className="search-bar"
							defaultValue={tenantData.filter}
						/>
					</Grid>
				</Grid>
				<UsersTable className={classes.userTable} data={users.items} tenantAlias={tenantAlias} />
				{!isMobile && (
					<CustomPagination
						curPage={users.page}
						totalPages={users?.items?.length > 0 ? users.pageCount : 0}
						className={classes.pagination}
						changePage={handleChangePageIndex}
					/>
				)}
			</Grid>
		</Card>
	);
};

export default UsersPage;
