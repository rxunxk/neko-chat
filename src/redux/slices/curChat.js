import { createSlice } from "@reduxjs/toolkit";

const curChat = createSlice({
  name: "curChat",
  initialState: {},
  reducers: {
    setCurChat: (state, action) => {
      return action.payload;
    },
  },
});

export const { setCurChat } = curChat.actions;
export default curChat.reducer;
