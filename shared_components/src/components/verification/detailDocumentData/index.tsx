import React, { useState, useEffect } from 'react';
import {
    makeStyles,
    withStyles,
} from '@material-ui/core/styles';
import {
    Grid
} from '@material-ui/core';
import styled from 'styled-components';
import _ from 'lodash';

import {
    TEXT_COLOR,
    BORDER_COLOR,
    BACKGROUND_COLOR,
    CommonButton
} from '../../../common/styles';
import {
    ContentText,
    ContentDetails,
    CustomButton
} from '../../common';
import DocumentDataSelectItem from './DocumentDataSelectItem';
import DocumentDataCapturedImages from './DocumentDataCapturedImages';
import {
    ContactIcon,
    PassportIcon,
    MedicareIcon,
    ProofOfAgeIcon
} from '../../../common/icons';
import {
    DATE_FORMAT_MOMENT,
    ICheckItem,
    IVerificationDocumentItem,
    VERIFICATION_DOCUMENT_ITEMS,
    VERIFICATION_SECURIRY_CHECKLIST,
} from '../../../common/constants';
import {
    IVerificationDetail,
    IVerificationDetailSecurity,
    VERIFICATION_DOCUMENT_TYPES,
    DOCUMENT_AUTHENTICITY_CHECK,
    FACE_MATCH_CHECK,
    NAME_MATCH_CHECK,
    DOB_MATCH_CHECK,
    EXPIRY_CHECK,
    DVS_CHECK,
    IRN_CHECK,
    STATE_LISTS,
} from '../../../service/models/verification';
import VerificationSecurityCheck from '../VerificationSecurityCheck';
import UtilService from '../../../service/util.service';

/**
 * Props
 */
interface IProps {
    editable?: boolean,
    roles?: string,
    isEdit?: boolean,
    data?: IVerificationDetail[],
    handleChange?: any,
    handleSave?: any,
    handleCancel?: any,
    handleEdit?: any,
    faceImage?: string,
}

/**
 * Styles
 */
const useStyles = makeStyles(() => ({
    title: {
        fontFamily: 'Roboto',
        fontSize: 24,
        lineHeight: 1.31,
        fontWeight: 'bold',

        '@media screen and (max-width: 1280px)': {
            fontSize: 24,
            marginBottom: 0,
        },

        '@media screen and (max-width: 600px)': {
            fontSize: 16,
        },
    },

    item: {
        '&:nth-child(odd)': {
            paddingRight: 10,
        },

        '&:nth-child(even)': {
            paddingLeft: 10,
        },

        '@media screen and (max-width: 600px)': {
            width: '100%',
            padding: '0 !important',
        },

    },

    disabledInput: {
        '& .MuiInput-underline.Mui-disabled:before': {
            borderBottomStyle: 'solid',
            borderBottomColor: 'rgba(0, 0, 0, 0.05)',
        },
        '& .MuiFormLabel-root.Mui-disabled': {
            color: TEXT_COLOR.graylight,
        }
    },

    contentDetails: {
        marginBottom: 40,
        width: '100%',

        '@media screen and (max-width: 600px)': {
            marginBottom: 20,
        },

        '& >div>span': {
            '@media screen and (max-width: 1280px)': {
                fontSize: 20,
                marginBottom: 0,
            },
        }
    },

    icons: {
        margin: '20px 0 20px 0',

        '@media screen and (max-width: 600px)': {
            margin: '10px 0 10px 0',
        },

        '&:not(last-child)': {
            marginRight: 36,

            '@media screen and (max-width: 1440px)': {
                marginRight: 20,
            },

            '@media screen and (max-width: 600px)': {
                marginRight: 10,
                marginLeft: 10,
            },
        },

        '&:last-child': {
            '@media screen and (max-width: 600px)': {
                marginBottom: 20,
            },
        },

    },

    driversLicence: {
        fill: BACKGROUND_COLOR.primary,
        width: 86.5,
        height: 57.5,

        '@media screen and (max-width: 1440px)': {
            width: 78.8,
            height: 52.9,
        },

        '@media screen and (max-width: 1280px)': {
            width: 72.9,
            height: 48.9,
        },

        '@media screen and (max-width: 900px)': {
            width: 43.25,
            height: 28.75,
        },
    },

    passport: {
        fill: BACKGROUND_COLOR.primary,
        width: 44.2,
        height: 69.7,

        '@media screen and (max-width: 1440px)': {
            width: 40.7,
            height: 64.1,
        },

        '@media screen and (max-width: 1280px)': {
            width: 37.6,
            height: 59.3,
        },

        '@media screen and (max-width: 900px)': {
            width: 22.1,
            height: 34.85,
        },
    },

    medicareCard: {
        fill: BACKGROUND_COLOR.primary,
        width: 86.4,
        height: 65.1,

        '@media screen and (max-width: 1440px)': {
            width: 79.5,
            height: 59.9,
        },

        '@media screen and (max-width: 1280px)': {
            width: 73.6,
            height: 55.4,
        },

        '@media screen and (max-width: 900px)': {
            width: 43.2,
            height: 32.55,
        },
    },

    proofOfAgeCard: {
        fill: BACKGROUND_COLOR.primary,
        width: 85.3,
        height: 51.2,

        '@media screen and (max-width: 1440px)': {
            width: 85.3,
            height: 51.2,
        },

        '@media screen and (max-width: 1280px)': {
            width: 75,
            height: 45,
        },

        '@media screen and (max-width: 900px)': {
            width: 42.65,
            height: 25.6,
        },
    },

    header: {
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 50,
        '@media screen and (max-width: 1280px)': {
            marginBottom: 30,
        },
        '@media screen and (max-width: 600px)': {
            marginBottom: 10,
        }
    },

    editButton: {
        minWidth: 185,
        '@media screen and (max-width: 1280px)': {
            paddingTop: 11,
            paddingBottom: 11,
            minWidth: 100,
        },
        '@media screen and (max-width: 600px)': {
            width: 'auto',
        }
    },

    saveButton: {
        minWidth: 125,
        marginLeft: 20,
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
            minWidth: 85,
            width: 'auto',
            marginLeft: 10,
        }
    },

    cancelButton: {
        minWidth: 125,
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
            minWidth: 85,
            width: 'auto',
        }
    },

    buttons: {
        marginTop: 15,
    }
}));

