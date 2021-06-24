import React, { useState, useEffect, useMemo } from 'react';
import { NavLink } from 'react-router-dom';
import clsx from 'clsx';
import { Theme, makeStyles } from '@material-ui/core/styles';
import {
	Grid,
	List,
	Drawer,
	Divider,
	ListItem,
	IconButton,
	ListItemIcon,
	ListItemText,
} from '@material-ui/core';
import { ChevronLeft, ChevronRight } from '@material-ui/icons';
import styled from 'styled-components';

import {
	TEXT_COLOR,
	BOX_SHADOW,
	HEADER_HEIGHT,
	SIDEBAR_WIDTH,
	BACKGROUND_COLOR,
	HEADER_BACKGROUND_COLOR,
} from '../../common/styles';
import { ContentText, ContentImage } from '../common';
import { MENUS, IMenuItem } from './menu';
import { APP_VERSION_NUMBER, GENERAL_COOKIES } from '../../common/constants';
import { getCookie } from '../../service/common.service';
import { getLogoFromConfiguration } from '../../common/utils';

/**
 * Props
 */
interface IProps {
	isMobile: boolean;
	open: boolean;
	handleDrawerToggle: any;
	handleSignOut: any;
	menu: string;
	role: string;
}

/**
 * Types and Constants
 */
interface IAccountInfo {
	name: string;
	email: string;
	phone: string;
	photo: string;
}

/**
 * Styles
 */
const useNoMobileStyles = makeStyles((theme: Theme) => ({
	root: {
		display: 'flex',
	},

	toolbarIcon: {
		display: 'flex',
		position: 'fixed',
		top: 0,
		alignItems: 'center',
		justifyContent: 'flex-end',
		height: HEADER_HEIGHT[0],
		backgroundColor: HEADER_BACKGROUND_COLOR,
		color: TEXT_COLOR.graydark,
		zIndex: 10,
		background: '#FFFFFF',

		'@media screen and (max-width: 900px)': {
			height: HEADER_HEIGHT[1],
		},

		'@media screen and (max-width: 600px)': {
			height: HEADER_HEIGHT[2],
		},

		...theme.mixins.toolbar,
	},

	shadow: {
		boxShadow: BOX_SHADOW.secondary,
	},

	logo: {
		width: SIDEBAR_WIDTH[0],
		justifyContent: 'center',
		alignContent: 'center',

		'@media screen and (max-width: 900px)': {
			width: SIDEBAR_WIDTH[1],
		},

		'& .image': {
			width: 120,

			'@media screen and (max-width: 900px)': {
				width: 100,
			},
		},

		'& .descrition': {
			marginTop: 12,
			color: theme.palette.grey[900],
			fontSize: 14,
			lineHeight: 1.35,
			textAlign: 'center',

			'@media screen and (max-width: 900px)': {
				fontSize: 12,
			},
		},
	},

	drawerPaper: {
		height: '100vh',
		position: 'relative',
		whiteSpace: 'nowrap',
		width: SIDEBAR_WIDTH[0],
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
		borderRight: 'none',

		'@media screen and (max-width: 900px)': {
			width: SIDEBAR_WIDTH[1],
		},
	},

	drawerPaperClose: {
		overflowX: 'hidden',
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		width: `50px !important`,
		[theme.breakpoints.up('sm')]: {
			width: theme.spacing(9),
		},
	},

	appBarSpacer: {
		width: '100%',
		height: HEADER_HEIGHT[0],
		...theme.mixins.toolbar,

		'@media screen and (max-width: 900px)': {
			marginLeft: 'auto',
			height: HEADER_HEIGHT[1],
		},

		'@media screen and (max-width: 600px)': {
			marginLeft: 'auto',
			height: HEADER_HEIGHT[2],
		},
	},

	content: {
		flexGrow: 1,
		height: '100vh',
		overflow: 'auto',
	},

	container: {
		paddingTop: theme.spacing(4),
		paddingBottom: theme.spacing(4),
	},

	paper: {
		padding: theme.spacing(2),
		display: 'flex',
		overflow: 'auto',
		flexDirection: 'column',
	},

	menu: {
		overflowY: 'auto',
		overflowX: 'hidden',
		maxHeight: `calc(100vh - ${HEADER_HEIGHT[0]})`,
		marginTop: 12,

		'& > a': {
			textDecoration: 'none',
		},

		'@media screen and (max-width: 900px)': {
			maxHeight: `calc(100vh - ${HEADER_HEIGHT[1]})`,
		},
	},

	menuItem: {
		paddingTop: 11,
		paddingBottom: 11,

		'& svg': {
			width: 23,
			fill: TEXT_COLOR.icon,
		},

		'& .name': {
			color: TEXT_COLOR.graylight,
			'& span': {
				fontSize: 12,
			},
		},

		'& .MuiListItemIcon-root': {
			paddingLeft: 0,
			minWidth: 35,
		},

		'& .MuiListItemText-root': {
			marginTop: 2,
			marginBottom: 2,
		},
	},

	active: {
		backgroundColor: `${theme.palette.grey[100]} !important  `,

		'& svg': {
			fill: TEXT_COLOR.primary,
		},

		'& .name': {
			color: TEXT_COLOR.primary,
		},
	},

	activeBar: {
		width: 4,
		height: '100%',
		backgroundColor: BACKGROUND_COLOR.primary,
	},
}));

