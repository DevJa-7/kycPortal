import React, {
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
const AccountSettingsContainer = styled.div`
    display: flex;
`;

const AccountSettingsWrapper = styled.div`
    display: flex;
    text-align: center;
`;

/**
 * Main Component
 */
const AccountSettings = () => {
    const dispatch = useDispatch();
    
    useEffect(() => {
        // MENU.accountSettings && dispatch(updateMenu(MENU.accountSettings));
    }, []);

    return (
        <AccountSettingsContainer>
            <AccountSettingsWrapper>
                Account Settings
            </AccountSettingsWrapper>
        </AccountSettingsContainer>
    )
}

export default AccountSettings;