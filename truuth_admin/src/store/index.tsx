import { createStore } from 'redux';

import createRootReducer from './rootReducer';

const store = createStore(createRootReducer);

export default store;