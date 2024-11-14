import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { IPractitionerWithUser } from 'shared/models/practitioner.model';

interface PractitionersState {
  practitioners: IPractitionerWithUser[];
  practitioner: IPractitionerWithUser | null;
  loading: boolean;
  error: string | null;
}


const initialState: PractitionersState = {
  practitioners: [],
  practitioner: null,
  loading: false,
  error: null,
};

const API_BASE_URL = process.env.REACT_APP_API_URL;

export const fetchAllPractitioners = createAsyncThunk(
  'practitioner/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/practitioners/all`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue('Erreur lors de la récupération des praticiens');
    }
  }
);


export const updatePractitioner = createAsyncThunk(
  'practitioner/updatePractitioner',
  async (practitioner: IPractitionerWithUser, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/practitioners/${practitioner.practitionerId}`, practitioner);
      return response.data;
    } catch (error) {
      return rejectWithValue('Erreur lors de la mise à jour des informations du praticien');
    }
  }
);

const practitionerSlice = createSlice({
  name: 'practitioner',
  initialState,
  reducers: {
    setPractitioner: (state, action: PayloadAction<IPractitionerWithUser>) => {
      state.practitioner = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllPractitioners.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllPractitioners.fulfilled, (state, action) => {
        state.loading = false;
        state.practitioners = action.payload;
      })
      .addCase(fetchAllPractitioners.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setPractitioner } = practitionerSlice.actions;
export default practitionerSlice.reducer;
