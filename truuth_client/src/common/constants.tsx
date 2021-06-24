import { AUTH_ROLE } from 'shared_components/src/common/constants';

// LogIn User Type
export const LOGIN_USER_TYPES = process.env.REACT_APP_LOGIN_USER_TYPES || `${AUTH_ROLE.agent}/${AUTH_ROLE.client}`;
