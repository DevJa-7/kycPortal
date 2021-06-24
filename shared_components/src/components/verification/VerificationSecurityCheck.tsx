import React from 'react';
import _ from 'lodash';
import {
    makeStyles,
} from '@material-ui/core/styles';
import {
    Grid
} from '@material-ui/core';
import styled from 'styled-components';

import {
    ContentText,
    StateCheckItem,
} from '../common';
import {
    ICheckList,
    ICheckItem,
    VERIFICATION_SECURIRY_CHECKLIST,
    AUTH_ROLE
} from '../../common/constants';
import { TEXT_COLOR } from '../../common/styles';
import { IRN_CHECK } from '../../service/models/verification';

/**
 * Props
 */
interface IProps {
    roles?: string,
    editable?: boolean,
    security: any,
    onChange?: any,
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
        marginBottom: 15,

        '@media screen and (max-width: 1280px)' : {
            fontSize: 20,
            marginBottom: 0,
        },

        '@media screen and (max-width: 600px)' : {
            fontSize: 16,
        },
    },

    imageItem: {
        marginTop: 20,
        marginBottom: 20,
    },

    noData: {
        width: '100%',
        textAlign: 'left',
        marginLeft: '0.5em',
        fontSize: '1.2em',
        color: TEXT_COLOR.graylight,
    }
}));

/**
 * Styled Components
 */
const VerificationSecurityCheckContainer = styled.div`
    display: flex;
    padding: 20px 0 20px 0;
    margin-top: 15px;
    justify-content: center;

    @media screen and (max-width: 1280px) {
        margin-top: 0;
    }
`;

const VerificationSecurityCheckWrapper = styled.div`
    display: flex;
    width: 100%;
    flex-flow: wrap;
`;

/**
 * Main Component
 */
const VerificationSecurityCheck = ({
    roles,
    editable,
    security,
    onChange,
}: IProps) => {
    const classes = useStyles();

    const getCheckList = (key: string): ICheckList => {
        return _.get(VERIFICATION_SECURIRY_CHECKLIST, key);
    };

    const getCheckItem = (value: string, checklist: ICheckList): ICheckItem | undefined => {
        const checkItem = checklist?.values.find(_checkItem => _checkItem.value === value);
        return checkItem;
    };

    const getIRNCheck = (value: string): boolean | false => {
        let res = false;
        if (!checkAdminRole() && value === IRN_CHECK.failed) {
            res = true;
        }
        return res;
    };

    const handleChange = (val: string, key: string) => {
        onChange(val, key);
    }

    const checkAdminRole = () => {
        return roles?.includes(AUTH_ROLE.admin);
    }

    const viewSecurityList = security && Object.keys(security).map((key: string, index: number) => {
        const checklist = getCheckList(key);
        const checkItem = getCheckItem(security[key], checklist);
        return (
            (key === 'irnMatch' && !checkAdminRole()) ? (
                getIRNCheck(security[key]) && (
                    <Grid container item md={3} sm={6} xs={12} key={index}>
                        <StateCheckItem
                            checklist={checklist?.values ?? []}
                            title={checklist?.label ?? ''}
                            value={checkItem}
                            editable={editable}
                            onChange={(val: string) => handleChange(val, key)}
                        />
                    </Grid>
                )
            ): (
                <Grid container item md={3} sm={6} xs={12} key={index}>
                    <StateCheckItem
                        checklist={checklist?.values ?? []}
                        title={checklist?.label ?? ''}
                        value={checkItem}
                        editable={editable}
                        onChange={(val: string) => handleChange(val, key)}
                    />
                </Grid>
            )
        );
    });

    return (
        <VerificationSecurityCheckContainer >
            <VerificationSecurityCheckWrapper>
                {(security) && <ContentText className={classes.title}>SECURITY CHECKS</ContentText>}
                <Grid container>
                    {viewSecurityList}
                    {(security && Object.getOwnPropertyNames(security).length == 0) &&
                        <ContentText className={classes.noData}>No Any Data</ContentText>
                    }
                </Grid>
            </VerificationSecurityCheckWrapper>
        </VerificationSecurityCheckContainer>
    );
}

VerificationSecurityCheck.defaultProps = {
    roles: '',
    editable: false,
    security: undefined,
    onChange: null,
}

export default VerificationSecurityCheck;