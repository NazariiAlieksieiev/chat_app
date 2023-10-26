import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import messagesReducer from '../features/messages';
import chatsReducer from '../features/chats';

export const store = configureStore({
  reducer: {
    messages: messagesReducer,
    chats: chatsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

/* eslint-disable @typescript-eslint/indent */
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
/* eslint-enable @typescript-eslint/indent */
