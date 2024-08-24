import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  address?: string;
  avatar: string;
  background?: string;
  dateOfBirth?: string;
  email?: string;
  fullname: string;
  gender?: string;
  id?: number;
  phone?: any;
  role?: number;
  token?: string;
}

interface UserState {
  value: User | null;
}

const initialState: UserState = {
  value: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUsers(state, action: PayloadAction<User>) {
      state.value = action.payload;
    },
    deleteUser(state) {
      state.value = null;
    },
  },
});

export const { setUsers, deleteUser } = userSlice.actions;

export default userSlice.reducer;
