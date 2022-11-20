import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';

import postReducer from '../features/postSlice';
import userReducer from '../features/usersSlice';

export const store = configureStore({
  reducer: {
    posts: postReducer,
    users: userReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
