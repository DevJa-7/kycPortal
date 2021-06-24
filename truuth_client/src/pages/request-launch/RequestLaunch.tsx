import React, {
    useEffect,
    useState,
    useMemo
} from 'react';
import {
    useDispatch
} from 'react-redux';
import {
    makeStyles,
    Theme
} from '@material-ui/core/styles';
import {
    HEADER_HEIGHT,
    BOX_SHADOW,
    TEXT_COLOR,
} from 'shared_components/src/common/styles';
import Footer from 'shared_components/src/components/layout/Footer';
import Header from 'shared_components/src/components/layout/public/Header';
import styled from 'styled-components';
import { Grid, Card, CardContent } from '@material-ui/core';
import { useLocation } from "react-router-dom";
import KycApiService from '../../service/kycApi.service';
import {
    setLoading,
    clearLoading,
} from '../../store/common/actions';
const QRCode = require('qrcode.react');

/**
 * Props
 */


/**
 * Styles
 */
const useStyles = makeStyles((theme: Theme) => ({
    informationSection: {
        backgroundColor: '#fafafa'
    },

    title: {
        color: '#9c0de2',
        fontSize: "24px",
        fontWeight: 'bold',
        textAlign: 'left'
    },
    textPara: {
        textAlign: 'left',
    },
    textQR: {
        fontSize: '16px',
        '@media screen and (max-width: 960px)': {
            textAlign: 'center',
            fontSize: '12px'
        },
        '@media screen and (max-width: 600px)': {
            textAlign: 'center',
            fontSize: '12px'
        },
    },
    infoList: {
        margin: "45px 0 45px 0",
        padding: "0",
    },
    orgTitle: {
        textTransform: 'uppercase'
    },
    requestSection: {
        margin: '0 auto',
        borderLeft: 'solid 11px #9c0de2',
        borderRadius: '16px',
        width: '60%',
        boxShadow: '0 3px 6px 0 rgba(0,0,0,0.16)'
    },
    appBarSpacer: {
        height: HEADER_HEIGHT[0],
        ...theme.mixins.toolbar,

        '@media screen and (max-width: 900px)': {
            marginLeft: 'auto',
            height: HEADER_HEIGHT[1],
        },

        '@media screen and (max-width: 600px)': {
            marginLeft: 'auto',
            height: HEADER_HEIGHT[2],
        },
    },
    logos: {
        display: 'flex',
        justifyContent: 'flex-end',
        color: TEXT_COLOR.graydark,
        marginLeft: 'auto',
        marginRight: 'auto',

        '& .logo': {
            justifyContent: 'center',
            alignItems: 'center',

            '& .image': {
                width: '100%',
                maxWidth: 98,
                objectFit: 'content',
            },

            '& label': {
                marginTop: 2,
                color: theme.palette.grey[900],
                fontSize: 10,
                lineHeight: 1.4,
                textAlign: 'center'
            },

            '& .content': {
                textAlign: 'center',
            },
        },
    },
    qrCode: {
        width: 190,

        '@media screen and (max-width: 960px)': {
            display: 'flex',
            margin: 'auto !important',
            width: 160,
        },

        '@media screen and (max-width: 600px)': {
            display: 'flex',
            margin: 'auto !important',
            width: 160,
        },
    }
}));

/**
 * Styled Components
 */
const LayoutContainer = styled.div`
display: flex;
flex-wrap: wrap;
overflow: auto;

@media screen and (max-width: 600px) {
    min-height: 100vh;
}
`;

const LayoutWrapper = styled.div`
display: flex;
flex-wrap: nowrap;
width: 100%;
min-height: 100vh;
min-width: 200px;
`;

const MainContainer = styled.div`
height: 100%;
width: 100%;
overflow: auto;
`;

const MainContainerSpacer = styled.div``;

const MainWrapper = styled.div`
overflow-y: auto;
    
max-height: calc(100vh - ${HEADER_HEIGHT[0]});
height: calc(100% - ${HEADER_HEIGHT[0]});
padding: 0;

@media screen and (max-width: 900px) {
    height: calc(100% - ${HEADER_HEIGHT[1]});
    max-height: calc(100vh - ${HEADER_HEIGHT[1]});
}

@media screen and (max-width: 600px) {
    height: calc(100% - ${HEADER_HEIGHT[2]});
    max-height: calc(100vh - ${HEADER_HEIGHT[2]});
    box-shadow: none;
}
`;

const MainContent = styled.div`
padding: 20px;
box-shadow: inset ${BOX_SHADOW.secondary};
min-height: calc(100% - 60px);

@media screen and (max-width: 1440px) {
    min-height: calc(100% - 60px);
}

@media screen and (max-width: 1280px) {
    min-height: calc(100% - 50px);
}

@media screen and (max-width: 600px) {
    padding: 0;
    min-height: calc(100% - 50px);
}
`;


/**
 * Main Component
 */
const RequestLaunch = () => {

    const classes = useStyles();
    const dispatch = useDispatch();
    const v = new URLSearchParams(useLocation().search);
    const vId = v.get("verification");
    const tName = v.get("tenantname");
    const [deeplinkUrl, setDeepLink] = useState('');

    /**
     * Deeplink build
    */
    useEffect(() => {
        getVerificationData();
    }, [vId, tName]);

    const getVerificationData = () => {
        if (vId && tName) {
            dispatch(setLoading());
            KycApiService.getDeepLink(vId, tName)
                .then((res: any) => {
                    if (res?.deepLinkUrl) {
                        setDeepLink(res?.deepLinkUrl);
                    }
                    dispatch(clearLoading());
                })
                .catch((err: any) => {
                    dispatch(clearLoading());
                });
        }
    }

    return (
        <LayoutContainer>
            <Header
                isMobile={true}
            />
            <LayoutWrapper>

                <MainContainer>
                    <MainContainerSpacer className={classes.appBarSpacer} />
                    <MainWrapper>
                        <MainContent>
                            <Card className={classes.requestSection}>
                                <CardContent>
                                    <Grid container spacing={10} >
                                        <Grid item className={classes.informationSection} xs={12} md={6} lg={8}>
                                            <p className={classes.title}>Identity Verification Request</p>
                                            <p className={classes.textPara}>
                                                <span className={classes.orgTitle}>{tName || ''}</span> has sent a request for you to verify your identity but it looks like
                                                you’re not on your phone.
                                                </p>
                                            <div className={classes.infoList}>
                                                <ol style={{ textAlign: "left", paddingLeft: '15px' }}>
                                                    <li>Open your Phone Camera</li>
                                                    <li>Scan the QR Code</li>
                                                </ol>
                                            </div>
                                            <div>
                                                <p className={classes.textPara}>
                                                    For more information please visit <a href="https://www.truuth.id/faq" target="_blank">https://www.truuth.id/faq</a>
                                                </p>
                                            </div>
                                        </Grid>
                                        { deeplinkUrl && <Grid item xs={12} md={6} lg={4}>
                                            <QRCode
                                                size={180}
                                                bgColor={"#ffffff"}
                                                fgColor={"#000000"}
                                                level={"L"}
                                                value={deeplinkUrl}
                                                renderAs={"svg"}
                                                style={{ marginTop: "25px", marginRight: "20px" }}
                                                className={classes.qrCode}
                                            />
                                            <p className={classes.textQR}>Scan QR Code to Start process</p>
                                        </Grid> }
                                    </Grid>
                                </CardContent>
                            </Card>
                        </MainContent>
                        <Footer />
                    </MainWrapper>

                </MainContainer>
            </LayoutWrapper>
        </LayoutContainer>

    )
}

export default RequestLaunch;