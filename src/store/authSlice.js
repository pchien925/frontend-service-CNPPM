import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api/apiClient';

export const login = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const res = await api.post('/accounts/login', credentials);
      return res.data;
    } catch (err) {
      const message = err.response?.data || err.message;
      return rejectWithValue(message);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
    loading: false,
    error: null,
  },
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        // assume API returns { data: { user, token } } or similar
        const payload = action.payload;
        // handle common shapes
        state.user = payload.user ?? payload.data?.user ?? payload;
        state.token = payload.token ?? payload.data?.token ?? null;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
