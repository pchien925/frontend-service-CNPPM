export const SHOW_LOADING = 'app/SHOW_LOADING';
export const HIDE_LOADING = 'app/HIDE_LOADING';

export const showLoading = () => ({
  type: SHOW_LOADING,
});

export const hideLoading = () => ({
  type: HIDE_LOADING,
});