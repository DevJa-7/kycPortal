import React, { useState, useEffect } from 'react';
import {
    makeStyles,
} from '@material-ui/core/styles';
import styled from 'styled-components';

import {
    TEXT_COLOR,
    BORDER_COLOR
} from '../../common/styles';
import {
    ContentDetails,
} from '../common';
import { IVerificationDetail } from '../../service/models/verification';

/**
 * Props
 */
interface IProps {
    data: IVerificationDetail,
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
        width: '100%',
        marginBottom: 10,
    },

    item: {
        '&:nth-child(odd)': {
            paddingRight: 10,
        },

        '&:nth-child(even)': {
            paddingLeft: 10,
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
}));

/**
 * Styled Components
 */
const CustomerDataContainer = styled.div`
    display: flex;
    padding: 40px 30px 20px 90px;
    justify-content: center;

    @media screen and (max-width: 1200px) {
        padding-left: 30px;
    }

    @media screen and (max-width: 600px) {
        padding: 20px;
    }
`;

const CustomerDataWrapper = styled.div`
    display: flex;
    width: 100%;
    padding-bottom: 58px;
    border-bottom: 1px solid ${BORDER_COLOR.gray};

    @media screen and (max-width: 1280px) {
        padding-bottom: 35px;
    }
    
    @media screen and (max-width: 600px) {
        padding-bottom: 10px;
    }
`;

/**
 * Main Component
 */
const VerifictionDetailCustomerData = ({
    data
}: IProps) => {
    const classes = useStyles();
    const [customerData, setCustomerData] = useState([] as Array<any>);

    useEffect(() => {
        setCustomerData([
            { key: 'firstName', type: 'text', label: 'First Name', text: data.identityDocument?.firstName },
            { key: 'lastName', type: 'text', label: 'Last Name', text: data.identityDocument?.lastName },
            { key: 'dateOfBirth', type: 'date', label: 'Date of Birth', text: data.identityDocument?.dateOfBirth },
            // { key: 'addressLine1', type: 'text', label: 'Address line 1', text: data.identityDocument?.state },
            // { key: 'postCode', type: 'text', label: 'Post Code', text: data.identityDocument?.cardNumber },
            // { key: 'city', type: 'text', label: 'City', text: data.identityDocument?.state },
            // { key: 'subdivision', type: 'text', label: 'Subdivision', text: data.identityDocument?.nationality },
            { key: 'country', type: 'text', label: 'Country', text: data.identityDocument?.country },
        ])
    }, [data.identityDocument]);

    return (
        <CustomerDataContainer>
            <CustomerDataWrapper>
                <ContentDetails
                    title="CUSTOMER DATA"
                    data={customerData}
                    editable={false}
                />
            </CustomerDataWrapper>
        </CustomerDataContainer>
    )
}

export default VerifictionDetailCustomerData;