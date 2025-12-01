import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import apiClient from '../services/apiClient';
import { selectAppLoading } from '../store/selectors/appSelector';

/**
 * useFetchAction - hook fetch dữ liệu từ API và tự dispatch action
 * @param {Object} options
 * @param {string} options.api - endpoint API
 * @param {boolean} options.immediate - fetch ngay khi mount
 * @param {boolean} options.useAppLoading - dùng app global loading hay local loading
 * @param {function} options.saveAction - redux action để dispatch dữ liệu
 */
const useFetchAction = ({ api, immediate = true, useAppLoading = false, saveAction = null } = {}) => {
  const dispatch = useDispatch();
  const appLoading = useSelector(selectAppLoading);

  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.get(api);
      setData(response.data);

      // Dispatch redux action nếu có
      if (saveAction) {
        dispatch(saveAction(response.data));
      }
    } catch (err) {
      const message = err?.response?.data?.message || err.message || 'Unknown error';
      setError(message);
      if (saveAction) {
        // Có thể dispatch lỗi nếu muốn
        dispatch(saveAction(null));
      }
    } finally {
      setLoading(false);
    }
  }, [api, dispatch, saveAction]);

  useEffect(() => {
    if (useAppLoading) {
      setLoading(appLoading);
    }
  }, [appLoading, useAppLoading]);

  useEffect(() => {
    if (immediate) {
      fetchData();
    }
  }, [fetchData, immediate]);

  return { data, error, loading, fetchData };
};

export default useFetchAction;
