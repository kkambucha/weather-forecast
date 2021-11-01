import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type CitiesState = number[]

const initialState: CitiesState = []

const citiesSlice = createSlice({
  name: 'cities',
  initialState,
  reducers: {
    addCityId: (
      state: CitiesState,
      { payload }: PayloadAction<{ id: number }>
    ) => {
      const ids = new Set(state)
      ids.add(payload.id)
      return Array.from(ids)
    },
    deleteCityId: (
      state: CitiesState,
      action: PayloadAction<{ id: number }>
    ) => {
      const ids = new Set(state)
      const id = action.payload.id

      if (ids.has(id)) {
        ids.delete(id)
      }

      return Array.from(ids)
    },
    hydrate: (state: CitiesState, action: PayloadAction<CitiesState>) => {
      return action.payload
    },
  },
})

export const { addCityId, deleteCityId, hydrate } = citiesSlice.actions
export default citiesSlice.reducer
