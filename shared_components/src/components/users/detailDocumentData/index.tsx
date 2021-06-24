import React, { useState, useEffect, useMemo, ChangeEvent } from 'react';
import {
    Grid,
    TextField
} from '@material-ui/core';
import {
    makeStyles,
    withStyles,
    Theme,
} from '@material-ui/core/styles';
import Autocomplete, { AutocompleteChangeReason } from '@material-ui/lab/Autocomplete';
import styled from 'styled-components';
import _ from 'lodash';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';

import {
    TEXT_COLOR,
} from '../../../common/styles';
import {
    ContentText,
    ContentDetails,
} from '../../common';

import {
    IUsersDocument,
} from '../../../service/models/user';

/**
 * Props
 */
interface IProps {
    editable?: boolean,
    data?: IUsersDocument,
    handleChange?: any,
    handlePhoneChange?: any,
    validationErrors?: any,
    roles?: any,
}

/**
 * Styles
 */
const useStyles = makeStyles(() => ({
    contentData: {
        margin: '0 !important'
    },
    title: {
        fontFamily: 'Roboto',
        fontSize: 26,
        lineHeight: 1.31,
        fontWeight: 'bold',
        width: '100%',
        marginBottom: 10,

        '@media screen and (max-width: 900px)': {
            fontSize: 20,
        },

        '@media screen and (max-width: 600px)': {
            fontSize: 16,
        },
    },
    tenantSelect: {
        width: '98%',
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
        }
    },

    icons: {
        margin: '20px 0 20px 0',

        '@media screen and (max-width: 600px)': {
            margin: '10px 0 10px 0',
        },

        '&:not(last-child)': {
            marginRight: 36,

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
    margin: {
        marginBottom: 30,
        '@media screen and (max-width: 1280px)': {
            marginBottom: 25,
        },
        '@media screen and (max-width: 600px)': {
            marginBottom: 20,
        }
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

const DocumentDataContainer = styled.div`
    display: flex;
    padding: 43px 30px 20px 30px;
    justify-content: center;

    @media screen and (max-width: 600px) {
        padding: 20px;
    }
`;

const DocumentDataWrapper = styled.div`
    display: flex;
    width: 100%;
    max-width: 1310px;
    flex-flow: column;
`;

const ContentSelect = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 100%;

`;


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
const UserDetailDocumentData = ({
    editable,
    data,
    handleChange,
    handlePhoneChange,
    validationErrors,
    roles
}: IProps) => {
    const classes = useStyles();

    const [documentData, setDocumentData] = useState({} as any);
    const [selectedRoles, setSelectedRoles] = useState<Array<any>>([]);

    const optionRoles = useMemo(() => {
        if (!roles || roles.length === 0 || !data || !data.roles) {
            return [];
        }

        const visibleRoles = roles.filter(role => role.visible);

        const _optionRoles  = visibleRoles?.map(role => {
            return {
                title: role?.displayName || '',
                role,
            }
        }) || [];

        if (_optionRoles?.length > 0) {
            const _initOptions = _optionRoles.filter(role => {
                return data.roles.find(roleName => roleName === role.role.name);
            });

            setSelectedRoles(_initOptions);
        }

        return _optionRoles;
    }, [roles, data]);

    /**
     * Initialize when data is changed
     */
    useEffect(() => {
        setDocumentData({
            data: data
        })
    }, [data]);

    /**
     * Handlers
     */
    const handleUserDataChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        handleChange((event.target as HTMLInputElement).value, event.target.name);
    }

    const handleChangeRoles = (event: ChangeEvent<{}>, value: any[], reason: AutocompleteChangeReason) => {
        const roleNames = value?.map(role => role?.role?.name);
        handleChange(roleNames, 'roles');
        setSelectedRoles(value);
    }

    return (
        <DocumentDataContainer>
            <DocumentDataWrapper>
                <ContentText className={classes.title}>USER DATA</ContentText>
                <ContentSelect>
                    <Grid container spacing={10} className={classes.contentData}>
                        <Grid item sm={12} md={6}>
                            <NewUserTextField
                                id="user-first-name"
                                type="text"
                                label="First Name"
                                disabled={!editable}
                                name="givenName"
                                value={documentData?.data?.givenName || ""}
                                autoFocus
                                onChange ={handleUserDataChange}
                                className={classes.margin}
                                required
                                inputProps={{ maxLength: "30", minLength: "1", pattern: "[a-zA-Z]*", title: "Enter Valid First Name" }}
                                helperText={validationErrors.givenName ? "Please Enter only Alphabetics" : ""}
                                error={validationErrors.givenName}
                            />
                        </Grid>
                        <Grid item sm={12} md={6}>
                            <NewUserTextField
                                id="user-last-name"
                                type="text"
                                label="Last Name"
                                disabled={!editable}
                                name="familyName"
                                required
                                onChange={handleUserDataChange}
                                value={documentData?.data?.familyName || ""}
                                className={classes.margin}
                                inputProps={{ maxLength: "30", minLength: "1", pattern: "[a-zA-Z]*", title: "Enter Valid Last Name" }}
                                helperText={validationErrors.familyName ? "Please Enter only Alphabetics" : ""}
                                error={validationErrors.familyName}
                            />
                        </Grid>
                        <Grid item sm={12} md={6}>
                        {/* <NewUserTextField
                                id="user-phoneNumber"
                                type="text"
                                label="Mobile"
                                name="phoneNumber"
                                disabled={!editable}
                                value={documentData?.data?.phoneNumber || ""}
                                className={classes.margin}
                                required
                                onChange ={handleUserDataChange}
                                inputProps={{ maxLength: "12", minLength: "10", pattern: "[+]{1}[0-9]{2}[0-9]{9}", title: "Enter Valid phoneNumber number starts with +61" }}
                                placeholder="Mobile number starts with '+' and country code"
                                helperText={validationErrors.phoneNumber ? "Enter Valid Mobile number starts with + country code " : ""}
                                error={validationErrors.phoneNumber}
                            /> */}
                            <PhoneInput
                                placeholder='Mobile number starts with country code'
                                defaultCountry="AU"
                                id="user-phoneNumber"
                                disabled={!editable}
                                value={documentData?.data?.phoneNumber}
                                onChange={handlePhoneChange}
                                inputComponent={React.forwardRef(phoneInput)}
                                helperText={validationErrors.phoneNumber ? "Enter Valid Mobile number starts with + country code " : ""}
                                error={validationErrors.phoneNumber}
                            />
                        </Grid>
                        <Grid item sm={12} md={6}>
                            {/* <CustomSelect
                                id="user-types"
                                title="Type"
                                name="userType"
                                disabled={!editable}
                                selectList={USERS_CREATE_TYPES}
                                handleChange={handleUserDataChange}
                                value={documentData?.data?.userType}
                                className={classes.tenantSelect}
                            /> */}
                            <Autocomplete
                                multiple
                                id="user-detail-role-select"
                                options={optionRoles}
                                getOptionLabel={(option) => option.title}
                                getOptionSelected={(option, value) => option.title === value.title}
                                defaultValue={optionRoles?.length > 0 ? [optionRoles[0]] : []}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        variant="standard"
                                        label="Roles"
                                        placeholder="Roles"
                                    />
                                )}
                                value={selectedRoles ? selectedRoles : []}
                                onChange={handleChangeRoles}
                                className={classes.tenantSelect}
                                disabled={!editable}
                            />
                        </Grid>
                    </Grid>
                </ContentSelect>
            </DocumentDataWrapper>
        </DocumentDataContainer>
    )
}

UserDetailDocumentData.defaultProps = {
    editable: false,
    handleChange: null,
    handlePhoneChange: null,
    data: [],
    validationErrors: null,
    roles: null,
}

export default UserDetailDocumentData;
