import * as ActionTypes from './actionTypes';
import {
    IUsersDocument,
    IUsersList
} from 'shared_components/src/service/models/user';

export const setUsers = (list: IUsersList) => ({
    type: ActionTypes.SET_USER_LIST,
    payload: list
});

export const resetUsers = () => ({
    type: ActionTypes.RESET_USER_LIST,
});

export const refreshUsers = (refresh: boolean) => ({
    type: ActionTypes.REFRESH_USER_LIST,
    payload: refresh
});

export const setUserPageIndex = (index: number) => ({
    type: ActionTypes.SET_USER_PAGE_INDEX,
    payload: index,
});

export const setUserId = (verId: string) => ({
    type: ActionTypes.SET_USER_ID,
    payload: verId
});

export const setUserDetail = (data: IUsersDocument) => ({
    type: ActionTypes.SET_USER_DETAIL,
    payload: data
});

export type UserAction =
    | ReturnType<typeof setUserId>
    | ReturnType<typeof setUsers>
    | ReturnType<typeof resetUsers>
    | ReturnType<typeof setUserPageIndex>
    | ReturnType<typeof setUserDetail>
    | ReturnType<typeof refreshUsers>;
