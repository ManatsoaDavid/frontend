import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { ISubscription } from 'shared/models/subscription.model';

interface SubscriptionState {
  subscriptions: ISubscription[];
  loading: boolean;
  error: string | null;
}

const initialState: SubscriptionState = {
  subscriptions: [],
  loading: false,
  error: null,
};

const API_BASE_URL = process.env.REACT_APP_API_URL;

export const fetchSubscriptions = createAsyncThunk(
  'subscriptions/fetchSubscriptions',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/subscription/allSubscription`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue('Error fetching subscriptions');
    }
  }
);

export const createSubscription = createAsyncThunk(
  'subscriptions/createSubscription',
  async (subscriptionData: { practitionerId: number, subscriptionTypeId: number, subscriptionCycleId: number, amount: number, }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/subscription`, subscriptionData);
      console.log(response.data);

      return response.data.data;
    } catch (error) {
      console.log(error);

      return rejectWithValue('Error creating subscription');
    }
  }
);

export const updateSubscription = createAsyncThunk(
  'subscriptions/updateSubscription',
  async ({ id, subscriptionData }: { id: number, subscriptionData: Partial<ISubscription> }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/subscription/${id}`, subscriptionData);
      return response.data.data;
    } catch (error) {
      return rejectWithValue('Error updating subscription');
    }
  }
);

export const deleteSubscription = createAsyncThunk(
  'subscriptions/deleteSubscription',
  async (id: number, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_BASE_URL}/subscription/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue('Error deleting subscription');
    }
  }
);

export const fetchPractitionerSubscriptions = createAsyncThunk(
  'subscriptions/fetchPractitionerSubscriptions',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/subscription/practitioners`);

      // Transform the data structure
      const transformedData = response.data.data.map((item: { subscriptions: any[]; practitioner: { user: any; id: any; }; }) => ({
        ...item.subscriptions[0],
        practitioner: {
          ...item.practitioner.user,
          id: item.practitioner.id
        }
      }));

      return transformedData;
    } catch (error) {
      return rejectWithValue('Error fetching practitioner subscriptions');
    }
  }
);


const subscriptionSlice = createSlice({
  name: 'subscriptions',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubscriptions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSubscriptions.fulfilled, (state, action) => {
        state.loading = false;
        state.subscriptions = action.payload;
      })
      .addCase(fetchSubscriptions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createSubscription.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createSubscription.fulfilled, (state, action) => {
        state.loading = false;
        state.subscriptions.push(action.payload);
      })
      .addCase(createSubscription.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateSubscription.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateSubscription.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.subscriptions.findIndex(sub => sub.subscriptionId === action.payload.id);
        if (index !== -1) {
          state.subscriptions[index] = action.payload;
        }
      })
      .addCase(updateSubscription.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteSubscription.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteSubscription.fulfilled, (state, action) => {
        state.loading = false;
        state.subscriptions = state.subscriptions.filter(sub => sub.subscriptionId !== action.payload);
      })
      .addCase(deleteSubscription.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchPractitionerSubscriptions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPractitionerSubscriptions.fulfilled, (state, action) => {
        state.loading = false;
        state.subscriptions = action.payload;
      })
      .addCase(fetchPractitionerSubscriptions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default subscriptionSlice.reducer;
