import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../types/user";
import { v4 as uuidv4 } from "uuid";

const initialState: IUser = {
  id: uuidv4(),
  name: "テストユーザー",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ id: string; name: string }>) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
    },
    updateUserName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    clearUser: (state) => {
      state.id = null;
      state.name = null;
    },
    resetUser: () => {
      return initialState;
    },
  },
});

export const { setUser, updateUserName, clearUser, resetUser } =
  userSlice.actions;
export default userSlice.reducer;
