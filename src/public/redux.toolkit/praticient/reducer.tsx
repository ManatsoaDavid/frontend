import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { IPractitionerWithUser } from "shared/models/practitioner.model";

interface PraticientState {
  praticient: IPractitionerWithUser[];
  loading: boolean;
  error: string | null;
}

const initialState: PraticientState = {
  praticient: [],
  loading: false,
  error: null,
};

const API_BASE_URL = process.env.REACT_APP_API_URL;

export const fetchPraticient = createAsyncThunk(
  "praticient/fetchPraticient",
  async () => {
    const response = await axios.get(`${API_BASE_URL}/practitioners/`);
    return response.data.data;
    console.log(response.data.data);

  }
);

const publicPraticientSlice = createSlice({
  name: "praticient",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPraticient.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPraticient.fulfilled, (state, action) => {
        state.loading = false;
        state.praticient = action.payload;
      })
      .addCase(fetchPraticient.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch praticient";
      });
  },
});

export default publicPraticientSlice.reducer;
