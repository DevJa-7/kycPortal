import { combineReducers, $CombinedState } from 'redux';

import { DESTROY_SESSION } from './common/actionTypes';

import menu from './menu';
import common from './common';
import auth from './auth';
import subscription from './subscription';
import verification from './verification';
import user from './user';
import tenant from './tenant';
import product from './product';

const createRootReducer = combineReducers({
    menu:           menu.reducer,
    common:         common.reducer,
    auth:           auth.reducer,
    subscription:   subscription.reducer,
    verification:   verification.reducer,
    user:           user.reducer,
    tenant: tenant.reducer,
    product:        product.reducer,
});

const rootReducer = (state: RootState | undefined, action: any) => {
    // Clear all data in redux store to initial.
    if(action.type === DESTROY_SESSION)
       state = undefined;

    return createRootReducer(state, action);
};

export default rootReducer;

export type RootState = ReturnType<typeof createRootReducer>;
