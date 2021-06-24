import React, { Suspense, useEffect, useLayoutEffect, useMemo } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useIdleTimer } from 'react-idle-timer';

import { Layout } from 'shared_components/src/components/layout';
import { Loading, NotMatch, NotificationBar } from 'shared_components/src/components/common';
import { clearGeneralCookies, setCookie, getCookie } from 'shared_components/src/service/common.service';
import AuthService from '../../service/auth.service';
import {
	GENERAL_COOKIES,
	AUTH_ROLE,
	NOTIFICATION_STATES,
	CONFIGURATION_COOKIES,
	APP_URL_PREFIX,
} from 'shared_components/src/common/constants';

import { LOGIN_USER_TYPES } from '../constants';
import {
	_getMenuKey,
	_getLoadingState,
	_getIsLoggedIn,
	_getAuthInfo,
	_getAuthRoles,
	_getNotification,
	_getProducts,
	_getTenants,
} from '../../store/selectors';
import { logoutAuthUser, updateAuthUser } from '../../store/auth/actions';
import { setProducts, setProduct } from '../../store/product/actions';
import { setTenants } from '../../store/tenant/actions';
import { IAuthInfo } from '../../service/models/auth';
import KycApiService from '../../service/kycApi.service';
import { clearLoading, setLoading, setNotification } from '../../store/common/actions';
import routes from './routes';
import { DESTROY_SESSION } from '../../store/common/actionTypes';
import { getIdleTimeCountFromConfiguration } from 'shared_components/src/common/utils';
import { gotoStartPage } from '../../common/utils';

