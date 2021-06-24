import { AUTH_ROLE } from 'shared_components/src/common/constants';

// LogIn User Type
export const LOGIN_USER_TYPES = process.env.REACT_APP_LOGIN_USER_TYPESS || `${AUTH_ROLE.admin},${AUTH_ROLE.verifier}`;
