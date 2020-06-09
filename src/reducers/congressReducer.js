import { ActionTypes } from '../actions';

const initialState = {
  all: [],
};

const CongressReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_CONGRESS_BILLS:
      return { all: action.payload };
    default:
      return state;
  }
};

export default CongressReducer;
