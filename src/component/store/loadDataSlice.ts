import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LoadDataState {
  isLoadingg: boolean;
}

const initialState: LoadDataState = {
    isLoadingg: false,
};

const loadingSlice = createSlice({
  name: 'Loading',
  initialState,
  reducers: {
    setIsLoadingz: (state, action:PayloadAction<boolean>) => {
      state.isLoadingg = action.payload;
    },
    updateIsLoading: (state) => {
        state.isLoadingg = false; 
      },
  },
});

export const { setIsLoadingz,updateIsLoading } = loadingSlice.actions;
export default loadingSlice.reducer;