/**
 * Styled Components
 */
const DocumentDataContainer = styled.div`
    display: flex;
    padding: 8px 30px 20px 90px;
    justify-content: center;

    @media screen and (max-width: 1200px) {
        padding-left: 30px;
    }

    @media screen and (max-width: 600px) {
        padding: 0 20px 20px 20px;
    }
`;

const DocumentDataWrapper = styled.div`
    display: flex;
    width: 100%;
    flex-flow: column;
`;

const ContentSelect = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    border-bottom: 1px solid ${BORDER_COLOR.gray};
`;

const ContentSelectedItem = styled.div`
    display: flex;
    width: 100%;
    margin-top: 30px;
    margin-bottom: 40px;
    align-items: center;

    min-height: 70px;

    @media screen and (max-width: 600px) {
        margin-top: 20px;
        min-height: 40px;
    }

    & .label {
        font-family: Roboto;
        font-size: 26px;
        font-weight: 500;
        line-height: 1.31;
        color: ${TEXT_COLOR.primary};
        margin-left: 25px;

        @media screen and (max-width: 1440px) {
            font-size: 24px;
        }

        @media screen and (max-width: 600px) {
            font-size: 20px;
            margin-left: 15px;
        }
    }
`;

const DocumentDataSelect = styled.div`
    display: flex;
    flex-wrap: wrap;
    flex-flow: row;
    overflow: auto;
`;

const Buttons = styled.div`
    margin-left: auto;
