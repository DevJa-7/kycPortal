import React, {
    useState,
    useEffect,
    useLayoutEffect,
} from 'react';
import {
    useDispatch,
} from 'react-redux';
import {
    useHistory,
} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import {
    Grid,
    Card,
    CardHeader,
    Avatar,
    Divider
} from '@material-ui/core';
import AutorenewIcon from '@material-ui/icons/Autorenew';

import {
    cardStyles,
} from 'shared_components/src/common/styles';
import {
    VerificationTable,
    VerificationInviteModal,
} from 'shared_components/src/components/verification';
import {
    CustomSelect,
    SearchBar,
    CustomPagination,
    CustomButton,
} from 'shared_components/src/components/common';
import { getIsMobile } from 'shared_components/src/common/utils';
import {
    VERIFICATION_TABLE_PAGE_NUMBER,
} from 'shared_components/src/common/constants';

import {
    IVerificationList,
    IVerificationInviteRequest,
    VERIFICATION_STATES,
    IVERIFICATION_DETAIL_EDIT_STATES,
} from 'shared_components/src/service/models/verification';
import {
    AUTH_ROLE,
    NOTIFICATION_STATES,
    GENERAL_COOKIES,
} from 'shared_components/src/common/constants';
import FingerprintIcon from '@material-ui/icons/Fingerprint';

import KycApiService from '../../service/kycApi.service';
import {
    setLoading,
    clearLoading,
    setNotification,
} from '../../store/common/actions';
import { MENU } from '../../common/routes/menu';
import { updateMenu } from '../../store/menu/actions';
import {
    _getAuth,
    _getTenantFilter,
    _getTenantKycState,
    _getVerifications,
    _getTenantData,
    _getVerificationPage,
    _getTenantAlias
} from '../../store/selectors';
import {
    setTenantFilter,
    setTenantKycState,
} from '../../store/tenant/actions';
import {
    setVerifications,
    resetVerifications,
    setVerificationPageIndex,
    setVerificationEditStates,
} from '../../store/verification/actions';
import kycApiService from '../../service/kycApi.service';
import { getCookie } from 'shared_components/src/service/common.service';

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
            }
        }
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
            width: 26.3,
            height: 30,
        },
        '@media screen and (max-width: 900px)': {
            width: 26.3,
            height: 30,
        },
        '@media screen and (max-width: 600px)': {
            width: 20,
            height: 24,
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

    kycSearch: {
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
        }
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

    verificationTable: {

    },

    pagination: {
        marginTop: 25,
        marginBottom: 15,
        '@media screen and (max-width: 1280px)': {
            marginTop: 15,
            marginBottom: 5,
        },
    },

    refreshButton: {
        padding: '9px 23px',
        '& .MuiButton-startIcon': {
            marginRight: -4,
        }
    },
}));

/**
 * Main Component
 */
