import React from 'react';
import {
    Grid,
    Card,
    CardHeader,
    Button,
    Avatar,
    Divider,
    IconButton,
} from '@material-ui/core';
import { 
    makeStyles,
    Theme,
} from '@material-ui/core/styles';
import styled from 'styled-components';

import {
    CustomButton,
    ContentImage,
    ContentText,
} from '../common';
import { TEXT_COLOR } from '../../common/styles';
import { verificationDetail } from './dummy';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

/**
 * Props
 */
interface IProps {
    handleReturn: () => void,
    isEditable: boolean,
}

/*
 * Styles
*/
const useStyles = makeStyles((theme: Theme) => ({
    root: {
        padding: '54px 27px 40px 27px',
        backgroundColor: '#ffffff',
        boxShadow: '0 3px 16px 0 rgba(0, 0, 0, 0.16)',

        '& > .MuiCardHeader-root': {
            padding: 0,
            marginBottom: 41,
        },

        '& .MuiCardHeader-title': {
            fontSize: 24,
            lineHeight: '34px',
            color: theme.palette.grey[900],
        },

        '& .MuiCardHeader-avatar': {
            marginRight: 12,
        },

        '& .MuiCardHeader-action': {
            margin: 0
        }
    },

    avatar: {
        backgroundColor: 'transparent',
        width: 'fit-content',
        height: 'fit-content',
        paddingLeft: 12,
    },

    item: {
        marginBottom: 28,

        '& .name': {
            fontSize: 14,
            lineHeight: 1.3125,
            color: TEXT_COLOR.graylight,
            marginBottom: 4
        },

        '& .value': {
            fontSize: 16,
            lineHeight: 1.5,
            color: theme.palette.grey[900],
        }
    },

    content: {
        padding: '32px 35px 20px 35px',
        flexWrap: 'nowrap'
    },

    detail: {
        marginBottom: '4px !important',

        '& > .MuiCardHeader-root': {
            padding: 0,
        },

        '& .MuiAvatar-root': {
            width: 80,
            height: 80
        },

        '& .MuiCardHeader-title': {
            fontSize: 20,
            lineHeight: 1.3,
            color: theme.palette.grey[900]
        },

        '& .MuiCardHeader-subheader': {
            fontSize: 18,
            lineHeight: 1.333333,
            color: theme.palette.grey[900]
        },
    },

    values: {
        '&> .title': {
            marginBottom: 35,
            marginTop: 35,
            fontSize: 26,
            lineHeight: 1.3077,
            color: theme.palette.grey[900]
        }
    },

    rightValues: {
        paddingLeft: 22.5,
    },

    submitButton: {
        padding: '23px 71px',
        fontSize: 18,
        lineHeight: 1.2,
        borderRadius: 0,
        marginRight: 'auto',
        marginLeft: 'auto',
    }
}));

/**
 * Styled Components
 */
const Buttons = styled.div`
    margin-right: 0;
    margin-left: auto;
`;

/**
 * Main Component
 */
const VerificationDetailPage = ({
    handleReturn,
    isEditable,
}: IProps) => {
    
    const classes = useStyles();

    const ViewItem = (props: { name: string, value: string }) => {
        return (
            <Grid container className={classes.item} direction="column">
                <ContentText className="name">{props.name}</ContentText>
                <ContentText className="value">{props.value}</ContentText>
            </Grid>
        )
    }

    const handleSave = () => {
        console.log('verification save');
    }

    return (
        <Card className={classes.root}>
            <CardHeader
                avatar={
                    <Avatar aria-label="recipe" className={classes.avatar}>
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="open detail"
                            aria-haspopup="true"
                            onClick={handleReturn}
                        >
                            <ArrowBackIcon />
                        </IconButton>
                        <Buttons>
                            {isEditable ? (
                                <CustomButton label="CANCEL" className="" onClick={handleReturn} />
                            ) : (
                                <CustomButton label="CANCEL" className="" onClick={handleSave} />
                            )}
                        </Buttons>
                    </Avatar>
                }
                title="KYC Verification Details"
            />
            <Divider />
            <Grid container direction="row" className={classes.content}>
                <Grid container item md={9}>
                    <Card elevation={0} className={classes.detail}>
                        <CardHeader
                            avatar={
                                <Avatar aria-label="recipe">
                                    <ContentImage src={''} alt="" />
                                </Avatar>
                            }
                            title="Shyanne.Mosciski28@yahoo.com"
                            subheader="Customer Ref-"
                        />
                        <Grid container className={classes.values}>
                            <ContentText className="title">Custom Data</ContentText>
                            <ViewItem name="First Name" value={verificationDetail.firstName}></ViewItem>
                            <ViewItem name="Last Name" value={verificationDetail.lastName}></ViewItem>
                            <ViewItem name="Date of Birth" value={verificationDetail.dateOfBirth}></ViewItem>
                            <ViewItem name="Country" value={verificationDetail.country}></ViewItem>
                        </Grid>
                    </Card>
                </Grid>
                <Divider orientation="vertical" flexItem />
                <Grid container item md={3} className={classes.rightValues} direction="column">
                    <ViewItem name="Verification Result" value={verificationDetail.verificationStatus}></ViewItem>
                    <ViewItem name="Reason of Rejection" value={verificationDetail.reasonForRejection}></ViewItem>
                </Grid>
            </Grid>
            <Grid container>
                <CustomButton label="RE-OPEN VERIFICATION" className={classes.submitButton} onClick={handleReturn} />
            </Grid>
        </Card>
    );
}

VerificationDetailPage.defaultProps = {
    handleReturn: null,
    isEditable: false,
}

export default VerificationDetailPage;
