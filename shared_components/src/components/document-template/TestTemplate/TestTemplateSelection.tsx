import React, {
    useState,
    useEffect,
} from 'react';
import {
    makeStyles,
    Theme
} from '@material-ui/core/styles';
import {
    Grid,
    TextField,
} from '@material-ui/core';

import {
    CustomSelect,
    CommonAutocomplete,
} from '../../../components';
import { ALL_DEFAULT_ITEM, IListType } from '../../../common/constants';
import { TEXT_COLOR } from '../../../common/styles';

/**
 * Constants
 */

/**
 * Props
 */
 interface IProps {
    className?: any,
    documentList: Array<any>,
    countryList: Array<any>,
    handleSelectedDocType: any,
    handleSelectedCountry: any,
    handleSelectedMaxCount: any,
}

/**
 * Styles
 */
const useStyles = makeStyles((theme: Theme) => ({
    root: {
        width: '100%',
        display: 'flex',
        padding: '60px 0',
        flexWrap: 'wrap',
        boxSizing: 'border-box',

        '@media screen and (max-width: 1280px)': {
            padding: '40px 0',
        },

        '@media screen and (max-width: 900px)': {
            padding: '20px 0',
        },

        '@media screen and (max-width: 600px)': {
            padding: '10px 0',
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
}));

/**
 * Styled Components
 */

/**
 * Main Components
 */
const TestTemplateSelection = ({
    className,
    documentList,
    countryList,
    handleSelectedDocType,
    handleSelectedCountry,
    handleSelectedMaxCount,
}: IProps) => {

    /**
     * Use Styles
     */
    const classes = useStyles();

    const [maxCount, setMaxCount] = useState(1);
    const [selectedDocType, setSelectedDocType] = useState<string>('');
    const [selectedCountry, setSelectedCountry] = useState<IListType | null>(null);

    const handleDocumeType = (e: any) => {
        setSelectedDocType(e.target.value);
        handleSelectedDocType(e.target.value);
    }

    const handleCountry = (event: object, value: IListType | null, reason: string) => {
        setSelectedCountry(value);
        handleSelectedCountry(value);
    }

    const handleMaxPage = (e: any) => {
        setMaxCount(e.target.value);
        handleSelectedMaxCount(e.target.value)
    }

    useEffect(() => {
        if (documentList && documentList.length > 0) {
            setSelectedDocType('all');
            handleSelectedDocType('all');
        }
        if (countryList && countryList.length > 0) {
            setSelectedCountry(ALL_DEFAULT_ITEM);
        }
    }, [documentList, countryList]);

    return (
        <Grid container className={`${classes.root} ${className}`}>
            <CustomSelect
                id="test-template-type"
                title="Document Type"
                selectList={documentList}
                value={selectedDocType}
                handleChange={handleDocumeType}
                className={classes.select}
            />
            <CommonAutocomplete
                id="test-template-country"
                className={classes.select}
                label="Country"
                options={countryList}
                getOptionLabel={(option: IListType) => option.display}
                getOptionSelected={(option: IListType, value: IListType) => option.display === value.display}
                onChange={handleCountry}
                value={selectedCountry || null}
            />
            <TextField
                id="test-template-max-page"
                onChange={handleMaxPage}
                type="number"
                name="template-document-search"
                label="Page Max Count"
                InputProps={{ inputProps: { min: 1 } }}
                className={`${classes.select} ${classes.templateName}`}
                value={maxCount}
            />
        </Grid>
    )
}

TestTemplateSelection.defaultProps = {
    className: '',
    documentList: [],
    countryList: [],
    handleSelectedDocType: null,
    handleSelectedCountry: null,
    handleSelectedMaxCount: null,
}

export default TestTemplateSelection;
