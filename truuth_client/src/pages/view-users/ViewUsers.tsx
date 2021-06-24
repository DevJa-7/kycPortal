import React, {
    useEffect,
} from 'react';
import {
    useDispatch
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
const ViewUsersContainer = styled.div`
    display: flex;
`;

const ViewUsersWrapper = styled.div`
    display: flex;
    text-align: center;
`;

/**
 * Main Component
 */
const ViewUsers = () => {
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(updateMenu(MENU.viewUsers));
    }, []);

    return (
        <ViewUsersContainer>
            <ViewUsersWrapper>
                View Users
            </ViewUsersWrapper>
        </ViewUsersContainer>
    )
}

export default ViewUsers;