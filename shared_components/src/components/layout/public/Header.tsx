import React, { useMemo } from 'react';
import clsx from 'clsx';
import {
    Theme,
    makeStyles,
    CssBaseline,
} from '@material-ui/core';
import {
    Grid,
    AppBar,
    Divider,
    Toolbar,
    Typography,
} from '@material-ui/core';
import styled from 'styled-components';

import {
    TEXT_COLOR,
    BOX_SHADOW,
} from '../../../common/styles';
import {
    ContentImage,
} from '../../common';
import { getLogoFromConfiguration } from '../../../common/utils';

/**
 * Props
 */
interface IProps {
    isMobile: boolean,
}

/*
 * Styles
 */
const useStyles = makeStyles((theme: Theme) => ({
    toolbar: {
        backgroundColor: '#ffffff',
        color: TEXT_COLOR.placeholder,
        padding: '22px 20px',

        '@media screen and (max-width: 900px)': {
            padding: '22px 20px',
        },

        '@media screen and (max-width: 600px)': {
            padding: '42px 50px 7px 22px',
        },
    },

    appBar: (props: { isMobile: boolean }) => ({
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: (props.isMobile ? 0 : theme.transitions.duration.enteringScreen),
        }),

        '@media screen and (max-width: 600px)': {
            boxShadow: BOX_SHADOW.secondary,
        },
    }),

    appBarShift: (props: { isMobile: boolean }) => ({
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: (props.isMobile ? 0 : theme.transitions.duration.enteringScreen),
        }),

        
    }),

    openMenu: {
        marginRight: 10,
        padding: '10px 10px',

        '& .icon': {
            width: 23,
            height: 20,
            fill: TEXT_COLOR.placeholder,

            '@media screen and (max-width: 900px)': {
                width: 20.58,
                height: 18.85,
            },

            '@media screen and (max-width: 600px)': {
                width: 21.5,
                height: 15.1,
            }
        }
    },

    title: {
        flexGrow: 1,
        fontSize: 25,
        lineHeight: 1.68,
        fontWeight: 100,
        color: TEXT_COLOR.graydark,

        '@media screen and (max-width: 900px)': {
            fontSize: 22,
        },
    },

    logos: {
        display: 'flex',
        justifyContent: 'flex-end',
        color: TEXT_COLOR.graydark,
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

    notification: {
        marginRight: 20,

        '@media screen and (max-width: 900px)': {
            marginLeft: 'auto',
            marginRight: 7,
        },

        '& .MuiSvgIcon-root': {
            fontSize: 28,
            color: TEXT_COLOR.graylight,

            '@media screen and (max-width: 900px)': {
                fontSize: 26,
            },

            '@media screen and (max-width: 600px)': {
                fontSize: 23,
            },
        },

        '& .MuiBadge-anchorOriginTopRightRectangle': {
            transform: 'scale(1) translate(45%, -50%)',
            transformOrigin: '100% 0%',
            border: '1px solid #fff',
        },

        '& .badge': {
            '& .MuiBadge-badge': {
                color: '#FFFFFF',
                backgroundColor: '#FF0000',

                '@media screen and (max-width: 900px)': {
                    height: 15,
                    minWidth: 15,
                    padding: 0,
                    fontSize: 10,
                    lineHeight: '15px',
                },

                '@media screen and (max-width: 600px)': {
                    height: 12,
                    minWidth: 12,
                    fontSize: 8,
                    lineHeight: '12px',
                },
            },
        },
    },

    accountIcon: {
        width: 35,
        height: 35,
        cursor: 'pointer',

        '@media screen and (max-width: 900px)': {
            height: 30,
            width: 30,
        },

        '@media screen and (max-width: 600px)': {
            height: 25,
            width: 25,
        },
    },

    memuDivider: {
        height: 32,
        marginTop: 'auto',
        marginBottom: 'auto'
    },

    detailAccount: {
        '& .MuiButton-root, & span': {
            fontSize: 16,
            color: theme.palette.grey[900],
            textTransform: 'capitalize',

            '@media screen and (max-width: 900px)': {
                fontSize: 14,
            },
        },

        '& .icon': {
            color: TEXT_COLOR.graylight,
            fontSize: 25,
            marginLeft: 8
        }
    },

    bottomDivider: {
        boxShadow: BOX_SHADOW.secondary,
        background: '#ffffff',
        marginTop: -3,
        height: 3,
        width: '100%',
    }
}));

/**
 * Styled Components
 */
const HeaderContainer = styled.div`
  display: flex;
`;

const LogoContainer = styled.div``;

/**
 * Main Component
 */
const Header = ({
    isMobile,
}: IProps) => {

    const classes = useStyles({ isMobile });

    const logo = useMemo(() => {
        return getLogoFromConfiguration();
    }, []);

    return (
        <HeaderContainer>
            <CssBaseline />
            <AppBar position="fixed" className={clsx(classes.appBar, open && classes.appBarShift)} elevation={0}>
                <Toolbar className={classes.toolbar}>
                  
                    {!isMobile &&
                        <Typography component="span" variant="inherit" color="inherit" noWrap className={classes.title}>

                        </Typography>
                    }

                    {isMobile &&
                        <LogoContainer className={classes.logos}>
                            <Grid container className="logo" direction="column">
                                <ContentImage src={logo} alt="" className="image" />
                            </Grid>
                        </LogoContainer>
                    }

                </Toolbar>
                <Divider className={classes.bottomDivider} />
            </AppBar>
        </HeaderContainer>
    );
}

Header.defaultProps = {
    isMobile: false,
};

export default Header;
