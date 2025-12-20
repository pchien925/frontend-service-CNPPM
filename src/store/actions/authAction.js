export const FETCH_PROFILE = 'FETCH_PROFILE'; // trigger saga fetch profile
export const SET_PROFILE = 'SET_PROFILE';     // lưu profile vào store

// Action creators
export const fetchProfile = () => ({
  type: FETCH_PROFILE,
});

export const setProfile = (profile) => ({
  type: SET_PROFILE,
  payload: profile,
});
