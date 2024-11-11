import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ISubscriptionCycle } from 'shared/models/subscriptionCycle.model';
import axiosInstance from '../../../api/axiosInstance';


/**************************INTERFACE D'ÉTAT**************************/
interface SubscriptionCycleState {
  subscriptionCycles: ISubscriptionCycle[];
  loading: boolean;
  error: string | null;
}

/**************************ÉTAT INITIAL**************************/
const initialState: SubscriptionCycleState = {
  subscriptionCycles: [],
  loading: false,
  error: null,
};


/**************************ACTIONS ASYNCHRONES**************************/
export const fetchSubscriptionCycles = createAsyncThunk(
  'subscriptionCycles/fetchSubscriptionCycles',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/subscriptionCycle`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue('Error fetching subscription cycles');
    }
  }
);

export const createSubscriptionCycle = createAsyncThunk(
  'subscriptionCycles/createSubscriptionCycle',
  async (subscriptionCycleData: ISubscriptionCycle, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`/subscriptionCycle`, subscriptionCycleData);
      console.log(response.data.data);

      return response.data.data;
    } catch (error) {
      return rejectWithValue('Error creating subscription cycle');
    }
  }
);

export const updateSubscriptionCycle = createAsyncThunk(
  'subscriptionCycles/updateSubscriptionCycle',
  async ({ id, subscriptionCycleData }: { id: number, subscriptionCycleData: Partial<ISubscriptionCycle> }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/subscriptionCycle/${id}`, subscriptionCycleData);
      return response.data.data;

    } catch (error) {
      return rejectWithValue('Error updating subscription cycle');
    }
  }
);

export const deleteSubscriptionCycle = createAsyncThunk(
  'subscriptionCycles/deleteSubscriptionCycle',
  async (id: number, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/subscriptionCycle/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue('Error deleting subscription cycle');
    }
  }
);

/**************************SLICE REDUX**************************/
const subscriptionCycleSlice = createSlice({
  name: 'subscriptionCycles',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      /**************************GESTION DES ÉTATS POUR FETCH**************************/
      .addCase(fetchSubscriptionCycles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSubscriptionCycles.fulfilled, (state, action) => {
        state.loading = false;
        state.subscriptionCycles = action.payload;
      })
      .addCase(fetchSubscriptionCycles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      /**************************GESTION DES ÉTATS POUR CREATE**************************/
      .addCase(createSubscriptionCycle.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createSubscriptionCycle.fulfilled, (state, action) => {
        state.loading = false;
        state.subscriptionCycles.push(action.payload);
      })
      .addCase(createSubscriptionCycle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      /**************************GESTION DES ÉTATS POUR UPDATE**************************/
      .addCase(updateSubscriptionCycle.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateSubscriptionCycle.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.subscriptionCycles.findIndex(sc => sc.subscriptionCycleId === action.payload.id);
        if (index !== -1) {
          state.subscriptionCycles[index] = action.payload;
        }
      })
      .addCase(updateSubscriptionCycle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      /**************************GESTION DES ÉTATS POUR DELETE**************************/
      .addCase(deleteSubscriptionCycle.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteSubscriptionCycle.fulfilled, (state, action) => {
        state.loading = false;
        state.subscriptionCycles = state.subscriptionCycles.filter(sc => sc.subscriptionCycleId !== action.payload);
      })
      .addCase(deleteSubscriptionCycle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default subscriptionCycleSlice.reducer;
