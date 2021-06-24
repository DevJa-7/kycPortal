import { MenuAction } from './actions';
import { UPDATE_MENU } from './actionTypes';

type Menu = {
    key: string,
}

const initialState: Menu = {
    key: '',
}

const menuReducer = (
    state: Menu = initialState, 
    action: MenuAction,
) => {
    switch (action.type) {

        case UPDATE_MENU:
            return {
                ...state,
                key: action.payload,
            };

        default:
            return state;
    }
}

export default menuReducer;