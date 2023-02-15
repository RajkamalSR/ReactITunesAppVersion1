import { createStore, applyMiddleware, compose } from 'redux';

import thunk from 'redux-thunk';
import searchReducer from '../reducers/searchReducers';
export const composeEnhancers = (window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
const store = createStore(
  searchReducer, // search reducer
  composeEnhancers(applyMiddleware(thunk)) //Redux middleware function provides a medium to interact with dispatched action before they reach the reducer
);

export type RootState = ReturnType<typeof store.getState>

export default store;