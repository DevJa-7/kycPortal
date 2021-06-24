import React from 'react';
import styled from 'styled-components';

import { 
    BOX_SHADOW, 
    BORDER_COLOR, 
    BACKGROUND_COLOR 
} from '../../../common/styles';

/**
 * Props
 */
interface IProps {
    itemKey?: string,
    selected?: boolean,
    label?: string,
    icon?: string,
    className?: string,
    key?: number,
    handleClick?: (key: string, label: string) => void,
}

/**
 * Styled Components
 */
const DocumentDataSelectItemContainer = styled.div`
    display: block;
    cursor: pointer;
`;

const DocumentDataSelectItemWrapper = styled.div`
    display: flex;
    flex-flow: column;
    border-radius: 15px;
    box-shadow: ${BOX_SHADOW.secondary};
`;

const ItemIcon = styled.div`
    display: flex;
    width: 100%;
    min-height: 108px;
    justify-content: center;
    align-items: center;

    padding: 5px;

    border: solid 1px ${BORDER_COLOR.secondary};
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;

    @media screen and (max-width: 1440px) {
        min-height: 99.4px;
    }

    @media screen and (max-width: 900px) {
        min-height: 60px;

        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
    }

`;

const ItemContent = styled.div`
    position: relative;
    display: flex;
    width: 100%;
    min-width: 274px;
    justify-content: center;
    align-items: center;    
    
    padding: 12px;
    
    font-family: Roboto;
    font-size: 24px;
    font-weight: bold;
    line-height: 1.3;
    color: #ffffff;
    
    border: solid 1px ${BORDER_COLOR.secondary};
    border-bottom-left-radius: 15px;
    border-bottom-right-radius: 15px;
    background-color: ${BACKGROUND_COLOR.primary};

    @media screen and (max-width: 1440px) {
        min-width: 217.4px;
        font-size: 20px;
        padding: 12px 5px;
    }

    @media screen and (max-width: 1280px) {
        min-width: 200.9px;
        font-size: 16px;
    }

    @media screen and (max-width: 900px) {
        min-width: 165px;
        font-size: 14px;
        
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;

        padding-left: 5px;
        padding-right: 5px;
    },
`;

const ItemSelected = styled.div`
    position: relative;
    width: 20px;
    height: 10px;
    margin-left: 16px;
   
    &:after {
        content: '';
        position: absolute;
        border: solid #fff;
        border-width: 0 2px 2px 0;
        display: inline-block;
        padding: 5px;
        ${(props: {selected: boolean | undefined}) => props.selected ? 
            (`transform: rotate(-135deg);
            -webkit-transform: rotate(-135deg);
            top: 3px;`) :
            (`transform: rotate(45deg);
            -webkit-transform: rotate(45deg);
            top: -5px;`)
        };
    }

    @media only screen and (max-width: 900px) {
        width: 14px;
        height: 7px;
        margin-left: 10px;
        
        &:after {
            padding: 4px;
            ${(props: {selected: boolean | undefined}) => props.selected ? 
                (`transform: rotate(-135deg);
                -webkit-transform: rotate(-135deg);
                top: 0px;`) :
                (`transform: rotate(45deg);
                -webkit-transform: rotate(45deg);
                top: -5px;`)
            };
        }
    }

`;

/**
 * Main Component
 */
const DocumentDataSelectItem = ({
    itemKey,
    selected,
    label,
    icon,
    className,
    handleClick,
}: IProps) => {
    const onClickItem = () => {
        handleClick && handleClick(
            (selected ? '' : (itemKey ?? '')), 
            (selected ? '' : (label ?? ''))
        );
    };

    return (
        <DocumentDataSelectItemContainer className={className} onClick={onClickItem} >
            <DocumentDataSelectItemWrapper>
                <ItemIcon>{icon}</ItemIcon>
                <ItemContent>
                    {label}
                    <ItemSelected selected={selected} />
                </ItemContent>
            </DocumentDataSelectItemWrapper>
        </DocumentDataSelectItemContainer>
    );
}

DocumentDataSelectItem.defaultProps = {
    itemKey: '',
    selected: false,
    label: '',
    icon: '',
    className: '',
    key: 0,
    handleClick: null,
}

export default DocumentDataSelectItem;