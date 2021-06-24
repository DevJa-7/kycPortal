import { AuthAction } from './actions';
import {
    UPDATE_AUTH_USER,
    LOGOUT_AUTH_USER,
} from './actionTypes';

import { AUTH_ROLE } from 'shared_components/src/common/constants';

type Auth = {
    isLoggedin:    boolean,
    token:      string,
    role:       AUTH_ROLE,
    firstName:  string,
    lastName:   string,
    info:       string,
    session:    string,
    roles:      string,
    tenant:     string,
}

const initialState: Auth = {
    isLoggedin:    false,
    token:      '',
    role:       AUTH_ROLE.none,
    firstName:  '',
    lastName:   '',
    info:       '',
    session:    '',
    roles:      '',
    tenant:     '',
}

const AuthReducer = (
    state: Auth = initialState,
    action: AuthAction,
) => {
    switch (action.type) {

        case UPDATE_AUTH_USER:
            return {
                ...state,
                isLoggedin: action.payload.isLoggedin,
                token: action.payload.token,
                role: action.payload.role,
                firstName: action.payload.firstName,
                lastName: action.payload.lastName,
                info: action.payload.info,
                session: action.payload.session,
                roles: action.payload.roles,
                tenant: action.payload.tenant,
            };

        case LOGOUT_AUTH_USER:
            return {
                ...state,
                isLoggedin: false,
                token:      '',
                role:       AUTH_ROLE.none,
                firstName:  '',
                lastName:   '',
                info:       '',
                session:    '',
                roles:      '',
                tenant:     '',
            };

        default:
            return state;
    }
}

export default AuthReducer;