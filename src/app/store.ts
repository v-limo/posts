import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit"

import postReducer from "../features/postsSlice"
import userReducer from "../features/usersSlice"
import commentReducer from "../features/commentsSlice"

export const store = configureStore({
  reducer: {
    posts: postReducer,
    users: userReducer,
    comments: commentReducer,
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
