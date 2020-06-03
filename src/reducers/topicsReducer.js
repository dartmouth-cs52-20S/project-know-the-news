import { ActionTypes } from '../actions';

const initialState = {
  all: [],
  current: {},
};

const TopicsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_TOPICS:
      return { all: action.payload, current: null };
    case ActionTypes.FETCH_TOPIC:
      return { ...state, current: action.payload };
    // case ActionTypes.UPDATE_POST:
      // return { ...state, current: action.payload };
    default:
      return state;
  }
};

export default TopicsReducer;
