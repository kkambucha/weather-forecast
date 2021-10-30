import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

import { City, ApiStatus } from 'api/types'
import { fetchCitiesByName } from 'api/fetchCitiesByName'

interface SearchState {
  result: City[]
  status: ApiStatus
}

const initialState: SearchState = {
  result: [],
  status: 'idle',
}

// Async thunks
export const fetchCitiesThunk = createAsyncThunk(
  'search/fetchCities',
  async (cityName: string, { rejectWithValue /* , dispatch, getState */ }) => {
    try {
      const res = await fetchCitiesByName(cityName)
      if (res.status === 200) {
        return res.data.list
      } else {
        throw new Error('Server error')
      }
    } catch (err) {
      return rejectWithValue(err)
      // handle error
    }
  }
)

// Slice
const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCitiesThunk.pending, (state: SearchState) => {
        state.result = []
        state.status = 'pending'
      })
      .addCase(
        fetchCitiesThunk.fulfilled,
        (state: SearchState, { payload }: PayloadAction<City[]>) => {
          state.result = payload
          state.status = 'idle'
        }
      )
      .addCase(fetchCitiesThunk.rejected, (state: SearchState) => {
        state.status = 'rejected'
      })
  },
})

export default searchSlice.reducer