const useMobileStyles = makeStyles((theme: Theme) => ({
	root: {
		display: 'flex',
	},

	closeButton: {
		position: 'absolute',
		top: 45,
		color: '#FFFFFF',
		padding: 0,

		'& svg': {
			width: 40,
			height: 40,
		},
	},

	accountInfo: {
		backgroundColor: BACKGROUND_COLOR.primary,
		padding: '55px 20px 22px 20px',
		fontFamily: 'SFProText',
		color: '#FFFFFF',

		'& .profile': {
			fontSize: 17,
			lineHeight: 1.29,
			margin: 0,
			marginBottom: 18,
		},

		'& .photo': {
			width: 77,
			height: 77,
			marginBottom: 11,
		},

		'& .name': {
			fontSize: 24,
			lineHeight: 1.20833333,
		},

		'& .phone, & .ematl': {
			fontSize: 14,
			lineHeight: 1.2142857,
			marginTop: 2,
		},
	},

	drawerPaper: {
		position: 'absolute',
		whiteSpace: 'nowrap',
		width: '100%',
		height: '100vh',
		zIndex: 1210,
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
		borderRight: 'none',

		'& .MuiList-root > a': {
			textDecoration: 'none',
		},
	},

	drawerPaperClose: {
		overflowX: 'hidden',
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		width: 0,
	},

	appBarSpacer: theme.mixins.toolbar,

	content: {
		flexGrow: 1,
		height: '100vh',
		overflow: 'auto',
	},

	container: {
		paddingTop: theme.spacing(4),
		paddingBottom: theme.spacing(4),
	},

	paper: {
		padding: theme.spacing(2),
		display: 'flex',
		overflow: 'auto',
		flexDirection: 'column',
	},

	menu: {
		overflowY: 'auto',
		maxHeight: `calc(100vh - ${HEADER_HEIGHT[0]})`,

		'@media screen and (max-width: 900px)': {
			maxHeight: `calc(100vh - ${HEADER_HEIGHT[1]})`,
		},
	},

	menuItem: {
		padding: '20px 8px 20px 16px',
		paddingLeft: 0,
		borderBottom: '0.5px solid #3c3c434a',
		marginLeft: 16,

		'& svg': {
			width: 23,
			fill: TEXT_COLOR.icon,
		},

		'& .name': {
			color: TEXT_COLOR.graylight,

			'& .MuiTypography-body1': {
				fontSize: '17px !important',
			},
		},

		'& .MuiListItemIcon-root': {
			paddingLeft: 14,
		},

		'& .MuiListItemText-root': {
			marginTop: 2,
			marginBottom: 2,
		},
	},

	active: {
		'& .icon svg': {
			fill: TEXT_COLOR.primary,
		},

		'& .name': {
			color: TEXT_COLOR.primary,
		},
	},

	activeBar: {
		width: 8,
		height: '100%',
		backgroundColor: BACKGROUND_COLOR.primary,
	},
}));

/**
 * Styled Components
 */
const AccountInfo = styled.div``;
const AppBarSpacer = styled.div``;
const ToolbarIconContainer = styled.div``;
const VersionInfo = styled.div`
	position: absolute;
	bottom: 1rem;
	color: ${TEXT_COLOR.graylight};
	font-size: 12px;
	margin-left: 1rem;
`;

/**
 * Main Component
 */
