import React from 'react';
import {
    makeStyles,
} from '@material-ui/core/styles';
import styled from 'styled-components';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

import {
    TEXT_COLOR,
    BACKGROUND_COLOR,
} from '../../common/styles';
import { STATEITEM_STATES } from '../../common/constants';
import { ContentText } from './styledComponents';

/**
 * Props
 */
interface IProps {
    type?: STATEITEM_STATES,
    label?: string,
    className?: string,
}

/**
 * Styles
 */
const useStyles = makeStyles(() => ({
}));

/**
 * Styled Components
 */
const StateItemContainer = styled.div`
    display: flex;
`;

const StateItemWrapper = styled.div`
    display: flex;
    align-items: center;
    color: ${(props: { type: STATEITEM_STATES | undefined }) => {
        let textColor = 'transparent';
        switch (props.type) {
            case STATEITEM_STATES.success:
                textColor = TEXT_COLOR.state.success;
                break;

            case STATEITEM_STATES.error:
                textColor = TEXT_COLOR.state.error;
                break;

            case STATEITEM_STATES.warning:
                textColor = TEXT_COLOR.state.waring;
                break;

            default:
                textColor = 'transparent';
                break;
        }

        return textColor;
    }};
    background-color: ${(props: { type: STATEITEM_STATES | undefined}) => {
        let bkColor = 'transparent';
        switch (props.type) {
            case STATEITEM_STATES.success:
                bkColor = BACKGROUND_COLOR.state.success;
                break;

            case STATEITEM_STATES.error:
                bkColor = BACKGROUND_COLOR.state.error;
                break;

            case STATEITEM_STATES.warning:
                bkColor = BACKGROUND_COLOR.state.warning;
                break;

            default:
                bkColor = 'transparent';
                break;
        }

        return bkColor;
    }};
    
    font-size: 16px;
    line-height: 1.31;
    padding: 0.5em 1.0em 0.5em 0.8em;
    border-radius: 3em;

    @media screen and (max-width: 1440px) {
        font-size: 14px;
    }

    & .icon { 
        width: 0.8em;
        height: 0.8em;
        margin-right: 3.5px;
    }

    & .content {
        text-overflow: ellipsis;
        overflow: hidden;
    }
`;

/**
 * Main Component
 */
const StateItem = ({
    type,
    label,
    className,
}: IProps) => {
    const classes = useStyles();

    return (
        <StateItemContainer className={className}>
            <StateItemWrapper type={label ? type : undefined}>
                <FiberManualRecordIcon className="icon" />
                <ContentText className="content">{label}</ContentText>
            </StateItemWrapper>
        </StateItemContainer>
    );
};

StateItem.defaultProps = {
    type: STATEITEM_STATES.success,
    label: '',
    className: '',
};

export default StateItem;