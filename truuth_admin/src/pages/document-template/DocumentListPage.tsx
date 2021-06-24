import React, {
    useState,
    useEffect,
    useLayoutEffect,
    useMemo,
} from 'react';
import {
    useDispatch,
} from 'react-redux';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import styled from 'styled-components';
import {
    Grid,
    Card,
    Avatar,
    Divider,
    Theme,
    TextField
} from '@material-ui/core';

import {
    cardStyles, TEXT_COLOR,
} from 'shared_components/src/common/styles';
import {
    CustomSelect,
    SearchBar,
    CustomPagination,
    CustomButton,
    DocumentTemplateTable,
    CommonAutocomplete,
    ContentText,
} from 'shared_components/src/components';
import { getIsMobile } from 'shared_components/src/common/utils';
import {
    ListIcon,
} from 'shared_components/src/common/icons';
import {
    IListType,
    SORT_TYPE,
    ALL_DEFAULT_ITEM,
    NOTIFICATION_STATES,
} from 'shared_components/src/common/constants';
import { IDocuments, IDocumentTemplate } from 'shared_components/src/service/models/document-template';

import {
    setLoading,
    clearLoading,
    setNotification,
} from '../../store/common/actions';
import { MENU } from '../../common/routes/menu';
import { updateMenu } from '../../store/menu/actions';
import kycApiService from '../../service/kycApi.service';
import {
    _getDocuments,
    _getDocumentPage,
} from '../../store/selectors';
import {
    setDocumentList,
    setDocumentPage,
} from '../../store/document-template/actions';

/**
 * Constants
 */
const PAGE_SIZE = 10;

/*
 * Styles
 */
