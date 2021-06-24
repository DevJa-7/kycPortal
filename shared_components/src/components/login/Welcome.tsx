import React, { useMemo } from 'react';
import { Box, Grid } from '@material-ui/core';
import styled from 'styled-components';
import { ContentText } from '../common';
import { getImageUrl } from '../../common/utils';

import { APP_VERSION_NUMBER } from '../../common/constants';
import { TEXT_COLOR } from '../../common/styles';

/**
 * Constants
 */

/**
 * Styled Components
 */
const WelcomeWrapper = styled(Box)`
  display: flex;
  box-sizing: border-box;
  height: 100%;
  width: 100%;
  background: linear-gradient(to right top, #9c0de2, #0d62e2);
  background-color: #9c0de2;
  opacity: 0.83;
  align-items: center;
  justify-content: center;

  padding: 50px;

  @media screen and (max-width: 960px) {
    padding: 51px 24px 24px 24px;
  }
`;

const WelcomeContent = styled(Grid)`
  display: flex;
  width: 100%;
  max-width: 738px;
  flex-flow: column;
  text-align: left;

  color: #FFFFFF;
  font-size: 30px;

  .welcome-title {
    line-height: 2.1333em;
  }

  .logo-name {
    font-size: 1.6667em;
    line-height: 1.28em;
  }

  .url-title {
    margin-top: 2.1111em;
  }

  .ver-number {
    position: absolute;
    bottom: 2rem;
    font-size: 14px;
  }

  @media screen and (max-width: 960px) {
    font-size: 20px;

    .ver-number {
      font-size: 12px;
    }
  }

  @media screen and (max-width: 600px) {
    text-align: center;
    font-size: 12px;

    .welcome-title {
      line-height: 2em;
    }
  
    .url-title {
      margin-top: 0.58333em;
    }

    .ver-number {
      color: ${TEXT_COLOR.graylight};
      font-size: 12px;
      left: 0;
      right: 0;
    }
  }
`;

const WelcomeContainer = styled.div`
    width: 100%;
    height: 100%;
    background-image: url(${(props: {imgWelcome: string}) => props.imgWelcome});
    background-size: cover;
    background-repeat: no-repeat;

    @media screen and (max-width: 600px) {
      height: fit-content;
    }
`;

/**
 * Main Component
 */
const Welcome = () => {
  const imgWelcome = useMemo(() => {
    return getImageUrl('welcome.jpg');
  }, []);

  return (
    <WelcomeContainer imgWelcome={imgWelcome}>
      <WelcomeWrapper>
        <WelcomeContent>
          <ContentText className="welcome-title">WELCOME TO</ContentText>
          <ContentText className="logo-name">truuth Identity Verification</ContentText>
          <ContentText className="url-title">Login to Access Dashboard</ContentText>
          <ContentText className="ver-number">Version: {APP_VERSION_NUMBER}</ContentText>
        </WelcomeContent>
      </WelcomeWrapper>
    </WelcomeContainer>
  )
}

export default Welcome; 