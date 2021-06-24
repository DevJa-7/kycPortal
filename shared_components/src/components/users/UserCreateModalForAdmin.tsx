import React, { useState, useMemo, createRef, ChangeEvent } from 'react';
import { Theme, createStyles, withStyles, makeStyles } from '@material-ui/core/styles';
import { Grid, TextField, IconButton, Dialog, Typography, WithStyles, Tabs, Tab } from '@material-ui/core';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogActions from '@material-ui/core/DialogActions';
import MuiDialogContent from '@material-ui/core/DialogContent';
import CloseIcon from '@material-ui/icons/Close';
import { ChevronLeft } from '@material-ui/icons';
import styled from 'styled-components';

import { AutocompleteChangeReason } from '@material-ui/lab/Autocomplete';
import { isValidPhoneNumber } from 'react-phone-number-input';

import { TEXT_COLOR, BOX_SHADOW, BORDER_COLOR } from '../../common/styles';
import { CustomButton, CustomSelect, CommonAutocomplete, CommonPhoneInput } from '../common';
import { isValidEmail, isValidName } from '../../common/validation';
import { PRODUCT_TYPES } from '../../common/constants';

/**
 * Constants
 */
const TAB_ITEMS = [
	{ key: 'client', id: 0, label: 'Client', productType: PRODUCT_TYPES.kyc },
	{ key: 'admin', id: 1, label: 'Truuth', productType: PRODUCT_TYPES.admin },
];

/**
 * Props
 */
interface IProps {
	isMobile: boolean;
	createUser: any;
	tenants?: any;
	tenantAlias?: any;
	products?: any;
}

/*
 * Styles
 */
