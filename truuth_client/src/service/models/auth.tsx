import { AUTH_ROLE } from 'shared_components/src/common/constants';

export interface IAuthInfo {
    isLoggedin: boolean,
    token: string,
    role: AUTH_ROLE,
    firstName: string,
    lastName: string,
    info: string,
    session: string,
    roles: string,
    tenant: string,
}