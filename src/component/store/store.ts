import { configureStore } from '@reduxjs/toolkit';
import reactionReducer from './reactionSlice';

const store = configureStore({
  reducer: {
    reaction: reactionReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
