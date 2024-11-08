import { createSlice } from '@reduxjs/toolkit';

const publicSlice = createSlice({
  name: 'public',
  initialState: {
    // état initial pour public
  },
  reducers: {
    // reducers pour public
  },
});

export const { actions: publicActions } = publicSlice;
export default publicSlice.reducer;
