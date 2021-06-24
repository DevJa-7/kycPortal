import React, { useState, useEffect, useMemo } from 'react';
import clsx from 'clsx';
import {
    Theme,
    makeStyles,
    CssBaseline,
} from '@material-ui/core';
import {
    Box,
    Grid,
    List,
    AppBar,
    Avatar,
    Button,
    Divider,
    Popover,
    Toolbar,
    ListItem,
    Typography,
    IconButton,
    ListItemText,
    ListItemIcon,
} from '@material-ui/core';
import styled from 'styled-components';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';

import {
    TEXT_COLOR,
    SIDEBAR_WIDTH,
    BOX_SHADOW,
} from '../../common/styles';
import {
    ContentText,
    ContentImage,
} from '../common';
import { MenuIcon } from '../../common/icons';
import { GENERAL_COOKIES } from '../../common/constants';
import { getCookie } from '../../service/common.service';
import { getLogoFromConfiguration } from '../../common/utils';

/**
 * Props
 */
interface IProps {
    email?: string,
    open: boolean,
    isMobile: boolean,
    handleSignOut: any,
    handleDrawerToggle: any,
}

/*
 * Styles
 */
const useStyles = makeStyles((theme: Theme) => ({
    toolbar: {
        backgroundColor: '#ffffff',
        color: TEXT_COLOR.placeholder,
        padding: '15px 20px',

        '@media screen and (max-width: 900px)': {
            padding: '15px 20px',
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
        backgroundColor: '#FFFFFF',

        '@media screen and (max-width: 600px)': {
            boxShadow: BOX_SHADOW.secondary,
        },
    }),

    appBarShift: (props: { isMobile: boolean }) => ({
        marginLeft: SIDEBAR_WIDTH[0],
        width: `calc(100% - ${SIDEBAR_WIDTH[0]})`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: (props.isMobile ? 0 : theme.transitions.duration.enteringScreen),
        }),

        '@media screen and (max-width: 900px)': {
            marginLeft: SIDEBAR_WIDTH[1],
            width: `calc(100% - ${SIDEBAR_WIDTH[1]})`,
        },
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
    open,
    email,
    isMobile,
    handleSignOut,
    handleDrawerToggle,
}: IProps) => {

    const classes = useStyles({ isMobile });
    const [userName, setUserName] = useState('');

    useEffect(() => {
        const firstName = getCookie(GENERAL_COOKIES.userFirstName);
        const lastName = getCookie(GENERAL_COOKIES.userLastName);
        const _userName = (firstName || lastName) ? ((firstName || '') + ' ' + (lastName || '')) : '-'
        setUserName(_userName);
    }, []);

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const onClickNavMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const onCloseNavMenu = () => {
        setAnchorEl(null);
    };

    const logoUrl = useMemo(() => {
        return getLogoFromConfiguration();
    }, []);

    return (
        <HeaderContainer>
            <CssBaseline />
            <AppBar position="fixed" className={clsx(classes.appBar, open && classes.appBarShift)} elevation={0}>
                <Toolbar className={classes.toolbar}>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerToggle}
                        className={classes.openMenu}
                    >
                        <MenuIcon className="icon" />
                    </IconButton>

                    {!isMobile &&
                        <Typography component="span" variant="inherit" color="inherit" noWrap className={classes.title}>

                        </Typography>
                    }

                    {isMobile &&
                        <LogoContainer className={classes.logos}>
                            <Grid container className="logo" direction="column">
                                <ContentImage src={logoUrl} alt="" className="image" />
                            </Grid>
                        </LogoContainer>
                    }

                    {/* <IconButton color="inherit" className={classes.notification}>
                        <Badge badgeContent={''} className="badge">
                            <NotificationsSharpIcon />
                        </Badge>
                    </IconButton> */}

                    {/* {!isMobile && <Divider orientation="vertical" flexItem className={classes.memuDivider} />} */}

                    {!isMobile &&
                        <Box component='div' className={classes.detailAccount}>
                            <Button
                                id="account-menu"
                                aria-controls={open ? 'menu-list-grow' : undefined}
                                aria-haspopup="true"
                                onClick={onClickNavMenu}
                            >
                                {userName}
                                {!anchorEl && <ExpandMoreIcon className="icon" />}
                                {anchorEl && <ExpandLessIcon className="icon" />}
                            </Button>

                            <Popover
                                open={Boolean(anchorEl)}
                                anchorEl={anchorEl}
                                onClose={onCloseNavMenu}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'right',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                className="staet"
                            >
                                <List component="nav" aria-label="main mailbox folders">
                                    <ListItem>
                                        <ListItemText primary={userName} secondary={email} />
                                    </ListItem>
                                    <Divider />

                                    {/* <ListItem button>
                                        <ListItemIcon>
                                            <PermIdentityIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Account Settings" />
                                    </ListItem>
                                    <Divider /> */}

                                    <ListItem button onClick={() => handleSignOut()}>
                                        <ListItemIcon>
                                            <ExitToAppIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Sign Out" />
                                    </ListItem>
                                </List>
                            </Popover>
                        </Box>
                    }

                    {/* <Avatar alt="Photo" className={classes.accountIcon} onClick={handleSignOut}>{userName.slice(0, 1)}</Avatar> */}
                </Toolbar>
                <Divider className={classes.bottomDivider} />
            </AppBar>
        </HeaderContainer>
    );
}

Header.defaultProps = {
    email: "",
    open: true,
    isMobile: false,
    handleSignOut: null,
    handleDrawerToggle: null,
};

export default Header;
