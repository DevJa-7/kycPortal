import * as ActionTypes from './actionTypes';
import { UserAction } from './actions';
import {
    IUsersDocument,
    IUsersList
} from 'shared_components/src/service/models/user';

type User = {
    users: IUsersList,
    userPage: number,
    userId: string,
    userDetail: IUsersDocument,
}

const initialState: User = {
    users: {
        items: [] as IUsersDocument[],
        count: 0,
        pageCount: 0,
        hasPrevPage: false,
        limit: 0,
        nextPage: 1,
        page: 1,
        pagingCounter: 1,
        prevPage: false,
        totalDocs: 0,
        totalPages: 1
    } as IUsersList,
    userId: '',
    userPage: 1,
    userDetail: {
        createdAt: new Date(),
        email: '',
        firstName: '',
        id: '',
        lastName: '',
        mobile: '',
        organisation: '',
        status: '',
        subscriptionID: '',
        updatedAt: new Date(),
        userID: '',
        userType: '',
        _id: ''
    } as unknown as IUsersDocument,
}

const UserReducer = (
    state: User = initialState,
    action: UserAction,
) => {
    switch (action.type) {

        case ActionTypes.SET_USER_LIST:
            return {
                ...state,
                users: action.payload,
            };

        case ActionTypes.RESET_USER_LIST:
            return {
                ...state,
                users: initialState.users,
            };

        case ActionTypes.SET_USER_PAGE_INDEX:
            return {
                ...state,
                userPage: action.payload,
            };

        case ActionTypes.SET_USER_ID:
            return {
                ...state,
                userId: action.payload,
            };

        case ActionTypes.SET_USER_DETAIL:
            return {
                ...state,
                userDetail: action.payload,
            };

        default:
            return state;
    }
}

export default UserReducer;