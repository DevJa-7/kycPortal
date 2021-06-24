import React, {
    useState,
    useEffect,
    useLayoutEffect,
    useMemo,
} from 'react';
import {
    useDispatch,
} from 'react-redux';
import {
    useHistory,
} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import styled from 'styled-components';
import { cardStyles } from 'shared_components/src/common/styles';
import {
    Card,
    CardHeader,
    Theme,
    Avatar,
    IconButton,
    Grid,
} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {
    ContentText,
    CustomButton,
} from 'shared_components/src/components/common';
import {
    TestTemplateDetailInfo,
    TestTemplateSelection
} from 'shared_components/src/components/document-template'
import {
    IListType,
    ALL_DEFAULT_ITEM,
    NOTIFICATION_STATES,
} from 'shared_components/src/common/constants';

import {
    setLoading,
    clearLoading,
    setNotification,
} from '../../store/common/actions';
import kycApiService from '../../service/kycApi.service';
import { updateMenu } from '../../store/menu/actions';
import { MENU } from '../../common/routes/menu';

 /**
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

    container: {
        padding: '50px 50px 150px 90px',
        minHeight: 230,

        '@media screen and (max-width: 1200px)': {
            padding: '0 30px',
        },

        '@media screen and (max-width: 600px)': {
            padding: '0 20px',
        }
    },

    title: {
        fontFamily: 'Roboto',
        fontSize: 24,
        lineHeight: 1.31,
        fontWeight: 'bold',
        width: '100%',
        marginBottom: 10,
        alignItems: 'center',
        color: theme.palette.grey[900],

        '@media screen and (max-width: 1280px)': {
            fontSize: 24,
            marginBottom: 0,
        },

        '@media screen and (max-width: 600px)': {
            fontSize: 16,
        },
    },

    button: {
        marginLeft: 28,
        fontSize: 16,
        '@media screen and (max-width: 600px)': {
            fontSize: 12,
        },
    },
}));

/**
 * Styled Components
 */
const Buttons = styled.div`
  margin-left: auto;
`;

/**
 * Main Component
 */
const TestTemplatePage = () => {

    const dispatch = useDispatch();
    const history = useHistory();

    const classes = useStyles();
    const cardClasses = cardStyles();

    const [isInited, setIsInited] = useState(false);

    const [listDocTypes, setListDocTypes] = useState<IListType[]>([] as IListType[]);
    const [selectedDocType, setSelectedDocType] = useState('');

    const [listCountries, setListCountries] = useState<IListType[]>([] as IListType[]);
    const [selectedCountry, setSelectedCountry] = useState<IListType | null>(null);

    const [pageMaxCount, setPageMaxCount] = useState<number>(1);

    const [files, setFiles] = useState<Array<any>>([]);
    const [testResult, setTestResult] = useState(null);

    const getDocumentTypes = () => {
        dispatch(setLoading());
        kycApiService.getDocumentTypes()
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
                    // setSelectedDocType('all')
                } else {
                    setListDocTypes([]);
                }
            })
            .catch((err: any) => {
                setListDocTypes([]);
            })
            .finally(() => {
                dispatch(clearLoading());
            });
    };

    const getCountries = () => {
        dispatch(setLoading());
        kycApiService.getCountries()
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
                    setSelectedCountry(ALL_DEFAULT_ITEM);
                } else {
                    setListCountries([]);
                    setSelectedCountry(null);
                }
            })
            .catch((err: any) => {
                setListCountries([]);
                setSelectedCountry(null);
            })
            .finally(() => {
                dispatch(clearLoading());
            });
    };

    useLayoutEffect(() => {
        dispatch(updateMenu(MENU.documentTemplate));
        setIsInited(true);
    }, []);

    useEffect(() => {
        if (isInited) {
            getDocumentTypes();
            getCountries();
            setPageMaxCount(1);
        }
    }, [isInited]);

    const handleReturn = () => {
        history.push('/document-template');
    }

    const showAlert = (message: string) => {
        dispatch(setNotification({
            type: NOTIFICATION_STATES.warning,
            message: message,
        }));
    }

    const handleRunTemplate = () => {

        if (selectedDocType === '') {
            showAlert('Please select Document Type.');
            return;
        } else if (selectedCountry === null) {
            showAlert('Please select Country.');
            return;
        } else if (files.length <= 0) {
            showAlert('Please select the image file.');
            return;
        }

        const images: { image: any; mimeType: string; }[] = [];
        files.map((file: any) => {
            const tmpFile = {
                image: file.image,
                mimeType: 'image/png'
            };
            images.push(tmpFile);
        });

        dispatch(setLoading());
        const req = {
            countryCode: selectedCountry.value,
            documentType: selectedDocType,
            images: images
        }
        kycApiService.testTemplate(req)
            .then((res: any) => {
                if (res) {
                    if (!res.error) {
                        setTestResult(res);
                    } else {
                        dispatch(setNotification({
                            type: NOTIFICATION_STATES.error,
                            message: res.error.message,
                        }));
                    }
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
    };

    const handleSelectedDocType = (docType: string) => {
        setSelectedDocType(docType);
    };

    const handleSelectedCountry = (country: IListType) => {
        setSelectedCountry(country);
    };

    const handleSelectedMaxCount = (maxCount: number) => {
        setPageMaxCount(maxCount);
    }

    const handleFiles = (_files: Array<any>) => {
        setFiles(_files);
    }

    const handleNotification = (info: any) => {
        dispatch(setNotification({
            type: info.type,
            message: info.message,
        }))
    }

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
                        <ContentText className="title">
                            Test Document
                        </ContentText>
                    </>
                }
            />

            <Grid container className={classes.container}>
                <Grid container direction="row" className={classes.title}>
                    <ContentText>TEMPLATE DETAILS</ContentText>
                    <Buttons>
                        <CustomButton
                            variant="outlined"
                            label="RUN TEMPLATE"
                            className={classes.button}
                            onClick={handleRunTemplate}
                        />
                    </Buttons>
                </Grid>

                <Grid container direction="column">
                    <TestTemplateSelection
                        documentList={listDocTypes}
                        countryList={listCountries}
                        handleSelectedDocType={handleSelectedDocType}
                        handleSelectedCountry={handleSelectedCountry}
                        handleSelectedMaxCount={handleSelectedMaxCount}
                    />
                    <TestTemplateDetailInfo
                        maxCount={pageMaxCount}
                        testTemplate={testResult}
                        handleFiles={handleFiles}
                        handleNotification={handleNotification}
                    />
                </Grid>
            </Grid>
        </Card>
    )
}

export default TestTemplatePage;
