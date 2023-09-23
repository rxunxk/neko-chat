import { createSlice } from "@reduxjs/toolkit";

const chatList = createSlice({
  name: "chatList",
  initialState: [],
  reducers: {
    setChatList: (state, action) => action.payload,
    pushIntoChatList: (state, action) => {
      state.push(action.payload);
      return state;
    },
  },
});

export const { setChatList, pushIntoChatList } = chatList.actions;
export default chatList.reducer;
