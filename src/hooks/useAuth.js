import { useSelector, useDispatch } from 'react-redux';
import { login as loginAction, logout as logoutAction } from '../store/authSlice';

export function useAuth() {
  const dispatch = useDispatch();
  const auth = useSelector((s) => s.auth);

  const login = (credentials) => dispatch(loginAction(credentials));
  const logout = () => dispatch(logoutAction());

  return {
    ...auth,
    login,
    logout,
  };
}
