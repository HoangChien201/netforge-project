import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PostIDState {
  postID: number | null;
}

const initialState: PostIDState = {
    postID: null,
};

const postIDSlice = createSlice({
  name: 'reaction',
  initialState,
  reducers: {
    setPostid: (state, action:PayloadAction<number>) => {
      state.postID = action.payload;
    },
    clearPostid: (state) => {
        state.postID = null; 
      },
  },
});

export const { setPostid,clearPostid } = postIDSlice.actions;
export default postIDSlice.reducer;
