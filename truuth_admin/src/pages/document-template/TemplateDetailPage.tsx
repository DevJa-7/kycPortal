import React, {
    useState,
    useEffect,
} from 'react';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router';
import moment from "moment";

import {
    useDispatch
} from 'react-redux';
import clsx from 'clsx';
import {
    makeStyles,
} from '@material-ui/core/styles';
import {
    Card,
    CardHeader,
    Avatar,
    IconButton,
    Theme,
} from '@material-ui/core';

import {
    ContentText,
    ContentBreak,
} from 'shared_components/src/components/common';
import {
    TemplateDetail,
} from 'shared_components/src/components';
import {
    TEXT_COLOR,
    cardStyles,
} from 'shared_components/src/common/styles';

import {
    setLoading,
    clearLoading,
    setNotification,
} from '../../store/common/actions';
import {
    _getTenantAlias,
} from '../../store/selectors';
import KycApiService from '../../service/kycApi.service';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { ALL_DEFAULT_ITEM, IListType, NOTIFICATION_STATES } from 'shared_components/src/common/constants';
import { IDocumentTemplate } from 'shared_components/src/service/models/document-template';
import { updateMenu } from '../../store/menu/actions';
import { MENU } from '../../common/routes/menu';
/**
 * Constants
 */

/**
 * Types
 */
interface ParamTypes {
    type: string,
    tmpId?: string,
}

