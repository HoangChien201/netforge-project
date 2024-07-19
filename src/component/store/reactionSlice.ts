import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ReactionState {
  reactions: Record<number, number>; // Đối tượng với key là postID và value là reaction
}

const initialState: ReactionState = {
  reactions: {},
};

const reactionSlice = createSlice({
  name: 'reaction',
  initialState,
  reducers: {
    setReaction: (state, action: PayloadAction<{ postID: number; reaction: number }>) => {
      state.reactions[action.payload.postID] = action.payload.reaction;
    },
  },
});

export const { setReaction } = reactionSlice.actions;
export default reactionSlice.reducer;
