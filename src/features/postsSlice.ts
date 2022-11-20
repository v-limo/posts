import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { PostI, PostState } from '../types/postTypes';

const initialState: PostState = {
  posts: [],
  filteredPosts: [],
  loading: false,
  error: false,
  post: null,
}

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    sort: (state, action: PayloadAction<string>) => {
      state.posts = state.posts.sort((a, b) => (a > b ? 1 : -1))
    },
    search: (state, action: PayloadAction<string>) => {
      state.filteredPosts = []
      let input = action.payload

      if (!input) {
        state.filteredPosts = []
      } else {
        state.filteredPosts = state.posts.filter((c) =>
          c.title.toLowerCase().includes(input.toLowerCase())
        )
      }
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.posts = action.payload ? action.payload : []
      state.loading = false
      state.error = false
    })
    builder.addCase(fetchPosts.rejected, (state, action) => {
      state.error = true
    })

    builder.addCase(fetchPosts.pending, (state, action) => {
      state.loading = true
    })

    builder.addCase(fetchPostsById.fulfilled, (state, action) => {
      state.post = action.payload ? action.payload : null
      state.loading = false
      state.error = false
    })

    builder.addCase(fetchPostsById.rejected, (state, action) => {
      state.error = true
    })

    builder.addCase(fetchPostsById.pending, (state, action) => {
      state.loading = true
    })
  },
})

export const fetchPosts = createAsyncThunk("countries/fetchPosts", async () => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts")
    const data = (await response.json()) as PostI[]
    return data
  } catch (error) {
    console.log(error)
  }
})

export const fetchPostsById = createAsyncThunk(
  "countries/fetchPost",
  async (id: string) => {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${id}`
      )
      const data = (await response.json()) as PostI
      return data
    } catch (error) {
      console.log(error)
    }
  }
)

export default postsSlice.reducer

export const { sort, search } = postsSlice.actions
