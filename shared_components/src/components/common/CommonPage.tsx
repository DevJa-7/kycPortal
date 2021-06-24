import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import {
    Grid,
    Card,
    CardHeader,
    Avatar,
    Divider
} from '@material-ui/core';

import {
    cardStyles,
} from '../../common/styles';

/**
 * IProps
 */
interface IProps {
    avatar: any,
    title?: string,
    children?: React.ReactNode,
    action?: any,
    className?: any,
}

/*
 * Styles
 */
const useStyles = makeStyles(() => ({
    root: {
        '& .MuiCardHeader-action': {
            textAlign: 'right',
        },
        '& .card-header-bottom': {
            '@media screen and (max-width: 600px)': {
                margin: '0 16px',
            }
        }
    },

    avatar: {
        backgroundColor: 'transparent',
        width: 36,
        height: 'auto',
        borderRadius: 0,

        '& svg': {
            width: '100%',
            height: '100%',
            fill: '#727272',
        },

        '@media screen and (max-width: 1280px)': {
            width: 26.3,
            height: 30,
        },
        '@media screen and (max-width: 900px)': {
            width: 26.3,
            height: 30,
        },
        '@media screen and (max-width: 600px)': {
            width: 20,
            height: 24,
        },
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
}));

/**
 * Main Component
 */
const CommonPage = ({
    avatar,
    title,
    children,
    action,
    className,
}: IProps) => {

    const classes = useStyles();
    const cardClasses = cardStyles();

    return (
        <Card className={clsx(classes.root, cardClasses.root, className)}>
            <CardHeader
                avatar={
                    <Avatar aria-label="recipe" className={classes.avatar}>
                        {avatar}
                    </Avatar>
                }
                action={action}
                title={title}
            />
            <Divider className="card-header-bottom" />
            <Grid container className="card-content">
                {children}
            </Grid>
        </Card>
    );
}

export default CommonPage;

CommonPage.defaultProps = {
    avatar: null,
    title: '',
    children: null,
    action: null,
    className: '',
}