const Sidebar = ({ open, isMobile, handleDrawerToggle, handleSignOut, menu, role }: IProps) => {
	const noMobileClasses = useNoMobileStyles();
	const mobileClasses = useMobileStyles();

	const [accountInfo, setAccountInfo] = useState({
		name: '',
		phone: '',
		photo: '',
		email: '',
	} as IAccountInfo);
	const [menuMobile, setMenuMobile] = useState([] as any);
	const [menuNoMobile, setMenuNoMobile] = useState([] as any);

	const updateMenu = (index: number) => {
		if (index < menuMobile.length - 1) {
			handleDrawerToggle();
		} else {
			handleSignOut();
		}
	};

	const menuItemsNoMobile = (
		<>
			{menuNoMobile.map((item: any, index: number) => {
				return (
					<NavLink to={item.path} key={index}>
						<ListItem
							button
							className={clsx(
								noMobileClasses.menuItem,
								menu === item.key && noMobileClasses.active
							)}
						>
							{menu === item.key && (
								<Divider
									orientation="vertical"
									flexItem
									className={noMobileClasses.activeBar}
									absolute
								/>
							)}
							<ListItemIcon>{item.icon}</ListItemIcon>
							<ListItemText primary={item.title} className="name" />
						</ListItem>
					</NavLink>
				);
			})}
		</>
	);

	const menuItemsMobile = (
		<>
			{menuMobile.map((item: any, index: any) => {
				return (
					<NavLink to={item.path} key={index} onClick={() => updateMenu(index)}>
						<ListItem
							button
							className={clsx(
								mobileClasses.menuItem,
								menu === item.key && mobileClasses.active
							)}
						>
							<ListItemIcon className="icon">{item.icon}</ListItemIcon>
							<ListItemText primary={item.title} className="name" />
							<ListItemIcon>
								<ChevronRight />
							</ListItemIcon>
						</ListItem>
					</NavLink>
				);
			})}
		</>
	);

	useEffect(() => {
		const _userInfo = getCookie(GENERAL_COOKIES.userInfo);
		const userInfo = _userInfo ? JSON.parse(_userInfo) : '';
		const firstName = getCookie(GENERAL_COOKIES.userFirstName);
		const lastName = getCookie(GENERAL_COOKIES.userLastName);

		setAccountInfo({
			name: firstName + ' ' + lastName,
			email: userInfo.email,
			phone: userInfo.phone_number,
			photo: '',
		});
	}, []);

	useEffect(() => {
		const menuMobile: IMenuItem[] = [];

		MENUS.forEach((_menu) => {
			if (_menu.roles.find((_role) => role.includes(_role)) !== undefined) {
				menuMobile.push(_menu);
			}
		});

		const menuNoMobile: IMenuItem[] = [];
		menuMobile?.map((_menu) => {
			if (!_menu?.isMobile) {
				menuNoMobile.push(_menu);
			}
		});

		setMenuMobile(menuMobile);
		setMenuNoMobile(menuNoMobile);
	}, [role]);

	const logo = useMemo(() => {
		return getLogoFromConfiguration();
	}, []);

	return (
		<>
			{!isMobile ? (
				<Drawer
					variant="permanent"
					classes={{
						paper: clsx(noMobileClasses.drawerPaper, !open && noMobileClasses.drawerPaperClose),
					}}
					open={open}
				>
					<ToolbarIconContainer className={noMobileClasses.toolbarIcon}>
						<Grid container className={noMobileClasses.logo} direction="column">
							<ContentImage src={logo} alt="" className="image" />
						</Grid>
					</ToolbarIconContainer>
					<AppBarSpacer className={clsx(noMobileClasses.appBarSpacer, noMobileClasses.shadow)} />
					<List className={noMobileClasses.menu}>{menuItemsNoMobile}</List>
					{open && <VersionInfo>Version: {APP_VERSION_NUMBER}</VersionInfo>}
				</Drawer>
			) : (
				<Drawer
					anchor="left"
					variant="persistent"
					classes={{
						paper: clsx(mobileClasses.drawerPaper, !open && mobileClasses.drawerPaperClose),
					}}
					open={open}
				>
					<AccountInfo className={mobileClasses.accountInfo}>
						<IconButton className={mobileClasses.closeButton} onClick={handleDrawerToggle}>
							<ChevronLeft />
						</IconButton>
						<Grid container direction="column" alignItems="center">
							<ContentText className="profile">Profile</ContentText>
							<ContentImage src={accountInfo.photo} alt="" className="photo" />
							<ContentText className="name">{accountInfo.name}</ContentText>
							<ContentText className="phone">{accountInfo.phone}</ContentText>
							<ContentText className="email">{accountInfo.email}</ContentText>
						</Grid>
					</AccountInfo>
					<List>{menuItemsMobile}</List>
					<VersionInfo>Version: {APP_VERSION_NUMBER}</VersionInfo>
				</Drawer>
			)}
		</>
	);
};

Sidebar.defaultProps = {
	open: false,
	isMobile: false,
	handleDrawerToggle: null,
	handleSignOut: null,
	menu: '',
	role: '',
};

export default Sidebar;
