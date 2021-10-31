import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { City } from 'store'

type CityId = number

export interface CitiesState {
  ids: CityId[]
}

const initialState: CitiesState = {
  ids: [],
}

const citiesSlice = createSlice({
  name: 'cities',
  initialState,
  reducers: {
    addCityId: (
      state: CitiesState,
      { payload }: PayloadAction<{ city: City }>
    ) => {
      const ids = new Set(state.ids)
      ids.add(payload.city.id)
      state.ids = Array.from(ids)
    },
    deleteCityId: (
      state: CitiesState,
      action: PayloadAction<{ id: CityId }>
    ) => {
      const ids = new Set(state.ids)
      const id = action.payload.id

      if (ids.has(id)) {
        ids.delete(id)
      }

      state.ids = Array.from(ids)
    },
    hydrate: (state: CitiesState, action: PayloadAction<CitiesState>) => {
      return action.payload
    },
  },
})

export const { addCityId, deleteCityId, hydrate } = citiesSlice.actions
export default citiesSlice.reducer
