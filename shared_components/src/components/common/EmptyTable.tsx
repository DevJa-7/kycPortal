import React from 'react';
import clsx from 'clsx';
import {
    Theme,
    makeStyles,
} from '@material-ui/core/styles';
import styled from 'styled-components';

import {
    TEXT_COLOR,
} from '../../common/styles';
import {
    ContentImage, ContentText
} from './styledComponents';
import {
    WarningIcon
} from '../../common/icons';

/**
 * Styles 
 */
const useStyles = makeStyles((theme: Theme) => ({
    root: {
        width: 'fit-content',
        margin: theme.spacing(1),
        
        '@media screen and (max-width: 600px)': {
            margin: '0 !important',
            borderRadius: 10,
            backgroundColor: '#7676801f',
        },
    },

    icon: {
        width: 75,
        height: 64.308,
        fill: TEXT_COLOR.graylight,
        marginLeft: 'auto',
        marginRight: 'auto',

        '@media screen and (max-width: 1440px)': {
            width: 65,
            height: 55.7336,
        },

        '@media screen and (max-width: 1280px)': {
            width: 60,
            height: 51.4464,
        },

        '@media screen and (max-width: 600px)': {
            width: 58.9,
            height: 50.5,
        },
    },

    text: {
        fontSize: 20,
        fontWeight: 'bold',
        lineHeight: 1.75,
        letterSpacing: 0.24,
        color: TEXT_COLOR.graylight,

        '@media screen and (max-width: 1440px)': {
            fontSize: 16,
        },

        '@media screen and (max-width: 1280px)': {
            fontSize: 14,
        },
    }
}));

const EmptyTableContainer = styled.div`
    display: flex;
    padding: 10px;
    width: 100%;
    background: #fff;
`;

const EmptyTableWrapper = styled.div`
    display: flex;
    width: 100%;
    flex-flow: column;
    min-width: 218px;
    text-align: center;
`;

/* 
 * Main Component
 */
const EmptyTable = () => {
    const classes = useStyles();

    return (
        <EmptyTableContainer className={classes.root}>
            <EmptyTableWrapper>
                <WarningIcon className={classes.icon} />
                <ContentText className={classes.text}>No Records Found!</ContentText>
            </EmptyTableWrapper>
        </EmptyTableContainer>
    );
};

export default EmptyTable;