/*
 * Styles
*/
const useStyles = makeStyles((theme: Theme) => ({
    root: {
        padding: 0,
        position: 'relative',

        '& > .MuiCardHeader-root': {
            padding: '20px 45px 20px 45px',
            marginBottom: 0,
            alignItems: 'center',
            position: 'absolute',
            top: 0,
            boxShadow: '0 3px 16px 0 rgba(0, 0, 0, 0.16)',
            backgroundColor: '#ffffff',
            width: '100%',

            '@media screen and (max-width: 600px)': {
                padding: '14px 20px 14px 20px',
                minHeight: 70,
            },
        },

        '& .MuiCardHeader-title ': {
            '& .title': {
                fontSize: 24,
                lineHeight: 1.33,
            },

            '@media screen and (max-width: 600px)': {
                textAlign: 'center',
                fontFamily: 'Roboto',
                fontSize: 17,
                fontWeight: 600,
                lineHeight: 1.35,

                marginTop: 25,
            },
        },

        '& .MuiCardHeader-avatar': {
            marginRight: 0,
        },

        '& .MuiCardHeader-action': {
            '@media screen and (max-width: 600px)': {
                width: 'auto',
            },
        },

        '& .template-id': {
            fontSize: 16,
            lineHeight: 1.31,
            fontWeight: 500,
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
        padding: '94px 0 0 0',
        flexWrap: 'nowrap',
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
 * Main Component
 */
const TemplateDetailPage = () => {

    const dispatch = useDispatch();
    const history = useHistory();

    /**
     * Parameters on Url.
     */
    const { type, tmpId } = useParams<ParamTypes>();

    /**
     * Use Styles
     */
    const classes = useStyles();
    const cardClasses = cardStyles();

    /**
     * Redux Store
     */
    const tenantAlias = _getTenantAlias();

    /**
     * States
     */
    const [isViewable, setIsViewable] = useState(false);
    const [isEditable, setIsEditable] = useState(false);
    const [isClone, setIsClone] = useState(false);
    const [templateId, setTemplateId] = useState('');

    const [listDocTypes, setListDocTypes] = useState<IListType[]>([] as IListType[]);
    const [listCountries, setListCountries] = useState<IListType[]>([] as IListType[]);
    const [templateResult, setTemplateResult] = useState<any>(null);
    const [templateData, setTemplateData] = useState<any>(null);

    /**
     * Functions
     */
    const getDocumentTypes = () => {
        return new Promise(resolve => {
            KycApiService.getDocumentTypes()
            .then((res: any) => {
                if (res.length > 0) {
                    const _listDocTypes: IListType[] = res?.map((item: any, index: number) => {
                        return {
                            id: index + 1,
                            display: item.name,
                            value: item.code,
                        };
                    });
                    // _listDocTypes.push(ALL_DEFAULT_ITEM);
                    setListDocTypes(_listDocTypes);
                } else {
                    setListDocTypes([]);
                }
            })
            .catch((err: any) => {
                setListDocTypes([]);
            })
            .finally(() => {
                return resolve({ status: 'success' });
            });
        });
    };

    const getCountries = () => {
        return new Promise(resolve => {
            KycApiService.getCountries()
                .then((res: any) => {
                    if (res?.items?.length > 0) {
                        const _listCountries: IListType[] = res?.items?.map((item: any, index: number) => {
                            return {
                                id: index + 1,
                                display: item.name,
                                value: item.alpha3Code,
                            };
                        });
                        _listCountries.sort((a: any, b: any) => (
                            a.display < b.display) ? -1 : 1
                        );
                        _listCountries.unshift(ALL_DEFAULT_ITEM);
                        setListCountries(_listCountries);
                    } else {
                        setListCountries([]);
                    }
                })
                .catch((err: any) => {
                    setListCountries([]);
                })
                .finally(() => {
                    return resolve({ status: 'success' });
                });
        });
    };

    const handleReturn = () => {
        history.push('/document-template');
    };

    const handleSaveTemplate = (data: IDocumentTemplate) => {
        dispatch(setLoading());

        if (tmpId && !isClone) {
            KycApiService.updateDocument(tmpId, data)
                .then((res: any) => {
                    if (!res?.error) {
                        dispatch(setNotification({
                            type: NOTIFICATION_STATES.success,
                            message: 'Template is successfully saved.',
                        }));
                        history.push('/document-template');
                    } else {
                        dispatch(setNotification({
                            type: NOTIFICATION_STATES.error,
                            message: res.error?.message,
                        }))
                    }
                })
                .catch((err: any) => {
                    if (err) {
                        dispatch(setNotification({
                            type: NOTIFICATION_STATES.error,
                            message: 'You cannot update current template.',
                        }));
                    }
                })
                .finally(() => {
                    dispatch(clearLoading());
                });
        } else {
            KycApiService.createDocument(data)
                .then((res: any) => {
                    if (!res?.error) {
                        dispatch(setNotification({
                            type: NOTIFICATION_STATES.success,
                            message: 'Template is successfully created.',
                        }));
                        history.push('/document-template');
                    } else {
                        dispatch(setNotification({
                            type: NOTIFICATION_STATES.error,
                            message: res.error?.message,
                        }))
                    }
                })
                .catch((err: any) => {
                    if (err) {
                        dispatch(setNotification({
                            type: NOTIFICATION_STATES.error,
                            message: 'You cannot create new template.',
                        }));
                    }
                })
                .finally(() => {
                    dispatch(clearLoading());
                });
        }
    };

    const handleRunTemplate = (data: any) => {
        dispatch(setLoading());

        KycApiService.runTemplate(data)
            .then((res: any) => {
                if (!res.error) {
                    setTemplateResult(res);
                } else {
                    dispatch(setNotification({
                        type: NOTIFICATION_STATES.error,
                        message: res.error.message,
                    }));
                }
            })
            .catch((error: any) => {
                dispatch(setNotification({
                    type: NOTIFICATION_STATES.error,
                    message: error.message,
                }));
            })
            .finally(() => {
                dispatch(clearLoading());
            });
    }

    const getTemplateData = (id: string) => {

        return new Promise(resolve => {
            KycApiService.getDocument(id)
                .then((res: any) => {
                    if (res) {
                        setTemplateData(res);
                    }
                })
                .catch((error: any) => {
                    console.log('error ==', error);
                })
                .finally(() => {
                    return resolve({ status: 'success' });
                })
        })
    }

    const handleNotification = (info: any) => {
        dispatch(setNotification({
            type: info.type,
            message: info.message,
        }))
    }

    const handleChangeField = () => {
        if (isViewable) {
            setIsViewable(false);
            setIsEditable(true);
        }
    }

    const showDocumentTitle = () => {
        let res = 'New Document Template';

        if (isViewable) {
            res = 'View Document Template';
        }
        if (isClone) {
            res = 'Clone Document Template';
        }
        if (isEditable) {
            res = 'Edit Document Template';
        }

        return res;
    }

    const showUpdatedBy = (template: IDocumentTemplate) => {
        return (
            <>
                {template.updatedBy || template.createdBy}
            </>
        )
    }

    const showUpdateAt = (template: IDocumentTemplate) => {
        return (
            <>
                {moment(template.updatedAt || template.createdAt).format("DD-MM-YYYY HH:mm:ss A")}
            </>
        )
    }

    useEffect(() => {
        dispatch(setLoading());
        dispatch(updateMenu(MENU.documentTemplate));

        let subPromisese = [
            getCountries(),
            getDocumentTypes()
        ];

        if (templateId !== '') {
            subPromisese.push(getTemplateData(templateId));
        }
        Promise.all(subPromisese)
        .finally(() => {
            dispatch(clearLoading());
        });

        return () => {
            setListCountries([]);
        };
    }, [templateId]);

    useEffect(() => {
        if (type === undefined || tmpId === undefined) {
            setIsEditable(false);
            setIsViewable(false);
            setIsClone(false);
            setTemplateId('');
        } else {
            if (type === 'view') {
                setIsViewable(true);
            } else if (type === 'clone') {
                setIsClone(true);
            }
            setTemplateId(tmpId);
        }
    }, [window.location.pathname]);

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
                title={
                    <>
                        <ContentText className="title">{showDocumentTitle()}</ContentText>
                        { templateData && (
                            <>
                                <ContentBreak />
                                <ContentText className="template-id">
                                    Updated By: <b>{showUpdatedBy(templateData)}</b> at <b>{showUpdateAt(templateData)}</b>
                                </ContentText>
                            </>
                        )}
                    </>
                }
            />
            <TemplateDetail
                className={classes.content}
                countries={listCountries}
                docTypes={listDocTypes}
                templateData={templateData}
                templateResult={templateResult}
                handleChangeField={handleChangeField}
                handleSaveTemplate={handleSaveTemplate}
                handleRunTemplate={handleRunTemplate}
                handleNotification={handleNotification}
            />
        </Card>
    );
}

export default TemplateDetailPage;
