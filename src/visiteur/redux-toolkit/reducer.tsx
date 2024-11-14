import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { IvisitorWithUser } from 'shared/models/visitor.model';

interface VisitorState {
  visitors: Array<IvisitorWithUser>;
  loading: boolean;
  error: string | null;
  token: string | null;
}

const initialState: VisitorState = {
  visitors: [],
  loading: false,
  error: null,
  token: null,
};

const API_BASE_URL = process.env.REACT_APP_API_URL;

export const updateVisitor = createAsyncThunk(
  'visitors/updateVisitor',
  async (visitor: IvisitorWithUser, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/visitor/${visitor.visitorId}`, visitor);

      return response.data;

    } catch (error) {
      return rejectWithValue('Erreur lors de la mise à jour du visiteur');
    }
  }
);

export const fetchVisitors = createAsyncThunk(
  'visitors/fetchVisitors',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/visitor/all`);

      return response.data;
    } catch (error) {
      return rejectWithValue('Error fetching visitors');
    }
  }
);

const visitorSlice = createSlice({
  name: 'visitors',
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      localStorage.removeItem('visitorToken');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateVisitor.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateVisitor.fulfilled, (state, action) => {
        state.loading = false;
        const updatedVisitor = action.payload;
        const index = state.visitors.findIndex((visitor) => visitor.visitorId === updatedVisitor.visitorId);
        if (index !== -1) {
          state.visitors[index] = {
            ...updatedVisitor,
            user: {
              ...updatedVisitor.user,
              birthDate: new Date(Number(updatedVisitor.user.birthDate)).toISOString(),
            },
          };
        }
      })
      .addCase(updateVisitor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchVisitors.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchVisitors.fulfilled, (state, action) => {
        state.loading = false;
        state.visitors = action.payload;
      })
      .addCase(fetchVisitors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout } = visitorSlice.actions;
export default visitorSlice.reducer;
