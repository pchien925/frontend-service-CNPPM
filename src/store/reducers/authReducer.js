// store/reducers/authReducer.js
const initialState = {
  profile: null,
  permissions: [],
  isAuthenticated: false,
  loading: false,
};

export default function authReducer(state = initialState, action) {
  switch(action.type) {
    case 'FETCH_PROFILE_REQUEST':
      return { ...state, loading: true };

    case 'SET_PROFILE':
      return {
        ...state,
        profile: action.payload,
        permissions: action.payload?.group?.permissions || [],
        isAuthenticated: !!action.payload,
        loading: false,    // Tắt loading
      };

    case 'LOGOUT':    
    case 'FETCH_PROFILE_FAILURE':
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
}