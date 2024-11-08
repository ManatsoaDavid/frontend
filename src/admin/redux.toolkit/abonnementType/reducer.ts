import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { ISubscriptionType } from 'shared/models/subscriptionType.model';

interface SubscriptionTypeState {
  subscriptionTypes: ISubscriptionType[];
  loading: boolean;
  error: string | null;
}

const initialState: SubscriptionTypeState = {
  subscriptionTypes: [],
  loading: false,
  error: null,
};

const API_BASE_URL = process.env.REACT_APP_API_URL;

export const fetchSubscriptionTypes = createAsyncThunk(
  'subscriptionTypes/fetchSubscriptionTypes',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/subscriptionType`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue('Error fetching subscription types');
    }
  }
);

export const createSubscriptionType = createAsyncThunk(
  'subscriptionTypes/createSubscriptionType',
  async (subscriptionTypeData: ISubscriptionType, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/subscriptionType`, subscriptionTypeData);
      return response.data;
    } catch (error) {
      return rejectWithValue('Error creating subscription type');
    }
  }
);

export const updateSubscriptionType = createAsyncThunk(
  'subscriptionTypes/updateSubscriptionType',
  async ({ id, subscriptionTypeData }: { id: number, subscriptionTypeData: Partial<ISubscriptionType> }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/subscriptionType/${id}`, subscriptionTypeData);
      return response.data;
    } catch (error) {
      return rejectWithValue('Error updating subscription type');
    }
  }
);

export const deleteSubscriptionType = createAsyncThunk(
  'subscriptionTypes/deleteSubscriptionType',
  async (id: number, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_BASE_URL}/subscriptionType/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue('Error deleting subscription type');
    }
  }
);

const subscriptionTypeSlice = createSlice({
  name: 'subscriptionTypes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubscriptionTypes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSubscriptionTypes.fulfilled, (state, action) => {
        state.loading = false;
        state.subscriptionTypes = action.payload;
      })
      .addCase(fetchSubscriptionTypes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createSubscriptionType.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createSubscriptionType.fulfilled, (state, action) => {
        state.loading = false;
        state.subscriptionTypes = Array.isArray(state.subscriptionTypes)
          ? [...state.subscriptionTypes, action.payload]
          : [action.payload];
      })

      .addCase(createSubscriptionType.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(updateSubscriptionType.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateSubscriptionType.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.subscriptionTypes.findIndex(st => st.subscriptionTypeId === action.payload.id);
        if (index !== -1) {
          state.subscriptionTypes[index] = action.payload;
        }
      })
      .addCase(updateSubscriptionType.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(deleteSubscriptionType.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteSubscriptionType.fulfilled, (state, action) => {
        state.loading = false;
        state.subscriptionTypes = state.subscriptionTypes.filter(st => st.subscriptionTypeId !== action.payload);
      })
      .addCase(deleteSubscriptionType.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

  },
});

export default subscriptionTypeSlice.reducer;
