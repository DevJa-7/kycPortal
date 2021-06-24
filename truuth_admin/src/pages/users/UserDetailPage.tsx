import React, {
    useState,
    useEffect,
    useMemo,
} from 'react';
import {
    useDispatch
} from 'react-redux';
import {
    useHistory,
    useParams,
} from 'react-router-dom';
import clsx from 'clsx';
import {
    withStyles,
    makeStyles,
    Theme,
} from '@material-ui/core/styles';
import {
    Grid,
    Card,
    CardHeader,
    Avatar,
    IconButton,
} from '@material-ui/core';
import styled from 'styled-components';
import _ from 'lodash';

import {
    NOTIFICATION_STATES
} from 'shared_components/src/common/constants';
import { USER_NOTIFICATION_MESSAGE } from 'shared_components/src/common/messages';
import {
    CustomButton,
} from 'shared_components/src/components/common';
import { isValidEmail, isValidName } from 'shared_components/src/common/validation';

import {
    UserDetailInformation,
} from 'shared_components/src/components';
import {
    UserDetailDocumentData
} from 'shared_components/src/components/users';
import {
    TEXT_COLOR,
    cardStyles,
    CommonButton
} from 'shared_components/src/common/styles';
import { getIsMobile } from 'shared_components/src/common/utils';

import {
    IUsersDocument,
} from 'shared_components/src/service/models/user';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import { updateMenu } from '../../store/menu/actions';
import { MENU } from '../../common/routes/menu';
import {
    setLoading,
    clearLoading,
    setNotification
} from '../../store/common/actions';
import {
    setTenantAlias,
} from '../../store/tenant/actions';
import {
    _getAuth,
    _getProducts,
    _getProduct,
    _getTenants,
    _getTenantAlias,
} from '../../store/selectors';
import KycApiService from '../../service/kycApi.service';

/**
 * Types and Constants
 */
interface ParamTypes {
    subId: string,
    type: string,
    verId: string,
}

/*
 * Styles
*/
const useStyles = makeStyles((theme: Theme) => ({
    root: {
        padding: 0,
        '& > .MuiCardHeader-root': {
            padding: '53px 27px ',
            marginBottom: 0,

            '@media screen and (max-width: 600px)': {
                padding: '14px 20px 14px 20px',
                minHeight: 70,
            },
        },

        '& .MuiCardHeader-title ': {
            '@media screen and (max-width: 600px)': {
                textAlign: 'center',
                fontFamily: 'Roboto',
                fontSize: 17,
                fontWeight: 600,
                lineHeight: 1.35,
            },
        },

        '& .MuiCardHeader-action': {
            '@media screen and (max-width: 600px)': {
                width: 'auto',
            },
        },
    },

    avatar: {
        backgroundColor: 'transparent',
        width: 'fit-content',
        height: 'fit-content',
        marginLeft: -12,

        '& button': {
            marginLeft: 0,
        },

        '& svg': {
            color: '#000000',
            width: 30,
            height: 'auto',
        },

        '@media screen and (max-width: 600px)': {
            marginLeft: 0,

            '& button': {
                padding: 0,
            },

            '& svg': {
                width: 24,
                height: 24,
            },
        },
    },

    item: {
        marginBottom: 28,
        '& .name': {
            fontSize: 14,
            lineHeight: 1.3125,
            color: TEXT_COLOR.graylight,
            marginBottom: 4
        },
        '& .value': {
            fontSize: 16,
            lineHeight: 1.5,
            color: theme.palette.grey[900],
        }
    },

    content: {
        padding: '32px 35px 20px 35px',
        flexWrap: 'nowrap'
    },

    detail: {
        marginBottom: '4px !important',

        '& > .MuiCardHeader-root': {
            padding: 0,
        },

        '& .MuiAvatar-root': {
            width: 80,
            height: 80
        },

        '& .MuiCardHeader-title': {
            fontSize: 20,
            lineHeight: 1.3,
            color: theme.palette.grey[900]
        },

        '& .MuiCardHeader-subheader': {
            fontSize: 18,
            lineHeight: 1.333333,
            color: theme.palette.grey[900]
        },
    },

    values: {
        '&> .title': {
            marginBottom: 35,
            marginTop: 35,
            fontSize: 26,
            lineHeight: 1.3077,
            color: theme.palette.grey[900]
        }
    },

    rightValues: {
        paddingLeft: 22.5,
    },

    editButton: {
        width: '44.03%',
        marginLeft: '7.863%',
        maxWidth: 201,
        lineHeight: 1.36,

        '@media screen and (max-width: 1280px)': {
            paddingTop: 11,
            paddingBottom: 11,
            maxWidth: 148,
        },
        '@media screen and (max-width: 600px)': {
            width: 'auto',
        }
    },

    saveButton: {
        width: '44.03%',
        marginLeft: '7.863%',
        maxWidth: 201,
        fontSize: 16,
        lineHeight: 1.36,

        '@media screen and (max-width: 1280px)': {
            paddingTop: 11,
            paddingBottom: 11,
            maxWidth: 148,
            fontSize: 14,
        },
        '@media screen and (max-width: 600px)': {
            padding: 20,
        }
    },

    cancelButton: {
        width: '44.03%',
        maxWidth: 201,
        fontSize: 16,
        lineHeight: 1.36,

        '@media screen and (max-width: 1280px)': {
            paddingTop: 11,
            paddingBottom: 11,
            maxWidth: 148,
            fontSize: 14,
        },
        '@media screen and (max-width: 600px)': {
            padding: 20,
        }
    },

    buttons: {
        padding: '20px 20px 40px 20px',
        justifyContent: 'space-evenly'
    }

}));

