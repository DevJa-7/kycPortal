import { 
    UPDATE_AUTH_USER,
    LOGOUT_AUTH_USER,
} from './actionTypes';

import { IAuthInfo } from '../../service/models/auth';

export const updateAuthUser = (user: IAuthInfo) => ({type: UPDATE_AUTH_USER, payload: user});
export const logoutAuthUser = () => ({type: LOGOUT_AUTH_USER});

export type AuthAction = 
    | ReturnType<typeof updateAuthUser>
    | ReturnType<typeof logoutAuthUser>;