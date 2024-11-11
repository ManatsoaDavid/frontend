import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { IPractitionerWithUser } from 'shared/models/practitioner.model';



interface PraticienState {

  users: Array<IPractitionerWithUser>;
  totalPractitioners: number;
  loading: boolean;
  error: string | null;
}

const initialState: PraticienState = {
  users: [],
  totalPractitioners: 0,
  loading: false,
  error: null,
};

const API_BASE_URL = process.env.REACT_APP_API_URL;


export const countPractitioners = createAsyncThunk(
  'praticiens/countPractitioners',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/praticien/count`);
      return response.data;
    } catch (error) {
      return rejectWithValue('Erreur lors du comptage des praticiens');
    }
  }
);

export const fetchPraticiens = createAsyncThunk(
  'praticiens/fetchPraticiens',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/practitioners`);
      console.log(response.data);
      return response.data.data;


    } catch (error) {
      return rejectWithValue('Erreur lors de la récupération des praticiens');
    }
  }
);

export const deletePraticien = createAsyncThunk(
  'praticiens/deletePraticien',
  async (userId: string, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_BASE_URL}/delete/${userId}`);
      return userId;
    } catch (error) {
      return rejectWithValue('Erreur lors de la suppression du praticien');
    }
  }
);

const praticienSlice = createSlice({
  name: 'praticiens',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPraticiens.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPraticiens.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchPraticiens.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(deletePraticien.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletePraticien.fulfilled, (state, action) => {
        state.loading = false;
        state.users = state.users.filter(user => user.userId !== parseInt(action.payload));
      })
      .addCase(deletePraticien.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(countPractitioners.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(countPractitioners.fulfilled, (state, action) => {
        state.loading = false;
        state.totalPractitioners = action.payload;
      })
      .addCase(countPractitioners.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default praticienSlice.reducer;
