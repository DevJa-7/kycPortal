import React, {
    useState,
    useMemo,
    createRef,
    ChangeEvent,
} from 'react';
import {
    Theme,
    createStyles,
    withStyles,
    makeStyles
} from '@material-ui/core/styles';
import {
    Grid,
    TextField,
    IconButton,
    Dialog,
    Typography,
    WithStyles,
} from '@material-ui/core';
import Autocomplete, { AutocompleteChangeReason } from '@material-ui/lab/Autocomplete';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogActions from '@material-ui/core/DialogActions';
import MuiDialogContent from '@material-ui/core/DialogContent';
import CloseIcon from '@material-ui/icons/Close';
import { ChevronLeft } from '@material-ui/icons';
import styled from 'styled-components';
import 'react-phone-number-input/style.css';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import {
    TEXT_COLOR,
    BOX_SHADOW,
    BORDER_COLOR,
} from '../../common/styles';
import { CustomButton } from '../common';
import { isValidEmail, isValidName } from '../../common/validation';

/**
 * Props
 */
interface IProps {
    isMobile: boolean,
    createUser: any,
    roles?: any,
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
        }
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
        }
    },

    content: {
        marginTop: 47,
        fontSize: 20,
        lineHeight: 1.8,
        color: theme.palette.grey[900],

        '& .closeButton': {
            color: theme.palette.grey[900],
            width: 20,
            height: 20
        }
    },

    ctrlNewKYC: {
        marginTop: 63,

        '& .txtForgot': {
            font: '20px',
            lineHeight: 1.2,
            cursor: 'pointer',

            '&:hover': {
                textDecoration: 'underline',
            }
        }
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
    tenantSelect: {
        width: '100%',
        marginLeft: 0,
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
        }
    }
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
            }
        },

        '& .MuiFormLabel-root': {
            fontSize: 16,
            lineHeight: 1.3125,
            color: TEXT_COLOR.graylight,
            '@media screen and (max-width: 1280px)': {
                fontSize: 11,
            }
        },

        '& .MuiInputLabel-shrink': {
            top: 0,
            '@media screen and (max-width: 600px)': {
                top: -7,
            }
        }
    },
}))(TextField);

