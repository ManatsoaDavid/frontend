import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { IAppointment } from 'shared/models/appointment.model';

interface AppointmentState {
  appointments: IAppointment[];
  loading: boolean;
  error: string | null;
}

const initialState: AppointmentState = {
  appointments: [],
  loading: false,
  error: null,
};

const API_BASE_URL = process.env.REACT_APP_API_URL;


export const fetchAppointments = createAsyncThunk(
  'appointments/fetchAppointments',
  async (practitionerId: number, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/appointment/practitioner/${practitionerId}`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue('Error fetching appointments');
    }
  }
);


export const createAppointment = createAsyncThunk(
  'appointments/createAppointment',
  async (appointmentData: { visitorId: number; availabilityId: number }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/appointment`, appointmentData);
      return response.data.data;
    } catch (error) {
      return rejectWithValue('Error creating appointment');
    }
  }
);

export const updateAppointmentStatus = createAsyncThunk(
  'appointments/updateAppointmentStatus',
  async ({ id, status, reason }: { id: number; status: string; reason?: string }, { rejectWithValue }) => {
    try {
      let response;
      switch (status) {
        case 'CONFIRME':
          response = await axios.put(`${API_BASE_URL}/appointment/confirm/${id}`);
          break;
        case 'REPORTE':
          response = await axios.put(`${API_BASE_URL}/appointment/reject/${id}`, { reason });
          break;
        case 'ANNULE':
          response = await axios.put(`${API_BASE_URL}/appointment/cancel/${id}`, { reason });
          break;
        default:
          throw new Error('Invalid status');
      }
      return response.data.data;
    } catch (error) {
      return rejectWithValue('Error updating appointment status');
    }
  }
);

const appointmentSlice = createSlice({
  name: 'appointments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAppointments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAppointments.fulfilled, (state, action: PayloadAction<IAppointment[]>) => {
        state.loading = false;
        state.appointments = action.payload;
      })
      .addCase(fetchAppointments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createAppointment.fulfilled, (state, action: PayloadAction<IAppointment>) => {
        state.appointments.push(action.payload);
      })
      .addCase(updateAppointmentStatus.fulfilled, (state, action: PayloadAction<IAppointment>) => {
        const index = state.appointments.findIndex(app => app.appointmentId === action.payload.appointmentId);
        if (index !== -1) {
          state.appointments[index] = action.payload;
        }
      });
  },
});

export default appointmentSlice.reducer;
