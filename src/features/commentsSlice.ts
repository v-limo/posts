import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { CommentsState, CommentI } from "../types/commentTypes"

const initialState: CommentsState = {
  loading: false,
  error: false,
  comments: [],
  filteredComments: [],
  comment: null,
}

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    sort: (state, action: PayloadAction<string>) => {
      state.comments = state.comments.sort((a, b) => (a > b ? 1 : -1))
    },
    search: (state, action: PayloadAction<string>) => {
      state.filteredComments = []
      let input = action.payload

      if (!input) {
        state.filteredComments = []
      } else {
        state.filteredComments = state.comments.filter((c) => null)
      }
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchComments.fulfilled, (state, action) => {
      state.comments = action.payload ? action.payload : []
      state.loading = false
      state.error = false
    })
    builder.addCase(fetchComments.rejected, (state, action) => {
      state.error = true
    })

    builder.addCase(fetchComments.pending, (state, action) => {
      state.loading = true
    })

    builder.addCase(fetchCommentsById.fulfilled, (state, action) => {
      state.comment = action.payload ? action.payload : null
      state.loading = false
      state.error = false
    })

    builder.addCase(fetchCommentsById.rejected, (state, action) => {
      state.error = true
    })

    builder.addCase(fetchCommentsById.pending, (state, action) => {
      state.loading = true
    })
  },
})

export const fetchComments = createAsyncThunk(
  "comment/fetchComments",
  async () => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/comments"
      )
      const data = (await response.json()) as CommentI[]
      return data
    } catch (error) {
      console.log(error)
    }
  }
)

export const fetchCommentsById = createAsyncThunk(
  "comment/fetchCommentsById",
  async (id: string) => {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/comments/${id}`
      )
      const data = (await response.json()) as CommentI
      return data
    } catch (error) {
      console.log(error)
    }
  }
)

export default commentsSlice.reducer

export const { sort, search } = commentsSlice.actions
