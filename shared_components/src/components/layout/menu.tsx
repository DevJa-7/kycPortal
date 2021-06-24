import React from 'react';

import { VerifiedIcon, GroupIcon, ListIcon, LogOutIcon, ManuealVerifyIcon } from '../../common/icons';
import { AUTH_ROLE } from '../../common/constants';

// Menu Item Information
export interface IMenuItem {
	path: string;
	key: string;
	title: string;
	icon: any;
	class: string;
	extralink: boolean;
	label: string;
	labelClass: string;
	submenu: IMenuItem[];
	roles: AUTH_ROLE[];
	isMobile: boolean;
}

export const MENUS: IMenuItem[] = [
	// {
	//     path: '/',
	//     key: 'my-profile',
	//     title: 'My Profile',
	//     icon: <UserIcon />,
	//     class: '',
	//     label: '',
	//     labelClass: '',
	//     extralink: false,
	//     submenu: [],
	//     roles: [AUTH_ROLE.admin, AUTH_ROLE.client, AUTH_ROLE.agent],
	//     isMobile: true,
	// },
	// {
	//     path: '/subscription-management',
	//     key: 'subscription-management',
	//     title: 'Subscription Management',
	//     icon: <SubscriptionIcon />,
	//     class: '',
	//     label: '',
	//     labelClass: '',
	//     extralink: false,
	//     submenu: [],
	//     roles: [AUTH_ROLE.admin],
	//     isMobile: false,
	// },
	{
		path: '/verification',
		key: 'verification',
		title: 'KYC Verification',
		icon: <VerifiedIcon />,
		class: '',
		label: '',
		labelClass: '',
		extralink: false,
		submenu: [],
		roles: [AUTH_ROLE.admin, AUTH_ROLE.client, AUTH_ROLE.agent, AUTH_ROLE.owner],
		isMobile: false,
	},
	{
		path: '/view-users',
		key: 'view-users',
		title: 'View Users',
		icon: <GroupIcon />,
		class: '',
		label: '',
		labelClass: '',
		extralink: false,
		submenu: [],
		roles: [AUTH_ROLE.admin, AUTH_ROLE.client, AUTH_ROLE.owner],
		isMobile: false,
	},
	{
		path: '/document-template',
		key: 'document-template',
		title: 'Document Template',
		icon: <ListIcon />,
		class: '',
		label: '',
		labelClass: '',
		extralink: false,
		submenu: [],
		roles: [AUTH_ROLE.admin, AUTH_ROLE.docMgr, AUTH_ROLE.owner],
		isMobile: false,
	},
	{
		path: '/manual-verification',
		key: 'manual-verification',
		title: 'Manual Verification',
		icon: <ManuealVerifyIcon />,
		class: '',
		label: '',
		labelClass: '',
		extralink: false,
		submenu: [],
		roles: [AUTH_ROLE.verifier],
		isMobile: false,
	},
	// {
	//     path: '/account-settings',
	//     key: 'account-settings',
	//     title: 'Account Settings',
	//     icon: <ComputerIcon />,
	//     class: '',
	//     label: '',
	//     labelClass: '',
	//     extralink: false,
	//     submenu: [],
	//     roles: [AUTH_ROLE.admin,],
	//     isMobile: false,
	// },
	{
		path: '/signout',
		key: 'signout',
		title: 'Sign Out',
		icon: <LogOutIcon />,
		class: '',
		label: '',
		labelClass: '',
		extralink: false,
		submenu: [],
		roles: [AUTH_ROLE.admin, AUTH_ROLE.client, AUTH_ROLE.agent, AUTH_ROLE.owner, AUTH_ROLE.verifier],
		isMobile: true,
	},
];
