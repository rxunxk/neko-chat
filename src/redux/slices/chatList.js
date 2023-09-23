import { createSlice } from "@reduxjs/toolkit";

const chatList = createSlice({
  name: "chatList",
  initialState: [],
  reducers: {
    setChatList: (state, action) => action.payload,
  },
});

export const { setChatList } = chatList.actions;
export default chatList.reducer;
