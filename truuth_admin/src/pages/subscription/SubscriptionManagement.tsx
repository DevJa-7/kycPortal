import React,  {
    useEffect,
} from 'react';
import { 
    useDispatch,
} from 'react-redux';
import styled from 'styled-components';

import { MENU } from '../../common/routes/menu';
import { updateMenu } from '../../store/menu/actions';

/**
 * Props
 */


/**
 * Styles
 */


/**
 * Styled Components
 */
const SubscriptionManagementContainer = styled.div`
    display: flex;
`;

const SubscriptionManagementWrapper = styled.div`
    display: flex;
    text-align: center;
`;

/**
 * Main Component
 */
const SubscriptionManagement = () => {
    const dispatch = useDispatch();
    
    useEffect(() => {
        // dispatch(updateMenu(MENU.subcriptionManagement));
    }, []);
    
    return (
        <SubscriptionManagementContainer>
            <SubscriptionManagementWrapper>
                Subcription Management
            </SubscriptionManagementWrapper>
        </SubscriptionManagementContainer>
    )
}

export default SubscriptionManagement;