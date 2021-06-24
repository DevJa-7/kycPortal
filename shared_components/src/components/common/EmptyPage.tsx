import React from 'react';
import styled from 'styled-components';

import { ContentText } from './styledComponents';

/**
 * Styles
 */

/**
 * Styled Components
 */
const EmptyPageContainer = styled.div`
    display: flex;
    position: fixed;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    z-index: 3000;
    top: 0;
    background-color: #ffffff;
`;

const EmptyPageWrapper = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    overflow: hidden;

    justify-content: center;
    align-items: center;
`;

const Title = styled.h1``;

const EmptyPage = () => {
    return (
        <EmptyPageContainer>
            <EmptyPageWrapper>
                <Title></Title>
            </EmptyPageWrapper>
        </EmptyPageContainer>
    )
}

export default EmptyPage;