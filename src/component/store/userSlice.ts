import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  address?: string;
  avatar?: string;
  background?: string;
  dateOfBirth?: string;
  email?: string;
  fullname?: string;
  gender?: string;
  id?: number;
  phone?: string;
  role?: number;
  token?: string;
}

interface UserState {
  user: User | null;
}

const initialState: UserState = {
  user: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUsers(state, action: PayloadAction<User>) {
      state.user = action.payload;
    },
    deleteUser(state) {
      state.user = null;
    },
  },
});

export const { setUsers, deleteUser } = userSlice.actions;

export default userSlice.reducer;
