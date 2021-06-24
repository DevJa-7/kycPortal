import React from 'react';
import styled from 'styled-components';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

import {
    ContentText,
    CustomButton,
} from '../common';
import CommonModal from '../common/CommonModal';

/**
 * Props
 */
interface IProps {
    open: boolean,
    onClose: any,
    handleNotification?: any,
}

/**
 * Styles
 */
const useStyles = makeStyles((theme: Theme) => ({
    root: {
        '& .MuiPaper-root': {
            maxWidth: 539,
            boxSizing: 'border-box',
        },
    },
    content: {
        width: '100%',
        fontSize: 16,
        lineHeight: 1.63,
        color: theme.palette.grey[900],

        '@media screen and (max-width: 600px)': {
            marginTop: 30,
            fontSize: 17,
            lineHeight: 1.4,
        },
    },

    or: {
        marginTop: 15,
        marginBottom: 9,
        textAlign: 'center',
    },

    buttons: {
        justifyContent: 'center',
    },

    changeButton: {
        width: '60%',
        marginRight: 'auto',
        marginLeft: 'auto',
        minWidth: 185,
        fontSize: 16,
        lineHeight: 1.19,
        padding: 15,

        '@media screen and (max-width: 128px)': {
            padding: 16,
        },

        '@media screen and (max-width: 900px)': {
            width: '100%',
            maxWidth: '100%',
            fontSize: 14,
            padding: 17,
        },
        '@media screen and (max-width: 600px)': {
            padding: 12,
        },
    }
}));

/**
 * Main Component
 */
const ForgotPasswordNotification = ({
    open,
    onClose,
    handleNotification,
}: IProps) => {
    const classes = useStyles();

    const onNitification = () => {
        handleNotification();
    }
    return (
        <CommonModal
            open={open}
            onClose={onClose}
            className={classes.root}
            title={
                <ContentText>Alert</ContentText>
            }
            contents={
                <NotificationContent>
                    <ContentText className={classes.content}>
                        You have entered the wrong password too many times.
                        Please wait 15 minutes before trying again.
                    </ContentText>
                    <ContentText className={classes.or}>
                        or
                    </ContentText>
                    <ContentText className={classes.content}>
                        You can also re-set your password by clicking here.
                    </ContentText>
                </NotificationContent>
            }
            actions={
                <Grid container className={classes.buttons}>
                    <CustomButton label="FORGOT PASSWORD" className={classes.changeButton} onClick={onNitification} />
                </Grid>
            }
        />
    );
}

ForgotPasswordNotification.defaultProps = {
    open: false,
    onClose: null,
    handleNotification: null,
}

export default ForgotPasswordNotification;

const NotificationContent = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    
    padding: 28px 0 44px 0;  
`;
