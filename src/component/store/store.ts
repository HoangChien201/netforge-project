import { configureStore } from '@reduxjs/toolkit';
import reactionReducer from './reactionSlice';
import postidReducer from './postIDSlice';
import loadDataSlice from './loadDataSlice';
import userSlice from './userSlice';
import displayReducer from './displayReactionSlice';

const store = configureStore({
  reducer: {
    reaction: reactionReducer,
    postID:postidReducer,
    loading:loadDataSlice,
    user:userSlice,
    displayReaction:displayReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
