import { call, put, takeLatest } from 'redux-saga/effects';
import apiClient from '../../services/apiClient';
import { FETCH_PROFILE, setProfile } from '../actions/authAction';

function* fetchProfile() {
  yield put({ type: 'FETCH_PROFILE_REQUEST' });

  try {
    const response = yield call(apiClient.get, '/api/account/profile');
    yield put(setProfile(response.data));
  } catch (error) {
    console.error('Failed to fetch profile:', error);
    yield put(setProfile(null));
  }
}
export default function* authSaga() {
  yield takeLatest(FETCH_PROFILE, fetchProfile);
}
