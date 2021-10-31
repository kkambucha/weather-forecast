import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { City } from 'store'

interface CitiesState {
  ids: number[]
}

const initialState: CitiesState = {
  ids: [],
}

const citiesSlice = createSlice({
  name: 'cities',
  initialState,
  reducers: {
    addCityId: (state: CitiesState, { payload }: PayloadAction<City>) => {
      const ids = new Set(state.ids)
      ids.add(payload.id)
      state.ids = Array.from(ids)
    },
    deleteCityId: (state: CitiesState, action: PayloadAction<number>) => {
      const ids = new Set(state.ids)
      const id = action.payload

      if (ids.has(id)) {
        ids.delete(id)
      }

      state.ids = Array.from(ids)
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

export const { addCityId, deleteCityId } = citiesSlice.actions
export default citiesSlice.reducer
