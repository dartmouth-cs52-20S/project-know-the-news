// the starting point for your redux store
// this defines what your store state will look like
import { combineReducers } from 'redux';

import TopicsReducer from './topicsReducer';
import AuthReducer from './auth-Reducer';

const rootReducer = combineReducers({
  posts: TopicsReducer,
  auth: AuthReducer,
});
export default rootReducer;
