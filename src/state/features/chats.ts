/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Chat } from '../../types/chat';
import { getChats } from '../../api/chats';

type ChatsState = {
  chats: Chat[],
  activeChat: Chat | null,
  renamedChat: Chat | null,
  isLoading: boolean,
  hasError: boolean,
};

const initialState: ChatsState = {
  chats: [],
  activeChat: null,
  renamedChat: null,
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
      state.activeChat = action.payload;
    },
    addChat: (state, action) => {
      state.chats.unshift(action.payload);
    },
    deleteChat: (state, action) => {
      state.chats = state.chats.filter(chat => chat.id !== +action.payload);
    },
    renameChat: (state, action) => {
      const { id } = action.payload;
      const chatIndex = state.chats.findIndex(c => c.id === id);

      if (chatIndex !== -1) {
        state.chats[chatIndex] = action.payload;
      }
    },
    setRenamedChat: (state, action) => {
      state.renamedChat = action.payload;
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
export const {
  selectChat,
  addChat,
  deleteChat,
  renameChat,
  setRenamedChat,
} = chatsSlice.actions;
