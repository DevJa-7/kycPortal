import React from 'react';
import styled from 'styled-components';
import { TEXT_COLOR } from '../../common/styles';

/**
 * Props
 */
interface IProps {
    isMobile: boolean,
}

/**
 * Styled Components
 */
const FooterContainer = styled.div`
    display: flex;
    background-color: #FFFFFF;
    width: 100%;
`;

const FooterWrapper = styled.div`
    padding: 20px;
    margin-left: auto;
    margin-right: auto;

    @media screen and (max-width: 1280px) {
        padding: 17px;
    }
`;

const FooterContent = styled.div`
    justify-content: center;
    font-size: 14px;
    line-height: 1.36;
    letter-spacing: normal;
    text-align: left;
    color: ${TEXT_COLOR.graylight};

    @media screen and (max-width: 1280px) {
        font-size: 12px;
    }
`;

const FooterContentCopyRight = styled.span``;

/**
 * Main Component
 */
const Footer = ({
    isMobile,
}: IProps) => {
    return (
        <FooterContainer>
            <FooterWrapper>
                <FooterContent>
                    <FooterContentCopyRight>
                        Copyright © 2020 Locii holdings Pty ltd. All rights reserved.
                </FooterContentCopyRight>
                </FooterContent>
            </FooterWrapper>
        </FooterContainer>
    )
}

Footer.defaultProps = {
    isMobile: false,
}

export default Footer;