const useStyles = makeStyles((theme: Theme) => ({
	margin: {
		marginBottom: 30,
		'@media screen and (max-width: 1280px)': {
			marginBottom: 25,
		},
		'@media screen and (max-width: 600px)': {
			marginBottom: 20,
		},
	},

	container: {
		width: '100%',

		'& .MuiPaper-root': {
			padding: '47px 51px',
			maxWidth: 505,
			width: '100%',
			borderRadius: 12,
			borderColor: BORDER_COLOR.primary,
			color: theme.palette.grey[900],

			'@media screen and (max-width: 1440)': {
				maxWidth: 473,
				padding: '41px 36px',
			},

			'@media screen and (max-width: 1280px)': {
				maxWidth: 460,
				padding: '41px 31px',
			},

			'@media screen and (max-width: 600px)': {
				maxWidth: '100%',
				padding: 0,
				margin: 0,
				height: '100%',
				maxHeight: '100%',
				borderRadius: 0,
			},
		},
	},

	title: {
		'& .content': {
			fontSize: 24,
			lineHeight: 1.192,
		},

		'& .closeButton': {
			color: TEXT_COLOR.graylight,
			width: 20,
			height: 20,
		},
	},

	content: {
		marginTop: 47,
		fontSize: 20,
		lineHeight: 1.8,
		color: theme.palette.grey[900],

		'& .closeButton': {
			color: theme.palette.grey[900],
			width: 20,
			height: 20,
		},
	},

	ctrlNewKYC: {
		marginTop: 63,

		'& .txtForgot': {
			font: '20px',
			lineHeight: 1.2,
			cursor: 'pointer',

			'&:hover': {
				textDecoration: 'underline',
			},
		},
	},

	switchLabel: {
		fontSize: 16,
		'@media screen and (max-width: 900px)': {
			fontSize: 14,
		},

		'@media screen and (max-width: 600px)': {
			fontSize: 12,
			lineHeight: 1.33,
		},
	},

	inviteButton: {
		fontSize: 16,
		lineHeight: 1.2,

		'@media screen and (max-width: 900px)': {
			fontSize: 14,
		},

		'@media screen and (max-width: 600px)': {
			fontSize: 12,
			lineHeight: 1.33,
		},
	},

	phoneNumber: {
		width: '100%',
		marginLeft: 0,
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

	tenantSelect: {
		width: '100%',
		marginLeft: 0,
		marginRight: 0,
		marginBottom: '30px',
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

	submit: {
		alignContent: 'center',

		'& button': {
			minWidth: 185,
			margin: '5px auto 5px auto',

			'@media screen and (max-width: 1440)': {
				margin: '35px auto 0 auto',
			},

			'@media screen and (max-width: 1280px)': {
				margin: '5px auto 0 auto',
			},

			'@media screen and (max-width: 600px)': {
				minWidth: 0,
				width: '100%',
				maxWidth: 300,
				marginTop: 20,
				padding: 15,
			},
		},
	},

	width80: {
		width: '80%',
	},

	tabBtn: {
		'@media screen and (max-width: 1280px)': {
			fontSize: '14px',
			minWidth: '120px',
			padding: '0px',
		},
		'@media screen and (max-width: 800px)': {
			fontSize: '12px',
			minWidth: '100px',
			padding: '0px',
		},
	},
}));

/*
 * Styled Components
 */

const NewUserTextField = withStyles((theme: Theme) => ({
	root: {
		width: '100%',

		'& .MuiInputBase-input': {
			color: theme.palette.grey[900],
			fontSize: 20,
			lineHeight: 1.3,
			'@media screen and (max-width: 1280px)': {
				fontSize: 12,
			},
		},

		'& .MuiFormLabel-root': {
			fontSize: 16,
			lineHeight: 1.3125,
			color: TEXT_COLOR.graylight,
			'@media screen and (max-width: 1280px)': {
				fontSize: 11,
			},
		},

		'& .MuiInputLabel-shrink': {
			top: 0,
			'@media screen and (max-width: 600px)': {
				top: -7,
			},
		},
	},
}))(TextField);

const allyProps = (index: any) => {
	return {
		id: `full-width-tab-${index}`,
		'aria-controls': `full-width-tabpanel-${index}`,
	};
};

const styles = (theme: Theme) =>
	createStyles({
		root: {
			margin: 0,
			padding: theme.spacing(0),

			'& .MuiTypography-root': {
				fontFamily: 'Roboto',
				fontSize: 24,
				lineHeight: 1.308,

				'@media screen and (max-width: 600px)': {
					fontSize: 17,
					lineHeight: 1.35,
					padding: '51px 0 14px 0',
					textAlign: 'center',
					fontWeight: '500',
					boxShadow: BOX_SHADOW.secondary,
				},
			},
		},

		closeButton: {
			position: 'absolute',
			right: 25,
			top: 32,
			color: TEXT_COLOR.graylight,

			'& .MuiSvgIcon-root': {
				fontSize: '2.15rem',
				'@media screen and (max-width: 1280px)': {
					fontSize: '1.95rem',
				},
			},

			'@media screen and (max-width: 600px)': {
				top: 45,
				left: 20,
				padding: 0,
			},
		},
	});

export interface DialogTitleProps extends WithStyles<typeof styles> {
	id: string;
	children: React.ReactNode;
	isMobile: boolean;
	onClose: () => void;
}

const DialogTitle = withStyles(styles)((props: DialogTitleProps) => {
	const { children, classes, onClose, isMobile, ...other } = props;
	return (
		<MuiDialogTitle disableTypography className={classes.root} {...other}>
			<Typography variant="h6">{children}</Typography>
			{onClose ? (
				<IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
					{isMobile ? <ChevronLeft /> : <CloseIcon />}
				</IconButton>
			) : null}
		</MuiDialogTitle>
	);
});

const DialogContent = withStyles((theme: Theme) => ({
	root: {
		padding: theme.spacing(0),
		paddingTop: '12px !important',
		overflowY: 'auto',
		overflowX: 'hidden',
		'@media screen and (max-width: 600px)': {
			padding: '46px 18.5px',
			flex: 'initial',
		},
	},
}))(MuiDialogContent);

const DialogActions = withStyles((theme: Theme) => ({
	root: {
		margin: 0,
		padding: theme.spacing(0),
	},
}))(MuiDialogActions);

/**
 * Main Component
 */
const UserCreateModal = ({ isMobile, createUser, tenants, tenantAlias, products }: IProps) => {
	const classes = useStyles();
	const refForm = createRef<any>();

	const [tabIndex, setTabIndex] = useState(0);
	const [open, setOpen] = useState(false);
	const [createData, setCreateData] = useState({
		email: '',
		givenName: '',
		familyName: '',
		phoneNumber: '',
		clientRoles: [] as any[],
		adminRoles: [] as any[],
		errors: {
			email: false,
			phoneNumber: false,
			givenName: false,
			familyName: false,
			clientRoles: false,
			adminRoles: false,
		},
	});

	const [selectedClientTenant, setSelectedClientTenant] = useState('');

	const { clientTenants, adminTenant } = useMemo(() => {
		if (!tenants) {
			return {
				clientTenants: [],
				adminTenant: null,
			};
		}

		const _clientTenants = tenants[PRODUCT_TYPES.kyc.key]?.map((item) => {
			return {
				...item,
				display: item.organisationName?.toUpperCase() || '',
				value: item.alias || '',
			};
		});
		const _adminTenant = tenants[PRODUCT_TYPES.admin.key]?.[0];

		const hasClientTenant = _clientTenants?.find((item) => item.value === tenantAlias);
		const _tenantAlias = tenantAlias && hasClientTenant ? tenantAlias : _clientTenants?.[0]?.value;
		setSelectedClientTenant(_tenantAlias);

		return {
			clientTenants: _clientTenants,
			adminTenant: _adminTenant,
		};
	}, [tenants, tenantAlias]);

	const { clientRoles, adminRoles } = useMemo(() => {
		if (!products || products.length === 0) {
			return {
				clientRoles: null,
				adminRoles: null,
			};
		}

		const _clientProduct = products?.find((item) => item.code === PRODUCT_TYPES.kyc.key);
		const _adminProduct = products?.find((item) => item.code === PRODUCT_TYPES.admin.key);

		const _clientRoles =
			_clientProduct?.roles
				?.filter((item) => item.visible)
				?.map((item) => {
					return {
						...item,
						title: item?.displayName || '',
					};
				}) || [];
		const _adminRoles =
			_adminProduct?.roles
				?.filter((item) => item.visible)
				?.map((item) => {
					return {
						...item,
						title: item?.displayName || '',
					};
				}) || [];

		return {
			clientRoles: _clientRoles,
			adminRoles: _adminRoles,
		};
	}, [products]);

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
		setCreateData({
			email: '',
			givenName: '',
			familyName: '',
			phoneNumber: '',
			clientRoles: [],
			adminRoles: [],
			errors: {
				email: false,
				phoneNumber: false,
				givenName: false,
				familyName: false,
				clientRoles: false,
				adminRoles: false,
			},
		});
	};

	const validate = () => {
		const curTab = TAB_ITEMS[tabIndex];
		const isClientTab = curTab.productType.key === PRODUCT_TYPES.kyc.key;
		let checkError = false;

		const errors = {
			email: false,
			phoneNumber: false,
			givenName: false,
			familyName: false,
			clientRoles: false,
			adminRoles: false,
		};

		if (!isValidName(createData.givenName)) {
			errors.givenName = true;
			checkError = true;
		}

		if (!isValidName(createData.familyName)) {
			errors.familyName = true;
			checkError = true;
		}

		if (!isValidEmail(createData.email)) {
			errors.email = true;
			checkError = true;
		}

		if (!isValidPhoneNumber(createData.phoneNumber)) {
			errors.phoneNumber = true;
			checkError = true;
		}

		if (isClientTab) {
			errors.clientRoles = createData.clientRoles.length === 0;
			checkError = errors.clientRoles ? true : checkError;
		} else {
			errors.adminRoles = createData.adminRoles.length === 0;
			checkError = errors.adminRoles ? true : checkError;
		}

		setCreateData({
			...createData,
			errors,
		});

		return refForm?.current.reportValidity() && !checkError;
	};

	const handleSubmit = (event: React.ChangeEvent<HTMLInputElement>) => {
		event.preventDefault();

		const curTab = TAB_ITEMS[tabIndex];
		const isClientTab = curTab.productType.key === PRODUCT_TYPES.kyc.key;
		const _roles = isClientTab ? createData.clientRoles : createData.adminRoles;
		const _roleNames = _roles?.map((role: any) => role?.name);
		const selectedTenantAlias = isClientTab ? selectedClientTenant : adminTenant?.alias;

		const req = {
			email: createData.email,
			givenName: createData.givenName,
			familyName: createData.familyName,
			phoneNumber: createData.phoneNumber,
			roles: _roleNames,
		};

		if (validate()) {
			createUser(selectedTenantAlias, req)
				.then((res: any) => {
					handleClose();
				})
				.catch((err: any) => {
					console.error('create user error', err);
				});
		}
	};

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setCreateData({
			...createData,
			[event.target.name]: event.target.value,
		});
	};

	const handleInputPhoneNumberChange = (val: any) => {
		createData.phoneNumber = val;
	};

	const handleChangeClientRoles = (value: any[]) => {
		setCreateData({
			...createData,
			clientRoles: value,
		});
	};

	const handleChangeAdminRoles = (value: any[]) => {
		setCreateData({
			...createData,
			adminRoles: value,
		});
	};

	const handleChangeRoles = (event: ChangeEvent<{}>, value: any[], reason: AutocompleteChangeReason) => {
		const curTab = TAB_ITEMS[tabIndex];

		if (curTab.productType.key === PRODUCT_TYPES.kyc.key) {
			handleChangeClientRoles(value);
		}

		if (curTab.productType.key === PRODUCT_TYPES.admin.key) {
			handleChangeAdminRoles(value);
		}
	};

	const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
		setTabIndex(newValue);
	};

	const handleClientTenantSelect = (event: React.ChangeEvent<{ value: unknown }>) => {
		setSelectedClientTenant(event.target.value as string);
	};

	const renderTabContent = (tabId: number) => {
		const curTab = TAB_ITEMS[tabId];
		const isClientTab = curTab.productType.key === PRODUCT_TYPES.kyc.key;
		const optionRoles = isClientTab ? clientRoles : adminRoles;
		const optionValue = isClientTab ? createData.clientRoles : createData.adminRoles;
		const errRoles = isClientTab ? createData.errors.clientRoles : createData.errors.adminRoles;

		return (
			<TabPanelContainer>
				<FormContainer noValidate={true} ref={refForm}>
					{tabId === 0 ? (
						<CustomSelect
							id="user-create-subsription-Selection"
							title="Tenants"
							selectList={clientTenants}
							value={selectedClientTenant || ''}
							handleChange={handleClientTenantSelect}
							className={classes.tenantSelect}
						/>
					) : null}
					<NewUserTextField
						id="client-first-name"
						type="text"
						label="First Name"
						name="givenName"
						autoFocus
						className={classes.margin}
						required
						onChange={handleInputChange}
						inputProps={{
							maxLength: '30',
							minLength: '1',
							pattern: "[a-zA-Z'_ ]*$",
							title: 'Enter Valid First Name',
						}}
						helperText={createData.errors.givenName ? 'Enter Valid First Name' : ''}
						error={createData.errors.givenName}
					/>
					<NewUserTextField
						id="client-last-name"
						type="text"
						label="Last Name"
						name="familyName"
						required
						inputProps={{
							maxLength: '35',
							minLength: '1',
							pattern: "[a-zA-Z'_ ]*$",
							title: 'Enter Valid Last Name'
						}}
						className={classes.margin}
						onChange={handleInputChange}
						helperText={createData.errors.familyName ? 'Enter Valid Last Name' : ''}
						error={createData.errors.familyName}
					/>
					<NewUserTextField
						id="client-email"
						type="email"
						label="Email ID"
						required
						name="email"
						className={classes.margin}
						onChange={handleInputChange}
						helperText={createData.errors.email ? 'Enter Valid Email ID' : ''}
						error={createData.errors.email}
					/>
					<CommonPhoneInput
						id="client-mobile"
						defaultCountry="AU"
						value={createData.phoneNumber}
						onChange={handleInputPhoneNumberChange}
						helperText={createData.errors.phoneNumber ? 'Enter Valid Mobile number ' : ''}
						error={createData.errors.phoneNumber}
						className={classes.phoneNumber}
					/>
					<CommonAutocomplete
						multiple
						id="user-create-admin-role-select"
						options={optionRoles || []}
						getOptionLabel={(option) => option.title}
						label="Roles"
						required
						onChange={handleChangeRoles}
						className={classes.tenantSelect}
						value={optionValue || ([] as any[])}
						error={errRoles}
						helperText="Select at least one role"
					/>
				</FormContainer>
				<DialogActions className={classes.submit}>
					<CustomButton label="ADD" className={classes.inviteButton} onClick={handleSubmit} />
				</DialogActions>
			</TabPanelContainer>
		);
	};

	return (
		<>
			<CustomButton className={classes.inviteButton} onClick={handleOpen} label="ADD USER" />
			<Grid container justify="flex-end">
				<Dialog
					onClose={handleClose}
					aria-labelledby="new-create-user-title"
					open={open}
					className={classes.container}
				>
					<DialogTitle id="new-create-user-title" onClose={handleClose} isMobile={isMobile}>
						Add User
					</DialogTitle>
					<DialogContent>
						<Tabs
							value={tabIndex}
							onChange={handleTabChange}
							indicatorColor="primary"
							textColor="primary"
							variant="fullWidth"
							aria-label="full width tabs"
							className={classes.width80}
						>
							{TAB_ITEMS.map((item) => {
								return (
									<Tab
										key={`creat-user-tab-item-${item.id}`}
										label={item.label}
										className={classes.tabBtn}
										{...allyProps(item.id)}
									/>
								);
							})}
						</Tabs>
						{renderTabContent(tabIndex)}
					</DialogContent>
				</Dialog>
			</Grid>
		</>
	);
};

UserCreateModal.defaultProps = {
	isMobile: false,
	createUser: null,
	tenants: null,
	tenantAlias: null,
	products: null,
};

export default UserCreateModal;

const FormContainer = styled.form``;
const TabPanelContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	padding: 25px 0 0 0;
`;
