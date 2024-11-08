import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { IPractitionerWithUser } from 'shared/models/practitioner.model';

interface PractitionerState {
  practitioner: IPractitionerWithUser | null;
  loading: boolean;
  error: string | null;
}

const initialState: PractitionerState = {
  practitioner: null,
  loading: false,
  error: null,
};

const API_BASE_URL = process.env.REACT_APP_API_URL;


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

});

export const { setPractitioner } = practitionerSlice.actions;
export default practitionerSlice.reducer;
