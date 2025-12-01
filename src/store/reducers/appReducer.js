import { SHOW_LOADING, HIDE_LOADING } from '../actions/appAction';

const initialState = {
  loading: false,
};

export default function appReducer(state = initialState, action) {
  switch (action.type) {
    case SHOW_LOADING:
      return { ...state, loading: true };
    case HIDE_LOADING:
      return { ...state, loading: false };
    default:
      return state;
  }
}