const useStyles = makeStyles((theme: Theme) => ({
    root: {
        '& .MuiCardHeader-action': {
            textAlign: 'right',
            width: 'auto',

            '@media screen and (max-width: 1100px)': {
                width: '60%',
            },

            '@media screen and (max-width: 600px)': {
                width: '100%',
            },
        },
        '& .card-header-bottom': {
            '@media screen and (max-width: 600px)': {
                margin: '0 16px',
            }
        },
    },

    avatar: {
        backgroundColor: 'transparent',
        borderRadius: 0,
        width: 36,
        height: 'auto',

        '& svg': {
            width: '100%',
            height: '100%',
            fill: '#727272',
        },

        '@media screen and (max-width: 1280px)': {
            width: 26.3,
            height: 30,
        },
        '@media screen and (max-width: 600px)': {
            width: 20,
            height: 24,
        },
    },

    select: {
        width: '13%',
        maxWidth: '211px',
        margin: '0 30px 0 0',

        '@media screen and (max-width: 1280px)': {
            minWidth: '180px',
            marginRight: 30,
        },
        '@media screen and (max-width: 1025px)': {
            minWidth: '100%',
            marginRight: 0,
            marginBottom: 15,
        },
    },

    templateName: {
        '& .MuiInputBase-input': {
            fontSize: 16,
            lineHeight: 1.2,

            '@media screen and (max-width: 1440px)': {
                fontSize: 14,
            },

            '@media screen and (max-width: 1280px)': {
                fontSize: 12,
            },

            '@media screen and (max-width: 600px)': {
                fontSize: 14,
                lineHeight: 1.36,
            },
        },

        '& .MuiFormLabel-root': {
            color: TEXT_COLOR.graylight,

            '@media screen and (max-width: 1440px)': {
                fontSize: 14,
            },

            '@media screen and (max-width: 1280px)': {
                fontSize: 12,
            },

            '@media screen and (max-width: 600px)': {
                fontSize: 12,
                lineHeight: 1.33,
            },
        },
    },

    search: {
        maxWidth: '400px',
        marginLeft: 'auto',
        width: '30%',

        '@media screen and (max-width: 1530px)': {
            maxWidth: '100%',
            width: '35%',
        },
        '@media screen and (max-width: 1280px)': {
            maxWidth: '100%',
            width: '40%',
            marginTop: 10,
        },
        '@media screen and (max-width: 1025px)': {
            maxWidth: '100%',
            width: '100%',
        },
        '& .search-bar': {
            width: '100%',
            margin: 0,
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

    pagination: {
        marginTop: 25,
        marginBottom: 15,
        '@media screen and (max-width: 1280px)': {
            marginTop: 15,
            marginBottom: 5,
        },
    },

    button: {
        marginLeft: 28,
        fontSize: 16,
        '@media screen and (max-width: 900px)': {
            fontSize: 14,
        },

        '@media screen and (max-width: 600px)': {
            fontSize: 12,
        },
    },

    clearButton: {
        color: theme.palette.primary.main,
        marginLeft: 0,
        '@media screen and (max-width: 1025px)': {
            minWidth: '100%',
            marginTop: 5,
            marginBottom: 20,
        },
    },
}));

/**
 * Styled Component
 */
const FileInput = styled.input`
    display: none;
`;

/**
 * Main Component
 */
const DocumentListPage = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const classes = useStyles();
    const cardClasses = cardStyles();

    const [isInited, setIsInited] = useState(false);
    const [isMobile, setIsMobile] = useState(getIsMobile());

    const documents = _getDocuments();
    const page = _getDocumentPage();

    const [templateName, setTemplateName] = useState('');
    const [updatedTemplateName, setUpdatedTemplateName] = useState('');

    const [listDocTypes, setListDocTypes] = useState<IListType[]>([] as IListType[]);
    const [selectedDocType, setSelectedDocType] = useState('');

    const [listCountries, setListCountries] = useState<IListType[]>([] as IListType[]);
    const [selectedCountry, setSelectedCountry] = useState<IListType | null>(null);

    const [keyword, setKeyword] = useState('');

    // fileInput for opening file open.
    const fileInput = React.useRef() as any;

    const getDocumentList = () => {
        return new Promise(resolve => {
            const req = {
                order: `${query.sort}`,
                search: query.search,
                name: query.name,
                documenttypecode: query.documentTypeCode,
                countrycode: query.countryCode,
                page: query.page,
                limit: query.limit,
            };

            kycApiService.getDocumentList(req)
                .then((res: any) => {
                    dispatch(setDocumentList(res));
                })
                .catch((err: any) => {
                    dispatch(setDocumentList({} as IDocuments));
                })
                .finally(() => {
                    return resolve({ status : 'success'});
                });
        });
    };

    const getDocumentTypes = () => {
        return new Promise(resolve => {
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
                        // setSelectedDocType(ALL_DEFAULT_ITEM?.value || 'all');
                    } else {
                        setListDocTypes([]);
                        setSelectedDocType('');
                    }
                })
                .catch((err: any) => {
                    setListDocTypes([]);
                    setSelectedDocType('');
                })
                .finally(() => {
                    return resolve({ status: 'success' });
                });
        });
    };

    const getCountries = () => {
        return new Promise(resolve => {
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
                    return resolve({ status: 'success' });
                });
        });

    };

    const handleTestDocument = () => {
        history.push(`document-template/test`);
    };

    const handleImportDocument = (e: any) => {
        dispatch(setLoading());

        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onload = function (event: any) {
            const fileContent = event.target.result;
            try {
                const template = JSON.parse(fileContent);
                if (template._id) delete template._id;
                kycApiService.importDocument(template)
                    .then((res: any) => {
                        if (res && res._id)  {
                            history.push('/document-template/view/' + res._id);
                        }
                    })
                    .catch((error: any) => {
                        dispatch(setNotification({
                            type: NOTIFICATION_STATES.error,
                            message: error?.message,
                        }));
                        dispatch(clearLoading());
                    })
            } catch {
                dispatch(setNotification({
                    type: NOTIFICATION_STATES.warning,
                    message: 'Uploaded file is not in valid JSON format',
                }));
                dispatch(clearLoading());
            }
        }

        reader.readAsText(file)
    };

    const handleAddDocument = () => {
        history.push('/document-template/create');
    };

    const handleDeleteDocument = (doc: IDocumentTemplate) => {
        if (doc?._id) {
            kycApiService.deleteDocument(doc?._id)
                .then((res: any) => {
                    console.log('res: ', res);
                })
                .catch((err: any) => {
                    console.log('err: ', err);
                })
                .finally(() => {
                    if (documents?.items?.length <= 1) {
                        const prevPage = Math.max(page - 1, 1);
                        dispatch(setDocumentPage(prevPage));
                    } else {
                        refreshList();
                    }
                });
        }
    };

    const handleViewDocument= (doc: IDocumentTemplate) => {
        if (doc?._id) {
            history.push('/document-template/view/' + doc._id);
        }
    }

    const handleCloneDocument = (doc: IDocumentTemplate) => {
        if (doc?._id) {
            history.push('/document-template/clone/' + doc._id);
        }
    }

    const handleExportDocument =(doc: IDocumentTemplate) => {
        if (doc?._id) {
            dispatch(setLoading());
            kycApiService.getDocument(doc?._id)
                .then(async (res: any) => {
                    if (res) {
                        const dataStr = "data:text/json;charset=utf-8," +
                                        encodeURIComponent(JSON.stringify(res));
                        const downloadLink = document.createElement("a");
                        downloadLink.href = dataStr;
                        downloadLink.download = res.name + ".json";
                        downloadLink.click();
                    }
                })
                .catch((error: any) => {
                    dispatch(setNotification({
                        type: NOTIFICATION_STATES.error,
                        message: error?.message,
                    }))
                })
                .finally(() => {
                    dispatch(clearLoading());
                })
        }
    }

    const handleTemplateName = (e: any) => {
        if (e.keyCode === 13) {
            setTemplateName(e.target.value);
            dispatch(setDocumentPage(1));
        }
    };

    const handleUpdateTemplateName = (e: any) => {
        setUpdatedTemplateName(e.target.value);
    };

    const handleDocumeType = (e: any) => {
        setSelectedDocType(e.target.value);
        dispatch(setDocumentPage(1));
    };

    const handleCountry = (event: object, value: IListType | null, reason: string) => {
        setSelectedCountry(value || null);
        dispatch(setDocumentPage(1));
    };

    const handleDocumentSearch = (e: any) => {
        setKeyword(e.target.value);
        dispatch(setDocumentPage(1));
    };

    const handleChangePageIndex = (pageIndex: any) => {
        dispatch(setDocumentPage(pageIndex));
    };

    const handleClear = () => {
        setKeyword('');
        setUpdatedTemplateName('');
        setTemplateName('');
        setSelectedCountry(null);
        setSelectedDocType('all');
    };

    const query = useMemo(() => {
        return {
            sort: 'name',
            order: SORT_TYPE.desc,
            limit: PAGE_SIZE,
            page: page,
            name: templateName || '',
            documentTypeCode: selectedDocType === 'all' ? '' : selectedDocType,
            countryCode: selectedCountry?.value === 'all' ? '' : selectedCountry?.value,
            search: keyword || '',
        };
    }, [templateName, selectedDocType, selectedCountry, keyword, page]);

    const refreshList = () => {
        dispatch(setLoading());
        Promise.all([
            getDocumentList()
        ])
        .finally(() => {
            dispatch(clearLoading());
        });
    };

    useEffect(() => {
        window.addEventListener('resize', () => {
            setIsMobile(getIsMobile());
        });

        dispatch(updateMenu(MENU.documentTemplate));
    }, []);

    useLayoutEffect(() => {
        setIsInited(true);
    }, []);

    useEffect(() => {
        if (isInited) {
            dispatch(setLoading());
            Promise.all([
                getDocumentTypes(),
                getCountries()
            ])
            .finally(() => {
                dispatch(clearLoading());
            });
        }
    }, [isInited]);

    useEffect(() => {
        if (isInited) {
            refreshList();
        }
    }, [query, isInited]);

    return (
        <Card className={clsx(cardClasses.root, classes.root)}>
            <Grid container className="MuiCardHeader-root" alignContent="space-between">
                <HeaderIcon className="MuiCardHeader-avatar">
                    <Avatar aria-label="recipe" className={classes.avatar}>
                        <ListIcon />
                    </Avatar>
                </HeaderIcon>
                <HeaderContent className="MuiCardHeader-title">
                    <ContentText>
                        Document Template
                    </ContentText>
                </HeaderContent>
                <HeaderAction>
                    <Grid container className="action-buttons" alignContent="space-between">
                        <CustomButton
                            variant="outlined"
                            label="TEST DOCUMENT"
                            className={classes.button}
                            onClick={handleTestDocument}
                        />
                        <CustomButton
                            variant="outlined"
                            label="IMPORT TEMPLATE"
                            className={classes.button}
                            onClick={() => fileInput.current.click()}
                        />
                        <FileInput
                            accept="application/JSON"
                            ref={fileInput}
                            type="file"
                            onChange={handleImportDocument}
                        />
                        <CustomButton
                            label="ADD DOCUMENT"
                            className={classes.button}
                            onClick={handleAddDocument}
                        />
                    </Grid>
                </HeaderAction>
            </Grid>
            <Divider className="card-header-bottom" />
            <Grid container className={classes.table}>
                <Grid container className="tableHeader" alignContent="stretch">
                    <TextField
                        id="template-document-search"
                        onKeyUp={handleTemplateName}
                        onChange={handleUpdateTemplateName}
                        type="text"
                        name="template-document-search"
                        label="Template Name"
                        className={`${classes.select} ${classes.templateName}`}
                        value={updatedTemplateName}
                    />
                    <CustomSelect
                        id="document-type"
                        title="Document Type"
                        selectList={listDocTypes}
                        value={selectedDocType}
                        handleChange={handleDocumeType}
                        className={classes.select}
                    />
                    <CommonAutocomplete
                        id="country-select"
                        className={classes.select}
                        label="Country"
                        options={listCountries}
                        getOptionLabel={(option: IListType) => option.display}
                        getOptionSelected={(option: IListType, value: IListType) => option.display === value.display}
                        onChange={handleCountry}
                        value={selectedCountry || null}
                    />
                    <CustomButton
                        label="Clear"
                        className={`${classes.clearButton} ${classes.button}`}
                        onClick={handleClear}
                        variant="contained"
                        color="default"
                    />
                    <Grid container item className={classes.search}>
                        <SearchBar
                            id="document-list-search"
                            placeholder="Search by Name, Document Type, Country.."
                            handleSearchbar={handleDocumentSearch}
                            className="search-bar"
                        />
                    </Grid>
                </Grid>
                <DocumentTemplateTable
                    className=""
                    data={documents?.items}
                    handleViewDocument={handleViewDocument}
                    handleExportDocument={handleExportDocument}
                    handleCloneDocument={handleCloneDocument}
                    handleDeleteDocument={handleDeleteDocument}
                />
                {!isMobile &&
                    <CustomPagination
                        curPage={page}
                        totalPages={documents?.items?.length > 0 ? documents?.pageCount : 0}
                        className={classes.pagination}
                        changePage={handleChangePageIndex}
                    />
                }
            </Grid>
        </Card>
    );
}

export default DocumentListPage;

const HeaderIcon = styled.div`
    margin-top: auto;
    margin-bottom: auto;
`;

const HeaderContent = styled.div`
    margin-top: auto;
    margin-bottom: auto;
`;

const HeaderAction = styled.div`
    display: flex;
    flex-direction: row;
    margin-left: auto;

    @media screen and (max-width: 1200px) {
        width: 100%;
        margin-top: 16px;
    }

    @media screen and (max-width: 900px) {
        width: 100%;
        margin-top: 16px;
        flex-direction: column;
    }

    .action-buttons {
        @media screen and (max-width: 1200px) {
            justify-content: space-between;

            button {
                margin: 0;
                min-width: 180px;
                width: 30%;
                font-size: 16px;
            }
        }

        @media screen and (max-width: 1000px) {
            justify-content: space-between;

            button {
                margin: 0;
                min-width: 180px;
                width: 30%;
                font-size: 14px;
            }
        }

        @media screen and (max-width: 900px) {
            justify-content: space-between;

            button {
                margin-top: 10px;
                min-width: 100%;
            }
        }
    }
`;
