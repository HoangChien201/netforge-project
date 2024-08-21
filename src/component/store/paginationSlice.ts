import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PaginationState {
  pageSize: number;
  currentIndex: number;
}

const initialState: PaginationState = {
  pageSize: 10,
  currentIndex: 1,
};

const paginationSlice = createSlice({
  name: 'pagination',
  initialState,
  reducers: {
    updatePagination: (state, action: PayloadAction<{ pageSize: number; currentIndex: number }>) => {
      const { pageSize, currentIndex } = action.payload;
      state.pageSize = pageSize;
      state.currentIndex = currentIndex;
    },
    resetPagination: (state) => {
      state.pageSize = 10;
      state.currentIndex = 1;
    },
  },
});

export const { updatePagination, resetPagination } = paginationSlice.actions;

export default paginationSlice.reducer;
