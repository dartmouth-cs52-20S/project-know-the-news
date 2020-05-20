import { ActionTypes } from '../actions';

const initialState = {
  all: [],
  current: {},
};

const postsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_POSTS:
      // return { all: action.payload, current: null };
      return { current: {}, all: action.payload };
    case ActionTypes.FETCH_POST:
      // return { all: null, current: action.payload };
      return { ...state, current: action.payload };
    case ActionTypes.UPDATE_POST:
      return { ...state, current: action.payload };
    default:
      return state;
  }
};

export default postsReducer;
