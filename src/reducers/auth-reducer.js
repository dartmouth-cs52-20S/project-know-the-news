import { ActionTypes } from '../actions';

const initialState = {
  authenticated: false,
  error: '',
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.AUTH_USER:
      return { authenticated: true };
    case ActionTypes.DEAUTH_USER:
      return { authenticated: false };
    case ActionTypes.AUTH_ERROR:
      return { authenticated: false, error: action.message };
    default:
      return state;
  }
};

export default authReducer;
