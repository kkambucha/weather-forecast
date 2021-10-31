import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { City } from 'store'

export interface CitiesState {
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
    deleteCityId: (
      state: CitiesState,
      action: PayloadAction<{ id: number }>
    ) => {
      const ids = new Set(state.ids)
      const id = action.payload.id

      if (ids.has(id)) {
        ids.delete(id)
      }

      state.ids = Array.from(ids)
    },
    hydrate: (state, action) => {
      return action.payload
    },
  },
})

export const { addCityId, deleteCityId, hydrate } = citiesSlice.actions
export default citiesSlice.reducer