const styles = (theme: Theme) => createStyles({
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
        }
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
 * Custom component
 */
const phoneInput = (props, ref) => {
    const classes = useStyles()

    return (
        <NewUserTextField
            {...props}
            type="text"
            label="Mobile"
            required
            inputRef={ref}
            inputProps={{
                minLength: "8",
                maxLength: "20",
            }}
            className={classes.margin}
        />
    )
}

/**
 * Main Component
 */
const UserCreateModal = ({
    isMobile,
    createUser,
    roles
}: IProps) => {
    const classes = useStyles();
    const refForm = createRef<any>();
    const [open, setOpen] = useState(false);
    const [createData, setCreateData] = useState({
        email: '',
        givenName: '',
        familyName: '',
        phoneNumber: '',
        roles: [],
        errors: {
            email: false,
            phoneNumber: false,
            givenName: false,
            familyName: false
        }
    });

    const [selecteRoles, setSelectedRoles] = useState<Array<any>>([]);

    const optionRoles = useMemo(() => {
        if (!roles || roles.length === 0) return [];

        const visibleRoles = roles.filter(role => role.visible);

        if (visibleRoles?.length > 0) {
            setSelectedRoles([{
                title: visibleRoles[0].displayName,
                role: visibleRoles[0]
            }]);
        }

        return visibleRoles?.map(role => {
            return {
                title: role?.displayName || '',
                role,
            }
        }) || [];
    }, [roles])

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
            roles: [],
            errors: {
                email: false,
                phoneNumber: false,
                givenName: false,
                familyName: false
            }
        })
    };

    const validate = () => {
        setCreateData({
            ...createData,
            errors: {
                email: false,
                phoneNumber: false,
                givenName: false,
                familyName: false
            }
        })

        if (!isValidName(createData.givenName)) {
            setCreateData({
                ...createData,
                errors: {
                    ...createData.errors,
                    givenName: true
                }
            })
            return;
        }

        if (createData.familyName) {
            if (!isValidName(createData.givenName)) {
                setCreateData({
                    ...createData,
                    errors: {
                        ...createData.errors,
                        familyName: true
                    }
                })
                return;
            }
        }

        if (!isValidEmail(createData.email)) {
            setCreateData({
                ...createData,
                errors: {
                    ...createData.errors,
                    email: true
                }
            })
            return;
        }

        if (!isValidPhoneNumber(createData.phoneNumber)) {
            setCreateData({
                ...createData,
                errors: {
                    ...createData.errors,
                    phoneNumber: true
                }
            })
            return;
        }

        return refForm?.current.reportValidity();

    }

    const handleSubmit = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();

        const _roles = selecteRoles?.map((role: any) => role?.role?.name);
        const req = {
            ...createData,
            roles: _roles,
        };

        if (validate()) {
            createUser(req)
                .then((res: any) => {
                    handleClose();
                })
                .catch((err: any) => {
                    console.error('create user error', err);
                });
        }
    }


    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCreateData({
            ...createData,
            [event.target.name]: event.target.value
        });
    }

    const handleInputPhoneNumberChange = (val: any) => {
        createData.phoneNumber = val;
    }

    const handleChangeRoles = (event: ChangeEvent<{}>, value: any[], reason: AutocompleteChangeReason) => {
        setSelectedRoles(value);
    }

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
                    <DialogTitle id="new-create-user-title" onClose={handleClose} isMobile={isMobile} >
                        Add User
                    </DialogTitle>
                    <DialogContent>
                        <FormContainer noValidate={true} ref={refForm}>
                            <NewUserTextField
                                id="user-first-name"
                                type="text"
                                label="First Name"
                                name="givenName"
                                autoFocus
                                className={classes.margin}
                                required
                                onChange={handleInputChange}
                                inputProps={{
                                    maxLength: "30",
                                    minLength: "1",
                                    pattern: "[a-zA-Z'_ ]*$",
                                    title: "Enter Valid First Name"
                                }}
                                helperText={createData.errors.givenName ? "Please Enter only Alphabetics" : ""}
                                error={createData.errors.givenName}
                            />
                            <NewUserTextField
                                id="user-last-name"
                                type="text"
                                label="Last Name"
                                name="familyName"
                                inputProps={{
                                    maxLength: "35",
                                    minLength: "1",
                                    pattern: "[a-zA-Z'_ ]*$",
                                    title: "Enter Valid Last Name"
                                }}
                                className={classes.margin}
                                onChange={handleInputChange}
                                helperText={createData.errors.familyName ? "Please Enter only Alphabetics" : ""}
                                error={createData.errors.familyName}
                            />
                            <NewUserTextField
                                id="user-email"
                                type="email"
                                label="Email ID"
                                required
                                name="email"
                                className={classes.margin}
                                onChange={handleInputChange}
                                helperText={createData.errors.email ? "Enter Valid Email ID" : ""}
                                error={createData.errors.email}
                            />
                            {/* <NewUserTextField
                                id="user-phoneNumber"
                                type="text"
                                label="Mobile"
                                required
                                name="phoneNumber"
                                className={classes.margin}
                                inputProps={{
                                    minLength: "8",
                                    maxLength: "20",
                                    pattern: "[+]{1}[0-9]{2}[0-9]{9}",
                                    title: "Enter Valid phoneNumber number starts with +61"
                                }}
                                onChange={handleInputChange}
                                placeholder="Mobile number starts with country code"
                                helperText={createData.errors.phoneNumber ? "Enter Valid Mobile number " : ""}
                                error={createData.errors.phoneNumber}
                            /> */}
                            <PhoneInput
                                placeholder='Mobile number starts with country code'
                                defaultCountry="AU"
                                id="user-phoneNumber"
                                value={createData.phoneNumber}
                                onChange={handleInputPhoneNumberChange}
                                inputComponent={React.forwardRef(phoneInput)}
                                helperText={createData.errors.phoneNumber ? "Enter Valid Mobile number " : ""}
                                error={createData.errors.phoneNumber}
                            />
                            {/* <CustomSelect
                                id="user-types"
                                title="Type"
                                name="userType"
                                selectList={USERS_CREATE_TYPES}
                                value={createData.userType}
                                handleChange={handleInputChange}
                                className={classes.tenantSelect}
                            /> */}
                            <Autocomplete
                                multiple
                                id="user-create-role-select"
                                options={optionRoles}
                                getOptionLabel={(option) => option.title}
                                defaultValue={optionRoles?.length > 0 ? [optionRoles[0]] : []}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        variant="standard"
                                        label="Roles"
                                        placeholder="Roles"
                                    />
                                )}
                                onChange={handleChangeRoles}
                                className={classes.tenantSelect}
                                disableListWrap={true}
                            />
                        </FormContainer>
                    </DialogContent>
                    <DialogActions className={classes.submit}>
                        <CustomButton label="ADD" className={classes.inviteButton} onClick={handleSubmit} />
                    </DialogActions>
                </Dialog>
            </Grid>
        </>
    );
}

UserCreateModal.defaultProps = {
    isMobile: false,
    createUser: null,
    tenantList: [],
    tenantAlias: null,
}

export default UserCreateModal;

const FormContainer = styled.form``;
