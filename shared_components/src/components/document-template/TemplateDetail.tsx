import React, {
    useState,
    useEffect,
    useMemo,
} from 'react';
import {
    makeStyles,
    Theme
} from '@material-ui/core/styles';
import {
    Grid,
} from '@material-ui/core';
import styled from 'styled-components';

import {
    ContentDetails,
    ContentText,
    CustomButton,
} from '../common';

import {
    ALL_DEFAULT_ITEM,
    IListType,
    NOTIFICATION_STATES,
} from '../../common/constants';
import { IDocumentTemplate } from '../../service/models/document-template';
import { TemplateContentDetail } from '../document-template';

/**
 * Constants
 */
const MIDDLE_BREAK_POINT = 1200;

/**
 * Props
 */
interface IProps {
    className: any,
    countries: IListType[],
    docTypes: IListType[],
    templateData: IDocumentTemplate,
    templateResult: any,
    handleChangeField: any,
    handleSaveTemplate: any,
    handleRunTemplate: any,
    handleNotification: any,
}

/**
 * Styles
 */
const useStyles = makeStyles((theme: Theme) => ({
    root: {
        backgroundColor: '#ffffff',
        minHeight: 227,
    },

    container: {
        padding: '50px 50px 150px 90px',
        minHeight: 230,

        '@media screen and (max-width: 1200px)': {
            padding: '30px',
        },

        '@media screen and (max-width: 600px)': {
            padding: '20px',
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

    divider: {
        margin: '0 0 0 0',

        '@media screen and (max-width: 1200px)': {
            width: '100%',
            height: 1,
        }
    },

    buttons: {
        marginTop: 15,
    },

    button: {
        marginRight: 28,
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
const TemplateDetail = ({
    className,
    countries,
    docTypes,
    templateData,
    templateResult,
    handleChangeField,
    handleSaveTemplate,
    handleRunTemplate,
    handleNotification,
}: IProps) => {

    const classes = useStyles();

    /**
     * States
     */
    const [detailData, setDetailData] = useState([] as Array<any>);

    const [textRules, setTextRules] = useState('');
    const [files, setFiles] = useState<Array<any>>([]);

    useEffect(() => {

        setDetailData([
            {
                key: 'name',
                type: 'text',
                label: 'Template Name',
                text: templateData ? templateData.name : '',
                required: false
            },
            {
                key: 'documentType',
                type: 'select',
                label: 'Document Type',
                text: templateData ? templateData.documentType.code : 'all',
                list: docTypes,
                required: false
            },
            {
                key: 'country',
                type: 'autocomplete',
                label: 'Country',
                value: templateData ? {display: templateData.country.name, value: templateData.country.code} : ALL_DEFAULT_ITEM,
                list: countries,
                required: false
            },
            {
                key: 'maxPageCount',
                type: 'number',
                label: 'Page Max Count',
                text: templateData ? templateData.maxPageCount : 1,
                minVal: 1,
                required: false
            },
        ]);

        if (templateData) {
            setTextRules(JSON.stringify(templateData.textractRules, null, 2));
        }
    }, [countries, docTypes, templateData]);

    /**
     * Initialize when didMount and updating
     */
    const handleChangeDetail = (val: string | number | null, key: string) => {
        const _detailData = [...detailData];
        const id = _detailData.findIndex(item => item.key === key);

        if (id > -1) {
            switch (_detailData[id].type) {
                case 'autocomplete':
                    _detailData[id].value = val;
                    break;

                case 'number':
                    _detailData[id].text = Math.max(Number(val), _detailData[id].minVal);
                    break;

                default:
                    _detailData[id].text = val;
            }

            setDetailData(_detailData);
        }
        handleChangeField();
    }

    const validFields = useMemo(() => {
        let res = true;
        detailData.map((item: any) => {
            if (!item.required) {
                return;
            }

            switch (item.type) {
                case 'autocomplete':
                    if (item.value === null || item.value === undefined) {
                        res = false;
                    }
                    break;

                default:
                    if (item.text === '') {
                        res = false;
                    }
            }
        });

        return res;
    }, [detailData]);

    const showAlert = (message: string) => {
        handleNotification({
            type: NOTIFICATION_STATES.warning,
            message: message,
        });
    }

    const onSaveTemplate = () => {
        const docType = docTypes.find(_doc => _doc.value === detailData[1]?.text);
        let textRule = '';
        try {
            textRule = JSON.parse(textRules);
        } catch {
            textRule = '';
        }

        const data: IDocumentTemplate = {
            name: detailData[0]?.text || '',
            documentType: {
                code: docType?.value || '',
                name: docType?.display || '',
            },
            country: {
                code: detailData[2]?.value?.value || '',
                name: detailData[2]?.value?.display || '',
            },
            maxPageCount: detailData[3]?.text,
            textractRules: textRule,
        };

        handleSaveTemplate(data);
    };

    const onRunTemplate = () => {

        if (!checkValidationForm()) {
            return;
        }

        const docType = docTypes.find(_doc => _doc.value === detailData[1]?.text);
        const template: IDocumentTemplate = {
            name: detailData[0]?.text || '',
            documentType: {
                code: docType?.value || '',
                name: docType?.display || '',
            },
            country: {
                code: detailData[2]?.value?.value || '',
                name: detailData[2]?.value?.display || '',
            },
            maxPageCount: detailData[3]?.text,
            textractRules: JSON.parse(textRules) || '',
        };

        const images: { image: any; mimeType: string; }[] = [];
        files.map((file: any) => {
            const tmpFile = {
                image: file.image,
                mimeType: 'image/png'
            };
            images.push(tmpFile);
        });

        handleRunTemplate({
            template: template,
            images: images,
        });
    };

    const checkValidationForm = () => {
        if (detailData[0].text === '') {
            showAlert('Please input Template Name');
            return false;
        } else if (detailData[1].text === '') {
            showAlert('Please select Document Type.');
            return false;
        } else if (detailData[2].value === null) {
            showAlert('Please select Country.');
            return false;
        } else if (files.length <= 0) {
            showAlert('Please select the image file.');
            return false;
        }

        try {
            JSON.parse(textRules);
        } catch {
            showAlert('Textract Rules is not in a valid JSON format.');
            return false;
        }

        return true;
    }

    const handleTextRules = (value: any) => {
        setTextRules(value);
        handleChangeField();
    }

    const handleFiles = (_files: Array<any>) => {
        setFiles(_files);
        handleChangeField();
    }

    const onHandleNotification = (info: any) => {
        handleNotification(info);
    }

    return (
        <Grid container className={`${classes.root} ${className}`}>
            <Grid container direction="row" className={classes.container}>
                <Grid container direction="row" className={classes.title}>
                    <ContentText>TEMPLATE DETAILS</ContentText>
                    <Buttons>
                        <CustomButton
                            variant="contained"
                            label="SAVE TEMPLATE"
                            className={classes.button}
                            onClick={onSaveTemplate}
                            disabled={!validFields}
                        />
                        <CustomButton
                            variant="outlined"
                            label="RUN TEMPLATE"
                            className={classes.button}
                            onClick={onRunTemplate}
                            disabled={!validFields}
                        />
                    </Buttons>
                </Grid>
                <Grid container direction="column">
                    <ContentDetails
                        data={detailData}
                        editable={true}
                        onChange={handleChangeDetail}
                    />

                    <TemplateContentDetail
                        maxCount={detailData[3]?.text || 1}
                        textRules={textRules}
                        result={templateResult}
                        handleTextRules={handleTextRules}
                        handleFiles={handleFiles}
                        handleNotification={onHandleNotification}
                    />
                </Grid>
            </Grid>
        </Grid>
    )
}

TemplateDetail.defaultProps = {
    className: '',
    countries: [],
    docTypes: [],
    templateData: null,
    templateResult: null,
    handleChangeField: null,
    handleSaveTemplate: null,
    handleRunTemplate: null,
    handleNotification: null
}

export default TemplateDetail;