`;

const MandatoryFieldText = styled.span`
    font-size: 0.75rem;
    color: #f44336;
    text-align: right;
    margin-top: 3px;
    width: 100%;
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
const VerifictionDetailDocumentData = ({
    editable,
    roles,
    isEdit,
    data,
    handleChange,
    handleSave,
    handleCancel,
    handleEdit,
    faceImage,
}: IProps) => {
    const classes = useStyles();

    const [documentData, setDocumentData] = useState({} as any);
    const [documentDataItems, setDocumentDataItems] = useState([] as IVerificationDocumentItem[]);
    const [selectedItem, setSelectedItem] = useState({ key: '', label: '' });
    const [validBtn, setValidBtn] = useState(false);

    const [itemIcons, setItemsIcons] = useState({
        'driversLicence': <ContactIcon className={classes.driversLicence} />,
        'passport': <PassportIcon className={classes.passport} />,
        'medicareCard': <MedicareIcon className={classes.medicareCard} />,
        'proofOfAgeCard': <ProofOfAgeIcon className={classes.proofOfAgeCard} />,
    } as any);

    /**
     * Initialize when data is changed
     */
    useEffect(() => {
        const driversLicence = data?.find(item => item.documentType === VERIFICATION_DOCUMENT_TYPES.DRIVERS_LICENCES);
        const passport = data?.find(item => item.documentType === VERIFICATION_DOCUMENT_TYPES.PASSPORT);
        const medicareCard = data?.find(item => item.documentType === VERIFICATION_DOCUMENT_TYPES.MEDICARE_CARD);
        const proofOfAgeCard = data?.find(item => item.documentType === VERIFICATION_DOCUMENT_TYPES.PROOF_OF_AGE_CARD);

        setDocumentData({
            driversLicence: driversLicence && {
                details: [
                    { key: 'firstName', type: 'text', label: 'First Name', text: driversLicence?.identityDocument.firstName, required: true },
                    { key: 'middleName', type: 'text', label: 'Middle Name', text: driversLicence?.identityDocument.middleName, required: false },
                    { key: 'lastName', type: 'text', label: 'Last Name', text: driversLicence?.identityDocument.lastName, required: true },
                    { key: 'dateOfBirth', type: 'date', label: 'Date of Birth', text: driversLicence?.identityDocument.dateOfBirth, required: true },
                    { key: 'idNumber', type: 'text', label: 'Licence Number', text: driversLicence?.identityDocument.idNumber, required: true },
                    { key: 'dateOfExpiry', type: 'date', label: 'Date Of Expiry', text: driversLicence?.identityDocument.dateOfExpiry, required: true },
                    { key: 'licenceClass', type: 'text', label: 'Licence Class', text: driversLicence?.identityDocument.licenceClass, required: true },
                    { key: 'state', type: 'select', label: 'State', text: driversLicence?.identityDocument.state, list: STATE_LISTS, required: true },
                ],
                images: driversLicence?.images,
                security: getSecurityData(driversLicence?.security, VERIFICATION_DOCUMENT_TYPES.DRIVERS_LICENCES),
                documentType: VERIFICATION_DOCUMENT_TYPES.DRIVERS_LICENCES,
                hasFace: true,
            },
            passport: {
                details: passport && [
                    { key: 'firstName', type: 'text', label: 'First Name', text: passport?.identityDocument.firstName, required: true },
                    { key: 'middleName', type: 'text', label: 'Middle Name', text: passport?.identityDocument.middleName, required: false },
                    { key: 'lastName', type: 'text', label: 'Last Name', text: passport?.identityDocument.lastName, required: true },
                    { key: 'dateOfBirth', type: 'date', label: 'Date of Birth', text: passport?.identityDocument.dateOfBirth, required: true },
                    { key: 'gender', type: 'text', label: 'Gender', text: passport?.identityDocument.gender, required: true },
                    { key: 'idNumber', type: 'text', label: 'Passport Number', text: passport?.identityDocument.idNumber, required: true },
                    { key: 'dateOfExpiry', type: 'date', label: 'Date of Expiry', text: passport?.identityDocument.dateOfExpiry, required: true },
                    { key: 'issuingAuthority', type: 'text', label: 'Issuing Authority', text: passport?.identityDocument.issuingAuthority, required: true },
                    { key: 'nationality', type: 'text', label: 'Nationality', text: passport?.identityDocument.nationality, required: true },
                ],
                images: passport?.images,
                security: getSecurityData(passport?.security, VERIFICATION_DOCUMENT_TYPES.PASSPORT),
                documentType: VERIFICATION_DOCUMENT_TYPES.PASSPORT,
                hasFace: true,
            },
            medicareCard: {
                details: medicareCard && [
                    { key: 'idNumber', type: 'text', label: 'Medicare Number', text: medicareCard?.identityDocument.idNumber, required: false },
                    { key: 'individualReferenceNumber', type: 'number', label: 'IRN', text: medicareCard?.identityDocument.individualReferenceNumber, required: false },
                    { key: 'firstName', type: 'text', label: 'First Name', text: medicareCard?.identityDocument.firstName, required: false },
                    { key: 'middleName', type: 'text', label: 'Middle Name', text: medicareCard?.identityDocument.middleName, required: false },
                    { key: 'lastName', type: 'text', label: 'Last Name', text: medicareCard?.identityDocument.lastName, required: false },
                    { key: 'dateOfExpiry', type: 'date', label: 'Date of Expiry', text: medicareCard?.identityDocument.dateOfExpiry, required: false },
                    { key: 'cardType', type: 'text', label: 'Card Type', text: medicareCard?.identityDocument.cardType, required: false },
                ],
                images: medicareCard?.images,
                security: getSecurityData(medicareCard?.security, VERIFICATION_DOCUMENT_TYPES.MEDICARE_CARD),
                documentType: VERIFICATION_DOCUMENT_TYPES.MEDICARE_CARD,
                hasFace: false,
            },
            proofOfAgeCard: {
                details: proofOfAgeCard && [
                    { key: 'firstName', type: 'text', label: 'First Name', text: proofOfAgeCard?.identityDocument.firstName, required: true },
                    { key: 'middleName', type: 'text', label: 'Middle Name', text: proofOfAgeCard?.identityDocument.middleName, required: false },
                    { key: 'lastName', type: 'text', label: 'Last Name', text: proofOfAgeCard?.identityDocument.lastName, required: true },
                    { key: 'dateOfBirth', type: 'date', label: 'Date of Birth', text: proofOfAgeCard?.identityDocument.dateOfBirth, required: true },
                    { key: 'idNumber', type: 'text', label: 'Licence Number', text: proofOfAgeCard?.identityDocument.idNumber, required: true },
                    { key: 'dateOfExpiry', type: 'date', label: 'Date of Expiry', text: proofOfAgeCard?.identityDocument.dateOfExpiry, required: true },
                    { key: 'licenceClass', type: 'text', label: 'Licence Class', text: proofOfAgeCard?.identityDocument.licenceClass, required: true },
                    { key: 'country', type: 'text', label: 'Country', text: proofOfAgeCard?.identityDocument.country, required: false },
                    { key: 'state', type: 'select', label: 'State', text: proofOfAgeCard?.identityDocument.state, list: STATE_LISTS, required: true },
                ],
                images: proofOfAgeCard?.images,
                security: getSecurityData(proofOfAgeCard?.security, VERIFICATION_DOCUMENT_TYPES.PROOF_OF_AGE_CARD),
                documentType: VERIFICATION_DOCUMENT_TYPES.PROOF_OF_AGE_CARD,
                hasFace: false,
            }
        });

        // Set initial items for Document Data
        let initDocumentItems = VERIFICATION_DOCUMENT_ITEMS;
        initDocumentItems.forEach(item => { return { ...item, selected: false }; });
        setDocumentDataItems(initDocumentItems);
    }, [data]);

    useEffect(() => {
        // check if the save button is valid or not
        buttonCheckValidation();
    }, [documentData, selectedItem])

    const getSecurityData = (_securityData: IVerificationDetailSecurity | undefined, type: string) => {
        if (!_securityData) {
            return {};
        }

        let _security: IVerificationDetailSecurity = {
            documentAuthenticity: _securityData?.documentAuthenticity ?? DOCUMENT_AUTHENTICITY_CHECK.na,
            faceMatch: _securityData?.faceMatch ?? FACE_MATCH_CHECK.failed,
            expired: _securityData?.expired ?? EXPIRY_CHECK.na,
            nameMatch: _securityData?.nameMatch ?? NAME_MATCH_CHECK.na,
            dobMatch: _securityData?.dobMatch ?? DOB_MATCH_CHECK.na,
            // ePassportChip: _securityData?.ePassportChip ?? EPASSPORT_CHIP_CHECK.na,
            dvsCheck: _securityData?.dvsCheck ?? DVS_CHECK.failed,
        };

        if (type === VERIFICATION_DOCUMENT_TYPES.MEDICARE_CARD) {
            _security.irnMatch = _securityData?.irnMatch ?? IRN_CHECK.ok;
        }

        return checkSecurity(_security);
    };

    /**
     * Check input security data
     */
    const checkSecurity = (security: IVerificationDetailSecurity) => {
        let _security = {} as IVerificationDetailSecurity;

        Object.keys(security).forEach((key: string) => {
            const checkItem = VERIFICATION_SECURIRY_CHECKLIST[key].values.find((item: ICheckItem) => item.export === _.get(security, key));
            const lastCheckValue = VERIFICATION_SECURIRY_CHECKLIST[key].values.slice(-1)[0];

            if (checkItem != undefined) {
                _.set(_security, key, checkItem.value);
            } else {
                _.set(_security, key, lastCheckValue.value);
            }
        });

        return _security;
    }

    /**
     * Get security data from values
     */
    const getSecurityValue = (val: string, key: string) => {
        const checkItem = VERIFICATION_SECURIRY_CHECKLIST[key].values.find((item: ICheckItem) => item.value === val);

        return checkItem?.export;
    }

    /**
     * Handlers
     */
    const handleSelectItem = (key: string, label: string) => {
        setSelectedItem({ key, label });
    }

    const handleIdentityDataChange = (val: string, key: string) => {
        handleChange(val, documentData[selectedItem.key].documentType, `identityDocument.${key}`);
    }

    const handleSecurityDataChange = (val: string, key: string) => {
        handleChange(getSecurityValue(val, key), documentData[selectedItem.key].documentType, `security.${key}`);
    }

    const buttonCheckValidation = () => {
        let res = false;
        if (selectedItem) {
            const data = documentData[selectedItem.key];
            data && data.details && data.details.length > 0 && data.details.map((item: any) => {
                if (item.required === true &&
                    ((item.type === 'date' && (item.text === '' || !UtilService.isValidDate(item.text, DATE_FORMAT_MOMENT))) ||
                        (item.type !== 'date' && (item.text === '')))
                ) {
                    res = true;
                    return setValidBtn(res);
                }
            })
        }
        return setValidBtn(res);
    }

    /**
     * Selection Components for Document Data
     */
    const selectDocumentItems = documentDataItems?.map((item: IVerificationDocumentItem, index: number) => {
        return (
            documentData[item.key]?.details && <DocumentDataSelectItem
                key={index}
                itemKey={item.key}
                selected={item.key == selectedItem.key}
                label={item.label}
                icon={itemIcons[item.key]}
                className={classes.icons}
                handleClick={handleSelectItem}
            />
        )
    });

    return (
        <DocumentDataContainer>
            <DocumentDataWrapper>
                <Grid container className={classes.header}>
                    <ContentText className={classes.title}>IDENTITY DOCUMENTS</ContentText>
                    {editable && (isEdit ? (
                        <>
                            <Buttons>
                                <CustomButton label="CANCEL" variant="outlined" className={classes.cancelButton} onClick={handleCancel} />
                                <CustomButton label="SAVE" className={classes.saveButton} onClick={handleSave} disabled={validBtn} />
                            </Buttons>
                            {validBtn ? (
                                <MandatoryFieldText>Mandatory fields not complete</MandatoryFieldText>
                            ) : ''}
                        </>
                    ) : (
                            <Buttons>
                                <EditButton
                                    variant={"contained"}
                                    color="primary"
                                    className={classes.editButton}
                                    onClick={handleEdit}
                                >
                                    Edit
                                </EditButton>
                            </Buttons>
                        ))}
                </Grid>
                <ContentSelect>
                    <DocumentDataSelect>
                        {selectDocumentItems}
                    </DocumentDataSelect>
                    {selectedItem.key &&
                        <>
                            <ContentSelectedItem>
                                {itemIcons[selectedItem.key]}
                                <ContentText className="label">{selectedItem.label}</ContentText>
                            </ContentSelectedItem>
                            <ContentDetails
                                title="DETAILS"
                                data={documentData[selectedItem.key]?.details ?? []}
                                editable={isEdit}
                                className={classes.contentDetails}
                                onChange={handleIdentityDataChange}
                            />
                            <DocumentDataCapturedImages
                                data={documentData ? { ...documentData[selectedItem.key]?.images, faceImageUrl: faceImage } : {}}
                                hasFace={documentData[selectedItem.key]?.hasFace ?? false}
                            />
                        </>
                    }
                </ContentSelect>
                <VerificationSecurityCheck
                    roles={roles}
                    editable={isEdit}
                    security={documentData ? documentData[selectedItem.key]?.security : {}}
                    onChange={handleSecurityDataChange}
                />
            </DocumentDataWrapper>
        </DocumentDataContainer>
    )
}

VerifictionDetailDocumentData.defaultProps = {
    editable: false,
    roles: '',
    isEdit: false,
    handleChange: null,
    handleCancel: null,
    handleSave: null,
    handleEdit: null,
    data: [],
    faceImage: '',
}

export default VerifictionDetailDocumentData;