const VerificationPage = () => {

    const dispatch = useDispatch();
    const history = useHistory();

    const authInfo = _getAuth();
    const tenantData = _getTenantData();
    const verifications = _getVerifications();
    const tenantAlias = _getTenantAlias();
    const tenantFilter = _getTenantFilter();
    const tenantKycState = _getTenantKycState();
    const verificationPage = _getVerificationPage();

    const classes = useStyles();
    const cardClasses = cardStyles();

    const [isInited, setIsInited] = useState(false);
    const [isMobile, setIsMobile] = useState(getIsMobile());
    const [columnSort, setColumnSort] = useState('updatedAt');

    useEffect(() => {
        window.addEventListener('resize', () => {
            setIsMobile(getIsMobile());
        });

        dispatch(updateMenu(MENU.verificaton));
    }, []);

    useLayoutEffect(() => {
        setIsInited(true);
    }, [])

    useEffect(() => {
        isInited && loadTable();
    }, [
        verificationPage,
        tenantAlias,
        tenantKycState,
        tenantFilter,
        isInited,
    ]);

    useEffect(() => {
        return () => {
            dispatch(setTenantFilter(''));
        };
    }, []);

    const loadTable = async () => {
        if (!tenantAlias) {
            return;
        }

        const selectdStatus = VERIFICATION_STATES.find((item: { value: any; }) => item.value === tenantKycState);
        const filters = {
            search: tenantFilter,
            status: selectdStatus?.subfix,
        };

        dispatch(setLoading());
        KycApiService.getVerificationList(
            verificationPage,
            VERIFICATION_TABLE_PAGE_NUMBER,
            columnSort,
            filters,
        )
            .then((res: IVerificationList) => {
                dispatch(setVerifications(res));
            })
            .catch(err => {
                dispatch(resetVerifications());
            })
            .finally(() => {
                dispatch(clearLoading());
            });
    }

    const handleSendInvite = (inviteData: IVerificationInviteRequest) => {
        return new Promise(async (resolve, reject) => {

            dispatch(setLoading());
            const req = {
                ...inviteData,
            };

            KycApiService.sendInviteToCustomer(req)
                .then(res => {
                    dispatch(clearLoading());
                    if (res.error) {
                        displayNotificatoinError('Failed Resend Invite');
                        return reject({status: 'error'});
                    } else {
                        loadTable();
                        displayNotificatoinSuccess('Sent Invite Successfully');
                        return resolve({status: 'success'});
                    }
                })
                .catch(err => {
                    dispatch(clearLoading());
                    displayNotificatoinError('Failed Resend Invite');
                    return reject({status: 'error'});
                });
        });
    }

    const generateInviteUrl = (data: IVerificationInviteRequest) => {
        const _userInfo = getCookie(GENERAL_COOKIES.userInfo);
        const userInfo = _userInfo ? JSON.parse(_userInfo) : undefined;
        const req = {
            ...data,
            organisation: userInfo['custom:organisation'],
        };

        return new Promise(async (resolve, reject) => {
            dispatch(setLoading());
            KycApiService.generateInviteUrl(req).then(res => {
                if (!res.err) {
                    dispatch(clearLoading());
                    displayNotificatoinSuccess('Generated URL successfully.');
                    loadTable();

                    return resolve({
                        status: 'success',
                        res
                    });
                } else {
                    dispatch(clearLoading());
                    displayNotificatoinError('Failed Generate Invite URL.');
                    return reject(res.err);
                }
            })
            .catch(err => {
                dispatch(clearLoading());
                displayNotificatoinError('Failed Generate Invite URL.');
                return reject(err);
            })
        })
    }

    const sendCopyToClipboard = () => {
        displayNotificatoinSuccess('URL is successfully copied.');
    }

    const initPageIndex = () => {
        dispatch(setVerificationPageIndex(1));
    }

    const handleKYCState = (event: React.ChangeEvent<{ value: unknown }>) => {
        dispatch(setTenantKycState(event.target.value as string));
        initPageIndex();
    };

    const handleKYCSearch = (event: React.ChangeEvent<{ value: unknown }>) => {
        dispatch(setTenantFilter(event.target.value as string));
        initPageIndex();
    };

    const handleChangePageIndex = (curPage: number) => {
        dispatch(setVerificationPageIndex(curPage));
    };

    const handleResendInvite = (subId: string, verId: string) => {
        const _userInfo = getCookie(GENERAL_COOKIES.userInfo);
        const userInfo = _userInfo ? JSON.parse(_userInfo) : undefined;
        const curVerification = verifications.items.find(_item => _item._id === verId);
        const req = {
            ...curVerification?.inviteeDetails,
            externalRefId: userInfo?.externalRefId ?? '',
            organisation: userInfo['custom:organisation'],
        };

        dispatch(setLoading());
        kycApiService.sendInviteToCustomer(req, verId)
            .then(res => {
                dispatch(clearLoading());

                if (!res.error) {
                    loadTable();
                    displayNotificatoinSuccess('Successfully Resend Invite');
                } else {
                    displayNotificatoinError('Failed Resend Invite');
                }
            })
            .catch(err => {
                dispatch(clearLoading());
                displayNotificatoinError('Failed Resend Invite');
            });
    };

    const handleView = (subId: string, verId: string) => {
        const editState: IVERIFICATION_DETAIL_EDIT_STATES = {
            result: false,
            detail: false,
        };

        dispatch(setVerificationEditStates(editState));
        history.push(`/verification-detail/${subId}/${verId}`);
    };

    const handleEdit = (subId: string, verId: string) => {
        const editState: IVERIFICATION_DETAIL_EDIT_STATES = {
            result: true,
            detail: true,
        };

        dispatch(setVerificationEditStates(editState));
        history.push(`/verification-detail/${subId}/${verId}`);
    };

    const handleDelete = (verId: string, subId: string) => {
        dispatch(setLoading());
        kycApiService.deleteVerification(verId)
            .then(res => {
                dispatch(clearLoading());
                if (!res.error) {
                    displayNotificatoinSuccess('Successfully Delete Verification');
                    loadTable();
                } else {
                    displayNotificatoinError('Failed Delete Verification');
                }
            })
            .catch(err => {
                dispatch(clearLoading());
                displayNotificatoinError('Failed Delete Verification');
                console.log('delete verification error', err);
            });
    };

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

    const handleRefreshTable = () => {
        loadTable();
    }

    const svgIcon = (
        <AutorenewIcon />
    );

    return (
        <Card className={clsx(classes.root, cardClasses.root)}>
            <CardHeader
                avatar={
                    <Avatar aria-label="recipe" className={classes.avatar}>
                        <FingerprintIcon />
                    </Avatar>
                }
                action={(
                    <>
                        <CustomButton
                            variant="outlined"
                            startIcon={svgIcon}
                            className={classes.refreshButton}
                            onClick={handleRefreshTable}
                        />
                        {(!authInfo?.roles.includes(AUTH_ROLE.admin)) &&
                            <VerificationInviteModal
                                isMobile={isMobile}
                                sendInvite={handleSendInvite}
                                generateInviteUrl={generateInviteUrl}
                                sendCopyToClipboard={sendCopyToClipboard}
                            />
                        }
                    </>
                )}
                title="KYC Verification"
            />
            <Divider className="card-header-bottom" />
            <Grid container className={classes.table}>
                <Grid container className="tableHeader" alignContent="space-between">
                    <CustomSelect
                        id="KYC-States"
                        title="KYC Status"
                        selectList={VERIFICATION_STATES}
                        value={tenantData?.kycState}
                        handleChange={handleKYCState}
                        className={classes.kycState}
                    />
                    <Grid container item className={classes.kycSearch}>
                        <SearchBar
                            id="kyc-search"
                            placeholder="Search by Email, First Name, Last Name..."
                            handleSearchbar={handleKYCSearch}
                            className="search-bar"
                            defaultValue={tenantData?.filter}
                        />
                    </Grid>
                </Grid>
                <VerificationTable
                    className={classes.verificationTable}
                    data={verifications?.items}
                    tenantAlias={tenantAlias}
                    roles={authInfo?.roles}
                    handleResendInvite={handleResendInvite}
                    handleView={handleView}
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                />
                {!isMobile &&
                    <CustomPagination
                        curPage={verifications?.page}
                        totalPages={verifications?.items?.length > 0 ? verifications?.pageCount : 0}
                        className={classes.pagination}
                        changePage={handleChangePageIndex}
                    />
                }
            </Grid>
        </Card>
    );
}

export default VerificationPage;
