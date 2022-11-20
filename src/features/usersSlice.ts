import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { UserI, UsersState } from '../types/userTypes';

const initialState: UsersState = {
  loading: false,
  error: false,
  users: [],
  filteredUsers: [],
  user: null,
}

const UsersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    sort: (state, action: PayloadAction<string>) => {
      state.users = state.users.sort((a, b) => (a > b ? 1 : -1))
    },
    search: (state, action: PayloadAction<string>) => {
      state.filteredUsers = []
      let input = action.payload

      if (!input) {
        state.filteredUsers = []
      } else {
        state.filteredUsers = state.users.filter((c) =>
          c.name.toLowerCase().includes(input.toLowerCase())
        )
      }
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.users = action.payload ? action.payload : []
      state.loading = false
      state.error = false
    })
    builder.addCase(fetchUsers.rejected, (state) => {
      state.error = true
    })

    builder.addCase(fetchUsers.pending, (state) => {
      state.loading = true
    })

    builder.addCase(fetchUsersById.fulfilled, (state, action) => {
      state.user = action.payload ? action.payload : null
      state.loading = false
      state.error = false
    })

    builder.addCase(fetchUsersById.rejected, (state) => {
      state.error = true
    })

    builder.addCase(fetchUsersById.pending, (state) => {
      state.loading = true
    })
  },
})

export const fetchUsers = createAsyncThunk("countries/fetchusers", async () => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users")
    const data = (await response.json()) as UserI[]
    return data
  } catch (error) {
    console.log(error)
  }
})

export const fetchUsersById = createAsyncThunk(
  "countries/fetchPost",
  async (id: string) => {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users/${id}`
      )
      const data = (await response.json()) as UserI
      return data
    } catch (error) {
      console.log(error)
    }
  }
)

export default UsersSlice.reducer

export const { sort, search } = UsersSlice.actions
