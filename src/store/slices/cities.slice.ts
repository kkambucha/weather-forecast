import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import _ from 'lodash'

import { City, ApiStatus } from 'store'

interface CitiesState {
  list: City[]
  status: ApiStatus
}

const initialState: CitiesState = {
  list: [],
  status: 'idle',
}

const citiesSlice = createSlice({
  name: 'cities',
  initialState,
  reducers: {
    addCity: (state: CitiesState, { payload }: PayloadAction<City>) => {
      if (!_.some(state.list, payload)) {
        state.list.push(payload)
      }
    },
    deleteCity: (state: CitiesState, action: PayloadAction<number>) => {
      _.remove(state.list, (city: City): boolean => city.id === action.payload)
    },
  },
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(fetchCities.pending, (state, action) => {
  //       console.log(state, action, 'cities pending')
  //     })
  //     .addCase(fetchCities.fulfilled, (state, { payload }) => {
  //       console.log('payload', payload)
  //       console.log('fetch cities fulfilled')
  //     })
  //     .addCase(fetchCities.rejected, () => {
  //       console.log('fetch cities rejected')
  //     })
  // },
})

export const { addCity, deleteCity } = citiesSlice.actions
export default citiesSlice.reducer
