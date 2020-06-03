import { ActionTypes } from '../actions';

const initialState = {
  allnews: [],
};

const newsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_NEWS:
      return { all: action.payload };
    default:
      return state;
  }
};

export default newsReducer;
