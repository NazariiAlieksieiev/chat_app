/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { MessageType } from '../../types/message';
import { getMessages, moreMessages } from '../../api/messages';

type MessagesState = {
  messages: MessageType[],
  offset: number,
  isLoading: boolean,
  hasError: boolean,
};

type MoreMessages = {
  id: number | null,
  offset: number,
};

const initialState: MessagesState = {
  messages: [],
  offset: 0,
  isLoading: false,
  hasError: false,
};

export const fetchMessages = createAsyncThunk('messages/get', (id: number) => {
  return getMessages(id);
});

export const fetchMoreMessages = createAsyncThunk(
  'messages/fetchMore',
  ({ id, offset }: MoreMessages) => {
    return moreMessages(id, offset);
  },
);

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMessages.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(fetchMessages.fulfilled, (state, action) => {
      state.messages = action.payload.reverse();
      state.isLoading = false;
      state.offset = state.messages.length;
    });

    builder.addCase(fetchMessages.rejected, (state) => {
      state.isLoading = false;
      state.hasError = true;
    });

    builder.addCase(fetchMoreMessages.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(fetchMoreMessages.fulfilled, (state, action) => {
      state.messages = [...action.payload.reverse(), ...state.messages];
      state.isLoading = false;
      state.offset += action.payload.length;
    });

    builder.addCase(fetchMoreMessages.rejected, (state) => {
      state.isLoading = false;
      state.hasError = true;
    });
  },
});

export default messagesSlice.reducer;
export const { addMessage } = messagesSlice.actions;
