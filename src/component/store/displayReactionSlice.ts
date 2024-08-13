import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DisplayState {
  isLoadingg: boolean;
}

const initialState: DisplayState = {
    isLoadingg: false,
};

const displaySlice = createSlice({
  name: 'Display',
  initialState,
  reducers: {
    setIsDisplay: (state, action:PayloadAction<boolean>) => {
      state.isLoadingg = action.payload;
    },
    updateIsDisplay: (state, action: PayloadAction<boolean>) => {
        state.isLoadingg = action.payload;
      },
  },
});

export const { setIsDisplay,updateIsDisplay } = displaySlice.actions;
export default displaySlice.reducer;