const Routers = () => {
	const dispatch = useDispatch();
	const history = useHistory();

	const menuKey = _getMenuKey();
	const isLoading = _getLoadingState();
	const notification = _getNotification();
	const isLoggedIn = _getIsLoggedIn();
	const authRoles = _getAuthRoles();
	const authInfo = _getAuthInfo();
	const products = _getProducts();
	const tenants = _getTenants();
	const userEmail = authInfo && JSON.parse(authInfo).email;
	const curToken = getCookie(GENERAL_COOKIES.token);
	const curPath = window.location.pathname;

	const { idleTimeCount, hasConfiguration } = useMemo(() => {
		const _idleTimecCount = getIdleTimeCountFromConfiguration();
		const tenant = getCookie(CONFIGURATION_COOKIES.tenant);

		return {
			idleTimeCount: _idleTimecCount,
			hasConfiguration: tenant ? true : false,
		};
	}, []);

	useEffect(() => {
		switch (curPath) {
			case APP_URL_PREFIX:
			case `${APP_URL_PREFIX}/`:
				clearSignInfo();
				break;

			case `${APP_URL_PREFIX}/login`:
				break;

			default:
				break;
		}
	}, [curPath]);

	const handleOnIdle = () => {
		handleForceSignOut();
	};

	useLayoutEffect(() => {
		checkToken();
	}, []);

	useIdleTimer({
		timeout: 1000 * 60 * idleTimeCount,
		onIdle: handleOnIdle,
		debounce: 300,
	});

	const checkToken = () => {
		if (curToken) {
			if (!isLoggedIn) {
				const loggedIn = getCookie(GENERAL_COOKIES.isLoggedIn);
				const _authInfo: IAuthInfo = {
					isLoggedin: loggedIn === 'true',
					token: getCookie(GENERAL_COOKIES.token),
					role: getCookie(GENERAL_COOKIES.userRole) as AUTH_ROLE,
					firstName: getCookie(GENERAL_COOKIES.userFirstName),
					lastName: getCookie(GENERAL_COOKIES.userLastName),
					info: getCookie(GENERAL_COOKIES.userInfo),
					session: getCookie(GENERAL_COOKIES.userSession),
					roles: getCookie(GENERAL_COOKIES.userRoles),
					tenant: getCookie(GENERAL_COOKIES.userTenant),
				};

				dispatch(updateAuthUser(_authInfo));
				KycApiService.init(_authInfo.token);

				if (_authInfo.session) {
					const sessionInfo = JSON.parse(_authInfo.session);
					setExpiring(sessionInfo.payload.exp);
				}
			}
		}
	};

	const setExpiring = (expireIn: number) => {
		const delta = expireIn * 1000 - new Date().getTime();

		if (delta > 0) {
			setTimeout(() => {
				refreshToken();
			}, delta);
		} else {
			refreshToken();
		}
	};

	const clearSignInfo = () => {
		history.push('/login');
		clearGeneralCookies();
		dispatch(logoutAuthUser());
		dispatch({ type: DESTROY_SESSION });
	};

	const refreshToken = () => {
		AuthService.currentSession()
			.then((res: any) => {
				if (res) {
					const userInfo: IAuthInfo = setAuthInfo(res);

					if (checkUser(userInfo.roles)) {
						setCookies(userInfo);

						dispatch(updateAuthUser(userInfo));
						KycApiService.init(userInfo.token);

						setExpiring(res.idToken.payload.exp);
					} else {
						handleForceSignOut();
					}
				} else {
					handleForceSignOut();
				}
			})
			.catch((err) => {
				handleForceSignOut();
			});
	};

	const setAuthInfo = (auth: any) => {
		return {
			isLoggedin: true,
			token: auth?.idToken?.jwtToken,
			role: auth?.idToken?.payload['cognito:groups'][0],
			firstName: auth?.idToken?.payload?.given_name ?? '',
			lastName: auth?.idToken?.payload?.family_name ?? '',
			info: JSON.stringify(auth?.idToken?.payload ?? ''),
			session: JSON.stringify(auth.idToken),
			roles: auth?.idToken?.payload['custom:roles'],
			tenant: auth?.idToken?.payload['custom:tenant'],
		};
	};

	const setCookies = (authSessionInfo: IAuthInfo) => {
		setCookie(GENERAL_COOKIES.isLoggedIn, authSessionInfo.isLoggedin.toString(), 1);
		setCookie(GENERAL_COOKIES.token, authSessionInfo.token ?? '', 1);
		setCookie(GENERAL_COOKIES.userRole, authSessionInfo.role ?? 0, 1);
		setCookie(GENERAL_COOKIES.userFirstName, authSessionInfo.firstName ?? '', 1);
		setCookie(GENERAL_COOKIES.userLastName, authSessionInfo.lastName ?? '', 1);
		setCookie(GENERAL_COOKIES.userInfo, authSessionInfo.info ?? '', 1);
		setCookie(GENERAL_COOKIES.userSession, authSessionInfo.session ?? '', 1);
		setCookie(GENERAL_COOKIES.userRoles, authSessionInfo.roles ?? '', 1);
		setCookie(GENERAL_COOKIES.userTenant, authSessionInfo.tenant ?? '', 1);
	};

	const checkUser = (roles: string) => {
		const arrRoles = roles?.split(',') || [];

		let hasPermission = false;

		arrRoles.forEach((role) => {
			if (LOGIN_USER_TYPES.includes(role)) {
				hasPermission = true;
			}
		});

		return hasPermission;
	};

	const handleSignOut = () => {
		if (isLoggedIn) {
			AuthService.signOut()
				.then((res) => {
					clearSignInfo();
				})
				.catch((err) => handleSignOutError(err));
		} else {
			clearSignInfo();
		}
	};

	const handleForceSignOut = () => {
		AuthService.signOut()
			.then((res) => {
				clearSignInfo();
			})
			.catch((err) => handleSignOutError(err));
	};

	const handleSignOutError = (err: any) => {
		console.log('Sign Out Error', err);
		clearSignInfo();
		localStorage.clear();
		sessionStorage.clear();
	};

	const handleNotificationClose = () => {
		dispatch(setNotification({ message: '', type: NOTIFICATION_STATES.info }));
	};

	const handleReturn = () => {
		if (isLoggedIn) {
			gotoStartPage(history, authRoles);
		} else {
			history.push('/login');
		}
	};

	useEffect(() => {
		if (curToken) {
			getProducts();
		}
	}, [curToken]);

	useEffect(() => {
		if (products?.length > 0 && authRoles) {
			const roles = authRoles.split(',');
			const prod = products.find((_prod) => {
				const prodRole = _prod?.roles?.find((_role) => {
					if (!_role.visible) {
						return false;
					}

					const authRole = roles.find((_authRole) => _authRole === _role.name);

					return authRole ? true : false;
				});

				if (prodRole) {
					return true;
				}

				return false;
			});

			dispatch(setProduct(prod));

			getTenantList();
		}
	}, [products]);

	const getProducts = () => {
		dispatch(setLoading());
		KycApiService.getProducts()
			.then((res) => {
				dispatch(setProducts(res?.items));
			})
			.catch((err) => {
				console.log('errr => ', err);
			})
			.finally(() => {
				dispatch(clearLoading());
			});
	};

	const getTenantList = () => {
		products?.forEach((prod) => {
			if (tenants?.[prod.code]?.length > 0) {
				return;
			}

			dispatch(setLoading());
			KycApiService.getActiveTenantsForProduct(prod.code)
				.then((res) => {
					if (res) {
						dispatch(setTenants(prod.code, res.items));
					} else {
						dispatch(setTenants(prod.code, []));
					}
				})
				.catch((err) => {
					dispatch(setTenants(prod.code, []));
				})
				.finally(() => {
					dispatch(clearLoading());
				});
		});
	};

	return (
		<Suspense fallback={<Loading open={true} />}>
			<Loading open={isLoading} />
			<NotificationBar
				message={notification.message}
				type={notification.type}
				className={notification?.classes}
				onClose={handleNotificationClose}
			/>
			<Switch>
				{routes.map((route, i) => {
					const { path, component: Component, hasAuth, exact } = route;
					return (
						<Route
							key={i}
							path={path}
							render={() => {
								if (hasAuth) {
									if (!curToken) {
										clearSignInfo();
									} else {
										checkToken();
									}
									return (
										<Layout
											handleSignOut={handleSignOut}
											menu={menuKey}
											role={authRoles}
											email={userEmail}
										>
											<Component />
										</Layout>
									);
								} else {
									return <Component />;
								}
							}}
							exact={exact}
						/>
					);
				})}
				<Route
					render={() => (
						<NotMatch hasConfiguration={hasConfiguration} handleReturn={handleReturn} />
					)}
				/>
			</Switch>
		</Suspense>
	);
};

export default Routers;
