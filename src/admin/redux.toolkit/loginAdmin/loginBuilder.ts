import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from 'api/axiosInstance';
import { localStorageService } from 'utils/localStorageService';

export const loginAdmin = createAsyncThunk(
  'admin/login',
  async ({ email, mdp }: { email: string; mdp: string }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/login', { email, mdp });
      const { token } = response.data;
      localStorageService.setItem('adminToken', token);
      return token;
    } catch (error: any) {
      return rejectWithValue('Une erreur est survenue lors de la connexion');
    }
  }
);
