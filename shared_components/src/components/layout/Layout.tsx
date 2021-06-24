import React, { useState, useEffect } from 'react';
import { 
    makeStyles, 
    Theme 
} from '@material-ui/core/styles';
import styled from 'styled-components';

import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';

import {
    HEADER_HEIGHT,
    MIDDLE_WIDTH,
    BOX_SHADOW,
} from '../../common/styles';
import { getIsMobile } from '../../common/utils';

/**
 * Props
 */
interface IProps {
    menu: string,
    role: string,
    email?: string,
    children?: any,
    handleSignOut?: any,
}

/**
 * Styles
 */
const useStyles = makeStyles((theme: Theme) => ({

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
const Layout = ({
    menu,
    role,
    email,
    children,
    handleSignOut,
}: IProps) => {

    const classes = useStyles();

    const windowWidth = window.screen.width;

    const [sidebarOpen, setSidebarOpen] = useState(windowWidth <= MIDDLE_WIDTH ? false : true);
    const [isMobile, setIsMobile] = useState(getIsMobile());
    const [oldWidth, setOldWidth] = useState(window.screen.width);

    const handleDrawerToggle = () => {
        setSidebarOpen(!sidebarOpen);
    };

    useEffect(() => {
        window.addEventListener('resize', () => {
            const windowWidth = window.screen.width;
            setIsMobile(getIsMobile());
            if (windowWidth <= MIDDLE_WIDTH) {
                if (oldWidth > MIDDLE_WIDTH) {
                    setSidebarOpen(false);
                }
            } else {
                if (oldWidth <= MIDDLE_WIDTH) {
                    setSidebarOpen(true);
                }
            }
            setOldWidth(windowWidth);
        });
    }, [oldWidth]);

    return (
        <LayoutContainer>
            <Header 
                email={email}
                open={sidebarOpen} 
                isMobile={isMobile} 
                handleDrawerToggle={handleDrawerToggle} 
                handleSignOut={handleSignOut}
            />
            <LayoutWrapper>
                <Sidebar 
                    open={sidebarOpen} 
                    isMobile={isMobile} 
                    handleDrawerToggle={handleDrawerToggle}
                    handleSignOut={handleSignOut} 
                    menu={menu}
                    role={role}
                />
                <MainContainer>
                    <MainContainerSpacer className={classes.appBarSpacer} />
                    {(!isMobile || !sidebarOpen) &&
                        <MainWrapper>
                            <MainContent>{children}</MainContent>
                            <Footer isMobile={isMobile}/>
                        </MainWrapper>
                    }
                </MainContainer>
            </LayoutWrapper>
        </LayoutContainer>
    );
}

Layout.defaultProps = {
    menu: '',
    role: '',
    email: '',
    children: null,
    handleSignOut: null,
}

export default Layout;