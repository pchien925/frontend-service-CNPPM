import { useSelector, useDispatch } from 'react-redux';
import { useCallback, useEffect } from 'react';
import {
  getCacheAccessToken,
  removeCacheToken,
  setCacheToken,
} from '../services/userService';
import { selectIsAuthenticated, selectPermissions, selectProfile } from '../store/selectors/authSelector';
import { fetchProfile, setProfile } from '../store/actions/authAction';

const useAuth = () => {
  const dispatch = useDispatch();

  // Lấy dữ liệu từ Redux store
  const user = useSelector(selectProfile);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const permissions = useSelector(selectPermissions);

  // Kiểm tra token khi mount (tránh trường hợp reload trang mất state Redux)
  const token = getCacheAccessToken();

  // Gọi API lấy profile nếu có token nhưng Redux chưa có user
  useEffect(() => {
    if (token && !user && !isAuthenticated) {
      dispatch(fetchProfile());
    }
  }, [token, user, isAuthenticated, dispatch]);

  // Hàm login: lưu token + gọi fetch profile
  const login = useCallback((accessToken, userKind) => {
    setCacheToken(accessToken);
    if (userKind) {
      // nếu backend trả thêm userKind
      // setUserKind(userKind);
    }
    dispatch(fetchProfile()); // tự động fetch profile sau khi login
  }, [dispatch]);

  // Hàm logout
  const logout = useCallback(() => {
    removeCacheToken();
    dispatch(setProfile(null)); // reset Redux
    window.location.href = '/login';
  }, [dispatch]);

  // Kiểm tra quyền (permission)
  const hasPermission = useCallback((permissionKey) => {
    if (!permissions || permissions.length === 0) return false;
    return permissions.includes(permissionKey);
  }, [permissions]);

  // Refresh profile thủ công (khi cần cập nhật lại)
  const refreshProfile = useCallback(() => {
    if (token) {
      dispatch(fetchProfile());
    }
  }, [dispatch, token]);

  return {
    user,
    token,
    isAuthenticated,
    permissions,
    login,
    logout,
    hasPermission,
    refreshProfile,
  };
};

export default useAuth;