import { configureStore } from "@reduxjs/toolkit";
import curChatReducer from "../slices/curChat";
import chatListReducer from "../slices/chatList";

export const store = configureStore({
  reducer: {
    curChat: curChatReducer,
    chatList: chatListReducer,
  },
  devTools: true,
});
