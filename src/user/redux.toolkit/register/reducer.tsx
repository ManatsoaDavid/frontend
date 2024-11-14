import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { UserModel } from 'user/models/register.model';

interface UserState {
  currentUser: UserModel | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: UserState = {
  currentUser: null,
  isLoading: false,
  error: null,
};

const API_BASE_URL = process.env.REACT_APP_API_URL;

export const registerUser = createAsyncThunk(
  'user/register',
  async (userData: UserModel, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/users/register`, userData);
      return response.data;
    } catch (error) {
      return rejectWithValue('Error during user registration');
    }
  }
);

export const loginUser = createAsyncThunk(
  'user/login',
  async (credentials: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/login`, credentials);
      return response.data;
    } catch (error) {
      return rejectWithValue('Error during user login');
    }
  }
);

export const countUser = createAsyncThunk(
  'user/count',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/users/stat/count`);
      return response.data;
    } catch (error) {
      return rejectWithValue('Error during user count');
    }
  }
);


const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearUser: (state) => {
      state.currentUser = null;
      state.isLoading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action: PayloadAction<UserModel>) => {
        state.currentUser = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<UserModel>) => {
        state.currentUser = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(countUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(countUser.fulfilled, (state, action: PayloadAction<number>) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(countUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});
export const { clearUser } = userSlice.actions;

export default userSlice.reducer;
