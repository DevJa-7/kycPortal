import React, { useMemo } from 'react';
import styled from 'styled-components';
import {
    withTheme,
    makeStyles
} from '@material-ui/core/styles';

import {
    BACKGROUND_COLOR,
    TEXT_COLOR
} from '../../common/styles';
import CustomButton from './CustomButton';
import { getImageUrl } from '../../common/utils';

/**
 * IProps
 */
interface IProps {
    hasConfiguration?: boolean,
    handleReturn?: any,
}

/**
 * Styles
 */
const buttonStyles = makeStyles(() => ({
    root: {
        marginTop: 37,
        width: '100%',
        maxWidth: 185,

        '@media screen and (max-width: 600px)': {
            marginTop: 25
        },
    },
}));

/**
 * Styled Components
 */
const NotMatchContainer = styled.div`
    display: flex;
    position: fixed;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    z-index: 3000;
    top: 0;
    background-color: ${BACKGROUND_COLOR.errorPage};
`;

const NotMatchWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    overflow: hidden;
    padding: 15px;

    justify-content: center;
    align-items: center;
`;

const ErrorImg = styled.img`
    max-width: 309.3px;
    max-height: 296.6px;
    width: 100%;
    height: 100%;
`;

const Title = withTheme(styled.span`
    margin-top: 16.7px;
    font-size: 1.75rem;
    font-weight: 500;
    line-height: 1.18;
    letter-spacing: 0.7px;
    text-align: center;
    color: ${(props: any) => props.theme.palette.grey[900]};

    @media screen and (max-width: 600px) {
        font-size: 1.25rem;
    }
`);

const SubTitle = withTheme(styled.span`
    margin-top: 9.7px;
    font-size: 1rem;
    font-weight: 500;
    line-height: 1.18;
    letter-spacing: 0.7px;
    text-align: center;
    color: ${TEXT_COLOR.graylight};

    @media screen and (max-width: 600px) {
        font-size: 0.75rem;
    }
`);

const NotMatch = ({
    hasConfiguration,
    handleReturn,
}: IProps) => {
    const classes = buttonStyles();

    const handleGotoHome = () => {
        handleReturn();
    }

    const imgErrorUrl = useMemo(() => {
        return getImageUrl('error-404.png');
    }, []);

    return (
        <NotMatchContainer>
            <NotMatchWrapper>
                <ErrorImg src={imgErrorUrl} />
                <Title>Page Not Found!</Title>
                <SubTitle>Oops! It looks like the page you are looking for is not here</SubTitle>
                {hasConfiguration && (
                    <CustomButton
                        label="HOME"
                        id="return-home"
                        className={classes.root}
                        onClick={handleGotoHome}
                    />
                )}
            </NotMatchWrapper>
        </NotMatchContainer>
    );
}

NotMatch.defalutProps = {
    hasConfiguration: false,
    handleReturn: null,
}

export default NotMatch;