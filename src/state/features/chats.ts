/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Chat } from '../../types/chat';
import { getChats } from '../../api/chats';

type ChatsState = {
  chats: Chat[],
  activeChatId: number | null,
  isLoading: boolean,
  hasError: boolean,
};

const initialState: ChatsState = {
  chats: [],
  activeChatId: null,
  isLoading: false,
  hasError: false,
};

export const fetchChats = createAsyncThunk('chats/get', () => {
  return getChats();
});

const chatsSlice = createSlice({
  name: 'chats',
  initialState,
  reducers: {
    selectChat: (state, action) => {
      state.activeChatId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchChats.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(fetchChats.fulfilled, (state, action) => {
      state.chats = action.payload;
      state.isLoading = false;
    });

    builder.addCase(fetchChats.rejected, (state) => {
      state.isLoading = false;
      state.hasError = true;
    });
  },
});

export default chatsSlice.reducer;
export const { selectChat } = chatsSlice.actions;