/**
 * Styled Components
 */
const Buttons = styled.div`
  text-align: right;
  justify-items: flex-end;
`;

const EditButton = withStyles(() => ({
    root: {
        fontSize: 16,
        lineHeight: 1.36,
        '@media screen and (max-width: 1280px)': {
            fontSize: 14,
        },
        '@media screen and (max-width: 600px)': {
            boxShadow: 'none',
        },
    },
}))(CommonButton);

/**
 * Main Component
 */
const UserDetailPage = () => {

    const dispatch = useDispatch();
    const history = useHistory();
    const { subId, type, verId } = useParams<ParamTypes>();

    /**
     * Use Styles
     */
    const classes = useStyles();
    const cardClasses = cardStyles();

    /**
     * States
     */
    const [isMobile, setIsMobile] = useState(getIsMobile());
    const [isEditable, setIsEditable] = useState(false);
    const [userID, setUserID] = useState('');
    const [userData, setUserData] = useState({} as IUsersDocument);
    const [errors, setErrors] = useState({
        email: false,
        phoneNumber: false,
        givenName: false,
        familyName: false
    });
    const [tempUserData, setTempUserData] = useState({} as IUsersDocument);

    const authInfo = _getAuth();
    const products = _getProducts();
    const product = _getProduct();
    const tenants = _getTenants();
    const tenantAlias = _getTenantAlias();

    /**
     * Initialize when didMount and updating
     */
    useEffect(() => {
        // Set function for window resize
        window.addEventListener('resize', () => {
            setIsMobile(getIsMobile());
        });
    }, []);

    useEffect(() => {
        // Get editable via URL
        if (subId == undefined || type == undefined || verId == undefined) {
            setIsEditable(false);
            history.push('/view-users');
        } else {
            switch (type) {
                case 'view':
                    setIsEditable(false);
                    break;
                case 'edit':
                    setIsEditable(true);
                    break;
                default:
                    setIsEditable(false);
                    history.push('/view-users');
                    break;
            }

            setUserID(verId);
            dispatch(setTenantAlias(subId));
        }

        // Set menu key
        dispatch(updateMenu(MENU.viewUsers));
    }, [window.location.pathname]);

    /**
     * Get information for User detail via API
     */
    useEffect(() => {
        if (authInfo.isLoggedin && tenantAlias) {
            getUserData();
        }

    }, [tenantAlias, window.location.pathname]);

    const getUserData = () => {
        const id = getDetailId();
        if (id) {
            dispatch(setLoading());
            KycApiService.getUserDetail(tenantAlias, id)
                .then(async (res: IUsersDocument) => {
                    dispatch(clearLoading());
                    setUserData(res);
                    setTempUserData(res);
                })
                .catch((err: any) => {
                    dispatch(clearLoading());

                });
        }
    }

    const tenantProdct = useMemo(() => {
        if (tenants && tenantAlias && products?.length > 0) {
            let tenant;
            Object.getOwnPropertyNames(tenants).forEach(prodCode => {
                const _tenant = tenants[prodCode]?.find(_tenant => _tenant.alias === tenantAlias);
                if (_tenant) {
                    tenant = _tenant;
                }
            });

            if (tenant) {
                const prod = products.find(_prod => _prod.code === tenant.product);

                if (prod) {
                    return prod;
                }
            }
        }

        return null;
    }, [products, tenantAlias, tenants]);

    /**
     * Get user ID from URL
     */
    const getDetailId = () => {
        let id = '';
        const pathname = window.location.pathname.split('/').slice(-2);

        if (pathname && (pathname[0] === 'view' || pathname[0] === 'edit')) {
            id = pathname[1];
        }

        setUserID(id);

        return id;
    }

    /**
     * Different handles
     */
    const handleEdit = () => {
        history.push(`/user-detail/${tenantAlias}/edit/${userID}`);
    }

    const validate = () => {
        setTempUserData({
            ...tempUserData
        })
        setErrors({
            email: false,
            phoneNumber: false,
            givenName: false,
            familyName: false
        })
        if (!isValidName(tempUserData.givenName)) {
            setErrors({
                ...errors,
                givenName: true
            })
            return false;
        }

        if (!isValidName(tempUserData.familyName)) {
            setErrors({
                ...errors,
                familyName: true
            })
            return false;
        }

        if (!isValidEmail(tempUserData.email)) {
            setErrors({
                ...errors,
                email: true
            })
            return false;
        }

        if (!tempUserData.phoneNumber) {
            setErrors({
                ...errors,
                phoneNumber: true
            })
            return false;
        }
        return true;

    }

    const displayNotificatoinSuccess = (msg: string) => {
        dispatch(setNotification({
            message: msg,
            type: NOTIFICATION_STATES.success,
        }))
    }

    const displayNotificatoinError = (msg: string) => {
        dispatch(setNotification({
            message: msg,
            type: NOTIFICATION_STATES.error,
        }))
    }

    const handleSave = () => {
        if (validate()) {
            const req = {
                email: tempUserData.email,
                status: tempUserData.status,
                givenName: tempUserData.givenName,
                familyName: tempUserData.familyName,
                phoneNumber: tempUserData.phoneNumber,
                roles: tempUserData.roles
            };

            const id = getDetailId();

            dispatch(setLoading());
            KycApiService.updateUser(req, tenantAlias, id)
                .then(response => {
                    dispatch(clearLoading());
                    if (response.error) {
                        displayNotificatoinError(response.error?.message || USER_NOTIFICATION_MESSAGE.USER_UPDATE_FAILED_MESSAGE);

                    } else {
                        displayNotificatoinSuccess(USER_NOTIFICATION_MESSAGE.USER_UPDATE_SUCCESS_MESSAGE);
                        history.push(`/user-detail/${tenantAlias}/view/${userID}`);
                    }
                })
                .catch(err => {
                    dispatch(clearLoading());
                    displayNotificatoinError(USER_NOTIFICATION_MESSAGE.USER_UPDATE_FAILED_MESSAGE);
                });
        } else {
            dispatch(clearLoading());
            displayNotificatoinError(USER_NOTIFICATION_MESSAGE.USER_UPDATE_FAILED_MESSAGE);
        }
    }

    const handleCancel = () => {
        setTempUserData(userData);
        history.push(`/user-detail/${tenantAlias}/view/${userID}`);
    }

    const handleReturn = () => {
        history.push('/view-users');
    }

    const handleChange = (val: string, key: string) => {
        const _data = { ...tempUserData };
        _data[key] = val;
        setTempUserData(_data);
    }

    const handlePhoneChange = (val: any) => {
        tempUserData.phoneNumber = val;
    }

    /**
     * Main HTML part
     */
    return (
        <Card className={clsx(cardClasses.root, classes.root)}>
            <CardHeader
                avatar={
                    <Avatar aria-label="recipe" className={classes.avatar}>
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="open detail"
                            aria-haspopup="true"
                            onClick={handleReturn}
                        >
                            <ArrowBackIcon />
                        </IconButton>
                    </Avatar>
                }
                title="View Users"
                action={
                    <>
                        {isEditable ? (
                            !isMobile ? (
                                <Buttons>
                                    <CustomButton label="CANCEL" variant="outlined" className={classes.cancelButton} onClick={handleCancel} />
                                    <CustomButton label="SAVE" className={classes.saveButton} onClick={handleSave} />
                                </Buttons>
                            ) : (<></>)
                        ) : (
                                <Buttons>
                                    <EditButton
                                        variant={isMobile ? "text" : "contained"}
                                        color="primary"
                                        className={classes.editButton}
                                        onClick={handleEdit}
                                    >
                                        EDIT
                                </EditButton>
                                </Buttons>
                            )}
                    </>
                }
            />
            <UserDetailInformation data={tempUserData ?? []} edit={isEditable} handleChangeStatus={handleChange} />
            <UserDetailDocumentData
                editable={isEditable}
                data={tempUserData ?? []}
                handleChange={handleChange}
                handlePhoneChange={handlePhoneChange}
                validationErrors={errors}
                roles={tenantProdct?.roles}
            />
            {isEditable && isMobile && (
                <Grid container className={classes.buttons}>
                    <CustomButton label="CANCEL" variant="outlined" className={classes.cancelButton} onClick={handleCancel} />
                    <CustomButton label="SAVE" className={classes.saveButton} onClick={handleSave} />
                </Grid>
            )}
        </Card>
    );
}

export default UserDetailPage;
